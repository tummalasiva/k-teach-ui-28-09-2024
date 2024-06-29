/** @format */

import React from "react";
import { Box, Grid, Typography, styled, css, keyframes } from "@mui/material";
import Balloon from "../../../theme-one/assets/Images/baloon.png.png";
import RedImg from "../../../theme-one/assets/Images/redImg.png.png";
import Image1 from "../../../theme-one/assets/Images/happBirthaday.jpg";
import Image2 from "../../../theme-one/assets/Images/happybirthday2.jpg";
import Image3 from "../../../theme-one/assets/Images/happyBirthday3.jpg";
import themeData from "../../../data/themeData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovingTextContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "400px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const moveTextAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(-100%);
  }
`;

const MovingTexts = styled(Box)(({}) => ({
  position: "absolute",
  bottom: 0,
  color: "white",
  top: 0,

  animation: css`
    ${moveTextAnimation} 15s linear infinite
  `,
  animationPlayState: "running",

  "&:hover": {
    animationPlayState: "paused",
  },
}));

const BirthdayBox = styled(Box)(({}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  marginBottom: "20px",
}));

const GridContainerBox = styled(Grid)(
  ({}) => css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://img.freepik.com/free-vector/gradient-abstract-geometric-background-with-triangles_52683-61899.jpg?size=626&ext=jpg&ga=GA1.1.1434379891.1671263694&semt=ais);
    background-attachment: fixed;
    background-repeat: no-repeat;
    padding: 0px;
    max-width: 100%;
    background-size: cover;
    background-color: #198eeb;
    background-position: center;
    position: relative;
  `
);

const SubHeader2 = styled(Typography)(({}) => ({
  fontSize: "16px",
  color: "#fff",
  marginTop: "10px",
  fontWeight: "bold",
}));

const LeftTitle = styled(Typography)(({}) => ({
  fontWeight: "bold",
  color: "white",
  textShadow: "3px 3px black",
}));
const RightTitle = styled(Typography)(({}) => ({
  fontWeight: "bold",
  color: themeData.darkPalette.primary.main,
}));

const SliderFrame = styled(Box)(({ theme }) => ({
  border: `5px solid ${theme.palette.primary.main}`,
  borderRadius: "12px",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "25px",
  overflow: "hidden",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderBottomWidth: "30px",
}));

const names = [
  {
    name: "Raju",
    class: "10",
    section: "A",
  },
  {
    name: "Monika",
    class: "10",
    section: "C",
  },
  {
    name: "Alia",
    class: "8",
    section: "A",
  },
  {
    name: "Raina",
    class: "9",
    section: "D",
  },
];

const images = [
  { src: Image1, alt: "Image 1" },
  { src: Image2, alt: "Image 2" },
  { src: Image3, alt: "Image 3" },
];

const BirthdayEvents = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <GridContainerBox>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "40px",
        }}>
        <Grid item xs={12} md={12}>
          {" "}
          <BirthdayBox>
            <LeftTitle
              variant="h4"
              sx={{ fontSize: { sm: "40px", xs: "30px" } }}>
              BIRTHDAY{" "}
            </LeftTitle>
            &nbsp;&nbsp;
            <RightTitle
              variant="h4"
              sx={{ fontSize: { sm: "40px", xs: "30px" } }}>
              Events{" "}
            </RightTitle>
            &nbsp;
            <img
              src={Balloon}
              style={{ height: "80px", width: "80px" }}
              alt="loading..."
            />
          </BirthdayBox>
        </Grid>

        <Grid item xs={12} sm={5} md={5} sx={{ paddingTop: "1rem" }}>
          <SliderFrame>
            <Slider {...sliderSettings}>
              {images.map((image, index) => (
                <Box key={index} sx={{ backgroundColor: "wheat" }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </SliderFrame>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: { xs: "10px" },
            }}>
            {" "}
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "25px",
                marginBottom: "10px",
                textAlign: "center",
                color: "white",
              }}>
              Happy Birthday
            </Typography>
            <img
              src={RedImg}
              style={{ height: "50px", width: "50px" }}
              alt="loading..."
            />
          </Box>
          {names.length ? (
            <MovingTextContainer>
              <MovingTexts>
                {names.map((data, i) => (
                  <React.Fragment key={i}>
                    <SubHeader2 variant="h6">
                      {data.name}- {data.class}({data.section})
                    </SubHeader2>
                  </React.Fragment>
                ))}
              </MovingTexts>
            </MovingTextContainer>
          ) : null}
        </Grid>
      </Grid>
    </GridContainerBox>
  );
};

export default BirthdayEvents;
