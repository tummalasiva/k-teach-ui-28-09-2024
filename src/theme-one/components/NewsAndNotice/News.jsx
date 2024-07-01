/** @format */

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../SubHeader";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import themeData from "../../../data/themeData";
//
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  fontSize: "20px",
}));

const News = ({ show }) => {
  const location = useLocation();
  const news = location.state && location.state.data;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SubHeader
        show={show}
        title="News And Notice"
        leftSideHeader="Home"
        rightSideHeader="News And Notice"
      />
      <Paper sx={{ marginTop: "5px", m: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, sm: 2, md: 1 } }}>
            <img
              src={news.image ? news.image : "awards.png"}
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
            <Title variant="h4" mb={1}>
              News:{" "}
            </Title>

            <Typography sx={{ color: "black", fontWeight: 600 }}>
              {dayjs(news.date).format("MMM DD, YYYY")}
            </Typography>
            <Title variant="subtitle1">{news.title}</Title>
            <Typography variant="subtitle1">{news.shortNews}</Typography>
            <Typography variant="subtitle1">{news.news}</Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate("/")}>
                Go Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default News;
