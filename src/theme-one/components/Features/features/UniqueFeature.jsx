import { Container, Typography, styled, Box } from "@mui/material";
import React from "react";
import SubHeader from "../../SubHeader";

const UniqueFeature = () => {
  const data = [
    {
      title: "Innovative Curriculum:",
      description: [
        "Description of any specialized curriculum or educational approach that distinguishes our school from others.",
        "Integration of technology in learning: Highlighting how we incorporate digital tools and resources to enhance education.",
      ],
    },
    {
      title: "Enrichment Programs:",
      description: [
        "STEM (Science, Technology, Engineering, and Mathematics) Education: Highlighting our focus on STEM subjects through specialized courses, projects, and extracurricular activities.",
        "Fine Arts Programs: Description of our robust arts curriculum, including visual arts, music, drama, and dance, and opportunities for students to showcase their talents.",
      ],
    },
    {
      title: "Language Immersion",
      description: [
        "Dual Language Programs: Explanation of our immersive language programs, where students become fluent in both English and another language, enhancing their cultural awareness and global competence.",
        "World Language Offerings: Overview of the range of languages offered for study, emphasizing the importance of language learning in today's interconnected world.",
      ],
    },
    {
      title: "Community Engagement:",
      description: [
        "Service-Learning Initiatives: Description of our community service programs, highlighting how students actively contribute to local and global communities.",
        "Partnerships with Local Organizations: Showcase of collaborations with community organizations, businesses, and universities to provide students with real-world learning experiences.",
      ],
    },
    {
      title: "Technology Integration:",
      description: [
        "One-to-One Device Program: Explanation of our initiative to provide each student with a personal device for enhanced learning and digital literacy.",
        "Virtual Learning Opportunities: Highlighting our online learning options, allowing students to access coursework remotely and explore a wider range of subjects.",
      ],
    },
    {
      title: "Sports and Athletics:",
      description: [
        "Unique Sports Offerings: Description of any distinctive sports programs, unique facilities, or specialized training available at our school.",
        "Team Achievements: Highlighting notable accomplishments of our sports teams and individual athletes in local, regional, or national competitions.",
      ],
    },
  ];
  return (
    <>
      <SubHeader
        title="Unique Features"
        leftSideHeader="Home"
        rightSideHeader="Unique Features"
      />
      <Container>
        <Typography mt={5} style={{ fontSize: 16 }} varient="h4">
          Kayaka, we believe that effective communication and collaboration
          between parents and the school are crucial for the holistic
          development and success of our students. In this section, you will
          find important information, resources, and updates specifically
          designed to keep parents informed and engaged in their child's
          education journey
        </Typography>
        <Typography component="ol">
          {data.map((d, i) => (
            <Container>
              <Typography
                sx={{ fontSize: 16, fontWeight: 600 }}
                variant="h5"
                color="initial"
                component="li"
              >
                {d.title}
              </Typography>
              {d.description.map((v, i) => (
                <Container>
                  <Typography component="ul" type="disc">
                    <Typography
                      variant="h6"
                      style={{ fontSize: 16 }}
                      color="initial"
                      component="li"
                    >
                      {v}
                    </Typography>
                  </Typography>
                </Container>
              ))}
            </Container>
          ))}
        </Typography>
        <Typography sx={{ fontSize: 16 }} varient="h4">
          Please note that this is a general outline, and specific information
          relevant to your school should be included. We encourage you to
          explore the other sections of our website for a more comprehensive
          understanding of our school community. If you have any questions or
          require further assistance, please don't hesitate to contact us. We
          value your partnership in your child's education!
        </Typography>
      </Container>
    </>
  );
};

export default UniqueFeature;
