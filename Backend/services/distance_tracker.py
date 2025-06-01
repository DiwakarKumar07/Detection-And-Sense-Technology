import cv2
import numpy as np

def analyze_video(video_path):
    cap = cv2.VideoCapture(video_path)
    total_distance = 0
    prev_position = None
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        position = detect_object(frame)
        if position is not None and prev_position is not None:
            distance = np.linalg.norm(np.array(position) - np.array(prev_position))
            total_distance += distance
        
        prev_position = position
    
    cap.release()
    return round(total_distance, 2)

def detect_object(frame):
    # Convert to HSV for better color filtering
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Define color range (adjust these values based on object color)
    lower_bound = np.array([0, 100, 100])  # Example: Red object
    upper_bound = np.array([10, 255, 255])
    
    # Create mask and find contours
    mask = cv2.inRange(hsv, lower_bound, upper_bound)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        M = cv2.moments(largest_contour)
        if M['m00'] != 0:
            cx = int(M['m10'] / M['m00'])
            cy = int(M['m01'] / M['m00'])
            return (cx, cy)
    
    return None
