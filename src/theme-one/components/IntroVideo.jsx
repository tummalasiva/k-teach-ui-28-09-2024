/** @format */

import React from "react";
import image from "../../theme-one/assets/Images/image1.png";

import { css } from "@mui/material";

import RegistrationForm from "./BirthdayEvents/RegistrationForm";
import { BsPlayFill } from "react-icons/bs";

import { AiOutlineClose } from "react-icons/ai";
import { Box, Container, Grid, Modal, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
}));

const BoxHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily: "serif",
  color: "#323232",
  maxWidth: "80%",
  margin: "0px 0px 25px",
  [theme.breakpoints.down(650)]: {
    width: "90%",
    fontSize: "2rem",
    margin: "0px 0px 20px",
  },
  [theme.breakpoints.down(460)]: {
    width: "90%",
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down(375)]: {
    width: "90%",
    fontSize: "1.2rem",
    margin: "0px 0px 10px",
  },
  [theme.breakpoints.down(260)]: {
    fontSize: "1rem",
    margin: "0px 0px 10px",
  },
}));

const BoxText = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  color: "#7A7A7A",
  textAlign: "center",
  margin: "1.5rem 1.2rem 2rem 1rem",
  [theme.breakpoints.down(410)]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down(375)]: {
    fontSize: "1rem",
    margin: "1rem 1rem 1rem 0.8rem",
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "1.4rem",
  fontFamily: "sans-serif",
  textAlign: "center",
  fontWeight: 500,
  padding: "20px 0px",
  cursor: "pointer",

  [theme.breakpoints.down(375)]: {
    fontSize: "1rem",
    padding: "15px 0px",
  },
}));

const OuterBox = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: "#068FFF",
  height: 100,
  width: 100,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  transition: "0.3s linear",
  alignItems: "center",
  "&:hover": { backgroundColor: "white" },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: "white",
  height: 60,
  width: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const WatchBox = styled(Box)(({ theme }) => ({
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  fontSize: "1.4rem",
  fontFamily: "serif",
  [theme.breakpoints.down(390)]: {
    fontSize: "1.1rem",
  },
}));

const Play = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.down(380)]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: "3rem",
  },
}));

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  position: "relative",
  p: 4,
};

const OuterContainer = styled(Box)(
  ({}) => css`
    background-image: url(${image});
    background-attachment: fixed;
    background-repeat: no-repeat;
    padding: 80px 30px;
    background-size: cover;
    background-position: center;
    position: relative;
  `
);

const IntroVideo = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {" "}
      <OuterContainer>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid
              spacing={4}
              container
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              <Grid item xs={12} lg={5} md={6} sm={12}>
                <ContentBox>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <BoxHeading variant="h4" pt={4}>
                      GET STARTED TODAY
                    </BoxHeading>
                  </Box>
                  <BoxText>
                    Join our inclusive and innovative community. Apply now for a
                    life-changing educational journey.
                  </BoxText>

                  <Box
                    sx={{
                      marginTop: "1.5rem",
                      backgroundColor: "#068FFF",
                      textAlign: "center",
                    }}>
                    <Link
                      to="/pre-admission"
                      style={{ textDecoration: "none" }}>
                      <FooterText>GET ADMISSION</FooterText>
                    </Link>
                  </Box>
                </ContentBox>
              </Grid>

              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styles}>
                  <AiOutlineClose
                    onClick={handleClose}
                    style={{
                      position: "absolute",
                      left: "100%",
                      cursor: "pointer",
                      top: "-3%",
                      zIndex: 10,
                      color: "white",
                      fontSize: "2rem",
                    }}
                  />
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "100%",
                    }}
                    src="https://www.youtube.com/embed/ZCKYz6cgiRs"
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </Box>
              </Modal>

              <Grid item xs={12} lg={4} md={6} sm={12}>
                <Play>
                  <OuterBox>
                    <InnerBox>
                      <Box component="div" onClick={handleOpen}>
                        <BsPlayFill
                          style={{
                            color: "#068FFF",
                            fontSize: "50px",
                            marginLeft: "6px",
                            margintop: "5px",
                          }}
                        />
                      </Box>
                    </InnerBox>
                  </OuterBox>

                  <WatchBox>Watch intro Video</WatchBox>
                </Play>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={3.3}>
            <RegistrationForm />
          </Grid>
        </Grid>
      </OuterContainer>
    </>
  );
};

export default IntroVideo;
