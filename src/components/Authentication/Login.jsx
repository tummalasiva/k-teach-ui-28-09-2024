import React from "react";
import {
  TextField,
  Button,
  Grid,
  styled,
  Checkbox,
  FormControlLabel,
  Typography,
  ButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Person, Key, VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import mobileImg from "../../assets/images/loginpage.png";
import desktopImg from "../../assets/images/loginimage.png";
import themeData from "../../data/themeData";
import { Link } from "react-router-dom";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";

import avatar from "../../assets/images/avatar.jpg";
import FormSelect from "../../forms/FormSelect";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${desktopImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",

  "@media (max-width: 768px)": {
    // image for mobile view
    backgroundImage: `url(${mobileImg})`,
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%,-50%)",
}));

const FormCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "10px",
  borderRadius: "5px",
}));

const BoarderBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: "20px",
  overflow: "hidden",
}));

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      user: "",
      school: "",
      rememberMe,
    },

    onSubmit: console.log("dfghj"),
  });
  const [selectedButton, setSelectedButton] = useState("Employee");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  return (
    <>
      <OuterBox>
        <InnerBox>
          <FormCard sx={{ maxWidth: 400, minWidth: 350 }}>
            <img
              src={avatar}
              height={"200px"}
              width={"200px"}
              style={{
                alignSelf: "center",
                resize: "contain",
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />

            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
                <ButtonGroup
                  fullWidth
                  variant="contained"
                  aria-label="Basic button group"
                  sx={{ borderRadius: "20px", overflow: "hidden" }}
                >
                  <Button
                    variant={
                      selectedButton === "Employee" ? "contained" : "outlined"
                    }
                    onClick={() => handleButtonClick("Employee")}
                  >
                    Employee
                  </Button>
                  <Button
                    variant={
                      selectedButton === "Student" ? "contained" : "outlined"
                    }
                    onClick={() => handleButtonClick("Student")}
                  >
                    Student
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} mt={1}>
                <FormSelect
                  formik={formik}
                  name="school"
                  label="Select School"
                  backgroundColor={themeData.darkPalette.primary.main}
                  borderRadius="20px"
                  showStartAdornment={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {" "}
                <FormInput
                  formik={formik}
                  name="username"
                  label="User Name"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <Person
                            sx={{
                              color: themeData.darkPalette.primary.main,
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} mt={0.5}>
                <FormInput
                  formik={formik}
                  name="password"
                  label="password"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton edge="start">
                          <Key
                            sx={{
                              color: themeData.darkPalette.secondary.main,
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton edge="end">
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "grey" }} />
                          ) : (
                            <Visibility sx={{ color: "grey" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} textAlign="left">
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  type="checkbox"
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                  sx={{ fontSize: "12px" }}
                  label="Remember Me"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button type="submit" fullWidth variant="contained">
                  Log In
                </Button>
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12} textAlign="center" mt={1}>
                <Link to="/forgot-password">
                  <Typography
                    sx={{ color: themeData.darkPalette.secondary.main }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </FormCard>
        </InnerBox>
      </OuterBox>
    </>
  );
};
export default Login;
