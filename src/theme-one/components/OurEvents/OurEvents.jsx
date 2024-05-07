import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  createTheme,
  styled,
  Container,
} from "@mui/material";
import Events from "./Events";
import Header from "../Header";
import themeData from "../../../data/themeData";

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

const View = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  paddingBottom: "10px",
}));

const ViewButton = styled(Button)(({ theme }) => ({
  fontSize: "10px",
  color: themeData.darkPalette.primary.main,
  border: "1px solid",
}));

const ViewAllButton = ({ handleClick }) => {
  return (
    <View item xs={12} md={12}>
      <ViewButton onClick={handleClick}>View All</ViewButton>
    </View>
  );
};

const ViewLessButton = ({ handleClick }) => {
  return (
    <View item xs={12}>
      <ViewButton onClick={handleClick}>View Less</ViewButton>
    </View>
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
    <Container maxWidth="xl">
      <Box pt={3}>
        {" "}
        <Header title1="Our" title2="Events" />
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
    </Container>
  );
};

export default OurEvents;
