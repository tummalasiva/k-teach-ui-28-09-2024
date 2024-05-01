import React from "react";
import image from "../../theme-one/assets/Images/image1.png";

import {
  Box,
  Container,
  Grid,
  Modal,
  css,
  Typography,
  styled,
} from "@mui/material";

import RegistrationForm from "./BirthdayEvents/RegistrationForm";

// const OuterContainer = styled(Box)(({ theme }) => ({
//   backgroundImage: `url(${image})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundAttachment: "fixed",
//   height: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: "5rem",
// }));

const OuterContainer = styled(Grid)(
  ({}) => css`
    background-image: url(${image});
    background-attachment: fixed;
    background-repeat: no-repeat;
    padding: 80px 30px;
    max-width: 100%;
    background-size: cover;
    // background-color: #198eeb;
    background-position: center;
    position: relative;
  `
);

const IntroVideo = () => {
  return (
    <OuterContainer>
      {" "}
      <Grid
        spacing={2}
        container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: { sm: "40px", xs: "20px" },
        }}
      >
        <Grid item xs={12} md={6} lg={8}>
          <iframe
            style={{
              height: "53vh",
              width: "100%",
              borderRadius: "2px",
            }}
            src="https://www.youtube.com/embed/ZCKYz6cgiRs"
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Grid>

        <Grid item>
          <RegistrationForm />
        </Grid>
      </Grid>
    </OuterContainer>
  );
};

export default IntroVideo;
