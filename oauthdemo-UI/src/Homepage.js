import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import "./Style.css";

// Styled container for the card content
const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  backgroundColor: "#f5f5f5",
});

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user details from localStorage or backend
  useEffect(() => {
    // Attempt to get user details from localStorage
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userProfilePicture = localStorage.getItem("userProfilePicture");

    if (userEmail && userName) {
      // If user info exists in localStorage, use that
      setUser({
        email: userEmail,
        name: userName,
        profilePicture: userProfilePicture,
      });
    } else {
      // If no user info in localStorage, fetch user details from backend
      fetch("/user", {
        method: "GET",
        credentials: "include", // Include credentials if needed (cookies/session)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Not authenticated");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data); // Set the authenticated user details
          // Optionally save the user details in localStorage for persistence
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userProfilePicture", data.picture); // Save profile picture URL
        })
        .catch((err) => {
          setError("Failed to fetch user details. Please log in again.");
          navigate("/"); // Redirect to login page if authentication fails or session expires
        });
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfilePicture");

    // Perform logout action on backend (Spring Security)
    fetch("/logout", {
      method: "POST",
    })
      .then(() => {
        navigate("/"); // Redirect to login page after logout
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
  };

  // If there is an error, show the error message
  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <StyledCard>
        <Avatar
          alt="Profile Picture"
          src={user?.profilePicture || "https://via.placeholder.com/150"} // Default if no picture
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Welcome, {user?.name || "User"}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Email:</strong> {user?.email || "Loading..."}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Logout
          </Button>
        </Box>
      </StyledCard>
    </Container>
  );
};

export default Homepage;
