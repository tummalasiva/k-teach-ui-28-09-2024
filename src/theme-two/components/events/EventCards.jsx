/** @format */

import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  styled,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import themeData from "../../../data/themeData";

const Title = styled(Box)(() => ({
  color: themeData.darkPalette.primary.main,
  fontSize: "25px",
  fontWeight: "bold",
  display: "-webkit-box",
  overflow: "hidden",
  fontFamily: "Roboto ,sans-serif",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  "&:hover": {
    cursor: "pointer",
    color: themeData.darkPalette.secondary.main,
  },
}));

const Content = styled(Typography)(() => ({
  fontSize: "16px",
  fontFamily: "Muli",
  height: "50px",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  fontFamily: "Roboto,sans-serif",
  WebkitLineClamp: 2,
  color: "grey",
}));

const AnchorBox = styled(Box)({
  color: themeData.darkPalette.secondary.main,
  fontFamily: "Roboto,sans-serif",
  "&::after": {
    content: '""',
    height: "3px",
    backgroundColor: themeData.darkPalette.secondary.main,
    display: "block",
    fontSize: "1rem",
    transform: "scale(0,1)",
    transition: "transform 0.35s ease",
  },

  "&:hover::after": {
    width: "100%",
    backgroundColor: themeData.darkPalette.primary.main,
    transform: "scale(1,1)",
  },
});

const CardImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
}));

const MuiBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 0,
  clipPath: "circle(85.8% at 100% 0);",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-end",
  backgroundColor: "#00BDA6",
  zIndex: "2",
  padding: "20px 14px 35px 65px",
  color: "#fff",
}));

const ImageScale = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  "&:hover .MuiCardMedia-root": {
    transform: "scale(1.1)",
    transition: "transform 0.3s ease-in-out",
  },
}));

export default function EventCards({
  elem = [],
  hideContent = false,
  view = "",
}) {
  const navigate = useNavigate();
  let onlyDay = elem.fromDate;
  const date = moment(onlyDay);

  const specificDate = date.format("Do");
  const specificMonth = date.format("MMM ,YYYY");
  const time = moment(elem.fromDate);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowFull(currentPath);
  }, []);

  const handleReadMoreClick = () => {
    navigate(`/award-details/${elem?._id}`, { state: { awards: elem } });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 335,
          alignSelf: "center",
          margin: { xs: "5px", sm: "10px", md: "20px" },
        }}>
        <CardImageWrapper>
          {!hideContent && (
            <MuiBox>
              <Typography fontSize="35px" fontWeight={600} color="#fff">
                {specificDate}
              </Typography>
              <Typography fontSize="14px" mt={1} color="#fff">
                {specificMonth}
              </Typography>
            </MuiBox>
          )}

          <ImageScale>
            <CardMedia
              component="img"
              image={
                elem?.image
                  ? elem?.image
                  : "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="loading..."
              // width="365"
              height="297"
            />
          </ImageScale>
        </CardImageWrapper>
        <CardContent>
          <Title onClick={handleReadMoreClick}>{elem.title}</Title>
          <Content>{elem.note}</Content>
          {/* <Content>{showFull ? elem.shortEvent : elem.shortEvent}hhsjhsj</Content> */}
        </CardContent>

        <CardActions>
          <AnchorBox
            sx={{
              p: 1,
              cursor: "pointer",
              "&:hover": {
                color: themeData.darkPalette.primary.main,
              },
            }}
            onClick={handleReadMoreClick}>
            {!showFull ? `${view} Less` : `${view} More`}
          </AnchorBox>
        </CardActions>
      </Card>
    </>
  );
}
