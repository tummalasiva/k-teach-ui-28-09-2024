/** @format */

import { Box, Container, Typography, styled } from "@mui/material";
import React from "react";
import SubHeader from "../../../../theme-one/components/SubHeader";

const ContentBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

const About = () => {
  return (
    <>
      <ContentBox sx={{ height: "max-content" }}>
        <SubHeader
          title="About"
          leftSideHeader="HOME"
          rightSideHeader="About"
        />
        <Container>
          <Box sx={{ textAlign: "justify" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                color: "#F86F03",
                textIndent: "4rem",
                marginTop: "2rem",
              }}>
              Diamond View International School is a premier educational
              institution located in Ramanagar. We are committed to providing a
              world-class education to our students, from kindergarten through
              high school.
            </Typography>

            <Typography sx={{ marginTop: "2rem" }}>
              Our faculty is made up of highly qualified and experienced
              teachers who are passionate about their subjects and committed to
              helping each student reach their full potential. We offer a
              diverse range of academic programs, including Nursery, LKG, UKG,
              1st & 2nd standard, as well as extracurricular activities such as
              Music, Dance, Sports & Cultural Activities.
            </Typography>

            <Typography sx={{ marginTop: "2rem" }}>
              At Diamond View International School, we believe in the importance
              of providing a well-rounded education that not only prepares our
              students for academic success, but also helps them develop
              important life skills. We prioritize small class sizes and
              individualized attention, ensuring that each student receives the
              support they need to thrive.
            </Typography>

            <Typography sx={{ marginTop: "2rem" }}>
              In addition to our rigorous academic program, we also place a
              strong emphasis on character education. We believe that by
              teaching our students to be responsible, respectful, and
              compassionate individuals, we can help shape a better future for
              all.
            </Typography>
            <Typography sx={{ marginTop: "2rem" }}>
              We are proud of the strong sense of community that exists at
              Diamond View International School and strive to create a
              welcoming, inclusive environment for all of our students, faculty,
              and staff. We invite you to learn more about us and see all that
              Diamond View International School has to offer.{" "}
            </Typography>
            <Typography
              sx={{
                marginTop: "3rem",
                fontWeight: "bold",
                color: "#F86F03",
                textAlign: "center",
              }}></Typography>
          </Box>
        </Container>
      </ContentBox>
    </>
  );
};

export default About;
