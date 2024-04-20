import { Box, Button, Typography, styled } from "@mui/material";
import React, { useState } from "react";

const Wrapper = styled("Box")(() => ({
  position: "relative",

  width: "100%",
  backgroundColor: "#fff",

  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
}));

const Header = styled(Typography)(() => ({
  position: "relative",
  fontSize: "22px",
  fontWeight: 600,
  color: "#333",
}));

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <Header>Registration Form</Header>

      <form>
        <div className="input-box">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
          />
        </div>

        <Box className="policy">
          <input type="checkbox" />

          <Typography>I accept all terms & condition</Typography>
        </Box>

        <div className="input-box button">
          <Button type="submit">Register Now</Button>
        </div>

        <div className="text">
          <Typography>
            Already have an account? <a href="/login">Login now</a>
          </Typography>
        </div>
      </form>
    </Wrapper>
  );
}
