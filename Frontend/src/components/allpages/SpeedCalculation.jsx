import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const SpeedCalculation = () => {
  const [speed, setSpeed] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!video) {
      const interval = setInterval(() => {
        setSpeed({ speed_mps: Math.random() * 10, speed_kph: Math.random() * 120 });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [video]);

  const handleFileChange = (e) => {
    const newVideo = e.target.files[0];
    if (newVideo) {
      setVideo(null);
      setVideoURL(null);
      setTimeout(() => {
        setVideo(newVideo);
        setVideoURL(URL.createObjectURL(newVideo));
      }, 0);
    }
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    setLoading(true);
    setError(null);
    setSpeed(null);

    try {
      const response = await axios.post("http://127.0.0.1:5002/speed_detection", formData);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSpeed(response.data);
      }
    } catch (error) {
      setError("Failed to process the video. Please try again.");
    } finally {
      setLoading(false);
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
          }}
        >
          Speed Calculation AI
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, marginTop: "10px", fontFamily: "Poppins, sans-serif" }}>
          AI-powered motion tracking & real-time speed analysis.
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Video Upload Section */}
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
                  Upload Video for Speed Analysis
                </Typography>

                {videoURL && (
                  <Box sx={{ marginTop: "10px", borderRadius: "10px", overflow: "hidden" }}>
                    <video key={videoURL} width="100%" height="auto" controls>
                      <source src={videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}

                <input
                  accept="video/*"
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                    sx={{
                      marginTop: 2,
                      backgroundColor: "#00e5ff",
                      color: "#000",
                      "&:hover": { backgroundColor: "#00bcd4" },
                    }}
                  >
                    Select Video
                  </Button>
                </label>

                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleUpload}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#00e5ff",
                    color: "#000",
                    "&:hover": { backgroundColor: "#00bcd4" },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "#000" }} /> : "Upload & Analyze"}
                </Button>

                {error && <Alert severity="error" sx={{ marginTop: "10px" }}>{error}</Alert>}
              </CardContent>
            </Card>
          </Grid>

          {/* Speed Results Section */}
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
                  <Box sx={{ marginTop: "15px", textAlign: "left" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                      🚀 Speed:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00e5ff" }}>
                      {speed.speed_mps.toFixed(2)} m/s ({speed.speed_kph.toFixed(2)} km/h)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default SpeedCalculation;
