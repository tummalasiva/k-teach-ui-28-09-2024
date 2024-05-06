import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import themeData from "../../../data/themeData";

const Title = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
  fontWeight: "bold",
  fontSize: "18px",
  fontFamily: "sans-serif",
  color: themeData.darkPalette.primary.main,
}));

const Note = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  fontFamily: "sans-serif",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
}));

const Awards = ({ awardsDetails }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/awardsDetails/${awardsDetails.id}`, {
      state: { awards: awardsDetails },
    });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          marginBottom: "50px",
          boxShadow: (theme) => theme.shadows[2],
        }}
        onClick={handleNavigate}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="260"
            image={awardsDetails.image}
            alt="green iguana"
          />
          <CardContent sx={{ mt: 1 }}>
            <Title gutterBottom variant="h5">
              {awardsDetails.title}
            </Title>
            <Note varient="body2" color="text.secondary">
              {awardsDetails.note}
            </Note>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={handleNavigate}
            sx={{ color: themeData.darkPalette.secondary.main }}
            size="small"
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Awards;
