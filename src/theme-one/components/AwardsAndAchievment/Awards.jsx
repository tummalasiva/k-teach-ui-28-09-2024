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
  fontWeight: 700,
  fontSize: "20px",
  color: themeData.darkPalette.primary.main,
  textAlign: "center",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1,
}));

const Note = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
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
    <Box>
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
          <CardContent sx={{ height: 100 }}>
            <Title variant="body2">{awardsDetails.title}</Title>
            <Note varient="body2" fontSize={16} color="text.secondary">
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
    </Box>
  );
};

export default Awards;
