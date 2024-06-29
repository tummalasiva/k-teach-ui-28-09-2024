/** @format */

import React, { forwardRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import Slider from "react-slick";
import {
  calculateSlidersData,
  imageCarousalSettings,
} from "../../../data/Carousal";

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
  .slick-track {
    display: flex;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    outline: none;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const ImageSliders = ({ galleryImg, setModalOpen }) => (
  <AppSlider
    lazyLoad="progressive"
    dots
    sx={{ backgroundColor: "black" }}
    {...imageCarousalSettings}>
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
);

const Gallery = forwardRef(({ galleryData = [], setModalOpen }, ref) => (
  <AppSlider
    ref={ref}
    lazyLoad="progressive"
    dots
    {...calculateSlidersData(galleryData?.length)}>
    {galleryData?.map((galleryImg, index) => (
      <Card
        key={index + galleryImg.title + galleryImg.note}
        sx={{ width: 345, height: 382, mb: 2 }}>
        <ImageSliders galleryImg={galleryImg} setModalOpen={setModalOpen} />
        <CardContent>
          <MuiTitle gutterBottom variant="h5" component="div">
            {galleryImg.title}
          </MuiTitle>
          <MuiText variant="body2" color="text.secondary">
            {galleryImg.note || "Added new images"}
          </MuiText>
        </CardContent>
      </Card>
    ))}
  </AppSlider>
));

export default Gallery;
