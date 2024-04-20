import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CardMedia,
  createTheme,
  styled,
  Card,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { grey, green, blue } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { useNavigate } from "react-router-dom";
import moment from "moment";

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

const Random = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));
const ReadButoon = styled(Button)(() => ({
  marginLeft: "-7px",
  fontWeight: "bold",
  fontSize: "10px",
  color: "black",
}));

const Times = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const Para = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  lineHeight: "25px",
  color: grey[700],
  marginTop: "20px",

  [theme.breakpoints.down(900)]: {
    textAlign: "center",
    margin: "5px 15px",
  },
  [theme.breakpoints.down(600)]: {
    padding: "0px 50px",
    textAlign: "center",
  },
  [theme.breakpoints.down(480)]: {
    padding: "0px 20px",
    textAlign: "center",
  },
}));

const TimeIcon = styled(AccessTimeIcon)(() => ({
  fontSize: "0.7rem",
  marginTop: "2px",
  color: "#f86f03",
}));

const Time = styled(Typography)(() => ({
  fontSize: "0.7rem",
}));

const Date = styled(Typography)(() => ({
  fontSize: "15px",
  textAlign: "right",
  marginBottom: "35px",
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

const CustomCard = styled(Card)(({ theme }) => ({
  width: "90%",
  height: 245,
  [theme.breakpoints.down(1200)]: {
    width: 400,
    height: 225,
  },
  [theme.breakpoints.down(900)]: {
    width: 400,
    height: 225,
  },
  [theme.breakpoints.down(400)]: {
    maxWidth: 400,
    height: 225,
  },
}));

const OurEvent = () => {
  return (
    <>
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
              color="#f86f03"
              sx={{ fontWeight: "bold", fontSize: "40px" }}
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
            color: "#F86F03",
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
    </>
  );
};

const CardItem = ({ card }) => {
  let navigate = useNavigate();

  let onlyDay = card.fromDate;

  const date = moment(onlyDay);
  const specificDate = date.format("Do");

  const specificMonth = date.format("MMMM ,YYYY");

  const time = moment(card.fromDate);
  const specificTime = time.format("h:mm A");

  let handleNavigate = () => {
    navigate(`/eventdetails/${card._id}`, { state: card });
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={3} justifyContent="center">
        <Random sx={{ marginRight: "30px" }}>
          <Typography mt={7} variant="h4" textAlign="right">
            {specificDate}
          </Typography>
          <Date> {specificMonth}</Date>
        </Random>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={5}
        sx={{
          marginY: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomCard onClick={handleNavigate}>
          <CardMedia component="img" image={cards.image} height="297" />
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3}>
        <Random>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mt: { lg: 5, md: 2, xs: 1 },
              fontSize: "25px",
            }}
            gutterBottom
          >
            {cards.title}
          </Typography>
        </Random>
        <Times>
          <TimeIcon />
          <Time>{specificTime}</Time>
        </Times>

        <Para>{card.shortEvent.substring(0, 150) + "....."}</Para>
        <Random>
          <ReadButoon onClick={handleNavigate}>
            Read More
            <ChevronRightIcon fontWeight={600}></ChevronRightIcon>
          </ReadButoon>
        </Random>
      </Grid>
    </Grid>
  );
};

const ViewAllButton = ({ handleClick }) => {
  return (
    <ViewAll item xs={12} md={12}>
      <Button
        onClick={handleClick}
        sx={{ fontSize: "10px", color: "#F86F03", border: "1px solid" }}
      >
        View All
      </Button>
    </ViewAll>
  );
};

const ViewLessButton = ({ handleClick }) => {
  return (
    <ViewLess item xs={12}>
      <Button
        onClick={handleClick}
        sx={{ fontSize: "10px", color: "#F86F03", border: "1px solid" }}
      >
        View Less
      </Button>
    </ViewLess>
  );
};

const OurEvents = () => {
  const [showAll, setShowAll] = useState(false);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);

  const handleViewAllClick = () => {
    setShowAll(true);
  };

  const handleViewLessClick = () => {
    setShowAll(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <OurEvent />
        {events.length >= 4 && !showAll && (
          <ViewAllButton handleClick={handleViewAllClick} />
        )}

        {events.slice(0, showAll ? events.length : 3).map((card, index) => (
          <React.Fragment key={index}>
            <CardItem card={card} />
          </React.Fragment>
        ))}
        {showAll && <ViewLessButton handleClick={handleViewLessClick} />}
      </ThemeProvider>
    </>
  );
};

export default OurEvents;
