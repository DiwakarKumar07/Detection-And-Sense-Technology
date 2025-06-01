import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
# from flask_bcrypt import Bcrypt
from services.register import register_bp
from services.sense_around_me import set_geofence_center, stop_monitoring, get_sensor_data, update_geofence_center
import services.sense_around_me as geofence_monitor
# from services.sense_around_me import detect_unknown_devices
import services.live_detection as live_detection
import services.speed_detection as speed_detection
import services.data_visualization as data_visualization
import services.trajectory as trajectory
from services.distance_tracker import analyze_video



# Remove any previously configured loggers to prevent duplicating log entries
for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

# Configure Logging to only show errors in the terminal
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.ERROR)
console_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

logger = logging.getLogger()
logger.setLevel(logging.ERROR)
logger.addHandler(console_handler)

app = Flask(__name__)
CORS(app)
# bcrypt = Bcrypt(app)



@app.errorhandler(Exception)
def handle_exception(e):
    """Handles unexpected errors."""
    logger.error(f"Unhandled error: {str(e)}", exc_info=True)
    return jsonify({"error": "Internal Server Error"}), 500




# Register Blueprints
app.register_blueprint(register_bp)





# Live Detection (Webcam Stream)
@app.route('/live_detection', methods=['POST'])
def live_detection_route():
    try:
        if 'video' not in request.files or request.files['video'].filename == '':
            return jsonify({'error': 'No video file provided or invalid file'}), 400
        
        file = request.files['video']
        file_path = "uploaded_live_video.webm"
        file.save(file_path)
        logger.info(f"File saved: {file_path}")

        # Verify the file path
        print(f"File path: {file_path}")

        return live_detection.live_stream()

    except Exception as e:
        logger.error(f"Error in live_detection_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to process live detection"}), 500




# Speed Detection (Video File Upload Required)
@app.route('/speed_detection', methods=['POST'])
def speed_detection_route():
    if 'video' not in request.files or request.files['video'].filename == '':
        return jsonify({'error': 'No video file provided'}), 400
    try:
        return speed_detection.detect_speed(request)
    except Exception as e:
        logger.error(f"Error in speed_detection_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to process speed detection"}), 500







@app.route('/set_geofence', methods=['POST'])
def set_geofence_route():
    try:
        data = request.get_json()
        latitude, longitude = data.get("latitude"), data.get("longitude")
        if latitude is None or longitude is None:
            return jsonify({'error': 'Latitude and longitude are required'}), 400
        
        geofence_monitor.set_geofence_center(float(latitude), float(longitude))
        logger.info(f"✅ Geofence set at ({latitude}, {longitude})")
        return jsonify({'message': 'Geofence center set successfully'}), 200
    except Exception as e:
        logger.error(f"❌ Error in set_geofence_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to set geofence center"}), 500

@app.route('/update_geofence', methods=['POST'])
def update_geofence_route():
    try:
        data = request.get_json()
        latitude, longitude = data.get("latitude"), data.get("longitude")
        if latitude is None or longitude is None:
            return jsonify({'error': 'Latitude and longitude are required'}), 400
        
        result = geofence_monitor.update_geofence_center(float(latitude), float(longitude))
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"❌ Error in update_geofence_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to update geofence center"}), 500

@app.route('/stop_monitoring', methods=['POST'])
def stop_monitoring_route():
    try:
        result = geofence_monitor.stop_monitoring()
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"❌ Error in stop_monitoring_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to stop monitoring"}), 500

@app.route('/sense_around_me', methods=['GET'])
def sense_around_me_route():
    try:
        latitude = request.args.get('latitude')
        longitude = request.args.get('longitude')
        radius = request.args.get('radius')

        print(f"Received: latitude={latitude}, longitude={longitude}, radius={radius}")  # ✅ Debugging

        if not latitude or not longitude or not radius:
            logger.error("❌ Missing required parameters.")
            return jsonify({'error': 'Missing required parameters'}), 400

        latitude, longitude, radius = float(latitude), float(longitude), float(radius)
        logger.info(f"🔍 Checking geofence for ({latitude}, {longitude}) with radius {radius}m")

        result = geofence_monitor.get_sensor_data(latitude, longitude, radius)
        return jsonify(result), 200

    except ValueError as ve:
        logger.error(f"❌ ValueError in sense_around_me_route: {ve}")
        return jsonify({'error': 'Invalid latitude, longitude, or radius values'}), 400

    except Exception as e:
        logger.error(f"❌ Internal Server Error: {e}", exc_info=True)
        return jsonify({'error': "Internal Server Error"}), 500





# @app.route('/scan', methods=['GET'])
# def scan_devices():
#     """API to scan for unknown WiFi and Bluetooth devices."""
#     result = detect_unknown_devices()
#     return jsonify(result)

    






# Data Visualization (Get Processed Data)
@app.route('/data_visualization', methods=['GET'])
def visualize_data():
    try:
        visual_data = data_visualization.get_visual_data()
        return jsonify(visual_data)
    except Exception as e:
        logger.error(f"Error in data_visualization_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to retrieve data visualization"}), 500

# Add Data to Visualization
@app.route('/data_visualization/add', methods=['POST'])
def add_visual_data_route():
    try:
        data = request.json
        category = data.get('category')
        value = data.get('value')
        if not category or value is None:
            return jsonify({'error': 'Invalid category or value'}), 400
        data_visualization.add_visual_data(category, value)
        return jsonify({'message': 'Data added successfully'}), 200
    except Exception as e:
        logger.error(f"Error in add_visual_data_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to add data"}), 500

# Delete Data from Visualization
@app.route('/data_visualization/delete', methods=['POST'])
def delete_visual_data_route():
    try:
        data = request.json
        category = data.get('category')
        if not category:
            return jsonify({'error': 'Invalid category'}), 400
        data_visualization.delete_visual_data(category)
        return jsonify({'message': 'Data deleted successfully'}), 200
    except Exception as e:
        logger.error(f"Error in delete_visual_data_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to delete data"}), 500





# Trajectory Prediction (Video File Upload Required)
@app.route('/trajectory_prediction', methods=['POST'])
def trajectory_prediction_route():
    if 'video' not in request.files or request.files['video'].filename == '':
        return jsonify({'error': 'No video file provided'}), 400
    try:
        return trajectory.predict_trajectory(request)
    except Exception as e:
        logger.error(f"Error in trajectory_prediction_route: {e}", exc_info=True)
        return jsonify({'error': "Failed to process trajectory prediction"}), 500






@app.route('/process_video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file uploaded'}), 400
    
    file = request.files['video']
    file_path = "distance_video.mp4"
    file.save(file_path)
    
    try:
        total_distance = analyze_video(file_path)
        return jsonify({'total_distance': total_distance})
    except Exception as e:
        return jsonify({'error': str(e)}), 500





@app.route('/')
def home():
    try:
        return {"message": "Backend is running!"}
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/status')
def status():
    try:
        return {"status": "Server is running", "endpoint": "/real_time_analysis"}
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True, port=5002)
