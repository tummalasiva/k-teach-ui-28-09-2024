import React, { useContext } from "react";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import style from "../layout/style.css";
import SettingContext from "../../context/SettingsContext";
// icons
import { BiLogoLinkedin } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";
import { GrGooglePlus } from "react-icons/gr";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import themeData from "../../data/themeData";

const MuiFacebookIcon = styled(FacebookIcon)(({ theme }) => ({
  color: "#fff",
  transition: "1s",
  "&:hover": {
    color: "#1877F2", // Facebook Blue
  },
}));

const MuiYouTubeIcon = styled(BsYoutube)(({ theme }) => ({
  color: "#fff",
  transition: "1s",
  "&:hover": {
    color: "#FF0000", // YouTube Red
  },
}));

const MuiBiLogoLinkedin = styled(BiLogoLinkedin)(({ theme }) => ({
  color: "#fff",
  transition: "1s",
  "&:hover": {
    color: "#0077B5",
  },
}));

const MuiGrGooglePlus = styled(GrGooglePlus)(({ theme }) => ({
  color: "#fff",
  transition: "1s",
  "&:hover": {
    color: "#C6352F",
  },
}));

const MuiTwitterIcon = styled(TwitterIcon)(({ theme }) => ({
  color: "#fff",
  transition: "1s",
  "&:hover": {
    color: "#1DA1F2",
  },
}));

const MuiInstagramIcon = styled(InstagramIcon)(({ theme }) => ({
  color: "#fff",
  transition: "1s",
  fontSize: 25,
  "&:hover": {
    backgroundImage:
      "linear-gradient(to right, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
  },
}));

const FooterContainer = styled(Grid)(({ theme }) => ({
  // marginTop: "6rem",
  height: "auto",
  backgroundColor: "#12141b",
  color: "#CDCDCD",
}));

const ContentHeading = styled(Typography)(({ theme }) => ({
  color: "white",
  padding: "20px 0",
  fontSize: 25,
  fontWeight: 600,
}));

const MuiText = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: 16,
  fontFamily: "sans-serif",
  "&:hover": {
    borderBottom: `1px solid ${themeData.darkPalette.primary.main} `,
    transition: "0.8s",
    color: themeData.darkPalette.primary.main,
    transitionTimingFunction: "ease-in-out",
  },
}));

const CopyRightContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#090a0e",
  color: "#ffffff",
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  padding: "0 30px",
}));

export default function Footer() {
  const { selectedSetting } = useContext(SettingContext);

  return (
    <>
      <FooterContainer
        container
        spacing={2}
        sx={{
          padding: { xs: 2, sm: 3, md: "60px" },
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ContentHeading variant="h5">Contact us</ContentHeading>
          <Stack style={{ display: "flex" }}>
            <Typography sx={{ color: "#CDCDCD", fontSize: 16 }}>
              <b style={{ color: themeData.darkPalette.primary.main }}>
                Address:&nbsp;
              </b>
              1,3rd Floor, LVR ONE, 17th Cross Rd, near <br /> Orion Mall, A
              Block, Milk Colony, 2nd Stage, Rajajinagar, Bengaluru, Karnataka
              560010
            </Typography>
          </Stack>
          <Typography variant="body2" color="#fff" fontSize={16}>
            <b style={{ color: themeData.darkPalette.primary.main }}>Email:</b>
            &nbsp;
            {selectedSetting.email ? selectedSetting.email : "abc@gmail.com"}
          </Typography>
          <Typography variant="body2" color="#fff" fontSize={16}>
            <b style={{ color: themeData.darkPalette.primary.main }}>Phone:</b>
            &nbsp; +91
            {selectedSetting.phone ? selectedSetting.phone : "9878798777"}
          </Typography>

          <Box sx={{ display: "flex", gap: 3, padding: "5px 0" }}>
            {selectedSetting.facebookUrl ? (
              <Link
                className={style.facebook}
                to={selectedSetting.facebookUrl}
                target="_blank"
              >
                <MuiFacebookIcon />
              </Link>
            ) : null}

            {selectedSetting?.gplusUrl ? (
              <Link to={selectedSetting.gplusUrl} target="_blank">
                <MuiGrGooglePlus size={25} />
              </Link>
            ) : null}

            {selectedSetting?.linkedinUrl ? (
              <Link to={selectedSetting.linkedinUrl} target="_blank">
                <MuiBiLogoLinkedin size={25} />
              </Link>
            ) : null}

            {selectedSetting?.youtubeUrl ? (
              <Link to={selectedSetting.youtubeUrl} target="_blank">
                <MuiYouTubeIcon size={25} />
              </Link>
            ) : null}

            {selectedSetting.twitterUrl ? (
              <Link to={selectedSetting.twitterUrl} target="_blank">
                <MuiTwitterIcon />
              </Link>
            ) : null}

            {selectedSetting.instagramUrl ? (
              <Link to={selectedSetting.instagramUrl} target="_blank">
                <MuiInstagramIcon />
              </Link>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ContentHeading variant="h5">Quick Links</ContentHeading>
          <Link
            to="/about/overview"
            style={{
              textDecoration: "none",
            }}
          >
            <MuiText variant="span">Overview</MuiText>
          </Link>
          <Typography>
            <Link
              to="/about/founder"
              style={{
                textDecoration: "none",
              }}
            >
              <MuiText variant="span">About Founder</MuiText>
            </Link>
          </Typography>
          <Typography>
            <Link
              to="/results"
              style={{
                textDecoration: "none",
              }}
            >
              <MuiText variant="span">Results</MuiText>
            </Link>
          </Typography>
          <Typography>
            <Link
              to="/discover-gallery"
              style={{
                textDecoration: "none",
              }}
            >
              <MuiText variant="span">Gallery</MuiText>
            </Link>
          </Typography>
          <Typography>
            <Link
              to="/about/vision-and-mission"
              style={{
                textDecoration: "none",
              }}
            >
              <MuiText variant="span"> Vision and Mission</MuiText>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <ContentHeading variant="h5" textAlign="center">
            Find Us Here
          </ContentHeading>
          <Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.43319155182!2d77.55235837528166!3d13.008063114077418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bbc051f1ab%3A0x5b567d40d77191c6!2sWebspruce!5e0!3m2!1sen!2sin!4v1694703840631!5m2!1sen!2sin%22"
              width="100%"
              height="150"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              style={{ borderRadius: "10px", filter: "grayscale(80%)" }}
            />
          </Box>
        </Grid>
      </FooterContainer>
      <CopyRightContainer
        sx={{
          display: "flex",
          justifyContent: { sm: "space-between", xs: "flex-start" },
          alignItems: "center",
          flexDirection: { sm: "row", xs: "column" },
        }}
      >
        <Typography>{selectedSetting.websiteFooter}</Typography>
        <Typography sx={{ color: "#fff" }}>Powered by eCampusStreet</Typography>
      </CopyRightContainer>
    </>
  );
}
