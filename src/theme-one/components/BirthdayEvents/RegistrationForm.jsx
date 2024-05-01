import {
  Box,
  Button,
  TextField,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import themeData from "../../../data/themeData";

const Wrapper = styled(Box)(() => ({
  // position: "relative",
  maxWidth: "480px",

  width: "100%",
}));

const Header = styled(Typography)(() => ({
  position: "relative",
  fontSize: "22px",
  fontWeight: 600,
  color: "#333",
}));
const MuiButton = styled(Button)(() => ({
  marginTop: "25px",
  padding: "10px",
  backgroundColor: themeData.darkPalette.secondary.main,
  "&:hover": {
    backgroundColor: themeData.darkPalette.secondary.main,
  },
}));
const StyledTextField = styled(TextField)(() => ({
  marginBottom: "25px",
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
  },
}));

export default function RegistrationForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const theme = useTheme();

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
        sx={{
          backgroundColor: "#fff",
          borderRadius: theme.shape.borderRadius,
          padding: "34px",
        }}
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
          />

          <StyledTextField
            fullWidth
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <StyledTextField
            fullWidth
            variant="outlined"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
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

          <MuiButton fullWidth variant="contained" type="submit">
            Register Now
          </MuiButton>

          <Typography mt={2} textAlign="center">
            Already have an account? <a href="/login">Login now</a>
          </Typography>
        </form>
      </Box>
    </Wrapper>
  );
}
