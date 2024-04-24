import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import image from "../../../../../theme-one/assets/Images/food.gif";

import SubHeader from "../../../SubHeader";
const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
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
          <Typography sx={{ fontWeight: 500 }}>
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
              <Typography variant="h6" gutterBottom sx={{ color: "#F86F03" }}>
                Nutritious Meal Options:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom>
                  Description of the healthy and balanced meals provided to
                  students through the free food facility.
                </Typography>
                <Typography component="li">
                  Emphasis on the use of fresh ingredients, whole grains,
                  fruits, and vegetables to promote good nutrition and support
                  physical and cognitive development.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#F86F03" }}>
                Meal Distribution:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom>
                  Details on how and where meals are distributed within the
                  school premises.
                </Typography>
                <Typography component="li">
                  Information on the schedule and timings for breakfast, lunch,
                  and any additional meal programs, including summer meal
                  programs if applicable.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#F86F03" }}>
                Allergies and Dietary Restrictions:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom>
                  Instructions for parents to communicate any specific allergies
                  or dietary restrictions their child may have.
                </Typography>
                <Typography component="li">
                  Information on how the school accommodates and addresses these
                  requirements to ensure the safety and well-being of all
                  students.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#F86F03" }}>
                Food Safety and Quality:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom>
                  Assurance of adherence to strict food safety and hygiene
                  standards in meal preparation and distribution.
                </Typography>
                <Typography component="li">
                  Overview of any certifications or partnerships with local
                  health authorities to ensure the highest quality of food
                  service.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: "#F86F03" }}>
                Additional Support:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom>
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
          <Typography sx={{ fontWeight: 500 }}>
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
