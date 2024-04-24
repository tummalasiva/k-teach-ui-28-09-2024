import { Box, Container, Typography, styled } from "@mui/material";
import React from "react";
import image from "../../theme-one/assets/Images/HeaderImage.png";
import { Link } from "react-router-dom";
const OverViewTitleContainer = styled(Box)(({ theme }) => ({
  color: "white",
  padding: "80px",
  backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "15px",
  },
}));

const OverViewTitle = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  color: "#fff",
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "25px",
  },
}));
export default function SubHeader({
  title = "",
  leftSideHeader = "",
  rightSideHeader = "",
}) {
  return (
    <>
      <OverViewTitleContainer variant="h4" align="center">
        <OverViewTitle>{title.toUpperCase()}</OverViewTitle>
        <Typography sx={{ color: "white" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            {leftSideHeader.toUpperCase()}
          </Link>
          &nbsp; / {rightSideHeader.toUpperCase()}
        </Typography>
      </OverViewTitleContainer>
    </>
  );
}
