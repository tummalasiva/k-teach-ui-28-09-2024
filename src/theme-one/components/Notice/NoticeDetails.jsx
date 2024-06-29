/** @format */

import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import EastIcon from "@mui/icons-material/East";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import themeData from "../../../data/themeData";

const MainGrid = styled(Grid)(({}) => ({
  display: "flex",
  cursor: "pointer",
  "&:hover .image": {
    border: `2px solid ${themeData.darkPalette.primary.main}`,
  },
}));

const ReadButton = styled(Button)(() => ({
  fontWeight: "bold",
  fontSize: "12px",
  cursor: "pointer",
  color: themeData.darkPalette.primary.main,
  "&:hover": {},
}));

const MuiSubtitle = styled(Typography)(({}) => ({
  display: "inline-flex",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "max-content",
  textTransform: "capitalize",
  color: "black",
  fontSize: "20px",
  "&:hover": { color: themeData.darkPalette.primary.main },
  [`&::after`]: {
    content: "''",
    width: "0%",
    height: "2px",
    backgroundColor: themeData.darkPalette.primary.main,
    display: "block",
    transition: "0.5s",
    fontWeight: 600,
    fontSize: "1rem",
    color: "red",
  },
  [`&:hover::after`]: {
    width: "100%",
  },
  [theme.breakpoints.down(500)]: {
    fontSize: "15px",
  },
}));

export default function NoticeDetails({ notice }) {
  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/notice-details/${notice._id}`, {
      state: { data: notice },
    });
  };

  return (
    <Container>
      <MainGrid
        container
        sx={{ display: "flex", padding: "10px" }}
        onClick={handleNavigate}>
        <Grid
          item
          md={2}
          xs={12}
          sm={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            className="image"
            src={notice?.image}
            width={160}
            height={100}
            style={{
              border: `1px solid ${themeData.darkPalette.primary.main}`,
            }}
            alt="image"
          />
        </Grid>
        <Grid
          item
          md={10}
          sm={10}
          xs={12}
          sx={{
            padding: "10px 10px",
            border: "1px solid #99999933",
            backgroundColor: "white",
          }}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: "#068FFF" }}>
            {dayjs(notice?.date).format("DD, MMM, YYYY")}
          </Typography>
          <TypographyTitle>{notice?.title}</TypographyTitle>
          <MuiSubtitle paragraph fontSize={14} variant="subtitle1">
            {notice?.notice}
          </MuiSubtitle>

          <ReadButton size="small" onClick={handleNavigate}>
            Read More <ChevronRightIcon fontSize="small" fontWeight={600} />
          </ReadButton>
        </Grid>
      </MainGrid>
    </Container>
  );
}
