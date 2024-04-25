import React from "react";
import { Box, Typography, styled, Container } from "@mui/material";
import themeData from "../../../data/themeData";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://t3.ftcdn.net/jpg/04/79/55/50/240_F_479555081_2LfBMnoLS7XVFjrGD26i5mzXqtXVyN0X.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingTop: "150px",
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "60px 30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

export default function Overview() {
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
          OVERVIEW
        </Typography>
        <ContentContainer>
          <Box sx={{ textAlign: "justify" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: "white" }}
            >
              At Kayaka college, we take pride in our rich history and the
              visionary leader who laid the foundation for our institution. Our
              college founder, Sri. Shivaraj T. Patil, was a remarkable
              individual who believed in the transformative power of education
              and dedicated their life to shaping young minds.
            </Typography>
            <br />
            <br />
            <Typography sx={{ color: "white" }}>
              Driven by the belief that education should be holistic, inclusive,
              and student-centered, Sri. Shivaraj T. Patil worked tirelessly to
              create an environment that fostered intellectual curiosity,
              critical thinking, and personal growth. They believed in the power
              of hands-on learning, interdisciplinary approaches, and embracing
              diverse perspectives to prepare students for the challenges of the
              rapidly evolving world.
            </Typography>
            <br />
            <br />
            <Typography sx={{ color: "white" }}>
              Under Sri. Shivaraj T. Patil's leadership, Kayaka college
              flourished. Their innovative educational philosophy attracted a
              dedicated team of educators who shared their vision and a
              community of parents who believed in the transformative potential
              of Kayaka college. Together, they nurtured a vibrant educational
              community that became known for its academic excellence, creative
              expression, and commitment to social responsibility.
            </Typography>
            <br />
            <br />
            <Typography sx={{ color: "white" }}>
              Join us at Kayaka college and become part of a community that
              cherishes its past, embraces the present, and embraces the future.
              Experience the transformative power of education that was
              envisioned by our remarkable founder, Sri. Shivaraj T. Patil.
            </Typography>
            <br />
            <br />
            <Typography sx={{ color: "white" }}>
              Come and be a part of the legacy at Kayaka college!
            </Typography>
          </Box>
        </ContentContainer>
      </OuterBox>
    </>
  );
}
