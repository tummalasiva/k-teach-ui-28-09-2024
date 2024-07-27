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
import first from "../../../assets/images/nursery.jpg";
import second from "../../../assets/images/lkg.jpg";
import third from "../../../assets/images/ukg.jpg";
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

const PrePrimary = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  return (
    <>
      <ContentBox sx={{ height: "max-content" }}>
        <SubHeader
          title="Pre-Primary"
          leftSideHeader="HOME"
          rightSideHeader="Pre-Primary"
        />
        <Container maxWidth="xl">
          <Box
            sx={{
              textAlign: "justify",
              marginTop: "30px",
              px: { xs: 2, md: 8 },
            }}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid
                item
                xs={12}
                md={4}
                lg={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}>
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
                  PRE-PRIMARY 1(NURSERY)
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
                  PRE-PRIMARY 2(LKG)
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSelectedCardIndex(2)}
                  sx={{
                    width: "260px",
                    height: "60px",
                    margin: "20px 0px",
                    fontWeight: 600,
                    fontSize: "16px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    color:
                      selectedCardIndex === 2
                        ? (theme) => theme.palette.primary.main
                        : "#fff",
                    backgroundColor:
                      selectedCardIndex === 2
                        ? "#fff"
                        : (theme) => theme.palette.primary.main,
                    "&:hover": {
                      color: (theme) => theme.palette.primary.main,
                      background: "#fff",
                    },
                  }}>
                  PRE-PRIMARY 3(UKG)
                </Button>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                {selectedCardIndex === 0 && (
                  <Card
                    sx={{
                      margin: "20px 0px",
                      padding: "30px",
                    }}>
                    <CardContent>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ color: "blue", fontSize: "16px" }}>
                        Pre-Primary 1 (Nursery)
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        Nursery school, also known as preschool, is a type of
                        educational program for children who are typically
                        between the ages of three and five. Nursery schools are
                        designed to provide children with a structured, yet
                        developmentally appropriate learning environment that
                        fosters social, emotional, physical, and cognitive
                        development.
                      </Typography>
                      <Box>
                        <img src={first} alt="first" width="100%" />
                      </Box>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        In a nursery school program, children engage in a
                        variety of activities that are designed to help them
                        develop important skills and knowledge. These activities
                        may include play, art, music, movement, and language
                        development, as well as more structured activities such
                        as circle time, story time, and snack time.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Nursery school programs may be run by public schools,
                        private schools, or community organizations, and may be
                        held in a variety of settings, including traditional
                        classrooms, daycare centers, or even in the home. The
                        specific goals and curriculum of a nursery school
                        program will vary depending on the individual program,
                        but they are generally designed to provide children with
                        a foundation for success in later grades and to support
                        their overall development.
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ color: "blue", mt: 2 }}>
                        Eligibility for Pre-Primary 1 (Nursery) Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Second Grade, a child should be at
                        least 5.5 years as on 1st June
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ color: "blue", mt: 2 }}>
                        Admission Selection Process
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Pre-Primary 1 (Nursery), the child will
                        be given sensorial, tactile and kinesthetic activities
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ color: "blue", mt: 2 }}>
                        Required documents for Pre-Primary 1 (Nursery) Admission
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        1. 5 recent passport size photographs of the student
                        with the name of the child written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2. 1 recent colored passport size photograph of each
                        parent and the name and relationship written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3. Copy of the brith certificate
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
                        component="h2"
                        sx={{ color: "blue", fontSize: "16px" }}>
                        Pre-Primary 2 (LKG)
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        LKG, or Lower Kindergarten, is a level of education that
                        is typically part of the primary school system in India.
                        It is typically the first year of primary school, and is
                        designed for children who are around four or five years
                        old.
                      </Typography>
                      <Box>
                        <img src={second} alt="first" width="100%" />
                      </Box>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        LKG programs are designed to provide children with a
                        strong foundation in basic skills such as language
                        development, math, and science. The curriculum is
                        usually structured around a range of activities that are
                        designed to be developmentally appropriate and engaging
                        for young children. These activities may include play,
                        art, music, movement, and language development, as well
                        as more structured activities such as circle time, story
                        time, and snack time.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        LKG programs may be run by public schools, private
                        schools, or community organizations, and may be held in
                        a variety of settings, including traditional classrooms,
                        daycare centers, or even in the home. The specific goals
                        and curriculum of an LKG program will vary depending on
                        the individual program, but they are generally designed
                        to provide children with a strong foundation for success
                        in later grades and to support their overall
                        development.
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Eligibility for Pre-Primary 2 (LKG) Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Pre-Primary 2 (LKG), a child should be
                        at least 3.5 years as on 1st June
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Admission Selection Process
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Pre-Primary 2 (LKG), the child will be
                        given sensorial, tactile and kinesthetic activities
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Required documents for Pre-Primary 2 (LKG) Admission
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        1. 5 recent passport size photographs of the student
                        with the name of the child written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2. 1 recent colored passport size photograph of each
                        parent and the name and relationship written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3. Copy of the brith certificate
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {selectedCardIndex === 2 && (
                  <Card sx={{ margin: "20px 0px", padding: "30px" }}>
                    <CardContent>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", fontSize: "16px" }}>
                        Pre-Primary 3 (UKG)
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        UKG, or Upper Kindergarten, is a level of education that
                        is typically part of the primary school system in India.
                        It is the second year of primary school, and is designed
                        for children who are around five or six years old.
                      </Typography>
                      <Box>
                        <img src={third} alt="first" width="100%" />
                      </Box>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        UKG programs build on the skills and knowledge that
                        children have acquired in LKG (Lower Kindergarten) and
                        are designed to continue supporting their overall
                        development. The curriculum is typically structured
                        around a range of activities that are designed to be
                        developmentally appropriate and engaging for young
                        children. These activities may include play, art, music,
                        movement, and language development, as well as more
                        structured activities such as circle time, story time,
                        and snack time.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        UKG programs may be run by public schools, private
                        schools, or community organizations, and may be held in
                        a variety of settings, including traditional classrooms,
                        daycare centers, or even in the home. The specific goals
                        and curriculum of a UKG program will vary depending on
                        the individual program, but they are generally designed
                        to provide children with a strong foundation for success
                        in later grades and to support their overall
                        development.
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Eligibility for Pre-Primary 3 (UKG) Admission
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Pre-Primary 3 (UKG), a child should be
                        at least 4.5 years as on 1st June
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Admission Selection Process
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        For admission to Pre-Primary 3 (UKG), the child will be
                        given sensorial, tactile and kinesthetic activities
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: "blue", mt: 2 }}>
                        Required documents for Pre-Primary 3 (UKG) Admission
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        1. 5 recent passport size photographs of the student
                        with the name of the child written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2. 1 recent colored passport size photograph of each
                        parent and the name and relationship written behind each
                        photograph
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3. Copy of the brith certificate
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

export default PrePrimary;
