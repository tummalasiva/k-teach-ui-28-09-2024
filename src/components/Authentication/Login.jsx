import React from "react";
import { TextField, Button, Grid, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { Person, Key, VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import SettingContext from "../../context/SettingsContext";

// import image from "../../assets/images/loginimage.png";
import { useFormik } from "formik";
import FormInput from "../../forms/FormInput";
const MuiBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  //   backgroundImage: `url(${image})`,
}));

const style = {
  maxWidth: 350,
  height: "auto",
  p: 2,
  borderRadius: "20px",
  boxSizing: " borderBox",
  placeContent: "center",
  marginTop: "30px",
};

const Login = () => {
  const { selectedSetting } = useContext(SettingContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        username: name,
        password: password,
        rememberMe,
      };
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const entryFormik = useFormik({
    initialValues: {
      userName: "",
      fassword: "",
      rememberMe,
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <MuiBox>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={selectedSetting.logo?.link}
            height={"200px"}
            width={"200px"}
            style={{
              alignSelf: "center",
              resize: "contain",
              marginTop: "50px",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={style}>
            <Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                      className="forms"
                    >
                      <FormInput
                        formik={entryFormik}
                        size="small"
                        required={true}
                        name="userName"
                        placeholder="User Name"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton edge="start">
                                <Person sx={{ color: "#ef6c00" }} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                      className="forms"
                    >
                      <TextField
                        size="small"
                        placeholder="Password"
                        fullWidth
                        // type={password.showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                          ".css-8j6b76-MuiInputBase-root-MuiOutlinedInput-root":
                            {
                              color: "black",
                              borderRadius: "20px",
                            },
                        }}
                        className="box"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton edge="start">
                                <Key sx={{ color: "#1976d2" }} />
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    display="flex"
                    justifyContent="center"
                    sx={{
                      color: "#ffff",
                      fontSize: "20px",
                      fontWeight: "bold",
                      gap: 3,
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setRememberMe(e.target.checked);
                        }}
                      />
                      <span
                        className="rememberStyle"
                        style={{ color: "black" }}
                      >
                        Remember me
                      </span>
                    </label>
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
                      Log
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      </MuiBox>
    </>
  );
};
export default Login;
