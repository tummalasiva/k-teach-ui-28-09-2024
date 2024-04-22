import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";

const Wrapper = styled(Box)(() => ({
  position: "relative",
  maxWidth: "480px",

  width: "100%",
}));

const Header = styled(Typography)(() => ({
  position: "relative",
  fontSize: "22px",
  fontWeight: 600,
  color: "#333",
}));
const StyledTextField = styled(TextField)({
  // boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
  },
});

export default function RegistrationForm() {
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rememberMe,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <Box
        sx={{ backgroundColor: "#fff", borderRadius: "6px", padding: "34px" }}
      >
        <Header textAlign="start" mb={4}>
          Registration Form
        </Header>

        <form>
          <StyledTextField
            variant="outlined"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            sx={{ marginBottom: 3 }}
          />

          <StyledTextField
            fullWidth
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            sx={{ marginBottom: 3 }}
          />

          <StyledTextField
            fullWidth
            variant="outlined"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            sx={{ marginBottom: 1 }}
          />

          <FormControlLabel
            control={<Checkbox size="small" />}
            type="checkbox"
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
            sx={{ fontSize: "12px" }}
            label="I accept all terms & condition"
          />

          <Button
            fullWidth
            sx={{ marginTop: 4, padding: 1.5, backgroundColor: "#1565c0" }}
            variant="contained"
            type="submit"
          >
            Register Now
          </Button>

          <Typography mt={2} textAlign="center">
            Already have an account? <a href="/login">Login now</a>
          </Typography>
        </form>
      </Box>
    </Wrapper>
  );
}
