/** @format */

import {
  Box,
  Container,
  Typography,
  styled,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import first from "../../../assets/images/first.jpg";
import second from "../../../assets/images/second.jpg";
import SubHeader from "../../../../theme-one/components/SubHeader";

const ContentBox = styled(Box)(({ theme }) => ({
  paddingBottom: "30px",

  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "5px 15px",
  },
}));

const Primary = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  return (
    <>
      <ContentBox sx={{ height: "max-content" }}>
        <SubHeader
          title="Primary"
          leftSideHeader="HOME"
          rightSideHeader="Primary"
        />

        <Container maxWidth="xl">
          <Box
            sx={{
              textAlign: "justify",
              marginTop: "30px",
              px: { xs: 0, md: 8 },
            }}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  variant="contained"
                  onClick={() => setSelectedCardIndex(0)}
                  sx={{
                    width: "260px",
                    height: "60px",
                    margin: "20px 0px",
                    fontWeight: 600,
                    fontSize: "16px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    color:
                      selectedCardIndex === 0
                        ? (theme) => theme.palette.primary.main
                        : "#fff",
                    backgroundColor:
                      selectedCardIndex === 0
                        ? "#fff"
                        : (theme) => theme.palette.primary.main,
                    "&:hover": {
                      color: (theme) => theme.palette.primary.main,
                      background: "#fff",
                    },
                  }}>
                  1st Grade
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSelectedCardIndex(1)}
                  sx={{
                    width: "260px",
                    height: "60px",
                    margin: "20px 0px",
                    fontWeight: 600,
                    fontSize: "16px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    color:
                      selectedCardIndex === 1
                        ? (theme) => theme.palette.primary.main
                        : "#fff",
                    backgroundColor:
                      selectedCardIndex === 1
                        ? "#fff"
                        : (theme) => theme.palette.primary.main,
                    "&:hover": {
                      color: (theme) => theme.palette.primary.main,
                      background: "#fff",
                    },
                  }}>
                  2nd Grade
                </Button>
              </Grid>
              <Grid item xs={12} md={9} lg={9}>
                {selectedCardIndex === 0 && (
                  <Card sx={{ margin: "20px 0px", padding: "30px" }}>
                    <CardContent>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ color: "blue", fontSize: "16px" }}>
                        First Grade
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        In India, first grade is typically known as Class 1 or
                        Standard 1, and is the first year of primary school. It
                        is designed for children who are around six years old.
                      </Typography>
                      <Box>
                        <img src={first} alt="first" width="100%" />
                      </Box>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        First grade programs in India are designed to build on
                        the skills and knowledge that children have acquired in
                        kindergarten and to help them continue to develop
                        important academic, social, and emotional skills. The
                        curriculum is typically structured around a range of
                        activities that are designed to be developmentally
                        appropriate and engaging for young children. These
                        activities may include reading, writing, math, science,
                        social studies, art, music, and physical education, as
                        well as more structured activities such as circle time,
                        story time, and snack time.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        First grade programs in India may be run by public
                        schools, private schools, or community organizations,
                        and may be held in a variety of settings, including
                        traditional classrooms, daycare centers, or even in the
                        home. The specific goals and curriculum of a first grade
                        program in India will vary depending on the individual
                        program, but they are generally designed to provide
                        children with a strong foundation for success in later
                        grades and to support their overall development.
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Eligibility for First Grade Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to First Grade, a child should be at least
                        5.5 years as on 1st June
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Admission Selection Process
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to First Grade, The child will do a
                        reading and logical activity
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Required documents for First Grade Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        1. Copies of past scholastic record of at least 2 years
                        (if applicable)
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2. 5 recent passport size photographs of the student
                        with the name of the child written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3. 1 recent colored passport size photograph of each
                        parent and the name and relationship written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        4. Copy of the brith certificate
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {selectedCardIndex === 1 && (
                  <Card sx={{ margin: "20px 0px", padding: "30px" }}>
                    <CardContent>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ color: "blue", fontSize: "16px" }}>
                        Second Grade
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        In India, second grade is typically known as Class 2 or
                        Standard 2, and is the second year of primary school. It
                        is designed for children who are around seven or eight
                        years old.
                      </Typography>
                      <Box>
                        <img src={second} alt="first" width="100%" />
                      </Box>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Second grade programs in India are designed to build on
                        the skills and knowledge that children have acquired in
                        first grade and to help them continue to develop
                        important academic, social, and emotional skills. The
                        curriculum is typically structured around a range of
                        activities that are designed to be developmentally
                        appropriate and engaging for young children. These
                        activities may include reading, writing, math, science,
                        social studies, art, music, and physical education, as
                        well as more structured activities such as circle time,
                        story time, and snack time.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Second grade programs in India may be run by public
                        schools, private schools, or community organizations,
                        and may be held in a variety of settings, including
                        traditional classrooms, daycare centers, or even in the
                        home. The specific goals and curriculum of a second
                        grade program in India will vary depending on the
                        individual program, but they are generally designed to
                        provide children with a strong foundation for success in
                        later grades and to support their overall development.
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Eligibility for Second Grade Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Second Grade, a child should be at
                        least 5.5 years as on 1st June
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Admission Selection Process
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Second Grade, The child will do a
                        reading and logical activity
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Required documents for Second Grade Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        1. Copies of past scholastic record of at least 2 years
                        (if applicable)
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2. 5 recent passport size photographs of the student
                        with the name of the child written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3. 1 recent colored passport size photograph of each
                        parent and the name and relationship written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        4. Copy of the brith certificate
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ContentBox>
    </>
  );
};

export default Primary;
