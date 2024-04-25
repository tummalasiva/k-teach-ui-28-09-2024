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
          padding: { xs: 0, sm: 0, md: "60px" },
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
          <Box>
            <Stack style={{ display: "flex" }}>
              <Typography sx={{ color: "#CDCDCD", fontSize: 16 }}>
                <b style={{ color: "#ff8f0b" }}>Address:&nbsp;</b>
                1,3rd Floor, LVR ONE, 17th Cross Rd, near Orion Mall, A Block,
                Milk Colony, 2nd Stage, Rajajinagar, <br /> Bengaluru, Karnataka
                560010
              </Typography>
            </Stack>
            <Typography variant="body2" color="#fff" fontSize={16}>
              <b style={{ color: "#ff8f0b" }}>Email:</b>
              &nbsp;
              {selectedSetting.email ? selectedSetting.email : "abc@gmail.com"}
            </Typography>
            <Typography>
              <span style={{ color: "#ff8f0b", fontWeight: "500" }}>
                Phone:
              </span>
              &nbsp;
              <span>
                +91 {selectedSetting ? selectedSetting.phone : "9878798777"}
              </span>
            </Typography>
            <Box sx={{ display: "flex", gap: 3, padding: "5px 0" }}>
              {/* <a href="www.facebook.com" className={style.facebook}>
                <span>
                  <FacebookIcon />
                </span>
              </a> */}

              {selectedSetting.facebookUrl ? (
                <span>
                  <Link
                    className={style.facebook}
                    to={selectedSetting.facebookUrl}
                    target="_blank"
                  >
                    <FacebookIcon />
                  </Link>
                </span>
              ) : null}

              {selectedSetting?.gplusUrl ? (
                <span>
                  <Link to={selectedSetting.gplusUrl} target="_blank">
                    <GrGooglePlus className={style.logo} size={25} />
                  </Link>
                </span>
              ) : null}

              {selectedSetting?.youtubeUrl ? (
                <span>
                  <Link to={selectedSetting.youtubeUrl} target="_blank">
                    <BsYoutube className={style.youtube} size={20} />
                  </Link>
                </span>
              ) : null}

              {selectedSetting?.linkedinUrl ? (
                <span>
                  <Link to={selectedSetting.linkedinUrl} target="_blank">
                    {" "}
                    <BiLogoLinkedin className={style.likedin} size={25} />
                  </Link>
                </span>
              ) : null}

              {/* <a href="www.twitter.com" className={style.twitter}>
                <TwitterIcon />
              </a> */}

              {selectedSetting.twitterUrl ? (
                <span>
                  <Link
                    className={style.twitter}
                    to={selectedSetting.twitterUrl}
                    target="_blank"
                  >
                    <TwitterIcon />
                  </Link>
                </span>
              ) : null}

              {selectedSetting.instagramUrl ? (
                <span>
                  <Link
                    className={style.instagram}
                    to={selectedSetting.instagramUrl}
                    target="_blank"
                  >
                    <InstagramIcon />
                  </Link>
                </span>
              ) : null}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ContentHeading variant="h5">Quick Links</ContentHeading>
          <Box>
            <Typography>
              <Link to="/about/overview" className={style.link}>
                <span>OverView</span>
              </Link>
            </Typography>
            <Typography>
              <Link to="/about/founder" className={style.link}>
                <span>About Founder</span>
              </Link>
            </Typography>
            <Typography>
              <Link to="/results" className={style.link}>
                <span>Results</span>
              </Link>
            </Typography>
            <Typography>
              <Link to="/home-gallery" className={style.link}>
                <span>Gallery</span>
              </Link>
            </Typography>
            <Typography>
              <Link to="/about/visionandmission" className={style.link}>
                <span> Vision and Mission</span>
              </Link>
            </Typography>
          </Box>
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
        <Typography>Powered by eCampusStreet</Typography>
      </CopyRightContainer>
    </>
  );
}
