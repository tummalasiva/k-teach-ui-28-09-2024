/** @format */

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  CardContent,
  Card,
  Paper,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { imageCarousalSettings } from "../../../../../theme-one/components/data/carousal.js";
import themeData from "../../../../../data/themeData.js";

const MuiTitle = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  fontWeight: 600,
  color: themeData.darkPalette.primary.main,
  fontSize: "18px",
}));

const MuiText = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
}));

const GallerySubHome = ({ data, setModalOpen }) => {
  let navigate = useNavigate();
  let handleClick = (data) => {
    navigate(data);
  };

  return (
    <>
      <Box>
        <Stack
          direction="row"
          sx={{
            zIndex: 50,
            position: "relative",
            bottom: "-20px",
            left: "10px",
            gap: "10px",
          }}>
          {data.role2 && (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleClick(data.path2)}
              sx={{
                bgcolor: "#1779f7",
                color: "white",
                border: "solid #1779f7",
                // bgcolor: "#f55214",
                "&:hover": {
                  color: "white",
                  bgcolor: "#ff4500",
                  border: "solid #ff4500",
                },
              }}>
              {data.role2}
            </Button>
          )}
        </Stack>
        <Card>
          <Slider
            lazyLoad="progressive"
            dots
            sx={{ backgroundColor: "black" }}
            {...imageCarousalSettings}>
            {data.images?.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt="loading..."
                height="260"
                onClick={() =>
                  setModalOpen({
                    open: true,
                    imageData: data.images,
                    viewSingleImg: image,
                  })
                }
              />
            ))}
          </Slider>

          <CardContent sx={{ mt: 1, height: "80px" }}>
            <MuiTitle gutterBottom variant="h5" component="div">
              {data.title}
            </MuiTitle>
            <MuiText variant="body2" color="text.secondary">
              {data.note || "Added new images"}
            </MuiText>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default GallerySubHome;
