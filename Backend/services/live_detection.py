import logging
import cv2
import numpy as np
from flask import jsonify

# ✅ Configure Logging
logging.basicConfig(
    filename="server.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

# ✅ Handle missing config file
try:
    from config import PIXEL_TO_METER  # Pixel-to-meter conversion factor
except ImportError:
    PIXEL_TO_METER = 0.05  # Default conversion factor

def live_stream():
    """
    Processes live video feed to estimate object speed and track them in real time.
    """
    try:
        file_path = "uploaded_live_video.webm"
        logging.info(f"Attempting to open video file: {file_path}")

        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            logging.error("Error opening video file")
            return jsonify({'error': 'Error opening video file'}), 400

        frame_rate = int(cap.get(cv2.CAP_PROP_FPS)) or 30  # Default FPS = 30
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        logging.info(f"Processing video: {file_path}, Frame Rate: {frame_rate}, Total Frames: {total_frames}")

        pixel_to_real_scale = PIXEL_TO_METER
        total_distance = 0
        frame_count = 0

        ret, frame1 = cap.read()
        ret, frame2 = cap.read()

        while ret and frame2 is not None:
            # Convert frames to grayscale
            gray1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
            gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)

            # Compute absolute difference
            diff = cv2.absdiff(gray1, gray2)
            _, thresh = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)

            # Detect moving contours
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            # If motion is detected, draw bounding box
            if contours:
                x, y, w, h = cv2.boundingRect(contours[0])
                distance = w * pixel_to_real_scale  # Convert pixels to meters
                total_distance += distance
                logging.info(f"Motion detected. Distance: {distance:.2f} meters")
                
                # Draw bounding box around detected object
                cv2.rectangle(frame1, (x, y), (x + w, y + h), (0, 255, 0), 2)

            frame1 = frame2
            ret, frame2 = cap.read()
            frame_count += 1

        cap.release()

        if frame_count == 0:
            logging.warning("No frames were processed")
            return jsonify({"error": "No frames were processed"}), 400

        total_time_sec = frame_count / frame_rate
        logging.info(f"Total Distance: {total_distance:.2f} meters, Total Time: {total_time_sec:.2f} seconds")

        if total_time_sec > 0:
            speed_mps = total_distance / total_time_sec
            speed_kph = speed_mps * 3.6  # Convert m/s to km/h
            logging.info(f"Calculated Speed: {speed_mps:.2f} m/s ({speed_kph:.2f} km/h)")
        else:
            logging.warning("No motion detected")
            return jsonify({"error": "No motion detected"}), 400

        return jsonify({
            "speed_mps": round(speed_mps, 2),
            "speed_kph": round(speed_kph, 2),
            "video": "processed_video.mp4"  # You can add processed video download link here
        })

    except Exception as e:
        logging.error(f"Error in live_stream function: {str(e)}", exc_info=True)
        return jsonify({'error': 'An error occurred during live detection', 'details': str(e)}), 500
