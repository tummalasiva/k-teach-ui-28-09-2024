import React, { useContext } from "react";
import { BiLogoLinkedin } from "react-icons/bi";
import { GrGooglePlus } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import { BiLogoInstagram } from "react-icons/bi";
import logo from "../../theme-one/assets/Images/eCampusstreet.png";
import { styled, Grid, Box, Typography, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SettingContext from "../../context/SettingsContext";
import { Facebook, Twitter } from "@mui/icons-material";

const FooterNav = styled(Typography)(({ theme }) => ({
  color: "white",
  fontFamily: "sans-serif",
  fontSize: "1rem",
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: "white",
  padding: "20px 0",
}));

const StyledLink = styled(RouterLink)({
  textDecoration: "none",
  color: "white",
  fontFamily: "sans-serif",
  cursor: "pointer",
  transition: "1s",
  "&:hover": {
    color: "#F86F03",
  },
});

const FooterSectionTitle = styled(Typography)(() => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  textAlign: "center",
  color: "#F86F03",
  fontFamily: "sans-serif",
  marginBottom: "10px",
}));

const UseFullLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "1rem",
  textAlign: "center",
}));

const MuiLeftUseFullBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  gap: "20px",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1.5rem",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
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
                style={{ objectFit: "contain" }}
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

            <LogoBox>
              {selectedSetting?.facebookUrl ? (
                <span>
                  <StyledLink to={selectedSetting?.facebookUrl} target="_blank">
                    {" "}
                    <Facebook size={20} style={{ color: "white" }} />{" "}
                  </StyledLink>
                </span>
              ) : null}
              {selectedSetting?.twitterUrl ? (
                <span>
                  <StyledLink to={selectedSetting?.twitterUrl} target="_blank">
                    {" "}
                    <Twitter size={20} style={{ color: "white" }} />
                  </StyledLink>
                </span>
              ) : null}
              {selectedSetting?.instagramUrl ? (
                <span>
                  <StyledLink
                    to={selectedSetting?.instagramUrl}
                    target="_blank"
                  >
                    {" "}
                    <BiLogoInstagram
                      size={25}
                      style={{ color: "white" }}
                    />{" "}
                  </StyledLink>
                </span>
              ) : null}
              {selectedSetting?.gplusUrl ? (
                <span>
                  <StyledLink to={selectedSetting?.gplusUrl} target="_blank">
                    {" "}
                    <GrGooglePlus size={25} style={{ color: "white" }} />{" "}
                  </StyledLink>
                </span>
              ) : null}
              {selectedSetting?.youtubeUrl ? (
                <span>
                  <StyledLink to={selectedSetting?.youtubeUrl} target="_blank">
                    {" "}
                    <BsYoutube size={20} style={{ color: "white" }} />{" "}
                  </StyledLink>
                </span>
              ) : null}
              {selectedSetting?.linkedinUrl ? (
                <span>
                  <StyledLink to={selectedSetting?.linkedinUrl} target="_blank">
                    {" "}
                    <BiLogoLinkedin size={25} style={{ color: "white" }} />{" "}
                  </StyledLink>
                </span>
              ) : null}
            </LogoBox>
          </Grid>

          <Grid item xs={12} lg={3} md={6} sm={6}>
            <FooterSectionTitle textAlign="center">ADDRESS</FooterSectionTitle>
            <AddressBox>
              <FooterNav textAlign="center">1,3rd Floor, LVR ONE,</FooterNav>
              <FooterNav textAlign="center">
                17th Cross Rd near Orion Mall
              </FooterNav>
              <FooterNav textAlign="center">
                A Block, Milk Colony, 2nd Stage, Rajajinagar
              </FooterNav>
              <FooterNav textAlign="center">
                Bengaluru, Karnataka, Pin : 560010
              </FooterNav>
            </AddressBox>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: "rgb(66, 62, 62)", padding: "5px 30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <FooterText textAlign="center">{selectedSetting.footer}</FooterText>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
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
