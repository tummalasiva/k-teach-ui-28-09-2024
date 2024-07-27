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
import { imageCarousalSettings } from "../../../../data/Carousal";

const MuiTitle = styled(Typography)(() => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  fontWeight: 600,
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
            position: "relative",
            bottom: "-25px",
            left: "10px",
            gap: "10px",
            zIndex: 50,
          }}>
          {data.title && (
            <Paper
              variant="contained"
              size="small"
              onClick={() => handleClick(data.path1)}
              sx={{
                bgcolor: "#ff4500",
                color: "white",
                padding: "8px",
              }}>
              {data.title}
            </Paper>
          )}
          {data.role2 && (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleClick(data.path2)}
              sx={{
                bgcolor: "#1779f7",
                color: "white",
                border: "solid #1779f7",
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
        <Card
          sx={{
            width: "100%",
            maxWidth: 345,
          }}>
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

          <CardContent sx={{ mt: 1, height: "110px" }}>
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
