import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {
    alert("Payment Successful!");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: 50 }} className="min-h-screen flex flex-col justify-center items-center text-white px-6">
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <PaymentIcon /> Secure Payment
            </Typography>
            <ToggleButtonGroup
              value={paymentMethod}
              exclusive
              onChange={(event, newMethod) => {
                if (newMethod !== null) {
                  setPaymentMethod(newMethod);
                }
              }}
              fullWidth
              style={{ marginBottom: 20 }}
            >
              <ToggleButton value="card">
                <CreditCardIcon /> Card
              </ToggleButton>
              <ToggleButton value="upi">
                <AccountBalanceWalletIcon /> UPI
              </ToggleButton>
              <ToggleButton value="googlePay">
                <GoogleIcon /> GPay
              </ToggleButton>
              <ToggleButton value="phonePe">
                <PhoneIphoneIcon /> PhonePe
              </ToggleButton>
              <ToggleButton value="banking">
                <AccountBalanceIcon /> Banking
              </ToggleButton>
            </ToggleButtonGroup>
            {paymentMethod === "card" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    variant="outlined"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date (MM/YY)"
                    variant="outlined"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    variant="outlined"
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cardholder Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
            {paymentMethod === "banking" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    variant="outlined"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    variant="outlined"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="IFSC Code"
                    variant="outlined"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
            {paymentMethod === "upi" && (
              <img alt="QR code for UPI payment method" class="mx-auto mt-4" height="200" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=your-upi-id@bank&pn=Your%20Name" width="200"/>
              // <img src="/images/upi-qr.png" alt="UPI QR Code" width="100%" style={{ marginTop: 20 }} />
            )}
            {paymentMethod === "googlePay" && (
              <img alt="QR code for Google Pay payment method" class="mx-auto mt-4" height="200" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=your-upi-id@okgoogle&pn=Your%20Name" width="200"/>
              // <img src="/images/googlepay-qr.png" alt="Google Pay QR Code" width="100%" style={{ marginTop: 20 }} />
            )}
            {paymentMethod === "phonePe" && (
              <img alt="QR code for PhonePe payment method" class="mx-auto mt-4" height="200" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=your-upi-id@ybl&pn=Your%20Name" width="200"/>
              // <img src="/images/phonepe-qr.png" alt="PhonePe QR Code" width="100%" style={{ marginTop: 20 }} />
            )}
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handlePayment}
                startIcon={<CreditCardIcon />}
              >
                Pay Now
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentForm;