/** @format */

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubHeader from "../SubHeader";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import themeData from "../../../data/themeData";

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  fontSize: "20px",
}));

const AwardsDetails = ({ show }) => {
  const location = useLocation();
  const newAwards = location.state && location.state?.awards;
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(newAwards, "hhhhh");
  return (
    <>
      <SubHeader
        show={show}
        title="Awards And Achievements"
        leftSideHeader="Home"
        rightSideHeader=" Awards And Achievements"
      />
      <Paper sx={{ p: "15px", my: 2 }}>
        {/* <Container sx={{ marginTop: "5px" }}> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, sm: 2, md: 1 } }}>
            <img
              src={newAwards?.image ? newAwards?.image : "awards.png"}
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
            {newAwards?.date ? (
              <Typography
                variant="subtitle1"
                sx={{ color: "black", fontWeight: 600 }}>
                {dayjs(newAwards?.fromDate).format("MMM DD, YYYY")}
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{ color: "black", fontWeight: 600 }}>
                Event Date{" "}
                {`${dayjs(newAwards?.fromDate).format("DD MMM, YYYY")} -
                ${dayjs(newAwards?.toDate).format("DD MMM, YYYY")}`}
              </Typography>
            )}
            <Title variant="subtitle1">{newAwards?.title}</Title>
            <Typography variant="subtitle1">
              <b> Hosted By: </b>
              <span sx={{ color: "black" }}>{newAwards?.hostedBy}</span>
            </Typography>
            <Typography variant="subtitle1">
              <b> Location: </b>
              <span component="span" sx={{ color: "black" }}>
                {newAwards?.location}
              </span>
            </Typography>
            <Typography variant="subtitle1">{newAwards?.shortEvent}</Typography>
            <Typography variant="subtitle1" mt={1}>
              {newAwards?.note}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                onClick={() => navigate("/")}>
                Go Back
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Paper>
    </>
  );
};

export default AwardsDetails;
