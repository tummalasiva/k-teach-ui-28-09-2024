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
import NoticeDetailsTheme_two from "../../../theme-two/components/home/news-notice/NoticeDetailsTheme_two";
//
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  fontSize: "20px",
}));

const Notice = ({ show }) => {
  const location = useLocation();
  const notice = location.state && location.state.data;
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
        <Title variant="h4" mb={1}>
          Notice:{" "}
        </Title>

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: { xs: 1, sm: 1, md: 2 },
            }}>
            <Typography sx={{ color: "black", fontWeight: 600 }}>
              {dayjs(notice.date).format("MMM DD, YYYY")}
            </Typography>
            <Title variant="subtitle1">{notice.title}</Title>
            <Typography variant="subtitle1">{notice.notice}</Typography>
            <Typography variant="subtitle1">
              <b>Notice For: </b>
              <span component="span" sx={{ color: "black" }}>
                {notice.noticeFor}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
          <Button size="small" variant="outlined" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Notice;
