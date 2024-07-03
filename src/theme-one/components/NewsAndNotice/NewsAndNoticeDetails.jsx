/** @format */

import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import themeData from "../../../data/themeData";
// icons
import EastIcon from "@mui/icons-material/East";

const moveRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(5px);
  }
`;

const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "max-content",
  fontSize: "18px",
  color: themeData.darkPalette.primary.main,
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

export default function NewsDetails({ news }) {
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/news-and-notice-details/${news._id}`, {
      state: { data: news },
    });
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Card sx={{ display: "flex", width: 600, my: 1, height: 170 }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={news?.image}
          alt="Live from space album cover"
        />
        <Box sx={{ m: 2 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: "#068FFF" }}>
            {dayjs(news?.date).format("DD, MMM, YYYY")}
          </Typography>
          <TypographyTitle>
            {capitalizeFirstLetter(news?.title)}
          </TypographyTitle>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
            }}
            paragraph
            fontSize={14}>
            {news?.news}
          </Typography>

          <Typography
            className="navigate"
            sx={{
              display: "flex",
              fontWeight: 600,
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
