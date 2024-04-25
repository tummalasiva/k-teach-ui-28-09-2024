import React from "react";
import { Typography, Container } from "@mui/material";
import SubHeader from "../../SubHeader";

const KnowledgeOfParent = () => {
  const list = [
    {
      title: "Academic Programs:",
      description: [
        "Overview of our curriculum, teaching methodologies, and educational approach.",
        "Information about specific academic programs offered, including advanced placement, international baccalaureate, or specialized programs.",
      ],
    },
    {
      title: "School Policies and Guidelines:",
      description: [
        "Code of Conduct: Expectations, discipline policies, and guidelines for students.",
        "Attendance Policy: Information on attendance requirements, procedures for reporting absences, and tardiness.",
        "Uniform Policy: Details regarding the school's dress code and uniform requirements.",
        "Technology Policy: Guidelines for the responsible and safe use of technology on campus.",
        "Homework Policy: Information on homework expectations, guidelines, and support resources.",
      ],
    },
    {
      title: "Parent-Teacher Collaboration:",
      description: [
        "Parent-Teacher Conferences: Dates, scheduling procedures, and tips for productive meetings with teachers.",
        "Volunteer Opportunities: Ways for parents to get involved in school activities, clubs, and events.",
      ],
    },
    {
      title: "Communication Channels:",
      description: [
        "Parent Portal: Access to an online platform where parents can view their child's academic progress, attendance records, and communicate with teachers.",
        "Social Media: Links to official school social media accounts for quick news and announcements.",
        "Contact Information: Details on how to reach the school administration, teachers, and support staff.",
      ],
    },
    {
      title: "Health and Safety:",
      description: [
        "School Health Services: Information on the availability of health services, medication administration, and emergency procedures.",
        "Safety Measures: Overview of the school's security protocols, emergency drills, and safety policies.",
      ],
    },
    {
      title: "Parent Resources:",
      description: [
        "Academic Support: Links to online resources, tutoring services, and study guides to assist parents in supporting their child's learning.",
        "Parent Education: Workshops, seminars, and articles on topics related to parenting, child development, and education.",
        "Community Resources: Information on local organizations, libraries, and extracurricular activities available to students and families.",
      ],
    },
  ];

  return (
    <>
      <SubHeader
        title="To the knowledge of parents"
        leftSideHeader="Home"
        rightSideHeader="To The Knowledge Of Parents"
      />

      <Container>
        <Typography style={{ fontSize: 16 }} mt={5} varient="h4">
          At Kayaka, we take pride in offering a range of distinctive features
          and programs that set us apart from other educational institutions.
          These unique aspects contribute to our students' well-rounded
          development and provide them with enriching experiences. Here are some
          of the remarkable features you'll find at our school:
        </Typography>
        <Typography component="ol">
          {list.map((d, i, a) => (
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
                  <Typography
                    variant="h6"
                    component="li"
                    sx={{ fontSize: 16 }}
                    color="initial"
                  >
                    {v}
                  </Typography>
                </Container>
              ))}
            </Container>
          ))}
        </Typography>
        <Typography style={{ fontSize: 18 }} varient="h4">
          These unique features represent the diverse opportunities available to
          our students at Kayaka. We invite you to explore our website further
          to learn more about each aspect and discover how they contribute to an
          exceptional educational experience. If you have any questions or
          require additional information, please don't hesitate to contact us.
        </Typography>
      </Container>
    </>
  );
};

export default KnowledgeOfParent;
