import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const TrajectoryPrediction = () => {
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [trajectory, setTrajectory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setTrajectory([]);

    try {
      const response = await axios.post("http://127.0.0.1:5002/trajectory_prediction", formData);
      setTrajectory(response.data.trajectory);
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
            letterSpacing: "1px",
            textTransform: "uppercase",
            textShadow: "0px 0px 8px cyan",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          Trajectory Prediction AI
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, marginTop: "10px", fontFamily: "Poppins, sans-serif" }}>
          AI-powered motion tracking & future position prediction.
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Video Upload Section - Left Side */}
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
                  Upload Video for Analysis
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

          {/* Prediction Result - Right Side */}
          {trajectory.length > 0 && (
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
                    📊 Prediction Results
                  </Typography>
                  <Box sx={{ marginTop: "15px", textAlign: "left" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                      📍 Current Position:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FFD700" }}>
                      ({trajectory[0][0][0]}, {trajectory[0][0][1]})
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", marginTop: "15px" }}>
                      🚀 Predicted Next Position:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00e5ff" }}>
                      ({trajectory[0][1][0]}, {trajectory[0][1][1]})
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

export default TrajectoryPrediction;
