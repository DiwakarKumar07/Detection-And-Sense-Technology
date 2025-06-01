import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("All fields are required.");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center  px-6">
        <Card 
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 4,
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)",
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom sx={{ color: "#00e5ff", fontWeight: "bold" }}>
              Contact Us
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>✅ Message sent successfully!</Alert>}
            <form onSubmit={handleSubmit}>
              {["name", "email", "message"].map((field, index) => (
                <TextField
                  key={index}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={formData[field]}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  margin="normal"
                  multiline={field === "message"}
                  rows={field === "message" ? 4 : 1}
                  sx={{
                    input: { color: "#00ffff", fontSize: "1rem", fontWeight: "bold" },
                    backgroundColor: "rgba(0, 255, 255, 0.1)",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                    "& label": { color: "#00e5ff" },
                    "& fieldset": { borderColor: "#00e5ff" },
                    "&:hover fieldset": { borderColor: "#00ffff" },
                    "&.Mui-focused fieldset": { borderColor: "#00e5ff", boxShadow: "0px 0px 15px cyan" },
                  }}
                />
              ))}
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#00e5ff",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#00bcd4" },
                }}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
