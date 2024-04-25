import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import founderimg from "../../assets/images/founder.png";
import themeData from "../../../data/themeData";

const OuterBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://images.unsplash.com/photo-1533901567451-7a6e68d6cd8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "cover",
  paddingTop: "150px",
}));

export default function Founder() {
  return (
    <>
      <OuterBox component="div">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: { xs: 1, sm: 2, md: 22 },
            paddingBottom: "60px",
          }}
        >
          <img
            src={founderimg}
            alt="loading..."
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          />
          <Typography
            variant="h4"
            sx={{ color: themeData.darkPalette.primary.main, mt: 1 }}
          >
            Sri. Shivaraj T. Patil
          </Typography>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                marginTop: "20px",
                lineHeight: "25px",
                textAlign: "justify",
              }}
            >
              Sri. Shivaraj T. Patil, the founder of the Kayaka Foundation
              Education Trust, is a man of many manifestations, hails from
              Devdurg of Raichur district, completed his B.E. from PDA College
              of Engineering, Gulbarga. He joined Infosys, Bangalore, served for
              a period of 6 months, then went to US for Consultancy job and
              completed MBA from Michigan University of America.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "white",
                marginTop: "20px",
                lineHeight: "25px",
                textAlign: "justify",
              }}
            >
              The sum total synthesis of whatever Patil observed, experienced,
              fascinated, in the field of American educational system- may it be
              of innovation, practicality, creativity, researching is the Kayaka
              Foundation, the brain child of Patil.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "white",
                marginTop: "20px",
                lineHeight: "25px",
                textAlign: "justify",
              }}
            >
              Shivaraj Patil, strongly believes that a child with strong
              determination can change the destiny. After returning from USA, he
              thought always that Indian children should compete in all the
              fields- may it be an academic excellence or the process of
              research (especially scientists).
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "white",
                marginTop: "20px",
                lineHeight: "25px",
                textAlign: "justify",
              }}
            >
              Patil has a vision in his philosophy of education that the
              students of Kayaka Foundation should hold their heads high, i.e.,
              self-reliant what the American philosopher says "SELF RELIANCE IS
              GOD RELIANCE" - they should continuously participate in
              international cultural exchange programme of America and to
              develop the scientific knowledge in education they (the students)
              should aim for research oriented knowledge purely meant for
              scientists. He has the greater dream to collaborate - THINK AND
              INK SCIENCE FOUNDATION of Germany, which always aims at achieving
              to get the Nobel prizes.
            </Typography>
          </Box>
        </Box>
      </OuterBox>
    </>
  );
}
