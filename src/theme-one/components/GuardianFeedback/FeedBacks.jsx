import { Box, Card, CardMedia, CardContent, styled } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import avatar from "../../../theme-one/assets/Images/avatar.jpg";

import { FaQuoteLeft } from "react-icons/fa";
import themeData from "../../../data/themeData";

const cardStyle = {
  display: "flex",
  width: "100%",
  maxWidth: 500,
  minWidth: 300,
};

const FaqStyle = styled(FaQuoteLeft)(({ theme }) => ({
  fontSize: "100px",
  position: "absolute",
  top: "6%",
  left: "40%",
  color: "#5d50c6",
  opacity: 0.1,
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
  [theme.breakpoints.between(279, 281)]: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
}));

const Feedbacks = ({ feedback, parentName, studentName }) => {
  return (
    <Card elevation={0} sx={cardStyle}>
      <Box sx={{ display: { xs: "none", md: "block" }, mt: 2 }}>
        <FaqStyle />
        <CardMedia
          component="img"
          sx={{ width: 130 }}
          image={avatar}
          alt="Loading..."
        />
      </Box>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {studentName}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          fontSize="18px"
          lineHeight={1.6}
          fontWeight="500"
        >
          {feedback}
        </Typography>
        <Typography
          sx={{
            color: themeData.darkPalette.secondary.main,
            fontFamily: "Work Sans , Arial, sans-serif",
          }}
          mt={3}
        >
          Guardian
        </Typography>
        <Typography variant="body1" mt={1} mb={1}>
          {parentName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Feedbacks;
