import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
// icons
import RocketIcon from "@mui/icons-material/Rocket";
import LanguageIcon from "@mui/icons-material/Language";
import themeData from "../../../data/themeData";
import FormInput from "../../../forms/FormInput";
import { useFormik } from "formik";

const RocketIconStyle = styled(RocketIcon)(({}) => ({
  color: themeData.darkPalette.secondary.main,
  fontSize: "60px",
  rotate: "-10deg",
  "&:hover": {
    color: themeData.darkPalette.primary.main,
    cursor: "pointer",
    transition: "1s",
  },
}));

const LanguageIconStyle = styled(LanguageIcon)(({}) => ({
  color: themeData.darkPalette.secondary.main,
  fontSize: "60px",
  rotate: "-10deg",

  "&:hover": {
    color: themeData.darkPalette.primary.main,
    cursor: "pointer",
    transition: "1s",
  },
}));

const SubBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // alignItems:"center",
  // textAlign:"center",
  justifyContent: "left",
  gap: "2%",
  height: "100%",
  marginTop: "20%",
  marginLeft: "5%",
  color: "white",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "5%",
  },
}));

const IconsBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const EnquiryBox = styled(Box)(({ theme }) => ({
  color: "white",
  //   backgroundColor: themeData.darkPalette.primary.main,
  backgroundColor: themeData.darkPalette.primary.main,
  paddingTop: "6%",
  paddingBottom: "6%",
  textAlign: "center",
  fontSize: "30px",
  borderRadius: "15px 15px 0px 0px",
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
  },
}));

const TextFieldStack = styled(Stack)(({ theme }) => ({
  backgroundColor: "#ffff",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "0px 0px 0.5rem 0.5rem",
}));

const TextFieldStyles = styled(TextField)(({ theme }) => ({
  //   border: "none",
  //   backgroundColor: "#F3F3F3",
  //   width: "90%",
  alignSelf: "center",
}));

const SendButton = styled(LoadingButton)(({ theme }) => ({
  transition: "0.3s",
  background: themeData.darkPalette.primary.main,
  "&:hover": {
    backgroundColor: "transparent",
    color: themeData.darkPalette.secondary.main,
    border: `1px solid ${themeData.darkPalette.secondary.main}`,
  },
}));

const AnchorBox = styled(Box)({
  width: "100px",

  [`&::after`]: {
    content: '""',
    width: "0%",
    height: "3px",
    backgroundColor: "white",
    display: "block",
    transition: "0.5s",
    fontWeight: "bold",
    fontSize: "1rem",
    color: "white",
  },
  [`&:hover::after`]: {
    width: "80%",
  },
});

const LoginBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 50,
  top: "-10%",
  paddingLeft: "10px",
  [theme.breakpoints.down("md")]: {
    top: 0,
    padding: "5px",
  },
}));

const RocketTopBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10,
  width: "100px",
  height: "100px",
  background: "#ffffff",
  rotate: "10deg",
  borderRadius: "52% 48% 48% 51% / 75% 79% 22% 23% ",
}));
const LanguageTopBox = styled(Box)(({ theme }) => ({
  display: "flex",
  rotate: "10deg",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10,
  width: "100px",
  height: "100px",
  background: "#ffffff",
  borderRadius: "52% 48% 48% 51% / 75% 79% 22% 23% ",
}));

export default function LearningInfo() {
  const { selectedSetting } = useContext(SettingContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  const entryFormik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: console.log("nnnn"),
  });

  const handleSubmit = async (e) => {};

  return (
    <>
      <Box sx={{ bgcolor: "#4ab1fb", height: "auto", padding: "10px 40px" }}>
        <Grid container rowGap={2}>
          <Grid item xs={12} sm={6} md={3.7}>
            <SubBox>
              <IconsBox>
                <RocketTopBox>
                  <RocketIconStyle />
                </RocketTopBox>
                <Box
                  sx={{
                    width: "100px",
                    rotate: "10deg",
                    height: "110px",
                    bgcolor: themeData.darkPalette.primary.main,
                    borderRadius: "49% 49% 51% 51% / 33% 30% 68% 66% ",
                  }}
                ></Box>
              </IconsBox>

              <Typography
                style={{
                  marginTop: "1rem",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                Learn Anything
              </Typography>

              <Typography sx={{ fontFamily: "sans-serif", color: "white" }}>
                Join millions of people from around the world <br /> learning
                together. Try it now!
              </Typography>
              <AnchorBox>
                <Link to="/pre-admission" style={{ textDecoration: "none" }}>
                  <Typography
                    fontWeight={600}
                    fontSize={16}
                    sx={{ color: "white" }}
                  >
                    Apply...
                  </Typography>
                </Link>
              </AnchorBox>
            </SubBox>
          </Grid>

          <Grid item xs={12} sm={6} md={3.7}>
            <SubBox>
              <IconsBox>
                <LanguageTopBox>
                  <LanguageIconStyle />
                </LanguageTopBox>
                <Box
                  sx={{
                    width: "100px",
                    rotate: "10deg",
                    height: "110px",
                    bgcolor: themeData.darkPalette.primary.main,
                    borderRadius: "49% 49% 51% 51% / 33% 30% 68% 66% ",
                  }}
                ></Box>
              </IconsBox>
              <Typography
                style={{
                  marginTop: "1rem",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                Learn Together
              </Typography>
              <Typography sx={{ fontFamily: "sans-serif", color: "white" }}>
                Join millions of people from around the world <br />
                learning together. Try it now!
              </Typography>
              <AnchorBox>
                <Link
                  to="/pre-admission"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography
                    fontWeight={600}
                    fontSize={16}
                    sx={{ color: "white" }}
                  >
                    Apply...
                  </Typography>
                </Link>
              </AnchorBox>
            </SubBox>
          </Grid>

          <Grid item xs={12} sm={6} md={4.2}>
            <LoginBox>
              <EnquiryBox variant="h4">
                <Box
                  component="span"
                  style={{
                    borderLeft: "3px solid #fff",
                    lineHeight: "1.25px",
                    fontFamily: "sans-serif",
                    paddingLeft: "15px",
                  }}
                >
                  Registration Form
                </Box>
              </EnquiryBox>
              <form onSubmit={handleSubmit}>
                <TextFieldStack spacing={3}>
                  <TextFieldStyles
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    variant="outlined"
                    required
                  />
                  <TextFieldStyles
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    variant="outlined"
                    required
                  />
                  <TextFieldStyles
                    fullWidth
                    id="outlined-basic"
                    label="Message"
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                    variant="outlined"
                  />
                  <SendButton
                    loading={loading}
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    Send
                  </SendButton>
                </TextFieldStack>
              </form>
            </LoginBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
