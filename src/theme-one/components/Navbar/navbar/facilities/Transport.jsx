import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import SubHeader from "../../../SubHeader";
import image from "../../../../../theme-one/assets/Images/Transport.gif";
import themeData from "../../../../../data/themeData";
import TopNav from "../../TopNav";
import MainNav from "../../MainNav";
import Footer from "../../../Footer";
const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

const Header = styled(Typography)(({ theme }) => ({
  color: themeData.darkPalette.primary.main,
  fontWeight: "bold",

  fontSize: "20px",
}));
export default function Transport() {
  return (
    <>
      <SubHeader
        title="Transport"
        leftSideHeader="Home"
        rightSideHeader="Facilities"
      />
      <ContentContainer>
        <Box sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            We understand the importance of safe and convenient transportation
            for our students. We strive to provide a reliable and efficient
            transport facility that ensures students can commute to and from
            school comfortably. Here's everything you need to know about our
            transport services:
          </Typography>
        </Box>
        <Grid container>
          <Grid item lg={8} md={8} sm={12}>
            <Box>
              <Box>
                <Header>Bus Routes and Timings:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    Detailed information about the bus routes, including the
                    pick-up and drop-off points in various neighborhoods.
                  </Typography>
                  <Typography component="li" gutterBottom fontSize={16}>
                    A schedule outlining the timings for each route, ensuring
                    students arrive at school on time and are transported back
                    home safely.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Header>Safety Measures:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Emphasis on student safety:</b>
                    <br /> Highlighting the safety protocols and measures
                    implemented to ensure a secure transportation experience.
                  </Typography>
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Trained drivers and staff:</b>
                    <br /> Assurance that our drivers and transport staff are
                    experienced, licensed, and undergo regular safety training.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Header>Well-Maintained Fleet:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    Description of our well-maintained fleet of buses equipped
                    with safety features, such as seat belts and GPS tracking
                    systems.
                  </Typography>
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Regular maintenance and inspections:</b>
                    <br /> Assuring parents that our buses undergo routine
                    maintenance and inspections to ensure their optimal
                    performance.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Header>Bus Monitors:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Introduction of bus monitors:</b>
                    <br /> Explaining the presence of dedicated staff members or
                    student volunteers on buses to maintain discipline and
                    assist students during the journey.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Header>Communication Channels:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Dedicated transport helpline:</b>
                    <br /> Providing contact details for the transport
                    department or helpline, ensuring parents can reach out with
                    any concerns or queries.
                  </Typography>
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Communication protocol:</b>
                    <br /> Describing how parents can receive timely updates
                    regarding any changes in bus routes or timings.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Header>Fee Structure and Registration Process:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Transport fee details:</b>
                    <br /> Providing a clear breakdown of the transportation fee
                    structure, including any applicable discounts for siblings
                    or long-term commitments.
                  </Typography>
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Registration process:</b>
                    <br /> Outlining the steps to register for the transport
                    facility, including required forms and documents.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Header>Parent Guidelines:</Header>
                <Typography component="ul">
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Bus behavior expectations:</b>
                    <br /> Communicating behavioral guidelines for students
                    during transportation, emphasizing respect, safety, and
                    consideration for others.
                  </Typography>
                  <Typography component="li" gutterBottom fontSize={16}>
                    <b>Drop-off and pick-up procedures:</b> <br />
                    Informing parents about designated drop-off and pick-up
                    areas, ensuring a smooth flow of traffic and the safety of
                    students.
                  </Typography>
                  <br />
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} padding="10px">
            <img src={image} alt="" style={{ maxWidth: "100%" }} />
          </Grid>
        </Grid>
        <Box sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
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
    </>
  );
}
