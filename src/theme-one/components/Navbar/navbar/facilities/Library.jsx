import React from "react";
import SubHeader from "../../../SubHeader";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import image from "../../../../../theme-one/assets/Images/library.gif";
import themeData from "../../../../../data/themeData";

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

export default function Library() {
  return (
    <>
      <SubHeader
        title="Library"
        leftSideHeader="Home"
        rightSideHeader="Facilities"
      />
      <ContentContainer>
        <Box sx={{ padding: "15px 0" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
            Our school library is a hub of knowledge and a vibrant learning
            space that encourages students to explore, discover, and expand
            their horizons. Here, we provide a welcoming environment for
            students to foster a love for reading, conduct research, and develop
            information literacy skills. Take a look at what our library
            facility has to offer:
          </Typography>
        </Box>
        <Grid container>
          <Grid item lg={8} md={8} sm={12}>
            <Box>
              <Header variant="h6" gutterBottom>
                Library Collection:
              </Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Diverse Book Selection:</b>
                  <br /> Information about our extensive collection of fiction,
                  non-fiction, reference materials, and periodicals covering a
                  wide range of genres and subjects.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Digital Resources:</b>
                  <br /> Introduction to our e-books, online databases, and
                  digital resources that provide students with access to a
                  wealth of information for research and independent learning.
                </Typography>
                <Typography component="li" fontSize={16}>
                  <b>Multilingual Materials:</b>
                  <br /> Highlighting our collection of books and resources in
                  different languages to cater to the diverse needs of our
                  student body.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header variant="h6" gutterBottom>
                Library Services:
              </Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Borrowing and Renewal:</b>
                  <br /> Details on how students can check out books, and manage
                  their library accounts.
                </Typography>
                <Typography component="li" fontSize={16}>
                  <b>Research Support:</b>
                  <br /> Information about our library staff who are available
                  to assist students with research projects, finding relevant
                  resources, and developing information literacy skills.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header variant="h6" gutterBottom>
                Study Spaces and Facilities:
              </Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Reading Areas:</b>
                  <br /> Description of cozy reading nooks, comfortable seating,
                  and quiet study areas available for students to immerse
                  themselves in their chosen books.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Collaborative Spaces:</b>
                  <br /> Introduction to collaborative workstations and group
                  study rooms where students can collaborate on projects, engage
                  in discussions, and work together.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Computer Stations:</b> <br /> Overview of computer
                  workstations equipped with internet access and necessary
                  software for research and academic purposes.
                </Typography>
                <Typography component="li" fontSize={16}>
                  <b>Printing and Scanning:</b> <br />
                  Information on the availability of printing and scanning
                  facilities for students' academic needs.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header variant="h6" gutterBottom>
                Library Programs and Events:
              </Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Reading Programs:</b> <br /> Description of reading
                  challenges, book clubs, and other initiatives that promote a
                  reading culture among students, fostering a lifelong love for
                  literature.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Author Visits and Workshops:</b> <br /> Announcement of
                  special events featuring visits from renowned authors, writing
                  workshops, and literary discussions that inspire students'
                  creativity and passion for writing.
                </Typography>
                <Typography component="li" fontSize={16}>
                  <b>Book Fairs and Expos:</b> <br /> Highlighting annual book
                  fairs and expos held at the school, providing opportunities
                  for students to explore and purchase a variety of books.
                </Typography>
                <br />
              </Typography>
            </Box>
            <Box>
              <Header variant="h6" gutterBottom>
                Online Library Resources:
              </Header>
              <Typography component="ul">
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Library Catalog:</b> <br /> Link to our online library
                  catalog, enabling students to search for books, check
                  availability, and place holds.
                </Typography>
                <Typography component="li" gutterBottom fontSize={16}>
                  <b>Recommended Reading Lists:</b> <br /> Compilation of
                  recommended reading lists for different grade levels and
                  genres, helping students discover new books and broaden their
                  reading interests.
                </Typography>
                <Typography component="li" fontSize={16}>
                  <b>Online Research Databases:</b> <br /> Access information
                  about the digital databases and online resources available for
                  academic research and information gathering.
                </Typography>
                <br />
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} padding="10px">
            <img src={image} alt="" style={{ maxWidth: "100%" }} />
          </Grid>
        </Grid>
        <Box sx={{ padding: "15px 0" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
            We invite students, teachers, and parents to make the most of our
            library facility and its resources. Our aim is to cultivate a love
            for reading, nurture critical thinking skills, and empower students
            to become lifelong learners. If you have any questions or need
            assistance, please feel free to contact our library staff. Happy
            reading and exploring!
          </Typography>
        </Box>
      </ContentContainer>
    </>
  );
}
