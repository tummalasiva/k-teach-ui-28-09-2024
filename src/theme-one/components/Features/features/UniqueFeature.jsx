import { Container, Typography, styled } from "@mui/material";
import React from "react";
import SubHeader from "../../SubHeader";
import themeData from "../../../../data/themeData";
import uniqueFeaturesList from "../../data/uniqueFeatures";

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

const UniqueFeature = () => {
  return (
    <>
      <SubHeader
        title="Unique Features"
        leftSideHeader="Home"
        rightSideHeader="Unique Features"
      />
      <Container>
        <FooterText>
          Kayaka, we believe that effective communication and collaboration
          between parents and the school are crucial for the holistic
          development and success of our students. In this section, you will
          find important information, resources, and updates specifically
          designed to keep parents informed and engaged in their child's
          education journey
        </FooterText>
        <Typography component="ol">
          {uniqueFeaturesList.map((d, i) => (
            <>
              <Title component="li">{d.title}</Title>
              {d.description.map((v, i) => (
                <>
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
                </>
              ))}
            </>
          ))}
        </Typography>
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold", my: 3 }}
          varient="h4"
        >
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
