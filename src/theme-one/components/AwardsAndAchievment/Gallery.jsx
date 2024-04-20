import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";

const Gallery = ({ coursedata }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/courseDetails/${coursedata._id}`);
  };

  return (
    <Box>
      <Card
        sx={{
          maxWidth: 345,
          marginBottom: "50px",
          boxShadow: (theme) => theme.shadows[2],
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="260"
            image={coursedata.image ? coursedata.image.link : "awards.png"}
            alt="green iguana"
          />
          <CardContent sx={{ height: 100 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                color: "#F86F03",
                textAlign: "center",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {coursedata.title}
            </Typography>
            <Typography
              varient="body2"
              fontSize={16}
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {coursedata.note}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={handleNavigate} color="warning" size="small">
            View Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Gallery;
