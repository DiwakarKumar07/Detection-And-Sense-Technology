import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Alert,
  Box,
  Container,
  Grid,
} from "@mui/material";

const GeoAlert = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [radius, setRadius] = useState(100);
  const [insideGeofence, setInsideGeofence] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState(null);
  const [monitoring, setMonitoring] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [restrictedZoneMessage, setRestrictedZoneMessage] = useState("");

  useEffect(() => {
    let interval = null;
    if (monitoring) {
      fetchLocation();
      interval = setInterval(fetchLocation, 5000);
    }
    return () => clearInterval(interval);
  }, [monitoring, radius]);

  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      setError("❌ Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`📍 Updated Location: ${latitude}, ${longitude}`); // ✅ Debugging
        setLocation({ latitude, longitude });
        checkGeofenceStatus(latitude, longitude);
      },
      (err) => {
        setError(`Error retrieving GPS location: ${err.message}`);
      }
    );
  };
  

  const startMonitoring = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const { latitude, longitude } = position.coords;
  
      const response = await axios.post("http://127.0.0.1:5002/set_geofence", { latitude, longitude });
      
      if (response.status === 200) {
        setMonitoring(true);
        setSuccessMessage("✅ Successfully set! Monitoring started.");
        setRestrictedZoneMessage(`Your restricted zone: ${radius} meters`);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(response.data.error || "Failed to start monitoring.");
      }
    } catch (error) {
      setError("Failed to start monitoring.");
    }
  };
  
  const stopMonitoring = async () => {
    try {
      await axios.post("http://127.0.0.1:5002/stop_monitoring");
      setMonitoring(false);
      setAlertMessage("");
      setSuccessMessage("❌ Monitoring stopped.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to stop monitoring.");
    }
  };

  const checkGeofenceStatus = async (latitude, longitude) => {
    try {
      console.log("Checking geofence status...");
      const response = await axios.get("http://127.0.0.1:5002/sense_around_me", {
        params: { latitude, longitude, radius },
      });
      const data = response.data;
  
      console.log("Backend Response: ", data); // ✅ Debugging ke liye output
  
      setInsideGeofence(data.inside_geofence);
      
      // ✅ Alert tabhi trigger kare jab backend naye aadmi ko detect kare
      if (data.alert_message) {
        console.log("🚨 New person detected! Triggering notification...");
        setAlertMessage(data.alert_message);
        showDesktopNotification(data.alert_message);
        playAudioAlert();
      } else {
        setAlertMessage(""); // ✅ Agar alert nahi mila to clear karein
      }
    } catch (error) {
      console.error("Failed to check geofence status:", error);
      setError("Failed to check geofence status.");
    }
  };
  
  
  const showDesktopNotification = (message) => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification("Geofence Alert 🚨", { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Geofence Alert 🚨", { body: message });
        }
      });
    }
  };

  const playAudioAlert = () => {
    const audio = new Audio("/siren.mp3"); // Ensure you have an audio file
    audio.play().catch((err) => console.error("Audio playback failed", err));
  };

  return (
    <Box sx={{ backgroundColor: "", minHeight: "100vh", paddingBottom: "50px", color: "#fff" }}>
      {/* AI-Themed Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e1e1e, #121212)",
          color: "white",
          textAlign: "center",
          padding: "50px 20px",
          borderRadius: "0 0 30px 30px",
          boxShadow: "0px 4px 15px rgba(0, 255, 255, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            letterSpacing: "2px",
            textTransform: "uppercase",
            textShadow: "0px 0px 10px cyan",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          Geofence Alert System
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, marginTop: "10px", fontFamily: "Poppins, sans-serif" }}>
          AI-powered real-time location monitoring.
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ marginTop: "40px" }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Geofence Monitoring Section */}
          <Grid item xs={12}>
            <Card
              sx={{
                padding: 4,
                boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                borderRadius: "15px",
                transition: "0.3s",
                "&:hover": { boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.5)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#00e5ff", fontFamily: "Orbitron, sans-serif" }}>
                  Set Geofence Alert
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}
                {location.latitude && location.longitude && (
                  <Alert severity="info">
                    📍 Current Location: Latitude: {location.latitude.toFixed(5)}, Longitude: {location.longitude.toFixed(5)}
                  </Alert>
                )}

               <TextField
                 type="number"
                 label="Set Alert Distance (m)"
                 fullWidth
                 margin="normal"
                 value={radius}
                 onChange={(e) => setRadius(Math.max(0, Math.min(Number(e.target.value), 1000)))}
                 sx={{
                   backgroundColor: "rgba(0, 255, 255, 0.5)", // Cyan background
                   borderRadius: "8px",
                   "& .MuiOutlinedInput-root": {
                     "& fieldset": { borderColor: "#00bcd4" }, // Border color
                     "&:hover fieldset": { borderColor: "#0097a7" }, // Border on hover
                     "&.Mui-focused fieldset": { borderColor: "#006064" }, // Border when focused
                   },
                   "& .MuiInputBase-input": {
                     color: "#000", // Text color inside input
                     fontWeight: "bold",
                   },
                   "& .MuiInputLabel-root": {
                     color: "#FFF", // Label color (black for visibility)
                     fontWeight: "bold",
                   },
                   "& .MuiInputLabel-root.Mui-focused": {
                     color: "#FFF", // Highlighted label color when focused (Dodger blue)
                   },
                 }}
               />

                <Button variant="contained" color="primary" onClick={startMonitoring} sx={{ marginTop: 2, marginRight: 2 }}>
                  Start Monitoring
                </Button>
                <Button variant="contained" color="secondary" onClick={stopMonitoring} sx={{ marginTop: 2 }}>
                  Stop Monitoring
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Result Section */}
          {monitoring && (
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: 4,
                  boxShadow: "0px 0px 15px rgba(255, 255, 0, 0.5)",
                  background: "rgba(255, 255, 255, 0.08)",
                  textAlign: "center",
                  borderRadius: "15px",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" sx={{ color: "#FFD700" }}>
                    Geofence Status
                  </Typography>
                  {insideGeofence && <Alert severity="success">✅ You are inside the geofence!</Alert>}
                  {alertMessage && <Alert severity="warning">{alertMessage}</Alert>}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default GeoAlert;









// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [wifiDevices, setWifiDevices] = useState([]);
//   const [bluetoothDevices, setBluetoothDevices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   useEffect(() => {
//     const fetchDevices = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://127.0.0.1:5002/scan");
//         setWifiDevices(response.data.unknown_wifi);
//         setBluetoothDevices(response.data.unknown_bluetooth);

//         if (response.data.unknown_wifi.length > 0 || response.data.unknown_bluetooth.length > 0) {
//           setAlertMessage("🚨 Alert! Unknown device detected!");
//           playAudioAlert();
//         } else {
//           setAlertMessage("");
//         }
//       } catch (error) {
//         console.error("Error fetching device data:", error);
//       }
//       setLoading(false);
//     };

//     fetchDevices();
//     const interval = setInterval(fetchDevices, 10000); // Scan every 10 seconds
//     return () => clearInterval(interval);
//   }, []);

//   const playAudioAlert = () => {
//     const audio = new Audio("/siren.mp3"); // Ensure you have an alert sound
//     audio.play().catch((err) => console.error("Audio playback failed", err));
//   };

//   return (
//     <div className="text-white mt-15" style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Proximity Detection System</h1>
//       <p>{alertMessage}</p>

//       <h2>Unknown WiFi Devices</h2>
//       {loading ? <p>Loading...</p> : wifiDevices.length > 0 ? (
//         <ul>{wifiDevices.map((device, index) => <li key={index}>{device}</li>)}</ul>
//       ) : <p>No unknown WiFi devices detected.</p>}

//       <h2>Unknown Bluetooth Devices</h2>
//       {loading ? <p>Loading...</p> : bluetoothDevices.length > 0 ? (
//         <ul>{bluetoothDevices.map((device, index) => <li key={index}>{device}</li>)}</ul>
//       ) : <p>No unknown Bluetooth devices detected.</p>}
//     </div>
//   );
// }

// export default App;
