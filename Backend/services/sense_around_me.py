import logging
from haversine import haversine, Unit
import time

last_alert_time = {}  # ✅ Stores the last time an alert was triggered

# Set up logger
logger = logging.getLogger(__name__)

# Global variables
geofence_center = None
monitoring_active = False
inside_users = set()  # ✅ This will track people inside the geofence
initial_setup = True  # ✅ Prevents false alerts on first check

def set_geofence_center(latitude, longitude):
    """Set a new geofence center."""
    global geofence_center, monitoring_active, inside_users
    geofence_center = (latitude, longitude)
    monitoring_active = True
    inside_users.clear()  # ✅ Clear previous entries when setting a new geofence
    logger.info(f"✅ Geofence center set to: {geofence_center}. Monitoring started.")

def stop_monitoring():
    """Stop monitoring."""
    global monitoring_active, geofence_center, inside_users
    if not monitoring_active:
        logger.warning("⚠️ Monitoring is already stopped.")
        return {'error': 'Monitoring is already stopped.'}

    monitoring_active = False
    geofence_center = None
    inside_users.clear()  # ✅ Reset inside users when monitoring stops
    logger.info("❌ Monitoring stopped.")
    return {'success': 'Monitoring stopped successfully.'}

def set_geofence_center(latitude, longitude):
    """Set a new geofence center."""
    global geofence_center, monitoring_active, inside_users, initial_setup
    geofence_center = (latitude, longitude)
    monitoring_active = True
    inside_users.clear()  # ✅ Clear previous entries when setting a new geofence
    initial_setup = True  # ✅ Reset initial setup to prevent false alerts
    logger.info(f"✅ Geofence center set to: {geofence_center}. Monitoring started.")

def update_geofence_center(latitude, longitude):
    """Update the geofence center."""
    global geofence_center
    if not monitoring_active:
        return {'error': 'Monitoring is not active. Start monitoring first.'}

    geofence_center = (latitude, longitude)
    return {'success': 'Geofence updated successfully.'}


def get_sensor_data(latitude, longitude, radius):
    """Detect entry & exit accurately to prevent false alerts."""
    global inside_users, initial_setup, last_alert_time

    if not monitoring_active:
        return {'inside_geofence': False, 'alert_message': "Monitoring is inactive."}

    if geofence_center is None:
        return {'inside_geofence': False, 'alert_message': "Geofence center is not set."}

    radius = max(1, min(radius, 1000))  # ✅ Restrict radius (at least 1m to avoid zero distance issues)
    current_location = (latitude, longitude)
    distance = haversine(geofence_center, current_location, unit=Unit.METERS)

    inside_geofence = distance <= radius
    user_location_key = (round(latitude, 5), round(longitude, 5))

    logger.info(f"Checking: Current Location ({latitude}, {longitude}), Distance: {distance:.2f}m")

    # ✅ Prevent false alerts when setting up geofence
    if initial_setup:
        inside_users.add(user_location_key)
        initial_setup = False
        return {'inside_geofence': True, 'alert_message': ""}

    current_time = time.time()
    last_alert = last_alert_time.get(user_location_key, 0)

    # ✅ Entry detection: Alert only if not inside & cooldown period passed
    if inside_geofence and user_location_key not in inside_users:
        if current_time - last_alert > 5:  # ✅ 5 seconds cooldown to prevent constant beeping
            inside_users.add(user_location_key)
            last_alert_time[user_location_key] = current_time
            logger.warning(f"🚨 ALERT: {user_location_key} entered geofence!")
            return {'inside_geofence': True, 'alert_message': "🚨 Alert! A new person has entered the geofence!"}
    
    # ✅ Exit detection: Remove users who leave
    elif not inside_geofence and user_location_key in inside_users:
        inside_users.remove(user_location_key)
        logger.info(f"🔄 User exited: {user_location_key}")

    return {'inside_geofence': inside_geofence, 'alert_message': ""}









# import os
# import asyncio
# from bleak import BleakScanner

# # List of trusted devices (Update with actual MAC addresses)
# KNOWN_WIFI_DEVICES = ["AA:BB:CC:DD:EE:FF", "11:22:33:44:55:66"]
# KNOWN_BLUETOOTH_DEVICES = ["00:1A:7D:DA:71:13", "3C:5A:B4:6F:8E:90"]

# def scan_wifi():
#     """Scan for WiFi devices connected to the same network."""
#     scan_result = os.popen("arp -a").read()
#     detected_wifi_devices = []
#     for line in scan_result.split("\n"):
#         if "dynamic" in line or ":" in line:
#             parts = line.split()
#             if len(parts) >= 2:
#                 detected_wifi_devices.append(parts[1])  # Extract MAC address
#     return detected_wifi_devices

# async def scan_bluetooth():
#     """Scan for nearby Bluetooth devices."""
#     devices = await BleakScanner.discover()
#     detected_bluetooth_devices = [(device.address, device.name) for device in devices]
#     return detected_bluetooth_devices

# def detect_unknown_devices():
#     """Detect unknown WiFi and Bluetooth devices."""
#     unknown_wifi = [mac for mac in scan_wifi() if mac not in KNOWN_WIFI_DEVICES]

#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     detected_bluetooth = loop.run_until_complete(scan_bluetooth())
#     unknown_bluetooth = [dev for dev in detected_bluetooth if dev[0] not in KNOWN_BLUETOOTH_DEVICES]

#     return {"unknown_wifi": unknown_wifi, "unknown_bluetooth": unknown_bluetooth}
