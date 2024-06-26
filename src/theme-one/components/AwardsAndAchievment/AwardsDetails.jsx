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
}));

const AwardsDetails = () => {
  const location = useLocation();
  const newAwards = location.state && location.state.awards;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SubHeader
        title="Awards And Achievements"
        leftSideHeader="Home"
        rightSideHeader=" Awards And Achievements"
      />
      <Container sx={{ marginTop: "5px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, sm: 2, md: 1 } }}>
            <img
              src={newAwards.image ? newAwards.image : "awards.png"}
              alt="loading..."
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: 1, sm: 1, md: 2 },
            }}>
            <Title variant="subtitle1">{newAwards.title}</Title>

            <Typography variant="subtitle1">{newAwards.note}</Typography>
            <Box>
              <Typography variant="subtitle1">
                Hosted By:
                <Typography component="span" sx={{ color: "black" }}>
                  {newAwards.hostedBy}
                </Typography>
              </Typography>
              <Typography variant="subtitle1">
                Date:{" "}
                <Typography component="span" sx={{ color: "black" }}>
                  {dayjs(newAwards.date).format("MMM DD, YYYY")}
                </Typography>
              </Typography>
              <Typography variant="subtitle1">
                Location:{" "}
                <Typography component="span" sx={{ color: "black" }}>
                  {" "}
                  {newAwards.location}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AwardsDetails;
