/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import themeData from "../../../data/themeData";
import dayjs from "dayjs";
// icons
import EastIcon from "@mui/icons-material/East";

const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bolder",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "max-content",
  marginTop: "10px",
  fontSize: "18px",
  "&:hover": { color: "#f86f03" },

  [`&::after`]: {
    content: "''",
    width: "0%",
    height: "2px",
    backgroundColor: "red",
    display: "block",
    transition: "0.5s",
    fontWeight: "bold",
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
const MuiTypographyDate = styled(Typography)(() => ({
  fontWeight: "bold",
  fontSize: "22px",
}));

const moveRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(5px);
  }
`;

export default function NoticeDetailsTheme_two({ notice }) {
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/notice-details/${notice._id}`, {
      state: { data: notice },
    });
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // console.log(notice, "ellele");
  return (
    <>
      <Card
        sx={{
          display: "flex",

          maxWidth: 600,
          minWidth: 400,
          my: 1,
          height: 150,
        }}>
        <Box
          sx={{
            bgcolor: "#f57c00",
            color: "#fff",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <MuiTypographyDate variant="h3">
            {dayjs(notice?.date).format("DD")}
          </MuiTypographyDate>
          <MuiTypographyDate variant="h6" component="div">
            {dayjs(notice?.date).format("MMM")}
          </MuiTypographyDate>
        </Box>
        <Box
          sx={{
            padding: "16px",
          }}>
          <TypographyTitle variant="h6" component="div" color="#f57c00">
            {capitalizeFirstLetter(notice?.title)}
          </TypographyTitle>
          <Typography sx={{ display: "inline-flex" }} paragraph fontSize={14}>
            {notice.notice?.substring(0, 80)}...
          </Typography>
          <Typography
            className="navigate"
            sx={{
              display: "flex",
              fontWeight: "bold",
              alignItems: "center",
              fontSize: "14px",
              color: themeData.darkPalette.primary.main,
              cursor: "pointer",
            }}
            fontSize={14}
            onClick={handleNavigate}>
            Read More{" "}
            <EastIcon
              fontSize="small"
              fontWeight={600}
              sx={{
                transition: "transform 0.3s ease",
                animation: `${moveRight} 1s infinite`,
              }}
            />
          </Typography>
        </Box>
      </Card>
    </>
  );
}
