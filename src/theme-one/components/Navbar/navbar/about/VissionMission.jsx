import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
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

const Missionvalues = [
  "To advocate for value-based education.",
  "To make a positive impact on society by practising social responsibility and consciousness.",
  "To promote societal harmony with regard to fundamental human rights.",
  "To encourage unity between cultures and religions and care for the human family.",
  "To encourage student leadership and give them the tools they need to effectively participate in social emancipation.",
  "To deliver a high-quality, comprehensive, career-focused education and to foster an environment that supports both academic and personal achievement.",
  "To promote family, connectivity, and eco-justice while working to preserve the integrity of creation.",
];

export default function VissionMission() {
  return (
    <>
      <SubHeader
        title="Vission And Mission"
        leftSideHeader="Home"
        rightSideHeader="About"
      />
      <ContentContainer>
        <Box sx={{ padding: "10px 0" }}></Box>
        <Grid container>
          <Grid item md={8} sm={12}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#F86F03" }}>
                Our Vission:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom>
                  <b>Kayaka Foundation,</b>&nbsp;Gulbarga proposes a
                  life-oriented education that equips students to be agents of
                  transformation and growth at various levels of life through a
                  humanising and liberative process.
                </Typography>
                <Typography component="li">
                  Enabled and empowered, they actively address issues and
                  worries that are part of today's reality, particularly those
                  of students and people who are unable to exercise their right
                  to human freedom, and they fight for the integrity of the
                  natural world.
                </Typography>
                <Typography component="li">
                  The focus is on a knowledge-based civilisation that the
                  founder, Sri. Shivaraj Patil, foresaw and encouraged.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#F86F03" }}>
                Our Mission:
              </Typography>
              <ul>
                {Missionvalues.map((data, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Typography component="li" gutterBottom>
                        {data}
                      </Typography>
                    </React.Fragment>
                  );
                })}
              </ul>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} padding="10px"></Grid>
        </Grid>
      </ContentContainer>
    </>
  );
}
