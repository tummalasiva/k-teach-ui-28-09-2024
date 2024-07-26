/** @format */

import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";
import CountUp from "react-countup";

import image from "../assets/images/bg_4.jpg";

const TextContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "100px 0px",
}));

const HeaderText = styled(Box)(({ theme }) => ({
  fontSize: "46px",
  fontWeight: 600,
  color: "#1eaaf1",
  letterSpacing: 3.1,
  lineHeight: 2.3,
}));

const MuiBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "5rem",
}));

export default function Experience() {
  return (
    <>
      <MuiBox>
        <TextContainer>
          <Typography
            variant="h3"
            style={{
              color: "#5d50c6",
              fontWeight: 600,
              fontSize: "40px",
            }}>
            20 Years of{" "}
            <Typography
              variant="span"
              style={{
                color: "black",
                fontSize: "40px",
              }}>
              Experience
            </Typography>
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "#00000080",
              lineHeight: 1.5,
              marginTop: "30px",
              letterSpacing: 0.8,
              color: "#00000080",
              marginTop: "30px",
            }}>
            We have 20+ years of very vast experience in the field of
            educational institution
          </Typography>
          <Box
            gap={{ xs: 1, md: 15 }}
            sx={{
              padding: "50px 0",
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              textAlign: "center",
              color: "#000000cc",
            }}>
            <Stack spacing={2}>
              <HeaderText>
                <CountUp end={15} delay={2} enableScrollSpy={true} />
              </HeaderText>
              <Typography>Experienced Teachers</Typography>
            </Stack>
            <Stack spacing={2}>
              <HeaderText>
                <CountUp end={351} enableScrollSpy={true} />
              </HeaderText>
              <Typography>Successful Kids</Typography>
            </Stack>
            <Stack spacing={2}>
              <HeaderText>
                <CountUp end={564} enableScrollSpy={true} />
              </HeaderText>
              <Typography>Happy Parents</Typography>
            </Stack>
            <Stack spacing={2}>
              <HeaderText>
                <CountUp end={30} enableScrollSpy={true} />
              </HeaderText>
              <Typography>Awards Won</Typography>
            </Stack>
          </Box>
        </TextContainer>
      </MuiBox>
    </>
  );
}
