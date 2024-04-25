import React from "react";
import SubHeader from "../SubHeader";
import { useLocation, useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Title = styled(Box)(() => ({
  color: "#1976D2",
  fontSize: "2rem",
  fontWeight: 700,
}));

const Random = styled(Box)(({ theme }) => ({
  color: "gray",
  marginTop: "20px",
  // width: "40%",
  [theme.breakpoints.down(900)]: {
    width: "100%",
  },
}));

const Content = styled(Typography)(() => ({
  marginTop: "10px",
  color: "#2c2c2c",
  lineHeight: "30px",
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
export default function EventDetails() {
  let { id } = useParams();
  console.log(id);

  const location = useLocation();
  const newEvents = location.state && location.state.events;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SubHeader
        title="Events"
        leftSideHeader="Home"
        rightSideHeader="Events"
      />
      <Box m={4}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <CardImage
              component="img"
              image={newEvents?.image}
              alt="Live from space album cover"
              height="100%"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CardContent sx={{ marginLeft: "20px" }}>
              {/* <Typography variant="subtitle1" fontWeight={600}>
                {specificMonth} - {specificMonthEnd}
              </Typography> */}
              <Title>Event: {newEvents?.title}</Title>
              <Content>{newEvents?.shortEvent}</Content>
              <Typography
                sx={{
                  color: "#1976D2",
                  fontSize: "16px",
                  my: 2,
                }}
              >
                <b>Note:</b>
                <Typography variant="span"> {newEvents?.content}</Typography>
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
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
