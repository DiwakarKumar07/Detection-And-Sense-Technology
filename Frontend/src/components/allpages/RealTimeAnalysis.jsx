import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";

function RealTimeAnalysis() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const maxTime = 60; // max time in seconds

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      setDistance(null);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please upload a video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5002/process_video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && typeof response.data.total_distance === "number") {
        setDistance(response.data.total_distance);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to process video");
    } finally {
      setLoading(false);
    }
  };

  const calculateSpeed = () => {
    if (distance !== null && maxTime > 0) {
      const speedMps = distance / maxTime;
      const speedKph = speedMps * 3.6;
      return { speedMps, speedKph };
    }
    return { speedMps: 0, speedKph: 0 };
  };

  const speed = calculateSpeed();

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
          Distance Tracker AI
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, marginTop: "10px", fontFamily: "Poppins, sans-serif" }}>
          AI-powered movement analysis & real-time distance tracking.
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
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#00e5ff", fontFamily: "Orbitron, sans-serif" }}>
                  Upload & Track Distance
                </Typography>
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

                {videoURL && (
                  <Box sx={{ marginTop: "10px", borderRadius: "10px", overflow: "hidden" }}>
                    <video key={videoURL} width="100%" height="auto" controls>
                      <source src={videoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}

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
              </CardContent>
            </Card>
          </Grid>

          {/* Result Section */}
          {distance !== null && (
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
                    📊 Tracking Results
                  </Typography>
                  <Box sx={{ marginTop: "15px", textAlign: "left" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                      📏 Total Distance Traveled:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFD700" }}>
                      {distance.toFixed(2)} meters ({(distance / 1000).toFixed(2)} km)
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", marginTop: "15px" }}>
                      🚀 Speed:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00e5ff" }}>
                      {speed.speedKph.toFixed(2)} km/hr
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
}

export default RealTimeAnalysis;
