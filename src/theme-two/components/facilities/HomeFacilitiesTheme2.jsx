import React, { useRef, useState } from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { BlogData } from "../../data/FacilityCardData";
// icons
import { LuArrowRightCircle } from "react-icons/lu";
import { LuArrowLeftCircle } from "react-icons/lu";
import { AppSlider } from "../../data/AppSlider";
import { cardSettings } from "../../data/Carousal";
import FacilitiesCardTheme2 from "./FacilitiesCardTheme2";
import themeData from "../../../data/themeData";

const MuiBox = styled(Typography)(({ theme }) => ({
  backgroundImage: `url(http://iguru.wgl-demo.net/wp-content/uploads/2019/09/home_03-bg.jpg?id=2599)`,
}));

const Browser = styled(Typography)(({ theme }) => ({
  color: themeData.darkPalette.primary.main,
  fontSize: "18px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  padding: "0.5rem",
  height: ".5rem",
  display: "flex",
  alignItems: "center",
  borderLeft: "3px solid #FFFFFF",
  [theme.breakpoints.down(350)]: {
    fontSize: "0.8rem",
  },
}));

const Trending = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "3rem",
  marginTop: "0.4rem",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  [theme.breakpoints.down(515)]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down(350)]: {
    fontSize: "1.3rem",
  },
}));

const CategoryBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export default function HomeFacilitiesTheme2() {
  let sliderRef = useRef(null);
  let [state, setstate] = useState(false);

  let handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  let handleNext = () => {
    sliderRef.current.slickNext();
  };

  let handleSlide = () => {
    setstate(!state);
  };

  return (
    <>
      <MuiBox
        component="div"
        sx={{
          padding: { xs: "80px 30px", lg: "80px 100px" },
        }}
      >
        <CategoryBox
          sx={{
            justifyContent: {
              xs: "center",
              sm: "center",
              sm: "flex-start",
              sm: "flex-start",
            },
            alignItems: {
              xs: "center",
              sm: "center",
              sm: "flex-start",
              sm: "flex-start",
            },
          }}
        >
          <Browser>BROWSE TOP</Browser>
          <Trending>Our Top Facilities</Trending>
        </CategoryBox>
        <Box
          sx={{
            marginTop: "3rem",
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={handleSlide}
          onMouseLeave={handleSlide}
        >
          <Grid container columnGap={3}>
            <AppSlider ref={sliderRef} {...cardSettings}>
              {BlogData.map((data, i) => (
                <Grid item key={i} lg={3} md={4} sm={12} xs={12}>
                  <FacilitiesCardTheme2
                    role={data.role}
                    color={data.color}
                    image={data.img}
                    courses={data.courses}
                    title={data.title}
                    path={data.path}
                  />
                </Grid>
              ))}
            </AppSlider>
            {state && (
              <Box
                component="div"
                sx={{
                  position: "absolute",
                  top: "45%",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  transition: "all .7s",
                  zIndex: 10,
                }}
              >
                <LuArrowLeftCircle
                  onClick={handlePrevious}
                  color="white"
                  fontSize={40}
                />
                <LuArrowRightCircle
                  onClick={handleNext}
                  color="white"
                  fontSize={40}
                />
              </Box>
            )}
          </Grid>
        </Box>
      </MuiBox>
    </>
  );
}
