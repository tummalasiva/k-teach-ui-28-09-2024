/** @format */

import React from "react";
import image from "../../theme-one/assets/Images/image1.png";

import { Box, Grid, css, styled } from "@mui/material";

import RegistrationForm from "./BirthdayEvents/RegistrationForm";

const OuterContainer = styled(Box)(
  ({}) => css`
    background-image: url(${image});
    background-attachment: fixed;
    background-repeat: no-repeat;
    padding: 80px 30px;
    max-width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
  `
);

const IntroVideo = () => {
  return (
    <OuterContainer>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
        }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}>
          <iframe
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "5px",
              overflow: "hidden",
            }}
            src="https://www.youtube.com/embed/ZCKYz6cgiRs"
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}>
          <RegistrationForm />
        </Grid>
      </Grid>
    </OuterContainer>
  );
};

export default IntroVideo;
