/** @format */

import React from "react";
import SubHeader from "../SubHeader";
import { useLocation, useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import themeData from "../../../data/themeData";
import moment from "moment";
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  fontSize: "20px",
}));

const Random = styled(Box)(({ theme }) => ({
  color: "black",

  [theme.breakpoints.down(900)]: {
    width: "100%",
  },
}));

export default function EventDetails() {
  const location = useLocation();
  const newEvents = location.state && location.state.events;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let onlyDay = newEvents.fromDate;
  let EndDay = newEvents.toDate;
  const date = moment(onlyDay);
  const End_Day = moment(EndDay);
  const specificMonth = date.format("Do, MMMM, YYYY");
  const specificMonthEnd = End_Day.format("Do, MMMM, YYYY");

  return (
    <>
      <SubHeader
        title="Events"
        leftSideHeader="Home"
        rightSideHeader="Events"
      />
      <Container sx={{ marginTop: "5px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={newEvents.image ? newEvents.image : "events.png"}
              alt="loading..."
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600}>
              {specificMonth} - {specificMonthEnd}
            </Typography>
            <Title>Event: {newEvents?.title}</Title>
            <Typography sx={{ color: "black" }}>
              {newEvents?.shortEvent}
            </Typography>
            <Typography
              sx={{
                color: "black",
              }}>
              Note:
              <Typography variant="span"> {newEvents?.shortEvent}</Typography>
            </Typography>
            <Random>
              <Typography variant="subtitle1">
                Event For:
                <b style={{ color: "black" }}> {newEvents?.eventFor}</b>
              </Typography>
              <Typography variant="subtitle1">
                Sponsor:
                <b style={{ color: "black" }}> {newEvents?.hostedBy}</b>
              </Typography>
              <Typography variant="subtitle1">
                Event Location:{" "}
                <b style={{ color: "black" }}> {newEvents?.location}</b>
              </Typography>
            </Random>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
