import cv2
import numpy as np
import os
from flask import jsonify

def detect_speed(request):
    """
    Estimates object speed using motion tracking.
    """
    try:
        if 'video' not in request.files:
            print("No video file provided")
            return jsonify({'error': 'No video file provided'}), 400

        # Use a constant filename for the uploaded video
        file_path = "video_uploaded.mp4"
        file = request.files['video']
        file.save(file_path)
        print("File saved:", file_path)

        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            print("Error opening video file")
            return jsonify({'error': 'Error opening video file'}), 400

        frame_rate = int(cap.get(cv2.CAP_PROP_FPS))  # Frames per second
        print("Frame Rate:", frame_rate)

        if frame_rate == 0:
            print("Invalid video file or cannot determine frame rate")
            return jsonify({"error": "Invalid video file or cannot determine frame rate"}), 400

        pixel_to_real_scale = 0.05  # Example: 1 pixel = 0.05 meters
        total_distance = 0
        frame_count = 0

        ret, frame1 = cap.read()
        ret, frame2 = cap.read()

        while ret and frame2 is not None:
            # Calculate frame difference (detect motion)
            diff = cv2.absdiff(frame1, frame2)
            gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
            _, thresh = cv2.threshold(gray, 20, 255, cv2.THRESH_BINARY)
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            # If motion is detected
            if contours:
                x, y, w, h = cv2.boundingRect(contours[0])
                distance = w * pixel_to_real_scale  # Convert pixels to meters
                total_distance += distance
                print("Motion detected. Distance:", distance)

            frame1 = frame2
            ret, frame2 = cap.read()
            frame_count += 1

        cap.release()

        if frame_count == 0:
            print("No frames were processed")
            return jsonify({"error": "No frames were processed"}), 400

        total_time_sec = frame_count / frame_rate  # Total time in seconds
        print("Total Distance:", total_distance, "Total Time (sec):", total_time_sec)

        if total_time_sec > 0:
            speed_mps = total_distance / total_time_sec  # Speed in meters per second
            speed_kph = speed_mps * 3.6  # Convert m/s to km/h
            print(f"Calculated Speed: {speed_mps:.2f} m/s ({speed_kph:.2f} km/h)")
        else:
            print("No motion detected")
            return jsonify({"error": "No motion detected"}), 400

        return jsonify({
            "speed_mps": round(speed_mps, 2),
            "speed_kph": round(speed_kph, 2),  # Updated to km/h
            "video_url": file_path  # Return the constant video file path
        })

    except Exception as e:
        print("Error in detect_speed function:", str(e))
        return jsonify({'error': 'An error occurred during speed detection', 'details': str(e)}), 500
