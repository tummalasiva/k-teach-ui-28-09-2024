import React from "react";
import SubHeader from "../../../SubHeader";

import { Box, Container, Grid, Typography, styled } from "@mui/material";
import image from "../../../../../theme-one/assets/Images/dancing-singing.gif";
import themeData from "../../../../../data/themeData";
import TopNav from "../../TopNav";
import MainNav from "../../MainNav";
import Footer from "../../../Footer";

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: "30px",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));
const Header = styled(Typography)(({ theme }) => ({
  color: themeData.darkPalette.primary.main,
  fontWeight: "bold",

  fontSize: "20px",
}));
export default function DanceAndSinging() {
  return (
    <>
      <TopNav />
      <MainNav />
      <SubHeader
        title="Dance And Singing"
        leftSideHeader="Home"
        rightSideHeader="Facilities"
      />
      <ContentContainer>
        <Box sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            We recognize the importance of arts education in fostering
            creativity, self-expression, and cultural appreciation. In this
            section, we are delighted to present our dedicated Classical Dance
            and Singing Facility, where students can explore and develop their
            talents in these beautiful art forms. Here's what you can expect:
          </Typography>
        </Box>
        <Grid container>
          <Grid item lg={8} md={8} sm={12}>
            <Box>
              <Header>Classical Dance Programs:</Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Dance Styles:</b>
                  <br /> Description of the various classical dance styles
                  offered, such as Bharatanatyam, Kathak, Odissi, or any other
                  relevant dance forms.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Expert Faculty:</b>
                  <br /> Introduction to our highly skilled and experienced
                  dance instructors who provide guidance and training to
                  students.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Curriculum and Progression:</b>
                  <br /> Overview of the structured curriculum, levels, and
                  progression within the dance program, allowing students to
                  develop their skills from beginner to advanced levels.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Performances and Competitions:</b>
                  <br /> Highlights of opportunities for students to showcase
                  their talent through performances at school events, community
                  shows, and participation in dance competitions.
                </Typography>
              </Typography>
              <br />
            </Box>
            <Box>
              <Header>Singing Programs:</Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Vocal Training:</b>
                  <br /> Explanation of our comprehensive singing program,
                  covering vocal techniques, breath control, music theory, and
                  repertoire.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Vocal Styles:</b>
                  <br /> Description of the different vocal styles offered, such
                  as classical, semi-classical, or other genres, depending on
                  the school's specialization.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Vocal Coaches:</b>
                  <br /> Introduction to our dedicated vocal coaches who provide
                  individual attention and guidance to students in their vocal
                  journey.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Choir and Ensemble:</b>
                  <br /> Information about our school choir or vocal ensemble,
                  where students can collaborate and perform together, fostering
                  teamwork and musicality.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Musical Productions:</b>
                  <br /> Highlighting the involvement of our singing students in
                  school musical productions or other theatrical performances.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header>Facilities:</Header>{" "}
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Dance Studios:</b>
                  <br /> Description of our state-of-the-art dance studios
                  equipped with specialized flooring, mirrors, sound systems,
                  and other necessary equipment.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Music Rooms:</b>
                  <br /> Overview of our well-equipped music rooms, including
                  instruments, recording facilities, and practice spaces.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Performance Spaces:</b>
                  <br /> Mention of any dedicated auditorium or performance
                  spaces where students can showcase their talent during
                  concerts, recitals, or annual shows.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header>Extracurricular Activities and Events </Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Dance Workshops and Masterclasses:</b>
                  <br /> Announcement of occasional workshops and masterclasses
                  conducted by renowned artists and experts in the field.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Cultural Festivals:</b>
                  <br /> Information about school events or festivals that
                  celebrate diverse cultures through dance and music
                  performances.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Talent Shows:</b>
                  <br /> Highlighting opportunities for students to participate
                  in talent shows, where they can demonstrate their skills and
                  passion to the school community.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header>Student Achievements:</Header>{" "}
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Recognition and Awards:</b>
                  <br /> Showcasing the accomplishments and awards received by
                  our dance and singing students at local, regional, or national
                  levels.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Alumni Success Stories:</b>
                  <br /> Sharing stories of former students who have pursued
                  careers or further studies in dance, singing, or related
                  fields.
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} padding="10px">
            <img src={image} alt="" style={{ width: "100%" }} />
          </Grid>
        </Grid>
        <Box sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            At Kayaka, we believe that the Classical Dance and Singing Facility
            provides students with a nurturing environment to explore their
            artistic potential, develop discipline, and enhance their
            creativity. Whether they aspire to pursue a career in the arts or
            simply find joy and fulfillment in these art forms, we are committed
            to providing them with the guidance and opportunities to thrive. If
            you have any questions or wish to know more about our Classical
            Dance and Singing Facility, please feel free to contact us
          </Typography>
        </Box>
      </ContentContainer>
      <Footer />
    </>
  );
}
