/** @format */

import React, { useContext } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import image from "../assets/images/diamond.png";
import { styled, Grid, colors } from "@mui/material";
import SettingContext from "../../context/SettingsContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import EastIcon from "@mui/icons-material/East";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link as RouterLink } from "react-router-dom";

const SecondGridBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: { lg: "flex-start", sm: "center" },
  color: "rgba(255, 255, 255, 0.7)",
  lineHeight: 1.8,
  fontWeight: 400,

  flexDirection: "row",
  gap: 10,
}));

const SocialBox = styled(Box)(() => ({
  height: 40,
  width: 40,
  textAlign: "center",
  paddingTop: "5px",
  borderRadius: "50%",
  border: "1px solid #353535 ",
  background: "#353535 ",
  color: "white",
}));

const StyledLink = styled(RouterLink)({
  textDecoration: "none",
  fontSize: "14px",
  fontFamily: "sans-serif",
  color: "rgba(255, 255, 255, 0.7)",
  transition: "0.8s",
  "&:hover": {
    color: "#fff",
  },
});

const FooterText = styled(Typography)({
  color: "#fff",

  "&:hover": {
    transition: "1s",
    color: "#f86f03",
    cursor: "pointer",
  },
});

const Footer = () => {
  const { selectedSetting } = useContext(SettingContext);

  return (
    <Box style={{ backgroundColor: "#232323" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { lg: "flex-start", sm: "center" },
                alignItems: "flex-start",
                flexDirection: "column",
              }}>
              <img
                src={image}
                alt="logo"
                height={180}
                width={300}
                style={{ objectFit: "contain" }}
              />
              <Box
                sx={{
                  fontFamily: "Work Sans, Arial, sans-serif",

                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.8,
                  marginTop: "-20px",
                }}>
                <Typography sx={{ fontSize: "14px" }}>
                  Diamond View International School is a premier educational
                  institution located in Ramanagar. We are committed to
                  providing a world-class education to our students, from
                  kindergarten through high school.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={5}
            sx={{
              mt: {
                lg: 5,
                md: 5,
                sm: 3,
                xs: 0,
              },
            }}>
            <SecondGridBox>
              <LocationOnIcon fontSize="small" />
              <Box>
                <Typography> Address:</Typography>
                <Typography>
                  Thimmaiahnadoddy, Jayapura Post, Kasaba Hobli, Ramanagara-
                  562159
                </Typography>
              </Box>
            </SecondGridBox>
            <SecondGridBox>
              <PhoneIcon fontSize="small" />

              <Typography>+91 9480119399</Typography>
            </SecondGridBox>
            <SecondGridBox>
              <LocalPostOfficeIcon fontSize="small" />

              <Typography>info@dvis.co.in</Typography>
            </SecondGridBox>
            <Box sx={{ color: "#fff", fontWeight: "bold", mt: 3 }}>
              <Typography variant="h5">Connect With Us</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
              <SocialBox>
                <FacebookIcon />
              </SocialBox>
              <SocialBox>
                <TwitterIcon />
              </SocialBox>
              <SocialBox>
                <InstagramIcon />
              </SocialBox>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              mt: {
                lg: 5,
                md: 5,

                xs: 0,
              },
            }}>
            <Box sx={{ color: "#fff", fontWeight: "bold" }}>
              <Typography variant="h5">Quick Links</Typography>
            </Box>
            <Box sx={{ mt: 5, color: "rgba(255, 255, 255, 0.7)" }}>
              {" "}
              <Typography>
                <EastIcon sx={{ fontSize: "12px" }} />
                <StyledLink to="/"> Home </StyledLink>
              </Typography>
              <Typography>
                <EastIcon sx={{ fontSize: "12px" }} />
                <StyledLink to="/about"> About </StyledLink>
              </Typography>
              <Typography>
                <EastIcon sx={{ fontSize: "12px" }} />
                <StyledLink to="/pre-primary"> Pre-Primary </StyledLink>
              </Typography>
              <Typography>
                <EastIcon sx={{ fontSize: "12px" }} />
                <StyledLink to="/primary"> Primary</StyledLink>
              </Typography>
              <Typography>
                <EastIcon sx={{ fontSize: "12px" }} />
                <StyledLink to="/gallery"> Gallery </StyledLink>
              </Typography>
              <Typography>
                <EastIcon sx={{ fontSize: "12px" }} />
                <StyledLink to="/contact-us"> Contact us </StyledLink>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mt: 6,
            pb: 5,

            width: "90%",
          }}>
          <Typography
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
            }}>
            Copyright © {selectedSetting?.websiteFooter},All rights reserved
          </Typography>

          <Typography
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
              color: "white",
              textDecoration: "none",

              transition: "1s",
            }}>
            Powered By{" "}
            <FooterText
              component={"span"}
              onClick={() =>
                window.open("https://ecampusstreet.com", "_blank")
              }>
              {" "}
              eCampusStreet.com
            </FooterText>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
