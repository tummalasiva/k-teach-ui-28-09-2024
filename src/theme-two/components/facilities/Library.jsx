import React from "react";
import { Typography, Box, styled, Container, Grid } from "@mui/material";
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

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://www.pem.cam.ac.uk/sites/default/files/hero/e81a7985_2.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  paddingTop: "150px",
}));

export default function Library() {
  const textContent = "white";

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
          LIBRARY
        </Typography>
        <ContentContainer>
          <Typography
            sx={{
              fontWeight: 700,
              color: textContent,
              padding: "10px 0",
              fontSize: 16,
            }}
          >
            Our school library is a hub of knowledge and a vibrant learning
            space that encourages students to explore, discover, and expand
            their horizons. Here, we provide a welcoming environment for
            students to foster a love for reading, conduct research, and develop
            information literacy skills. Take a look at what our library
            facility has to offer:
          </Typography>
          <Grid container>
            <Grid item lg={8} md={8} sm={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.darkPalette.primary.main,
                  fontSize: 25,
                }}
              >
                Library Collection:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Diverse Book Selection:</b>
                  <br /> Information about our extensive collection of fiction,
                  non-fiction, reference materials, and periodicals covering a
                  wide range of genres and subjects.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Digital Resources:</b>
                  <br /> Introduction to our e-books, online databases, and
                  digital resources that provide students with access to a
                  wealth of information for research and independent learning.
                </Typography>
                <Typography
                  component="li"
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Multilingual Materials:</b>
                  <br /> Highlighting our collection of books and resources in
                  different languages to cater to the diverse needs of our
                  student body.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.darkPalette.primary.main,
                  fontSize: 25,
                }}
              >
                Library Services:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Borrowing and Renewal:</b>
                  <br /> Details on how students can check out books, and manage
                  their library accounts.
                </Typography>
                <Typography
                  component="li"
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Research Support:</b>
                  <br /> Information about our library staff who are available
                  to assist students with research projects, finding relevant
                  resources, and developing information literacy skills.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.darkPalette.primary.main,
                  fontSize: 25,
                }}
              >
                Study Spaces and Facilities:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Reading Areas:</b>
                  <br /> Description of cozy reading nooks, comfortable seating,
                  and quiet study areas available for students to immerse
                  themselves in their chosen books.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Collaborative Spaces:</b>
                  <br /> Introduction to collaborative workstations and group
                  study rooms where students can collaborate on projects, engage
                  in discussions, and work together.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Computer Stations:</b> <br /> Overview of computer
                  workstations equipped with internet access and necessary
                  software for research and academic purposes.
                </Typography>
                <Typography
                  component="li"
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Printing and Scanning:</b> <br />
                  Information on the availability of printing and scanning
                  facilities for students' academic needs.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.darkPalette.primary.main,
                  fontSize: 25,
                }}
              >
                Library Programs and Events:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Reading Programs:</b> <br /> Description of reading
                  challenges, book clubs, and other initiatives that promote a
                  reading culture among students, fostering a lifelong love for
                  literature.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Author Visits and Workshops:</b> <br /> Announcement of
                  special events featuring visits from renowned authors, writing
                  workshops, and literary discussions that inspire students'
                  creativity and passion for writing.
                </Typography>
                <Typography
                  component="li"
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Book Fairs and Expos:</b> <br /> Highlighting annual book
                  fairs and expos held at the school, providing opportunities
                  for students to explore and purchase a variety of books.
                </Typography>
                <br />
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: themeData.darkPalette.primary.main,
                  fontSize: 25,
                }}
              >
                Online Library Resources:
              </Typography>
              <Typography component="ul">
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Library Catalog:</b> <br /> Link to our online library
                  catalog, enabling students to search for books, check
                  availability, and place holds.
                </Typography>
                <Typography
                  component="li"
                  gutterBottom
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Recommended Reading Lists:</b> <br /> Compilation of
                  recommended reading lists for different grade levels and
                  genres, helping students discover new books and broaden their
                  reading interests.
                </Typography>
                <Typography
                  component="li"
                  sx={{ color: textContent, fontSize: 16 }}
                >
                  <b>Online Research Databases:</b> <br /> Access information
                  about the digital databases and online resources available for
                  academic research and information gathering.
                </Typography>
                <br />
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} padding="10px">
              <img
                src="https://images.unsplash.com/photo-1526248283201-fafd30eb2b90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="loading..."
                style={{ maxWidth: "100%" }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontWeight: 700,
              color: textContent,
              padding: "15px 0",
              fontSize: 16,
            }}
          >
            We invite students, teachers, and parents to make the most of our
            library facility and its resources. Our aim is to cultivate a love
            for reading, nurture critical thinking skills, and empower students
            to become lifelong learners. If you have any questions or need
            assistance, please feel free to contact our library staff. Happy
            reading and exploring!
          </Typography>
        </ContentContainer>
      </OuterBox>
    </>
  );
}
