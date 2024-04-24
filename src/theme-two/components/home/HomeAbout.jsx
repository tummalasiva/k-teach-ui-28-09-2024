import React, { useContext } from "react";
import { Box, Button, styled, Grid, Typography } from "@mui/material";
import { keyframes, css } from "@emotion/react";
import SettingContext from "../../../context/SettingsContext";
import { Link } from "react-router-dom";
import themeData from "../../../data/themeData";

const slideIn = keyframes`
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(50%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(1000%);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const animatedImage = css`
  animation: ${slideIn} 3s forwards;
  opacity: 0;
`;

const animatedImage1 = css`
  animation: ${slideOut} 7s forwards;
`;
const animatedImage2 = css`
  animation: ${slideIn} 7s forwards;
  opacity: 0;
`;

const Bubble = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: "90%",
  transform: "translateX(100%)",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.secondary.main,
  animation: `${bubbleAnimation} 15s linear infinite`,
}));

const BubbleTop = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "10%",
  transform: "translateX(-100%)",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.secondary.main,
  animation: `${bubbleAnimation} 10s linear infinite`,
}));

const BubbleLeft = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "-20px",
  transform: "translateY(-150%)",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.primary.main,
  animation: `${bubbleAnimation} 25s linear infinite`,
}));

const BubbleRight = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "50px",
  transform: "translateY(-150%)",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.secondary.main,
  animation: `${bubbleAnimation} 15s linear infinite`,
}));

const BubbleBottom = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "76%",
  transform: "translateY(100%)",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.primary.main,
  animation: `${bubbleAnimation} 5s linear infinite`,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  padding: "20px 0",
  color: themeData.darkPalette.primary.main,
  lineHeight: "50px",
  fontFamily: "sans-serif",
  fontSize: "20px",
}));

const TitleHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "3rem",
}));

const TrustedBy = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.1)",
  height: "150px",
  width: "150px",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  zIndex: 1,
  position: "absolute",
  top: "-130px",
  left: "100px",
  [theme.breakpoints.down("md")]: {
    height: "130px",
    width: "130px",
    top: "-110px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "100px",
    width: "100px",
    top: "-70px",
    left: "60px",
  },
  [theme.breakpoints.between(280, 300)]: {
    height: "80px",
    width: "80px",
    top: "-70px",
    left: "50px",
  },
}));

const TrustedByContent = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  color: "#bababa",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.between(280, 300)]: {
    fontSize: "10px",
  },
}));

const TrustedByCount = styled(Typography)(({ theme }) => ({
  color: themeData.darkPalette.primary.main,
  fontSize: "35px",
  fontWeight: 700,
  [theme.breakpoints.down("sm")]: {
    fontSize: "25px",
  },
  [theme.breakpoints.between(280, 300)]: {
    fontSize: "18px",
  },
}));

const Bubble1 = styled(Box)(({ theme }) => ({
  height: "75px",
  width: "75px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.primary.main,
  zIndex: 1,
  position: "absolute",
  top: "-369px",
  [theme.breakpoints.between(900, 1100)]: {
    top: "-284px",
  },
  [theme.breakpoints.down("md")]: {
    top: "-284px",
  },
  [theme.breakpoints.down("sm")]: {
    top: "-184px",
    height: "60px",
    width: "60px",
  },
  [theme.breakpoints.between(280, 300)]: {
    top: "-250px",
    height: "50px",
    width: "50px",
  },
}));

const Bubble2 = styled(Box)(({ theme }) => ({
  height: "45px",
  width: "45px",
  borderRadius: "50%",
  backgroundColor: themeData.darkPalette.secondary.main,
  zIndex: 1,
  position: "absolute",
  top: "-336px",
  left: "455px",
  [theme.breakpoints.between(900, 1100)]: {
    top: "-261px",
    left: "355px",
  },
  [theme.breakpoints.down("md")]: {
    top: "-261px",
    left: "355px",
  },
  [theme.breakpoints.down("sm")]: {
    top: "-151px",
    left: "265px",
  },
  [theme.breakpoints.between(280, 300)]: {
    top: "-71px",
    left: "195px",
    height: "30px",
    width: "30px",
  },
}));

const ImageAnimation = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  ...animatedImage,
}));

const TrustedByAnimation = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  ...animatedImage1,
}));

const Bubble1Animation = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  ...animatedImage1,
}));
const Bubble2Animation = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  ...animatedImage2,
}));

const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: "73% 27% 22% 78% / 53% 78% 22% 47%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "450px",
  width: "500px",
  position: "relative",
  backgroundImage: "url(/studingimg.jpg)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.between(900, 1100)]: {
    height: "350px",
    width: "400px",
  },
  [theme.breakpoints.down("md")]: {
    height: "350px",
    width: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
    width: "300px",
  },
  [theme.breakpoints.between(280, 300)]: {
    height: "180px",
    width: "230px",
  },
}));

const ImageGrid = styled(Grid)(({ theme }) => ({
  padding: "50px",
  position: "relative",
  alignItems: "center",
  [theme.breakpoints.between(900, 1100)]: {
    height: "350px",
    width: "400px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "30px 0",
    marginLeft: "20%",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 0",
    marginLeft: "8%",
  },
}));

const ContentGrid = styled(Grid)(({ theme }) => ({
  padding: "50px",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
    // marginTop: "-20%",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 20px",
    // marginTop: "-30%",
  },
}));

export default function HomeAbout() {
  const { selectedSetting } = useContext(SettingContext);
  return (
    <>
      <Grid container justifyContent="center" mt={2}>
        <ImageGrid item xs={12} sm={12} md={7} lg={6}>
          <ImageAnimation>
            <ImageBox></ImageBox>
          </ImageAnimation>
          <TrustedByAnimation>
            <TrustedBy>
              <TrustedByContent variant="h6">Trusted by</TrustedByContent>
              <TrustedByCount variant="h4">75k+</TrustedByCount>
            </TrustedBy>
          </TrustedByAnimation>
          <Bubble1Animation>
            <Bubble1></Bubble1>
          </Bubble1Animation>
          <Bubble2Animation>
            <Bubble2></Bubble2>
          </Bubble2Animation>
        </ImageGrid>
        <ContentGrid item md={5} sm={12} xs={12} lg={6}>
          <Title variant="body" gutterBottom>
            JOIN US,
          </Title>
          <TitleHeader gutterBottom variant="h3">
            Advance your career
          </TitleHeader>
          <Typography
            variant="body1"
            color="#5f5f5f"
            fontSize="16px"
            lineHeight={"30px"}
            gutterBottom
          >
            Join us at Kayaka Foundation and become part of a community that
            cherishes its past, embraces the present, and embraces the future.
            Experience the transformative power of education.
          </Typography>
          <Typography gutterBottom>
            {/* <b>Call us</b> +91 98806 72662 */}
            <Typography
              variant="span"
              style={{
                fontWeight: 600,
                fontSize: "1.2rem",
              }}
            >
              Call Us:
            </Typography>
            <Typography
              variant="span"
              style={{
                fontSize: "18px",
                letterSpacing: "1.2px",
                color: themeData.darkPalette.primary.main,
              }}
            >
              +91 {selectedSetting.phone ? selectedSetting.phone : 9876543210}
            </Typography>
          </Typography>
          <Link to="/pre-admission" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                backgroundColor: themeData.darkPalette.primary.main,
                borderRadius: "5px",
                paddingTop: "10px",
                paddingBottom: "10px",
                textAlign: "center",
                width: "200px",
                height: "60px",
                fontWeight: "bold",
                alignSelf: "center",
                transition: "0.3s",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "none",
                  color: themeData.darkPalette.secondary.main,
                  border: `1px solid ${themeData.darkPalette.secondary.main}`,
                },
              }}
            >
              Get Admission
            </Button>
          </Link>
        </ContentGrid>
        <Bubble />
        <BubbleTop />
        <BubbleLeft />
        <BubbleRight />
        <BubbleBottom />
      </Grid>
    </>
  );
}
