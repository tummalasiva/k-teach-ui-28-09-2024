import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import foodImage from "../../assets/images/childfood.avif";
import themeData from "../../../data/themeData";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://c4.wallpaperflare.com/wallpaper/869/719/717/cuisine-food-india-indian-wallpaper-preview.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
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

export default function Food() {
  const textContent = "white";

  return (
    <>
      <OuterBox>
        <Typography
          variant="h4"
          color={themeData.darkPalette.primary.main}
          textAlign="center"
          fontWeight="700"
          fontSize={35}
        >
          FOOD
        </Typography>
        <ContentContainer>
          <Typography
            sx={{ fontWeight: 700, color: textContent, padding: "10px 0" }}
          >
            At Kayaka, we understand the importance of providing students with
            nutritious meals to support their overall well-being and academic
            success. We are committed to ensuring that no child goes hungry and
            offer a free food facility to eligible students. Here's everything
            you need to know:
          </Typography>
          <Grid container>
            <Grid lg={8} md={8} sm={12}>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: themeData.darkPalette.primary.main }}
                  fontSize={25}
                >
                  Nutritious Meal Options:
                </Typography>
                <Typography component="ul">
                  <Typography
                    component="li"
                    gutterBottom
                    sx={{ color: textContent }}
                  >
                    Description of the healthy and balanced meals provided to
                    students through the free food facility.
                  </Typography>
                  <Typography component="li" sx={{ color: textContent }}>
                    Emphasis on the use of fresh ingredients, whole grains,
                    fruits, and vegetables to promote good nutrition and support
                    physical and cognitive development.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: themeData.darkPalette.primary.main }}
                  fontSize={25}
                >
                  Meal Distribution:
                </Typography>
                <Typography component="ul">
                  <Typography
                    component="li"
                    gutterBottom
                    sx={{ color: textContent }}
                  >
                    Details on how and where meals are distributed within the
                    school premises.
                  </Typography>
                  <Typography component="li" sx={{ color: textContent }}>
                    Information on the schedule and timings for breakfast,
                    lunch, and any additional meal programs, including summer
                    meal programs if applicable.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: themeData.darkPalette.primary.main }}
                  fontSize={25}
                >
                  Allergies and Dietary Restrictions:
                </Typography>
                <Typography component="ul">
                  <Typography
                    component="li"
                    gutterBottom
                    sx={{ color: textContent }}
                  >
                    Instructions for parents to communicate any specific
                    allergies or dietary restrictions their child may have.
                  </Typography>
                  <Typography component="li" sx={{ color: textContent }}>
                    Information on how the school accommodates and addresses
                    these requirements to ensure the safety and well-being of
                    all students.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: themeData.darkPalette.primary.main }}
                  fontSize={25}
                >
                  Food Safety and Quality:
                </Typography>
                <Typography component="ul">
                  <Typography
                    component="li"
                    gutterBottom
                    sx={{ color: textContent }}
                  >
                    Assurance of adherence to strict food safety and hygiene
                    standards in meal preparation and distribution.
                  </Typography>
                  <Typography component="li" sx={{ color: textContent }}>
                    Overview of any certifications or partnerships with local
                    health authorities to ensure the highest quality of food
                    service.
                  </Typography>
                  <br />
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: themeData.darkPalette.primary.main }}
                  fontSize={25}
                >
                  Additional Support:
                </Typography>
                <Typography component="ul">
                  <Typography
                    component="li"
                    gutterBottom
                    sx={{ color: textContent }}
                  >
                    Information on any supplementary programs or resources
                    available to students and families, such as nutrition
                    education workshops, community referrals, or partnerships
                    with local food banks or organizations.
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} padding="10px">
              <img src={foodImage} alt="" style={{ maxWidth: "100%" }} />
            </Grid>
          </Grid>
          <Box sx={{ padding: "10px 0" }}>
            <Typography sx={{ fontWeight: 700, color: textContent }}>
              We believe that access to healthy meals is fundamental to a
              student's ability to learn and thrive. If you have any questions
              regarding our free food facility or need assistance with the
              application process, please don't hesitate to contact our school
              administration. We are committed to ensuring that every child
              receives the nourishment they need to reach their full potential.
            </Typography>
          </Box>
        </ContentContainer>
      </OuterBox>
    </>
  );
}
