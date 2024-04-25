import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import themeData from "../../../data/themeData";

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

const MuiContent = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#fff",
  padding: "10px 0",
  fontSize: 16,
}));

const MuiHeadContent = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: themeData.darkPalette.primary.main,
  textAlign: "center",
  fontSize: 35,
}));

const MuiText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: themeData.darkPalette.primary.main,
  padding: "10px 0",
  fontSize: 25,
}));

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://www.vvsw.edu.in/wp-content/uploads/2019/08/VVSW-infrastructure-1.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
}));

const MuiTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#fff",
  padding: "10px 0",
  fontSize: 16,
}));

export default function Labs() {
  return (
    <>
      <OuterBox>
        <MuiHeadContent variant="h4">LAB FACILITIES</MuiHeadContent>
        <ContentContainer>
          <MuiTypography>
            We understand the importance of providing our students with
            state-of-the-art laboratory facilities that support their academic
            and research endeavors. Our well-equipped labs offer hands-on
            experiences, allowing students to apply theoretical knowledge and
            develop practical skills. Here are the various lab facilities
            available at our college:
          </MuiTypography>
          <Grid container>
            <Grid item lg={8} md={8} sm={12}>
              <MuiText variant="h6" gutterBottom>
                1. Science Laboratories:
              </MuiText>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Biology Lab: A fully equipped lab where students can conduct
                  experiments related to anatomy, physiology, microbiology, and
                  genetics.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Chemistry Lab: A modern lab equipped with the necessary
                  apparatus and chemicals for conducting experiments in organic
                  and inorganic chemistry, analytical chemistry, and physical
                  chemistry.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Physics Lab: A dedicated space for students to perform
                  experiments in mechanics, electricity, optics, and modern
                  physics using advanced instruments and equipment.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Environmental Science Lab: A specialized lab where students
                  can study environmental samples, analyze data, and conduct
                  experiments related to ecology, pollution, and conservation.
                </Typography>
                <br />
              </Typography>

              <MuiText variant="h6" gutterBottom>
                2. Computer Laboratories:
              </MuiText>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  General Computer Lab: General Computer Lab: A spacious lab
                  equipped with desktop computers, printers, and high-speed
                  internet access, providing students with a suitable
                  environment for various computer-based activities, research,
                  and software development.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Specialized Labs: Additional labs dedicated to specific areas
                  such as programming, multimedia, networking, and database
                  management, equipped with specialized software and hardware
                  resources.
                </Typography>
                <br />
              </Typography>

              <MuiText variant="h6" gutterBottom>
                3. Engineering Laboratories:
              </MuiText>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Mechanical Engineering Lab: Equipped with machines, tools, and
                  equipment for hands-on learning in areas such as
                  thermodynamics, fluid mechanics, and manufacturing processes.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Electrical and Electronics Lab: A lab that provides students
                  with the opportunity to work with electrical circuits, digital
                  electronics, microcontrollers, and instrumentation systems.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Civil Engineering Lab: A dedicated space for conducting
                  experiments in materials testing, geotechnical engineering,
                  and structural analysis.
                </Typography>
                <br />
              </Typography>

              <MuiText variant="h6" gutterBottom>
                4. Research Laboratories:
              </MuiText>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Faculty Research Labs: Dedicated spaces where faculty members
                  and their research teams conduct cutting-edge research in
                  their respective fields, providing opportunities for students
                  to engage in research projects and gain valuable research
                  experience.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: "#fff", fontSize: 16 }}
                >
                  Student Research Labs: Designated labs where students can
                  pursue their own research projects under the guidance of
                  faculty mentors, fostering critical thinking and scientific
                  inquiry.
                </Typography>
                <br />
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} padding="10px">
              <img
                title="Lab Images"
                src="https://plus.unsplash.com/premium_photo-1664298626749-93845642877e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="loading..."
                style={{ maxWidth: "100%" }}
              />
            </Grid>
          </Grid>
          <MuiContent>
            These lab facilities at Kayaka are designed to provide our students
            with hands-on learning experiences, foster innovation, and enhance
            their practical skills. We ensure that our labs are regularly
            updated with the latest equipment and technology to align with
            industry standards and advancements. If you have any specific
            questions about our lab facilities or would like to explore them
            further, please feel free to contact us.
          </MuiContent>
        </ContentContainer>
      </OuterBox>
    </>
  );
}
