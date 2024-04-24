import { Box, Container, Typography, styled } from "@mui/material";
import React from "react";
import SubHeader from "../../../SubHeader";
import themeData from "../../../../../data/themeData";

const Title = styled(Typography)(() => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  textIndent: "4rem",
  marginTop: "2rem",
  fontSize: "15px",
}));

const FooterText = styled(Typography)(() => ({
  marginTop: "3rem",
  fontWeight: "bold",
  color: themeData.darkPalette.primary.main,
  textAlign: "center",
  fontSize: "15px",
}));

const Content = styled(Typography)(() => ({
  marginTop: "2rem",
  fontSize: "16px",
}));

export default function Overview() {
  return (
    <>
      {" "}
      <SubHeader
        title="Overview"
        leftSideHeader="Home"
        rightSideHeader="About"
      />
      <Container>
        <Box sx={{ textAlign: "justify" }}>
          <Title variant="body1">
            At Kayaka School, we take pride in our rich history and the
            visionary leader who laid the foundation for our institution. Our
            school founder, Sri. Shivaraj T. Patil, was a remarkable individual
            who believed in the transformative power of education and dedicated
            their life to shaping young minds.
          </Title>

          <Content>
            Driven by the belief that education should be holistic, inclusive,
            and student-centered, Sri. Shivaraj T. Patil worked tirelessly to
            create an environment that fostered intellectual curiosity, critical
            thinking, and personal growth. They believed in the power of
            hands-on learning, interdisciplinary approaches, and embracing
            diverse perspectives to prepare students for the challenges of the
            rapidly evolving world.
          </Content>

          <Content>
            Under Sri. Shivaraj T. Patil's leadership, Kayaka School flourished.
            Their innovative educational philosophy attracted a dedicated team
            of educators who shared their vision and a community of parents who
            believed in the transformative potential of Kayaka School. Together,
            they nurtured a vibrant educational community that became known for
            its academic excellence, creative expression, and commitment to
            social responsibility.
          </Content>

          <Content>
            Join us at Kayaka School and become part of a community that
            cherishes its past, embraces the present, and embraces the future.
            Experience the transformative power of education that was envisioned
            by our remarkable founder, Sri. Shivaraj T. Patil.
          </Content>

          <FooterText>
            Come and be a part of the legacy at Kayaka School!
          </FooterText>
        </Box>
      </Container>
    </>
  );
}
