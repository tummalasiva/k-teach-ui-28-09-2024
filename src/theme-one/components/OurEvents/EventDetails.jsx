/** @format */

import React from "react";
import SubHeader from "../SubHeader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
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

const DetailItem = ({ label, value }) => (
  <Typography variant="subtitle1">
    <b>{label}:</b> <span style={{ color: "black" }}>{value}</span>
  </Typography>
);

export default function EventDetails() {
  const location = useLocation();
  const newEvents = location.state && location.state.events;
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let onlyDay = newEvents?.fromDate;
  let EndDay = newEvents?.toDate;
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
              src={newEvents?.image ? newEvents.image : "events.png"}
              alt="loading..."
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600}>
              {specificMonth} - {specificMonthEnd}
            </Typography>
            <Title>{newEvents?.title}</Title>
            <Typography sx={{ color: "black" }}>
              {newEvents?.shortEvent}
            </Typography>

            <Random>
              <DetailItem label="Event For" value={newEvents?.eventFor} />
              <DetailItem label="Sponsor" value={newEvents?.hostedBy} />
              <DetailItem label="Location" value={newEvents?.location} />
            </Random>
            <DetailItem label="Note" value={newEvents?.note} />
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
        {" "}
        <Button size="small" variant="outlined" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Box>
    </>
  );
}
