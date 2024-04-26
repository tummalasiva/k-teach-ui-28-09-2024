import React from "react";
import {
  TextField,
  Button,
  Grid,
  styled,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Person, Key, VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import mobileImg from "../../assets/images/loginpage.png";
import desktopImg from "../../assets/images/loginimage.png";
import themeData from "../../data/themeData";
import { Link } from "react-router-dom";
import SchoolSelector from "../SchoolSelector";

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
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        username: formData.name,
        password: formData.password,
        rememberMe,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <OuterBox>
        <InnerBox>
          <FormCard sx={{ maxWidth: 400, minWidth: 350 }}>
            <img
              src={""}
              height={"200px"}
              width={"200px"}
              style={{
                alignSelf: "center",
                resize: "contain",
                objectFit: "contain",
              }}
            />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} mt={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <SchoolSelector />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <BoarderBox>
                    <TextField
                      size="small"
                      required={true}
                      name="userName"
                      placeholder="User Name"
                      fullWidth
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
                  </BoarderBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <BoarderBox>
                    <TextField
                      size="small"
                      placeholder="Password"
                      fullWidth
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
                      type={showPassword ? "text" : "password"}
                    />
                  </BoarderBox>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={3}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    type="checkbox"
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                    }}
                    sx={{ fontSize: "12px" }}
                    label="Remember Me"
                  />

                  <Link to="/forgot-password">
                    <Typography
                      sx={{ color: themeData.darkPalette.secondary.main }}
                    >
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Button type="submit" variant="contained">
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormCard>
        </InnerBox>
      </OuterBox>
    </>
  );
};
export default Login;
