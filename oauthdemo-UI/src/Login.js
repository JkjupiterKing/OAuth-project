import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import "./Style.css";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle email/password login
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    // Send email and password to your backend for validation
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/homepage");
        } else {
          setError(data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
      });
  };

  const handleGoogleLogin = (response) => {
    if (response.credential) {
      console.log("Google response credential:", response.credential); // Check the token

      // Decode the Google token to extract user information
      const decoded = jwtDecode(response.credential);
      console.log("Decoded Google response:", decoded);

      // Save the user's email, name, and profile picture URL in localStorage
      localStorage.setItem("userEmail", decoded.email);
      localStorage.setItem("userName", decoded.name);
      localStorage.setItem("userProfilePicture", decoded.picture); // Save profile picture

      // Navigate to homepage after successful login
      navigate("/homepage");
    } else {
      setError("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="497551526041-ja1nj18jmqgbb94tjmqpnlh66dr5facq.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography variant="h5">Login</Typography>

          {/* Email and Password Login Form */}
          <form
            onSubmit={handleEmailPasswordLogin}
            style={{ width: "100%", marginTop: 8 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
            >
              Login
            </Button>
          </form>

          {/* Google Login Button */}
          <div className="google-login-button" style={{ width: "100%" }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google login failed")}
            />
          </div>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Login;
