/** @format */

import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CardMedia,
  styled,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Slider from "react-slick";
import themeData from "../../../../data/themeData";
import {
  calculateSlidersData,
  calculateSlidersSetting,
  imageCarousalSettings,
} from "../../../data/Carousal";
import { Link } from "react-router-dom";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MuiTitle = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  fontWeight: "bold",
  fontSize: "18px",
  fontFamily: "sans-serif",
  color: themeData.darkPalette.primary.main,
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
}));

const MuiText = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  fontFamily: "sans-serif",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
}));

const Random1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "20px",
  marginBottom: "15px",
  marginRight: "15px",
  ".MuiSvgIcon-root": {
    cursor: "pointer",
    border: `1px solid ${themeData.darkPalette.primary.main}`,
    transition: "background-color 0.3s",
  },

  ".MuiSvgIcon-root:hover": {
    background: themeData.darkPalette.primary.main,
    color: "#fff",
  },
}));

const AppSlider = styled(Slider)`
  // width: 100%;
  .slick-track {
    display: flex;
    //flex-shrink: 1;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    //margin-bottom: 1;
    outline: none;
  }
  .slick-list {
    overflow: hidden;
  }
`;

function ImageSliders({ galleryImg, setModalOpen }) {
  return (
    <>
      <AppSlider
        lazyLoad="progressive"
        dots
        sx={{ backgroundColor: "black" }}
        {...imageCarousalSettings}>
        {galleryImg.images?.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            image={image}
            alt="loading..."
            height="260"
            onClick={() =>
              setModalOpen({
                open: true,
                img: galleryImg.images,
                singleImg: image,
              })
            }
          />
        ))}
      </AppSlider>
    </>
  );
}

function Gallery({ galleryData = [], sliderRef, setModalOpen }) {
  const handleNextClick = () => {
    sliderRef.slickNext();
  };
  const handlePrevClick = () => {
    sliderRef.slickPrev();
  };

  return (
    <>
      {galleryData.length > 3 && (
        <Random1 style={{ borderColor: themeData.darkPalette.primary.main }}>
          <ChevronLeftIcon
            onClick={handlePrevClick}
            sx={{ color: themeData.darkPalette.primary.main }}
          />
          <ChevronRightIcon
            onClick={handleNextClick}
            sx={{ color: themeData.darkPalette.primary.main }}
          />
        </Random1>
      )}
      <AppSlider
        lazyLoad="progressive"
        dots
        {...calculateSlidersSetting(galleryData.length)}
        ref={(slider) => {
          sliderRef = slider;
        }}>
        {galleryData?.map((galleryImg, index) => (
          <>
            <Card
              key={galleryImg.id + index}
              sx={{ width: 320, height: 382, mb: 3 }}>
              <ImageSliders
                galleryImg={galleryImg}
                setModalOpen={setModalOpen}
              />
              <Link to="/home-gallery" style={{ textDecoration: "none" }}>
                <CardContent sx={{ mt: 1 }}>
                  <MuiTitle gutterBottom variant="h5">
                    {galleryImg.title}
                  </MuiTitle>
                  <MuiText variant="body2" color="text.secondary">
                    {galleryImg.note || "Added new images"}
                  </MuiText>
                </CardContent>
              </Link>
            </Card>
          </>
        ))}
      </AppSlider>
    </>
  );
}

export default Gallery;
