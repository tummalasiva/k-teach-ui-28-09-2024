/** @format */

import React, { useEffect } from "react";
import { Box, Typography, styled, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import image from "../assets/images/computing.png";
import themeData from "../data/themeData";

const Container = styled(Box)(() => ({
  display: "flex",
  height: "80vh",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const BackButton = styled(Button)(() => ({
  backgroundColor: "#fff",
  color: themeData.darkPalette.primary.main,
  "&:hover": {
    backgroundColor: themeData.darkPalette.primary.main,
    color: "#fff",
  },
}));

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <img src={image} style={{ height: "300px", width: "300px" }} />

          <BackButton
            onClick={() => navigate(-1)}
            size="small"
            variant="outlined">
            Go Back
          </BackButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageNotFound;
