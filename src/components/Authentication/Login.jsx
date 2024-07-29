/** @format */

import React, { useContext } from "react";
import {
  Button,
  Grid,
  styled,
  Checkbox,
  FormControlLabel,
  Typography,
  ButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  Person,
  Key,
  VisibilityOff,
  Visibility,
  ArrowBack,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import mobileImg from "../../assets/images/loginpage.png";
import desktopImg from "../../assets/images/loginimage.png";
import themeData from "../../data/themeData";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import { useTheme } from "@mui/material";
import avatar from "../../assets/images/ktechLogo.jpeg";
import { LoadingButton } from "@mui/lab";

import { useQuery, useMutation } from "@tanstack/react-query";
import { post } from "../../services/apiMethods";
import { PUBLIC_URLS } from "../../services/urlConstants";
import * as jwtdecode from "jwt-decode";
import UserTypeContext from "../../context/UserTypeContext";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${desktopImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "@media (max-width: 768px)": {
    // image for mobile view
    backgroundImage: `url(${mobileImg})`,
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({}));

const FormCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "5px",
}));

const BoarderBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: "20px",
  overflow: "hidden",
}));

const BackButtonContainer = styled(Box)(() => ({
  position: "absolute",
  height: 70,
  width: 70,
  top: 0,
  left: -75,
  zIndex: 10000,
  borderTopLeftRadius: 35,
  borderBottomLeftRadius: 35,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.2)",
  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10.8px)",
  WebkitBackdropFilter: "blur(10.8px)",
  border: "1px solid rgba(255,255,255,0.45)",
}));

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUserType } = useContext(UserTypeContext);
  const [selectedButton, setSelectedButton] = useState("employee");
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      userType: "employee",
      rememberMe,
    },

    onSubmit: (values) =>
      mutate({ ...values, userType: selectedButton, rememberMe: rememberMe }),
  });

  const handleSubmit = async (values) => {
    const { data } = await post(PUBLIC_URLS.account.login, values);
    return data;
  };

  const onLogin = (data) => {
    const { access_token, user } = data.result;
    let decodedToken = jwtdecode.jwtDecode(access_token);
    window.localStorage.setItem(
      process.env.REACT_APP_ACCESS_TOKEN,
      access_token
    );
    window.localStorage.setItem(
      process.env.REACT_APP_CURRENT_USER,
      JSON.stringify(user)
    );
    window.localStorage.setItem(
      process.env.REACT_APP_USER_TYPE,
      decodedToken.userType
    );
    setUserType(decodedToken.userType);
    navigate("/sch/dashboard");
  };

  const { mutate, isPending, data } = useMutation({
    mutationFn: (payload) => handleSubmit(payload),
    onSuccess: onLogin,
  });

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <OuterBox>
        <InnerBox>
          <FormCard
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              maxWidth: 370,
              width: "100%",
              borderRadius: "5px",
              position: "relative",
              backgroundColor: "rgba(255,255,255,0.2)",
              boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10.8px)",
              WebkitBackdropFilter: "blur(10.8px)",
              border: "1px solid rgba(255,255,255,0.45)",
            }}>
            {/* <BackButtonContainer>
              <IconButton onClick={() => navigate("/")}>
                <HomeIcon fontSize="medium" />
              </IconButton>
            </BackButtonContainer> */}

            <img
              src={avatar}
              height={"250px"}
              width={"100%"}
              style={{
                alignSelf: "center",
                resize: "contain",
                objectFit: "contain",
                marginBottom: "20px",
                backgroundColor: "white",
              }}
            />

            <Box sx={{ padding: "20px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {" "}
                  <FormInput
                    formik={formik}
                    required
                    name="username"
                    label="Username"
                    size="small"
                    InputProps={{
                      style: {
                        borderWidth: 1,
                        height: "42px",
                        borderRadius: 5,
                      },
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
                    required
                    formik={formik}
                    name="password"
                    label="Password"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      style: {
                        borderWidth: 1,
                        height: "42px",
                        borderRadius: 5,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton disabled edge="start">
                            <Key
                              sx={{
                                color: themeData.darkPalette.primary.main,
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" sx={{ pr: 1 }}>
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end">
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
                    label="Remember me"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} my={1}>
                  <LoadingButton
                    loading={isPending}
                    type="submit"
                    fullWidth
                    variant="contained">
                    Log In
                  </LoadingButton>
                </Grid>

                {/* Forgot password */}

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  textAlign="center"
                  mt={1}>
                  <Link to="/forgot-password">
                    <Typography
                      sx={{ color: themeData.darkPalette.secondary.main }}>
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormCard>
        </InnerBox>
      </OuterBox>
    </>
  );
};
export default Login;
