/** @format */

import { Box, Button, Grid, Typography, styled, css } from "@mui/material";
import Img from "../assets/images/bg_3.jpg";
import React from "react";

const GridContainerBox = styled(Grid)(
  ({}) => css`
    background-image: url(${Img});
    background-attachment: fixed;
    position: scroll;
    top: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
  `
);

const TextContainer = styled(Box)(({ theme }) => ({
  // width: "80%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "120px 10px",
  backgroundColor: "rgba(0,0,0,0.2)",
}));

const Text = styled(Typography)(({ theme }) => ({
  marginBottom: "20px",
  fontSize: "36px",
  fontWeight: 600,
  color: "#fff",
  letterSpacing: 2.1,
  textAlign: "center",
  lineHeight: 1.3,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const Enhance = () => {
  return (
    <GridContainerBox>
      <TextContainer>
        <Text sx={{ maxWidth: 900 }} variant="h6">
          Enhance your child learning experience with us!
        </Text>
        <Typography
          sx={{
            color: "#ffffffcc",
            lineHeight: 1.5,
            mb: 5,
            maxWidth: 800,
            textAlign: "center",
          }}>
          We provide supportive and encouraging learning environment, and by
          working closely with your child's teachers and using technology to
          supplement learning, we can help to enhance your child's learning
          experience and support their academic success.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "#fda638",
            borderRadius: 20,
            "&:hover": {
              background: "#fda638",
            },
          }}>
          Contact Us
        </Button>
      </TextContainer>
    </GridContainerBox>
  );
};

export default Enhance;
