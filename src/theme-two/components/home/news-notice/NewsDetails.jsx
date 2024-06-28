/** @format */

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainGrid = styled(Grid)(({}) => ({
  display: "flex",
  cursor: "pointer",
  "&:hover .image": {
    // border:"2px solid red",
    backgroundColor: "#f86f03",
  },
  "&:hover .navigate": {
    // border:"2px solid red",
    fontWeight: 600,
    color: "blue",
  },
}));

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

export default function NewsDetails({ elem }) {
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/details/${elem._id}`, { state: elem });
  };

  return (
    <>
      {/* <Container> */}
      {/* <MainGrid container sx={{ display: "flex" }}> */}
      {/* <Grid
            item
            md={2}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img
              className="image"
              src={elem?.image}
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "50%",
                border: "2px solid transparent",
              }}
              alt="image"
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <TypographyTitle className="title">{elem.title}</TypographyTitle>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ display: "inline-flex" }}
                paragraph
                fontSize={14}
                // variant="h6"
              >
                {elem.news.substring(0, 80)}...
              </Typography>

              <Typography
                className="navigate"
                sx={{
                  cursor: "pointer",
                  color: "orange",
                }}
                fontSize={14}
                onClick={handleNavigate}>
                Read More
              </Typography>
            </Box>
          </Grid> */}

      <Card sx={{ display: "flex", width: 600, my: 1, height: 180 }}>
        <CardMedia
          component="img"
          sx={{ width: 251 }}
          image={elem?.image}
          alt="Live from space album cover"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <TypographyTitle className="title">{elem.title}</TypographyTitle>
          </CardContent>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ display: "inline-flex" }}
              paragraph
              fontSize={14}
              // variant="h6"
            >
              {elem.news.substring(0, 80)}...
            </Typography>

            <Typography
              className="navigate"
              sx={{
                cursor: "pointer",
                color: "orange",
              }}
              fontSize={14}
              onClick={handleNavigate}>
              Read More
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* </MainGrid> */}
      {/* </Container> */}
    </>
  );
}
