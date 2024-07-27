/** @format */

import React from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MapIcon from "@mui/icons-material/Map";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const MainContainer = styled(Box)({
  background: "#1eaaf1",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const SideContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  [theme.breakpoints.down("sm")]: {
    padding: "5px",
    justifyContent: "space-evenly",
    marginLeft: "0",
  },
}));

const SocialBox = styled(Box)(() => ({
  height: 30,
  width: 30,
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  marginRight: "10px",
  color: "white",
}));

export default function TopNav() {
  return (
    <>
      <MainContainer>
        <Container maxWidth="xl">
          <SideContainer container sx={{ gap: 2, px: 8, py: 1 }}>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <SocialBox bgcolor="#5d50c6">
                <MapIcon style={{ fontSize: "16px" }} />
              </SocialBox>

              <Typography variant="body2" fontSize={15} fontWeight={500}>
                {"Thimmaiahnadoddy, Ramanagara- 562159"}
              </Typography>
            </Grid>
            <a href="mailto:info@dvis.co.in" style={{ textDecoration: "none" }}>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <SocialBox bgcolor="#fda638">
                  <MailOutlineIcon style={{ fontSize: "16px" }} />
                </SocialBox>
                <Typography
                  variant="body2"
                  fontSize={15}
                  sx={{ color: "#fff" }}>
                  {"info@dvis.co.in"}
                </Typography>
              </Grid>
            </a>
            <a href="tel:+919480119399" style={{ textDecoration: "none" }}>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <SocialBox bgcolor="#8cc152">
                  <LocalPhoneIcon style={{ fontSize: "16px" }} />
                </SocialBox>
                <Typography
                  variant="body2"
                  fontSize={15}
                  sx={{ color: "#fff" }}>
                  +91 {9480119399}
                </Typography>
              </Grid>
            </a>
            <a
              href="https://md-95.webhostbox.net:2096/"
              style={{ textDecoration: "none" }}>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <SocialBox bgcolor="#FF6C2C">
                  <AlternateEmailIcon style={{ fontSize: "16px" }} />
                </SocialBox>
                <Typography
                  variant="body2"
                  fontSize={15}
                  sx={{ color: "#fff" }}>
                  Webmail Login
                </Typography>
              </Grid>
            </a>
          </SideContainer>
        </Container>
      </MainContainer>
    </>
  );
}
