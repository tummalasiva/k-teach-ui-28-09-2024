/** @format */

import React, { useEffect, useState } from "react";
import image1 from "../../assets/images/slidee1.jpg";
import image3 from "../../assets/images/slidee2.jpg";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MovingText from "react-moving-text";
import FacilitiesCard from "./FacilitiesCard";

const backgroundImages = [image3, image1];
const texts = [
  "Welcome to <br> Diamond View  <br> International School",
  "Perfect Learned <br> For Your Child",
];

const DotsContainer = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
}));

const Dot = styled(Paper, { shouldForwardProp: (prop) => prop !== "active" })(
  ({ theme, active }) => ({
    height: "12px",
    width: "12px",
    backgroundColor: active ? "#1eaaf1" : "#fff",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  })
);

const animationEffects = ["popIn", "fade-in", "fade-out"];

const getRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * animationEffects.length);
  return animationEffects[randomIndex];
};

const MovingTextContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "Work Sans, Arial, sans-serif",
  margin: "auto",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    top: "45%",
  },
  [theme.breakpoints.down("sm")]: {
    top: "40%",
  },
  [theme.breakpoints.between(911, 913)]: {
    top: "30%",
  },
  [theme.breakpoints.between(819, 821)]: {
    top: "30%",
  },
  [theme.breakpoints.between(767, 769)]: {
    top: "38%",
  },
  [theme.breakpoints.between(411, 415)]: {
    top: "35%",
  },
  [theme.breakpoints.between(392, 394)]: {
    top: "35%",
  },
  [theme.breakpoints.between(279, 281)]: {
    top: "40%",
  },
}));

const FirstMovingText = styled(MovingText)(({ theme }) => ({
  zIndex: 20,
  color: "white",
  fontSize: "60px",
  fontFamily: "Work Sans, Arial, sans-serif",
  fontWeight: 700,
  textAlign: "center",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "36px",
  },
  [theme.breakpoints.between(279, 281)]: {
    fontSize: "36px",
  },
}));

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationName, setAnimationName] = useState("");

  const changeSlide = (newIndex) => {
    setAnimationName(getRandomAnimation());
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    setAnimationName(getRandomAnimation());
    const timeout = setTimeout(() => {
      const newIndex = (activeIndex + 1) % backgroundImages.length;
      changeSlide(newIndex);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const handleDotClick = (index) => {
    changeSlide(index);
  };

  return (
    <>
      <Box
        sx={{
          height: "80vh",
          position: "relative",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            height: "75vh",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}>
          <img
            src={backgroundImages[activeIndex]}
            alt={`slideImage ${activeIndex}`}
            style={{
              width: "100%",
              height: "100vh",
              zIndex: -1,
              objectFit: "cover",
              transition: "opacity 0.8s ease-in-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(rgb(0 0 0 / 37%), rgb(0 0 0 / 30%))",
            }}
          />
        </Box>

        <MovingTextContainer>
          <>
            <FirstMovingText
              key={`text-1-${activeIndex}`}
              type="slideInFromTop"
              duration="3000ms"
              delay="1s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
              onAnimationEnd={() => {
                setAnimationName("");
              }}
              dangerouslySetInnerHTML={{ __html: texts[activeIndex] }}
            />
          </>

          <DotsContainer>
            {backgroundImages.map((_, index) => (
              <Dot
                key={index}
                active={index === activeIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotsContainer>
        </MovingTextContainer>
      </Box>

      <Box>
        <FacilitiesCard />
      </Box>
    </>
  );
};

export default Slider;
