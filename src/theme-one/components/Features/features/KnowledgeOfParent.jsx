import React from "react";
import { Typography, Container, styled } from "@mui/material";
import SubHeader from "../../SubHeader";
import themeData from "../../../../data/themeData";
import knowledgeOfParenentList from "../../data/knowledgeOfParent";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: themeData.darkPalette.primary.main,
  marginTop: "20px",
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  margin: "30px 0px",
}));

const KnowledgeOfParent = () => {
  return (
    <>
      <SubHeader
        title="To the knowledge of parents"
        leftSideHeader="Home"
        rightSideHeader="To The Knowledge Of Parents"
      />

      <Container>
        <FooterText>
          At Kayaka, we take pride in offering a range of distinctive features
          and programs that set us apart from other educational institutions.
          These unique aspects contribute to our students' well-rounded
          development and provide them with enriching experiences. Here are some
          of the remarkable features you'll find at our school:
        </FooterText>

        <Typography gutterBottom component="ol">
          {knowledgeOfParenentList.map((d, i) => (
            <>
              <Title gutterBottom component="li">
                {d.title}
              </Title>
              {d.description.map((v, i) => (
                <>
                  <Typography component="ul" type="disc">
                    <Typography
                      variant="h6"
                      component="li"
                      sx={{ fontSize: 16 }}
                      color="initial"
                    >
                      {v}
                    </Typography>
                  </Typography>
                </>
              ))}
            </>
          ))}
        </Typography>
        <FooterText>
          These unique features represent the diverse opportunities available to
          our students at Kayaka. We invite you to explore our website further
          to learn more about each aspect and discover how they contribute to an
          exceptional educational experience. If you have any questions or
          require additional information, please don't hesitate to contact us.
        </FooterText>
      </Container>
    </>
  );
};

export default KnowledgeOfParent;
