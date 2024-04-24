import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import themeData from "../../../data/themeData";
import Footer from "../../layout/Footer";
import TopNav from "../../../theme-one/components/Navbar/TopNav";
import Navbar from "../../layout/header/Navbar";

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://i.pinimg.com/originals/5c/02/ef/5c02efe86d5487fdfeca9f8d6a194574.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
}));

const MuiHeadContent = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  textAlign: "center",
  fontSize: 35,
}));

const MuiTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#fff",
  padding: "10px 0",
  fontSize: 16,
}));

export default function DanceAndSinging() {
  return (
    <>
      <TopNav />
      <Navbar />
      <OuterBox>
        <MuiHeadContent variant="h4">DANCE AND SINGING</MuiHeadContent>
        <ContentContainer>
          <MuiTypography>
            We recognize the importance of arts education in fostering
            creativity, self-expression, and cultural appreciation. In this
            section, we are delighted to present our dedicated Classical Dance
            and Singing Facility, where students can explore and develop their
            talents in these beautiful art forms. Here's what you can expect:
          </MuiTypography>
          <Grid container>
            <Grid item lg={8} md={8} sm={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.lightPalette.secondary.main,
                  fontSize: 25,
                }}
              >
                Classical Dance Programs:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Dance Styles:
                  </b>
                  <br /> Description of the various classical dance styles
                  offered, such as Bharatanatyam, Kathak, Odissi, or any other
                  relevant dance forms.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Expert Faculty:
                  </b>
                  <br /> Introduction to our highly skilled and experienced
                  dance instructors who provide guidance and training to
                  students.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Curriculum and Progression:
                  </b>
                  <br /> Overview of the structured curriculum, levels, and
                  progression within the dance program, allowing students to
                  develop their skills from beginner to advanced levels.
                </Typography>
                <Typography component="li" sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Performances and Competitions:
                  </b>
                  <br /> Highlights of opportunities for students to showcase
                  their talent through performances at school events, community
                  shows, and participation in dance competitions.
                </Typography>
              </Typography>
              <br />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.lightPalette.secondary.main,
                  fontSize: 25,
                }}
              >
                Singing Programs:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Vocal Training:
                  </b>
                  <br /> Explanation of our comprehensive singing program,
                  covering vocal techniques, breath control, music theory, and
                  repertoire.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Vocal Styles:
                  </b>
                  <br /> Description of the different vocal styles offered, such
                  as classical, semi-classical, or other genres, depending on
                  the school's specialization.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Vocal Coaches:
                  </b>
                  <br /> Introduction to our dedicated vocal coaches who provide
                  individual attention and guidance to students in their vocal
                  journey.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Choir and Ensemble:
                  </b>
                  <br /> Information about our school choir or vocal ensemble,
                  where students can collaborate and perform together, fostering
                  teamwork and musicality.
                </Typography>
                <Typography component="li" sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Musical Productions:
                  </b>
                  <br /> Highlighting the involvement of our singing students in
                  school musical productions or other theatrical performances.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.lightPalette.secondary.main,
                  fontSize: 25,
                }}
              >
                Facilities:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Dance Studios:
                  </b>
                  <br /> Description of our state-of-the-art dance studios
                  equipped with specialized flooring, mirrors, sound systems,
                  and other necessary equipment.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Music Rooms:
                  </b>
                  <br /> Overview of our well-equipped music rooms, including
                  instruments, recording facilities, and practice spaces.
                </Typography>
                <Typography component="li" sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Performance Spaces:
                  </b>
                  <br /> Mention of any dedicated auditorium or performance
                  spaces where students can showcase their talent during
                  concerts, recitals, or annual shows.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.lightPalette.secondary.main,
                  fontSize: 25,
                }}
              >
                Extracurricular Activities and Events:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Dance Workshops and Masterclasses:
                  </b>
                  <br /> Announcement of occasional workshops and masterclasses
                  conducted by renowned artists and experts in the field.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Cultural Festivals:
                  </b>
                  <br /> Information about school events or festivals that
                  celebrate diverse cultures through dance and music
                  performances.
                </Typography>
                <Typography component="li" sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Talent Shows:
                  </b>
                  <br /> Highlighting opportunities for students to participate
                  in talent shows, where they can demonstrate their skills and
                  passion to the school community.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.lightPalette.secondary.main,
                  fontSize: 25,
                }}
              >
                Student Achievements:
              </Typography>
              <Typography component="ul">
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Recognition and Awards:
                  </b>
                  <br /> Showcasing the accomplishments and awards received by
                  our dance and singing students at local, regional, or national
                  levels.
                </Typography>
                <Typography component="li" gutterBottom sx={{ color: "white" }}>
                  <b
                    style={{
                      fontSize: 18,
                      color: themeData.darkPalette.primary.main,
                    }}
                  >
                    Alumni Success Stories:
                  </b>
                  <br /> Sharing stories of former students who have pursued
                  careers or further studies in dance, singing, or related
                  fields.
                </Typography>
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} padding="10px">
              <img
                src="https://www.pepplay.in/wp-content/uploads/2022/02/bharathanatyam-begginers-dr-pooja-vijayan-primary-image-tphbCZpEhXSQMpbI.jpg-1024x683.jpg"
                title="Dance and Singing"
                alt="loading..."
                style={{ maxWidth: "100%" }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontWeight: 700,
              color: "white",
              padding: "10px 0",
              fontSize: 16,
            }}
          >
            At Kayaka, we believe that the Classical Dance and Singing Facility
            provides students with a nurturing environment to explore their
            artistic potential, develop discipline, and enhance their
            creativity. Whether they aspire to pursue a career in the arts or
            simply find joy and fulfillment in these art forms, we are committed
            to providing them with the guidance and opportunities to thrive. If
            you have any questions or wish to know more about our Classical
            Dance and Singing Facility, please feel free to contact us.
          </Typography>
        </ContentContainer>
        <Footer />
      </OuterBox>
    </>
  );
}
