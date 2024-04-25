import React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import themeData from "../../../data/themeData";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://img.freepik.com/free-photo/businessman-big-office_53876-144319.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
}));

const MuiGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const MuiLi = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#fff",
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "40px 30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

export default function VisionAndMission() {
  return (
    <>
      <OuterBox>
        <MuiGrid container>
          <Grid item xs={12} md={10}>
            <Typography
              variant="h4"
              sx={{
                color: themeData.darkPalette.primary.main,
                fontSize: "35px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              VISION
            </Typography>
            <br />
            <ContentContainer>
              <Typography
                color="white"
                sx={{
                  textAlign: "justify",
                  fontSize: "16px",
                }}
              >
                Kayaka Foundation, Gulbarga, proposes a life-oriented education
                that equips students to be agents of transformation and growth
                at various levels of life through a humanising and liberative
                process. Enabled and empowered, they actively address issues and
                worries that are part of today's reality, particularly those of
                students and people who are unable to exercise their right to
                human freedom, and they fight for the integrity of the natural
                world. The focus is on a knowledge-based civilisation that the
                founder, Sri. Shivaraj Patil, foresaw and encouraged
              </Typography>
            </ContentContainer>
          </Grid>
          <br />

          <Grid item xs={12} md={10}>
            <Typography
              variant="h4"
              sx={{
                color: themeData.darkPalette.primary.main,
                fontSize: "35px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              MISSION
            </Typography>
            <br />

            <ContentContainer>
              <Typography
                component="ul"
                sx={{
                  textAlign: "justify",
                }}
              >
                <MuiLi component="li" gutterBottom>
                  To make a positive impact on society by practising social
                  responsibility and consciousness.
                </MuiLi>
                <MuiLi component="li" gutterBottom>
                  To promote societal harmony with regard to fundamental human
                  rights.
                </MuiLi>
                <MuiLi component="li" gutterBottom>
                  To encourage unity between cultures and religions and care for
                  the human family.
                </MuiLi>
                <MuiLi component="li" gutterBottom>
                  To encourage student leadership and give them the tools they
                  need to effectively participate in social emancipation.
                </MuiLi>
                <MuiLi component="li" gutterBottom>
                  To deliver a high-quality, comprehensive, career-focused
                  education and to foster an environment that supports both
                  academic and personal achievement.
                </MuiLi>
                <MuiLi component="li" gutterBottom>
                  To promote family, connectivity, and eco-justice while working
                  to preserve the integrity of creation.
                </MuiLi>
              </Typography>
            </ContentContainer>
          </Grid>
        </MuiGrid>
      </OuterBox>
    </>
  );
}
