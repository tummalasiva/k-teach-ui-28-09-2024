import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  calculateSlidersData,
  imageCarousalSettings,
} from "../../../data/Carousal";
import {
  CardMedia,
  styled,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Slider from "react-slick";

const MuiTitle = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  fontWeight: "bold",
  fontSize: "18px",
}));

const MuiText = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
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
        {...imageCarousalSettings}
      >
        {galleryImg.images?.map((image, index) => (
          <CardMedia
            key={index + image}
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
  return (
    <>
      <AppSlider
        ref={sliderRef}
        lazyLoad="progressive"
        dots
        {...calculateSlidersData(galleryData?.length)}
      >
        {galleryData?.map((galleryImg, index) => (
          <>
            <Card
              key={galleryImg._id + index}
              sx={{ width: 345, height: 382, mb: 2 }}
            >
              <ImageSliders
                galleryImg={galleryImg}
                setModalOpen={setModalOpen}
              />
              <CardContent>
                <MuiTitle gutterBottom variant="h5" component="div">
                  {galleryImg.title}
                </MuiTitle>
                <MuiText variant="body2" color="text.secondary">
                  {galleryImg.note || "Added new images"}
                </MuiText>
              </CardContent>
            </Card>
          </>
        ))}
      </AppSlider>
    </>
  );
}

export default Gallery;
