import cv2
import numpy as np
from flask import request, jsonify

def predict_trajectory(request):
    """
    Predicts object trajectories using motion tracking instead of YOLO.
    """
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    file = request.files['video']
    file_path = "uploaded_video.mp4"
    file.save(file_path)

    cap = initialize_video_capture(file_path)

    trajectory_points = []
    prev_positions = {}

    ret, frame1 = cap.read()
    ret, frame2 = cap.read()

    while ret and frame2 is not None:
        gray1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)

        # Compute absolute difference between frames
        diff = cv2.absdiff(gray1, gray2)
        _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)

        # Find contours of moving objects
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        detected_objects = {}
        for contour in contours:
            if cv2.contourArea(contour) > 500:  # Ignore small movements
                x, y, w, h = cv2.boundingRect(contour)
                detected_objects[(x + w // 2, y + h // 2)] = (w, h)  # Track object center

        # Predict trajectory
        if prev_positions:
            for (prev_x, prev_y), (w, h) in detected_objects.items():
                if (prev_x, prev_y) in prev_positions:
                    old_x, old_y = prev_positions[(prev_x, prev_y)]
                    dx = prev_x - old_x
                    dy = prev_y - old_y
                    predicted_x = prev_x + dx
                    predicted_y = prev_y + dy

                    trajectory_points.append([[prev_x, prev_y], [predicted_x, predicted_y]])

        prev_positions = detected_objects
        frame1 = frame2
        ret, frame2 = cap.read()

    cap.release()

    return jsonify({"trajectory": trajectory_points})

def initialize_video_capture(file_path):
    cap = cv2.VideoCapture(file_path)
    frame_rate = int(cap.get(cv2.CAP_PROP_FPS)) or 30
    return cap
