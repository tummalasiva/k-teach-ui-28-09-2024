/** @format */

import React, { useContext } from "react";
import logo from "../../theme-one/assets/Images/eCampusstreet.png";
import { styled, Grid, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import themeData from "../../data/themeData";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SettingContext from "../../context/SettingsContext";

const FooterNav = styled(Typography)(({ theme }) => ({
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "1rem",
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: "white",
  padding: "10px 0px",
  fontFamily: "sans-serif",
}));

const StyledLink = styled(RouterLink)({
  textDecoration: "none",
  color: "white",
  fontSize: "1rem",
  fontFamily: "sans-serif",
  cursor: "pointer",
  transition: "1s",
  "&:hover": {
    color: themeData.darkPalette.primary.main,
  },
});

const FooterSectionTitle = styled(Typography)(() => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  textAlign: "center",
  color: themeData.darkPalette.primary.main,
  fontFamily: "sans-serif",
  margin: "15px 0px",
}));

const UseFullLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "1.2rem",
  textAlign: "start",
}));

const MuiLeftUseFullBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  gap: "30px",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
}));

const AddressBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Footer = () => {
  const { selectedSetting } = useContext(SettingContext);
  return (
    <>
      <Box sx={{ backgroundColor: "black", padding: "20px 30px" }}>
        {" "}
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2} md={6} sm={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={logo}
                alt="logo"
                height={180}
                width={180}
                style={{ objectFit: "contain", margin: "15px 0px" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} lg={3} md={6} sm={6}>
            <FooterSectionTitle textAlign="center">
              USEFULL LINKS
            </FooterSectionTitle>

            <MuiLeftUseFullBox>
              <UseFullLinks>
                <StyledLink to="/"> Home </StyledLink>
                <StyledLink to="/about/overview"> About </StyledLink>
                <StyledLink to="/home-gallery"> Gallery </StyledLink>
              </UseFullLinks>

              <UseFullLinks>
                <StyledLink to="/results"> Result </StyledLink>
                <StyledLink to="/facilities/library"> Facilities </StyledLink>
                <StyledLink to="/contact-us"> Contact us </StyledLink>
              </UseFullLinks>
            </MuiLeftUseFullBox>
          </Grid>

          <Grid item xs={12} lg={3} md={6} sm={6}>
            <FooterSectionTitle textAlign="center">
              FOLLOW US
            </FooterSectionTitle>

            <LogoBox sx={{ paddingBottom: "20px" }}>
              {" "}
              <StyledLink to={selectedSetting?.facebookUrl} target="_blank">
                {" "}
                <FacebookIcon size={20} />{" "}
              </StyledLink>
              <StyledLink to={selectedSetting?.twitterUrl} target="_blank">
                <TwitterIcon size={20} />
              </StyledLink>
              <StyledLink to={selectedSetting?.instagramUrl} target="_blank">
                <InstagramIcon size={25} />{" "}
              </StyledLink>
            </LogoBox>

            <LogoBox>
              <StyledLink
                to={selectedSetting?.googleAnalyticsId}
                target="_blank">
                <GoogleIcon size={25} />
              </StyledLink>

              <StyledLink to={selectedSetting?.youtubeUrl} target="_blank">
                <YouTubeIcon size={20} />{" "}
              </StyledLink>

              <StyledLink to={selectedSetting?.linkedinUrl} target="_blank">
                <LinkedInIcon size={25} />{" "}
              </StyledLink>
            </LogoBox>
          </Grid>

          <Grid item xs={12} lg={3} md={6} sm={6}>
            <FooterSectionTitle textAlign="center">ADDRESS</FooterSectionTitle>
            <AddressBox>
              <FooterNav textAlign="center">
                {selectedSetting?.address}
              </FooterNav>
            </AddressBox>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: "#212121", padding: "5px 0px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
          }}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FooterText textAlign="center">
              {selectedSetting?.websiteFooter}
            </FooterText>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <FooterText textAlign="center">
              <StyledLink to="https://ecampusstreet.com/" target="_blank">
                <span>
                  Powered by <span>eCampusStreet</span>
                </span>
              </StyledLink>
            </FooterText>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
