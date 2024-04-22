import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  createTheme,
  styled,
  Card,
} from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import themeData from "../../../data/themeData";
import Events from "./Events";

const theme = createTheme();
export const cards = [
  {
    id: 1,
    date: "23rd ",
    date1: "June ,2023",
    image:
      "https://shtheme.com/demosd/eduvisionwp/wp-content/uploads/2019/01/event_12.jpg",
    title: "SHOULD YOU GO TO MUSIC SCHOOL IN NEW YORK CITY?",
    time: "7:17 AM - 7:17 AM",
    content:
      "Aliquam et facilisis libero, quis dictum nulla. Nam eu rhoncus massa. Vivamus dapibus quam vel tellus egestas scelerisque. Phasellus id ipsum auctor ante volutpat consectetur. Cras malesuada metus a erat sagittis, vel posuere nisi imperdiet. Donec congue porta dui",
  },
  {
    id: 2,
    date: "24th",
    date1: "June ,2023",
    image:
      "https://shtheme.com/demosd/eduvisionwp/wp-content/uploads/2019/01/event_13.jpg",
    title: "HOW TO GET BETTER AT LEARNING",
    time: "8:17 AM - 8:17 AM",
    content:
      "Bimply dummy text of the printing and typesetting industry Aliquam et facilisis libero, quis dictum nulla. Nam eu rhoncus massa. Vivamus dapibus quam vel tellus egestas scelerisque. Phasellus id ipsum auctor ante volutpat consectetur. Cras malesuada metus a erat",
  },
  {
    id: 3,
    date: "25th",
    date1: "June ,2023",
    image:
      "https://shtheme.com/demosd/eduvisionwp/wp-content/uploads/2019/01/event_15.jpg",
    title: "TIPS FOR BEING BETTER MUSICIAN",
    time: "9:17 AM - 9:17 AM",
    content:
      "Aliquam et facilisis libero, quis dictum nulla. Nam eu rhoncus massa. Vivamus dapibus quam vel tellus egestas scelerisque. Phasellus id ipsum auctor ante volutpat consectetur. Cras malesuada metus a erat sagittis, vel posuere nisi imperdiet. Donec congue porta dui",
  },
  {
    id: 4,
    date: "26th",
    date1: "June ,2023",
    image:
      "https://shtheme.com/demosd/eduvisionwp/wp-content/uploads/2019/01/event_12.jpg",
    title: "HOW TO GET BETTER AT LEARNING",
    time: "10:17 AM - 10:17 AM",
    content:
      "Bimply dummy text of the printing and typesetting industry Aliquam et facilisis libero, quis dictum nulla. Nam eu rhoncus massa. Vivamus dapibus quam vel tellus egestas scelerisque. Phasellus id ipsum auctor ante volutpat consectetur. Cras malesuada metus a erat",
  },
  {
    id: 5,
    date: "27th",
    date1: "June ,2023",
    image:
      "https://shtheme.com/demosd/eduvisionwp/wp-content/uploads/2019/01/event_15.jpg",
    title: "TIPS FOR BEING BETTER MUSICIAN",
    time: "11:17 AM - 11:17 AM",
    content:
      "Aliquam et facilisis libero, quis dictum nulla. Nam eu rhoncus massa. Vivamus dapibus quam vel tellus egestas scelerisque. Phasellus id ipsum auctor ante volutpat consectetur. Cras malesuada metus a erat sagittis, vel posuere nisi imperdiet. Donec congue porta dui",
  },
];

const ViewAll = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  marginRight: "5%",
  [theme.breakpoints.down("md")]: {
    textAlign: "right",
    marginRight: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "5%",
    textAlign: "center",
  },
}));

const ViewLess = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  marginRight: "5%",
  [theme.breakpoints.down("md")]: {
    textAlign: "right",
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const TextBox1 = styled(Box)(({ theme }) => ({
  marginTop: "10%",
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ViewMore = styled(Button)(({ theme }) => ({
  fontSize: "10px",
  color: themeData.darkPalette.primary.main,
  border: "1px solid",
}));

const ViewLessEvents = styled(Button)(({ theme }) => ({
  fontSize: "10px",
  color: themeData.darkPalette.primary.main,
  border: "1px solid",
}));

const ViewAllButton = ({ handleClick }) => {
  return (
    <ViewAll item xs={12} md={12}>
      <ViewMore onClick={handleClick}>View All</ViewMore>
    </ViewAll>
  );
};

const ViewLessButton = ({ handleClick }) => {
  return (
    <ViewLess item xs={12}>
      <ViewLessEvents onClick={handleClick}>View Less</ViewLessEvents>
    </ViewLess>
  );
};

const OurEvents = () => {
  const [showAll, setShowAll] = useState(false);

  const handleViewAllClick = () => {
    setShowAll(true);
  };

  const handleViewLessClick = () => {
    setShowAll(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TextBox1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                color="black"
                sx={{ fontWeight: "bold", fontSize: "40px" }}
              >
                OUR{" "}
              </Typography>
            </Box>
            &nbsp;&nbsp;
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: themeData.darkPalette.primary.main,
                  fontWeight: "bold",
                  fontSize: "40px",
                }}
              >
                EVENTS
              </Typography>
            </Box>
          </Box>
        </TextBox1>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}
        >
          <Typography component="p">________</Typography>
          <FiberManualRecordIcon sx={{ fontSize: "8px", marginTop: "15px" }} />
          <FiberManualRecordIcon
            sx={{
              color: themeData.darkPalette.primary.main,
              fontSize: "10px",
              marginTop: "14px",
              marginLeft: "5px",
            }}
          />
          <FiberManualRecordIcon
            sx={{ fontSize: "8px", marginTop: "15px", marginLeft: "6px" }}
          />
          <Typography component="p">________</Typography>
        </Box>
        {cards.length >= 4 && !showAll && (
          <ViewAllButton handleClick={handleViewAllClick} />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          {cards.slice(0, showAll ? cards.length : 3).map((card, index) => (
            <React.Fragment key={index}>
              <Events card={card} />
            </React.Fragment>
          ))}
        </Box>
        {showAll && <ViewLessButton handleClick={handleViewLessClick} />}
      </ThemeProvider>
    </>
  );
};

export default OurEvents;
