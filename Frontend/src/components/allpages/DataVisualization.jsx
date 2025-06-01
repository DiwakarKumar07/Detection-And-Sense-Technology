import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = () => {
  const [chartData, setChartData] = useState(null);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5002/data_visualization")
      .then((response) => {
        const data = response.data;
        setChartData({
          labels: data.categories,
          datasets: [
            {
              label: "Values",
              data: data.values,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              borderRadius: 8,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (chartData) {
      setChartData({
        labels: [...chartData.labels, category],
        datasets: [
          {
            ...chartData.datasets[0],
            data: [...chartData.datasets[0].data, parseInt(value)],
          },
        ],
      });
      setCategory("");
      setValue("");
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (chartData) {
      const index = chartData.labels.indexOf(deleteCategory);
      if (index > -1) {
        const newLabels = [...chartData.labels];
        newLabels.splice(index, 1);
        const newData = [...chartData.datasets[0].data];
        newData.splice(index, 1);
        setChartData({
          labels: newLabels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: newData,
            },
          ],
        });
        setDeleteCategory("");
      }
    }
  };

  if (!chartData) {
    return (
      <Typography variant="h6" align="center" color="textSecondary">
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ backgroundColor: "", minHeight: "100vh", paddingBottom: "50px", color: "#fff" }}>
      {/* AI-Themed Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e1e1e, #121212)",
          color: "white",
          textAlign: "center",
          padding: "40px 20px",
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
          DataChart AI
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, marginTop: "10px", fontFamily: "Poppins, sans-serif" }}>
          Interactive data visualization powered by AI.
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {/* Chart Section */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                padding: 4,
                boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.3)",
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                borderRadius: "15px",
                transition: "0.3s",
                "&:hover": { boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.5)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#00e5ff" }}>
                  Data Visualization
                </Typography>
                <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Input & Delete Section */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 4, background: "rgba(255, 255, 255, 0.1)", borderRadius: "15px" }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#FFD700" }}>
                  Manage Data
                </Typography>

                {/* Add Data */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  <TextField
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    sx={{
                      backgroundColor: "rgba(0, 255, 255, 0.1)",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                      input: { color: "#00ffff", fontSize: "1rem", fontWeight: "bold" },
                      "& label": { color: "#00e5ff" },
                    }}
                  />
                  <TextField
                    label="Value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth
                    sx={{
                      backgroundColor: "rgba(0, 255, 255, 0.1)",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                      input: { color: "#00ffff", fontSize: "1rem", fontWeight: "bold" },
                      "& label": { color: "#00e5ff" },
                    }}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Add Data
                  </Button>
                </form>

                {/* Delete Data */}
                <form onSubmit={handleDelete} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <TextField
                  label="Category to Delete"
                  value={deleteCategory}
                  onChange={(e) => setDeleteCategory(e.target.value)}
                  fullWidth
                  sx={{
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.7)",
                    input: { color: "#ff5555", fontSize: "1rem", fontWeight: "bold" },
                      "& label": { color: "#ff4444", fontWeight: "bold" },
                      "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ff4444" },
                      "&:hover fieldset": { borderColor: "#ff6666" },
                      "&.Mui-focused fieldset": { borderColor: "#ff8888", boxShadow: "0px 0px 12px rgba(255, 100, 100, 0.9)" },
                    },
                  }}
                />
                  <Button type="submit" variant="contained" color="secondary" >
                    Delete Data
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DataChart;
