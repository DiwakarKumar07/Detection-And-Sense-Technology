import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { Videocam } from "@mui/icons-material";

const LiveDetection = () => {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(5);
  const [speed, setSpeed] = useState(null);
  const [error, setError] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [stream, setStream] = useState(null);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleStartRecording = async () => {
    setRecording(true);
    setError(null);
    setSpeed(null);
    setVideoURL(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        stopCamera();
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        setVideoURL(URL.createObjectURL(blob));

        const formData = new FormData();
        formData.append("video", blob);

        try {
          const response = await axios.post("http://127.0.0.1:5002/live_detection", formData);
          setSpeed(response.data);
        } catch (err) {
          setError("Failed to process the video. Please try again.");
        }
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        setRecording(false);
      }, duration * 1000);
    } catch (err) {
      setError("Failed to start live detection. Check camera permissions.");
      setRecording(false);
    }
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
            fontSize: "2.5rem",
          }}
        >
          Live Detection AI
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, marginTop: "10px", fontFamily: "Poppins, sans-serif" }}>
          Real-time object tracking & speed analysis powered by AI.
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Live Video & Recording Section */}
          <Grid item xs={12} md={6}>
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
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#00e5ff" }}>
                  Live Recording & Detection
                </Typography>

                {recording && <video ref={videoRef} autoPlay playsInline style={{ width: "100%", borderRadius: "12px", marginTop: "10px" }} />}
                {videoURL && !recording && (
                  <Box sx={{ marginTop: "10px", borderRadius: "10px", overflow: "hidden" }}>
                    <video controls width="100%" height="auto">
                      <source src={videoURL} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}

                <TextField
                  type="number"
                  label="Recording Duration (seconds)"
                  value={duration}
                  onChange={(e) => setDuration(Math.min(Math.max(parseInt(e.target.value, 10), 1), 60))}
                  fullWidth
                  sx={{
                    marginTop: "15px",
                    backgroundColor: "rgba(0, 255, 255, 0.1)",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                    input: { color: "#00ffff", fontSize: "1rem", fontWeight: "bold" },
                    "& label": { color: "#00e5ff" },
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={<Videocam />}
                  onClick={handleStartRecording}
                  disabled={recording}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#00e5ff",
                    color: "#000",
                    "&:hover": { backgroundColor: "#00bcd4" },
                  }}
                >
                  {recording ? <CircularProgress size={24} sx={{ color: "#000" }} /> : "Start Live Detection"}
                </Button>

                {error && <Alert severity="error" sx={{ marginTop: "10px" }}>{error}</Alert>}
              </CardContent>
            </Card>
          </Grid>

          {/* Speed Analysis Results */}
          {speed && (
            <Grid item xs={12} md={6}>
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
                    Speed Analysis Results
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: "10px", fontWeight: "bold", color: "#00e5ff" }}>
                    {speed.speed_mps.toFixed(2)} m/s ({speed.speed_kph.toFixed(2)} km/h)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default LiveDetection;
