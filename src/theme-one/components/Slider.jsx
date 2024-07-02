/** @format */

import React, { useContext, useEffect, useState } from "react";
import image1 from "../../theme-one/assets/Images/school1.avif";
import image2 from "../../theme-one/assets/Images/school-white.avif";
import image3 from "../../theme-one/assets/Images/school-green.avif";
import image4 from "../../theme-one/assets/Images/school1.avif";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MovingText from "react-moving-text";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import useResizeObserver from "use-resize-observer";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import SettingContext from "../../context/SettingsContext";
import themeData from "../../data/themeData";

const backgroundImages = [image1, image2, image3, image4];

const animationEffects = [
  "slide-left",
  "slide-right",
  "zoom-in",
  "bounce-in",
  "box",
];

const getRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * animationEffects.length);
  return animationEffects[randomIndex];
};

const CarouselContainer = styled(Box)(({ theme }) => ({
  height: "75vh",
  width: "100%",
  position: "relative",
  overflow: "hidden",
}));

const DataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "75vh",
}));

const MovingTextContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "6%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const FirstMovingText = styled(MovingText)(({ theme }) => ({
  zIndex: 20,
  position: "relative",
  color: "white",
  backgroundColor: themeData.darkPalette.secondary.main,
  fontSize: "16px",
  fontWeight: "bold",
  display: "inline-block",

  borderRadius: "10px",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.between(279, 281)]: {
    fontSize: "12px",
  },
}));

const SecondMovingText = styled(MovingText)(({ theme }) => ({
  zIndex: 20,
  position: "relative",
  color: "white",
  fontSize: "60px",
  display: "inline-block",
  marginTop: "10px",
  fontFamily: "Roboto ,sans-serif",
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",

    paddingLeft: "60px",
  },
  [theme.breakpoints.between(279, 281)]: {
    fontSize: "16px",
  },
}));

const ThirdMovingText = styled(MovingText)(({ theme }) => ({
  zIndex: 20,
  position: "relative",
  color: "white",
  fontSize: "60px",
  fontFamily: "Roboto ,sans-serif",
  fontWeight: "bold",
  display: "inline-block",

  [theme.breakpoints.down("md")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    paddingLeft: "60px",
  },
  [theme.breakpoints.between(279, 281)]: {
    fontSize: "16px",
  },
}));

const Slider = ({}) => {
  const { selectedSetting } = useContext(SettingContext);
  const { ref, width, height } = useResizeObserver();
  const [activeIndex, setActiveIndex] = useState(1);
  const [renderText, setRenderText] = useState(true);
  const [animationName, setAnimationName] = useState("");

  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    setBannerImages(
      selectedSetting?.bannerImages?.length
        ? selectedSetting.bannerImages
        : backgroundImages
    );
  }, [selectedSetting]);

  const goToNextSlide = () => {
    setActiveIndex(
      activeIndex === backgroundImages.length - 1 ? 0 : activeIndex + 1
    );
    setRenderText(false);
    setAnimationName(getRandomAnimation());
  };

  useEffect(() => {
    setAnimationName(getRandomAnimation());
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 10000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    setRenderText(true);
  }, [activeIndex]);

  const properties = {
    prevArrow: (
      <IconButton sx={{ ml: 2, backgroundColor: "rgba(0,0,0,0.7)" }}>
        <KeyboardArrowLeftRoundedIcon color="primary" />
      </IconButton>
    ),
    nextArrow: (
      <IconButton sx={{ mr: 2, backgroundColor: "rgba(0,0,0,0.7)" }}>
        <KeyboardArrowRightRoundedIcon color="primary" />
      </IconButton>
    ),
    autoplay: true,
    loop: true,
    infinite: true,
  };

  return (
    <CarouselContainer sx={{ height: height || "75vh" }}>
      <Slide key={selectedSetting._id} {...properties} duration={2000}>
        {bannerImages?.map((slideimages, index) => (
          <Box key={slideimages} className="each-slide-effect">
            <DataContainer sx={{ height: height || "100%" }}>
              <img
                ref={ref}
                src={slideimages}
                style={{ objectFit: "cover", width: "100%", maxHeight: "75vh" }}
              />
            </DataContainer>
          </Box>
        ))}
      </Slide>

      <MovingTextContainer>
        {renderText && (
          <>
            <FirstMovingText
              key={`text-1-${activeIndex}`}
              type="fadeInFromBottom"
              duration="2000ms"
              delay="3s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none">
              <Typography
                sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}>
                {" "}
                The Goal of Education Is The Advancement of Knowledge
              </Typography>
            </FirstMovingText>
            <SecondMovingText
              key={`text-2-${activeIndex}`}
              type="fadeInFromBottom"
              duration="3000ms"
              delay="3s"
              direction="normal"
              timing="ease-in"
              iteration="1"
              fillMode="none">
              Take The First Step
            </SecondMovingText>
            <ThirdMovingText
              key={`text-3-${activeIndex}`}
              type="fadeInFromBottom"
              duration="4000ms"
              delay="3s"
              direction="normal"
              timing="ease-in"
              iteration="1"
              fillMode="none">
              To Knowledge with us
            </ThirdMovingText>
          </>
        )}
      </MovingTextContainer>
    </CarouselContainer>
  );
};

export default Slider;
