import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import image from "../../../../../theme-one/assets/Images/founder.png";
import SubHeader from "../../../SubHeader";
import themeData from "../../../../../data/themeData";

const ImageContainer = styled(Grid)(({ theme }) => ({
  borderShadow: "10px 20px #0000",
  padding: "15px",
  width: "65%",
  marginLeft: "20%",
  [theme.breakpoints.down("md")]: {
    marginBottom: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "15px",
    width: "60%",
  },
}));

const FounderName = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const Content = styled(Typography)(({ theme }) => ({
  fontFamily: "arial",
  textAlign: "start",
  fontSize: "16px",
}));

const Title = styled(Typography)(({ theme }) => ({
  textShadow: `1px 1px 1px ${themeData.darkPalette.primary.main}`,
  color: "#1b61ff",
  textAlign: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
}));

const AboutContainer = styled(Box)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "15px",
  },
}));

export default function AboutFounder() {
  return (
    <>
      <SubHeader
        title="About Founder"
        leftSideHeader="Home"
        rightSideHeader="About"
      />
      <AboutContainer>
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Box padding="20px">
              <Title>
                {"\u201C"}
                The end-product of education should be a free creative man, who
                can battle against historical circumstances and adversities of
                nature{"\u201D"}
              </Title>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: themeData.darkPalette.primary.main,
                }}
              >
                - Dr. Sarvepalli Radhakrishnan
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ImageContainer
              boxShadow={"15px 10px 10px #969c96"}
              textAlign="center"
            >
              <img
                src={image}
                alt=""
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
              <FounderName
                align="center"
                sx={{ marginLeft: "2%", fontWeight: 700 }}
              >
                Shri.Shivaraj T.Patil B.E.,MBA(USA)
              </FounderName>
            </ImageContainer>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Content>
              <b style={{ color: themeData.darkPalette.primary.main }}>"</b>
              <b>Sri.Shivaraj T. Patil,</b> the founder of the
              <b> Kayaka Foundation Education Trust</b>, is a man of many
              manifestations, hails from Devdurg of Raichur district, completed
              his B.E. from PDA College of Engineering, Gulbarga. He joined
              Infosys, Bangalore, served for a period of 6 months, then went to
              US for Consultancy job and completed MBA from Michigan University
              of America.
              <br />
              <br />
              The sum total synthesis of whatever Patil observed, experienced,
              fascinated, in the field of American educational system- may it be
              of innovation, practicality, creativity, researching is the Kayaka
              Foundation, the brain child of Patil.
              <br />
              <br />
              Shivaraj Patil, strongly believes that a child with strong
              determination can change the destiny. After returning from USA, he
              thought always that Indian children should compete in all the
              fields- may it be an academic excellence or the process of
              research (especially scientists).
              <br />
              <br />
              Patil has a vision in his philosophy of education that the
              students of Kayaka Foundation should hold their heads high, i.e.,
              self-reliant what the American philosopher says "SELF RELIANCE IS
              GOD RELIANCE" - they should continuously participate in
              international cultural exchange programme of America and to
              develop the scientific knowledge in education they (the students)
              should aim for research oriented knowledge purely meant for
              scientists. He has the greater dream to collaborate - THINK AND
              INK SCIENCE FOUNDATION of Germany, which always aims at achieving
              to get the Nobel prizes.
              <b style={{ color: themeData.darkPalette.primary.main }}>"</b>
            </Content>
          </Grid>
        </Grid>
      </AboutContainer>
    </>
  );
}
