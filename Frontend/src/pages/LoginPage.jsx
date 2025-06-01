import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "12345"); // Mock authentication
    navigate("/home");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #0a0a0a, #1e1e1e)",
      }}
    >
      <Card
        sx={{
          padding: 4,
          width: 400,
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
              textShadow: "0px 0px 10px cyan",
            }}
          >
            Login to Your Account
          </Typography>

          {/* Username Input */}
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            InputProps={{
              sx: {
                color: "cyan",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                "& fieldset": { borderColor: "cyan" },
                "&:hover fieldset": { borderColor: "cyan" },
                "&.Mui-focused fieldset": { borderColor: "cyan" },
              },
            }}
            InputLabelProps={{ sx: { color: "white" } }}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            InputProps={{
              sx: {
                color: "cyan",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                "& fieldset": { borderColor: "cyan" },
                "&:hover fieldset": { borderColor: "cyan" },
                "&.Mui-focused fieldset": { borderColor: "cyan" },
              },
            }}
            InputLabelProps={{ sx: { color: "white" } }}
          />

          {/* Remember Me Checkbox */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <input id="remember" type="checkbox" className="mr-2" />
            <label htmlFor="remember" style={{ fontSize: "14px", color: "#bbb" }}>Remember me</label>
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: 2,
              padding: "10px",
              background: "linear-gradient(90deg, #00e5ff, #00bcd4)",
              color: "#000",
              fontWeight: "bold",
              textTransform: "uppercase",
              borderRadius: "8px",
              boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.6)",
              "&:hover": { background: "linear-gradient(90deg, #00bcd4, #00e5ff)" },
            }}
          >
            Login
          </Button>

          {/* Links Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, fontSize: "14px", color: "#bbb" }}>
            <a href="/create-account" style={{ color: "#42a5f5", textDecoration: "none" }}>
              <span className="text-white">New User?</span> Sign Up
            </a>
            <a href="/forgot-password" style={{ color: "#42a5f5", textDecoration: "none" }}>
              Forgot Password?
            </a>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
