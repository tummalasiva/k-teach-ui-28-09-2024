/** @format */

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../SubHeader";
import {
  Box,
  Button,
  Container,
  Grid,
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

const News = () => {
  const location = useLocation();
  const news = location.state && location.state.data;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SubHeader
        title="News And Notice"
        leftSideHeader="Home"
        rightSideHeader="News And Notice"
      />
      <Container sx={{ marginTop: "5px" }}>
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
            <Typography sx={{ color: "black", fontWeight: 600 }}>
              {dayjs(news.date).format("MMM DD, YYYY")}
            </Typography>
            <Title variant="subtitle1">{news.title}</Title>
            <Typography variant="subtitle1">{news.shortNews}</Typography>
            <Typography variant="subtitle1">{news.news}</Typography>
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
};

export default News;
