/** @format */

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SubHeader from "../SubHeader";
import { Box, Card, Container, Grid, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import themeData from "../../../data/themeData";

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  fontSize: "2rem",
}));

const AwardsDetails = () => {
  let { id } = useParams();
  console.log(id);

  const location = useLocation();
  const newAwards = location.state && location.state.awards;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(newAwards, "kkkkkkkkkkkkkkk");

  return (
    <>
      <SubHeader
        title="Awards And Achievements"
        leftSideHeader="Home"
        rightSideHeader=" Awards And Achievements"
      />
      <Container sx={{ marginTop: "25px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, sm: 2, md: 1 } }}>
            <Title variant="subtitle1">{newAwards.title}</Title>

            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "50px",
              }}>
              {newAwards.note}
            </Typography>
            <Box>
              <Typography variant="subtitle1">
                Hosted By:
                <Typography component="span" style={{ color: "black" }}>
                  {newAwards.hostedBy}
                </Typography>
              </Typography>
              <Typography variant="subtitle1">
                Date:{" "}
                <Typography component="span" style={{ color: "black" }}>
                  {dayjs(newAwards.date).format("MMM DD, YYYY")}
                </Typography>
              </Typography>
              <Typography variant="subtitle1">
                Location:{" "}
                <Typography component="span" style={{ color: "black" }}>
                  {" "}
                  {newAwards.location}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ order: { xs: 1, sm: 1, md: 2 } }}>
            <img
              src={newAwards.image ? newAwards.image : "awards.png"}
              alt="loading..."
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AwardsDetails;
