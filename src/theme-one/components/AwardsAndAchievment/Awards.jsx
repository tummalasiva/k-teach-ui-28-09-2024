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

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "20px",
  color: "#F86F03",
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

const Awards = ({ coursedata }) => {
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
            image={coursedata.image}
            alt="green iguana"
          />
          <CardContent sx={{ height: 100 }}>
            <Title variant="body2">{coursedata.title}</Title>
            <Note varient="body2" fontSize={16} color="text.secondary">
              {coursedata.note}
            </Note>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={handleNavigate}
            sx={{ color: "#1565c0" }}
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
