import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import image from "../../../../../theme-one/assets/Images/food.gif";

import SubHeader from "../../../SubHeader";
import themeData from "../../../../../data/themeData";
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

export default function Food() {
  return (
    <>
      <SubHeader
        title="Food"
        leftSideHeader="Home"
        rightSideHeader="Facilities"
      />
      <ContentContainer>
        <Box sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            At Kayaka, we understand the importance of providing students with
            nutritious meals to support their overall well-being and academic
            success. We are committed to ensuring that no child goes hungry and
            offer a free food facility to eligible students. Here's everything
            you need to know:
          </Typography>
        </Box>
        <Grid container>
          <Grid lg={8} md={8} sm={12}>
            <Box>
              <Header>Nutritious Meal Options:</Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  Description of the healthy and balanced meals provided to
                  students through the free food facility.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  Emphasis on the use of fresh ingredients, whole grains,
                  fruits, and vegetables to promote good nutrition and support
                  physical and cognitive development.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header> Meal Distribution:</Header>

              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  Details on how and where meals are distributed within the
                  school premises.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  Information on the schedule and timings for breakfast, lunch,
                  and any additional meal programs, including summer meal
                  programs if applicable.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header>Allergies and Dietary Restrictions:</Header>

              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  Instructions for parents to communicate any specific allergies
                  or dietary restrictions their child may have.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  Information on how the school accommodates and addresses these
                  requirements to ensure the safety and well-being of all
                  students.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header> Food Safety and Quality:</Header>

              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  Assurance of adherence to strict food safety and hygiene
                  standards in meal preparation and distribution.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  Overview of any certifications or partnerships with local
                  health authorities to ensure the highest quality of food
                  service.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header>Additional Support:</Header>

              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  Information on any supplementary programs or resources
                  available to students and families, such as nutrition
                  education workshops, community referrals, or partnerships with
                  local food banks or organizations.
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} padding="10px">
            <img src={image} alt="" style={{ maxWidth: "100%" }} />
          </Grid>
        </Grid>
        <Box sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            We believe that access to healthy meals is fundamental to a
            student's ability to learn and thrive. If you have any questions
            regarding our free food facility or need assistance with the
            application process, please don't hesitate to contact our school
            administration. We are committed to ensuring that every child
            receives the nourishment they need to reach their full potential.
          </Typography>
        </Box>
      </ContentContainer>
    </>
  );
}
