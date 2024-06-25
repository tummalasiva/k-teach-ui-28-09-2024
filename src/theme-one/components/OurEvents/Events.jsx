/** @format */

import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CardMedia,
  styled,
  CardContent,
  CardActions,
  Container,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { grey, green, blue } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import themeData from "../../../data/themeData";
const Para = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "25px",
  color: grey[700],
  marginTop: "20px",

  [theme.breakpoints.down(900)]: {
    textAlign: "center",
    // margin: "5px 5px",
  },
  [theme.breakpoints.down(600)]: {
    padding: "0px 10px",
    textAlign: "center",
  },
  [theme.breakpoints.down(480)]: {
    padding: "0px 10px",
    textAlign: "center",
  },
}));

const TimeIcon = styled(AccessTimeIcon)(() => ({
  fontSize: "16px",
  marginTop: "4px",
  color: themeData.darkPalette.primary.main,
}));
const Times = styled(Box)(({ theme }) => ({
  display: "flex",
  alignSelf: "center",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));
const ReadButton = styled(Button)(() => ({
  fontWeight: "bold",
  fontSize: "12px",
  color: "black",
  "&:hover": {
    color: themeData.darkPalette.primary.main,
  },
}));

const Random = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));
const Date = styled(Typography)(() => ({
  fontSize: "15px",
  textAlign: "start",
  color: "#fff",
  marginTop: "10px",
  marginBottom: "35px",
}));

const Time = styled(Typography)(() => ({
  fontSize: "16px",
  color: "black",
}));

const Arc = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  textAlign: "left",
  clipPath: "circle(85.8% at 0% 0);",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: themeData.darkPalette.primary.main,
  zIndex: "2",
  padding: "20px 65px 35px 14px",
}));

const CardImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
}));

const Events = ({ card }) => {
  let onlyDay = card.fromDate;
  const date = moment(onlyDay);
  const specificDate = date.format("Do");
  const specificMonth = date.format("MMMM ,YYYY");
  const time = moment(card.fromDate);
  const specificTime = time.format("h:mm A");
  let navigate = useNavigate();

  let handleNavigate = () => {
    navigate(`/eventdetails/${card.id}`, { state: { events: card } });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}>
        <Grid item xs={12} md={5}>
          <CardImageWrapper>
            <Arc>
              <Typography
                variant="h4"
                sx={{
                  color: "#ffffff",
                  textAlign: "start",
                  fontSize: "25px",
                  lineHeight: "1",
                }}>
                {specificDate}
              </Typography>
              <Date> {specificMonth}</Date>
            </Arc>

            <CardMedia
              sx={{
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={handleNavigate}
              component="img"
              image={card.image}
              alt="Live from space album cover"
              height="350"
            />
          </CardImageWrapper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ paddingLeft: { lg: "15px", md: "15px" } }}>
            <Random>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "black",
                }}
                gutterBottom>
                {card.title}
              </Typography>
            </Random>
            <Times>
              <TimeIcon />
              <Time>{specificTime}</Time>
            </Times>

            <Para>{card?.shortEvent?.substring(0, 150) + "....."}</Para>
          </Box>
          <CardActions>
            <Random>
              <ReadButton onClick={handleNavigate}>
                Read More
                <ChevronRightIcon fontWeight={600}></ChevronRightIcon>
              </ReadButton>
            </Random>
          </CardActions>
        </Grid>
      </Grid>
    </>
  );
};

export default Events;
