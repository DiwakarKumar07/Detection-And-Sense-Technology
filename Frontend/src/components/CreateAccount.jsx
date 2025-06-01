import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
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
            Create Your Account
          </Typography>

          <form onSubmit={handleRegister}>
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

            {/* Username Input */}
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
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

            {/* Register Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
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
              Register
            </Button>
          </form>

          {/* Login Link */}
          <Box sx={{ mt: 2, fontSize: "14px", color: "#bbb" }}>
            Already have an account?{" "}
            <a href="/" style={{ color: "#42a5f5", textDecoration: "none" }}>
              Login
            </a>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateAccount;
