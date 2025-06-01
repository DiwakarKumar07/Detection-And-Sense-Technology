import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert("Password reset link sent to your email!");
    navigate("/");
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
          boxShadow: "0px 0px 20px rgba(255, 0, 255, 0.4)",
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
              textShadow: "0px 0px 10px magenta",
            }}
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body1"
            sx={{ opacity: 0.8, fontSize: "14px", marginBottom: "20px" }}
          >
            Enter your email and we'll send you a reset link.
          </Typography>

          <form onSubmit={handleReset}>
            {/* Email Input */}
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                sx: {
                  color: "magenta",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 10px rgba(255, 0, 255, 0.5)",
                  "& fieldset": { borderColor: "magenta" },
                  "&:hover fieldset": { borderColor: "magenta" },
                  "&.Mui-focused fieldset": { borderColor: "magenta" },
                },
              }}
              InputLabelProps={{ sx: { color: "white" } }}
            />

            {/* Reset Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                padding: "10px",
                background: "linear-gradient(90deg, #ff00ff, #ff1493)",
                color: "#000",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderRadius: "8px",
                boxShadow: "0px 0px 15px rgba(255, 0, 255, 0.6)",
                "&:hover": { background: "linear-gradient(90deg, #ff1493, #ff00ff)" },
              }}
            >
              Send Reset Link
            </Button>
          </form>

          {/* Login Link */}
          <Box sx={{ mt: 2, fontSize: "14px", color: "#bbb" }}>
            Remember your password?{" "}
            <a href="/" style={{ color: "#ff4fff", textDecoration: "none" }}>
              Login
            </a>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
