import React from "react";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import themeData from "../../../data/themeData";
import Footer from "../../layout/Footer";
import TopNav from "../../../theme-one/components/Navbar/TopNav";
import Navbar from "../../layout/header/Navbar";
import transportImg from "../../assets/images/transport1.png";

const MuiTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#fff",
  padding: "10px 0",
  fontSize: 16,
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://images.unsplash.com/photo-1662502995368-d4110e91b132?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
}));

const MuiHeadContent = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  textAlign: "center",
  fontSize: 35,
}));

export default function Transport() {
  return (
    <>
      <TopNav />
      <Navbar />
      <OuterBox>
        <MuiHeadContent variant="h4">TRANSPORT</MuiHeadContent>
        <ContentContainer>
          <MuiTypography>
            We understand the importance of safe and convenient transportation
            for our students. We strive to provide a reliable and efficient
            transport facility that ensures students can commute to and from
            school comfortably. Here's everything you need to know about our
            transport services:
          </MuiTypography>
          <Grid container>
            <Grid item lg={8} md={8} sm={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Bus Routes and Timings:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Detailed information about the bus routes, including the
                  pick-up and drop-off points in various neighborhoods.
                </Typography>
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  A schedule outlining the timings for each route, ensuring
                  students arrive at school on time and are transported back
                  home safely.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Safety Measures:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  <b>Emphasis on student safety:</b>
                  <br /> Highlighting the safety protocols and measures
                  implemented to ensure a secure transportation experience.
                </Typography>
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  <b>Trained drivers and staff:</b>
                  <br /> Assurance that our drivers and transport staff are
                  experienced, licensed, and undergo regular safety training.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Well-Maintained Fleet:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Description of our well-maintained fleet of buses equipped
                  with safety features, such as seat belts and GPS tracking
                  systems.
                </Typography>
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  <b>Regular maintenance and inspections:</b>
                  <br /> Assuring parents that our buses undergo routine
                  maintenance and inspections to ensure their optimal
                  performance.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Bus Monitors:
              </Typography>
              <Typography component="ul">
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  <b>Introduction of bus monitors:</b>
                  <br /> Explaining the presence of dedicated staff members or
                  student volunteers on buses to maintain discipline and assist
                  students during the journey.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Communication Channels:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  <b>Dedicated transport helpline:</b>
                  <br /> Providing contact details for the transport department
                  or helpline, ensuring parents can reach out with any concerns
                  or queries.
                </Typography>
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  <b>Communication protocol:</b>
                  <br /> Describing how parents can receive timely updates
                  regarding any changes in bus routes or timings.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Fee Structure and Registration Process:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  <b>Transport fee details:</b>
                  <br /> Providing a clear breakdown of the transportation fee
                  structure, including any applicable discounts for siblings or
                  long-term commitments.
                </Typography>
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  <b>Registration process:</b>
                  <br /> Outlining the steps to register for the transport
                  facility, including required forms and documents.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: 25,
                  color: themeData.darkPalette.primary.main,
                }}
              >
                Parent Guidelines:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  <b>Bus behavior expectations:</b>
                  <br /> Communicating behavioral guidelines for students during
                  transportation, emphasizing respect, safety, and consideration
                  for others.
                </Typography>
                <Typography component="li" sx={{ color: "#fff", fontSize: 16 }}>
                  <b>Drop-off and pick-up procedures:</b> <br />
                  Informing parents about designated drop-off and pick-up areas,
                  ensuring a smooth flow of traffic and the safety of students.
                </Typography>
                <br />
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} padding="10px">
              <img
                title="Pick up and Drop"
                src={transportImg}
                alt="loading..."
                style={{ maxWidth: "100%" }}
              />
            </Grid>
          </Grid>
          <Box sx={{ padding: "10px 0" }}>
            <Typography sx={{ fontWeight: 700, color: "#fff" }}>
              We prioritize the safety and comfort of our students during their
              commute to and from school. If you have any questions or require
              further information about our transport facility, please do not
              hesitate to contact our transport department. We are committed to
              providing a reliable and efficient transport service that gives
              parents peace of mind and ensures a positive start and end to each
              school day.
            </Typography>
          </Box>
        </ContentContainer>
        <Footer />
      </OuterBox>
    </>
  );
}
