import { Box, Grid, Typography, styled, css, keyframes } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Balloon from "../../../theme-one/assets/Images/baloon.png.png";
import RedImg from "../../../theme-one/assets/Images/redImg.png.png";
import dayjs from "dayjs";
import RegistrationForm from "./RegistrationForm";
import themeData from "../../../data/themeData";

const MovingTextContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "470px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const moveTextAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(-50%);
  }
  `;

const MovingTexts = styled(Box)(({}) => ({
  position: "absolute",
  bottom: 0,
  color: "white",
  animation: css`
    ${moveTextAnimation} 10s linear infinite
  `,
  animationPlayState: "running",

  "&:hover": {
    animationPlayState: "paused",
  },
}));

const BirthdayBox = styled(Box)(({}) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: 10,
}));

const GridContainerBox = styled(Grid)(
  ({}) => css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://img.freepik.com/free-vector/gradient-abstract-geometric-background-with-triangles_52683-61899.jpg?size=626&ext=jpg&ga=GA1.1.1434379891.1671263694&semt=ais);
    background-attachment: fixed;
    background-repeat: no-repeat;
    padding: 0px 0px 80px 0px;
    max-width: 100%;
    background-size: cover;
    background-color: #198eeb;
    background-position: center;
    position: relative;
  `
);

const SubHeader1 = styled(Typography)(({}) => ({
  fontSize: "16px",
  color: themeData.darkPalette.primary.main,
  marginTop: "10px",
  fontWeight: "bold",
}));
const SubHeader2 = styled(Typography)(({}) => ({
  fontSize: "16px",
  color: "#fff",
  marginTop: "10px",
  fontWeight: "bold",
}));

const LeftTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "white",
  textShadow: "3px 3px black",
}));
const RightTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: themeData.darkPalette.primary.main,
}));

const names = [
  {
    name: "Raju",
    class: "10",
    section: "A",
    rollNo: "6",
    dob: "04/08/1999",
  },
  {
    name: "Monika",
    class: "10",
    section: "C",
    rollNo: "3",
    dob: "15/05/1998",
  },
  {
    name: "Alia",
    class: "8",
    section: "A",
    rollNo: "9",
    dob: "1/05/1994",
  },
  {
    name: "Raina",
    class: "9",
    section: "D",
    rollNo: "8",
    dob: "5/01/1908",
  },
];
const BirthdayEvents = () => {
  return (
    <GridContainerBox>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: { sm: "40px", xs: "20px" },
        }}
      >
        <Grid item>
          <BirthdayBox>
            <LeftTitle
              variant="h4"
              sx={{ fontSize: { sm: "50px", xs: "30px" } }}
            >
              HAPPY{" "}
            </LeftTitle>
            &nbsp;&nbsp;
            <RightTitle
              variant="h4"
              sx={{ fontSize: { sm: "50px", xs: "30px" } }}
            >
              BIRTHDAY{" "}
            </RightTitle>
            &nbsp;
            <img
              // src="cake-bg3.png"
              src={RedImg}
              style={{ height: "50px", width: "50px" }}
              alt="loading..."
            />
          </BirthdayBox>

          {names.length ? (
            <MovingTextContainer>
              <MovingTexts>
                {names.map((data, i) => (
                  <React.Fragment key={i}>
                    <img
                      src={Balloon}
                      alt="loading..."
                      style={{
                        height: "170px",
                        marginTop: "30px",
                        objectFit: "contain",
                      }}
                    />
                    <SubHeader1 variant="h6">
                      Name:
                      <SubHeader2 variant="h6" component="span">
                        {data.name}
                      </SubHeader2>
                    </SubHeader1>
                    <SubHeader1 variant="h6">
                      Class:
                      <SubHeader2 variant="h6" component="span">
                        {data.class}
                      </SubHeader2>
                    </SubHeader1>
                    <SubHeader1 variant="h6">
                      Roll No:
                      <SubHeader2 variant="h6" component="span">
                        {data.rollNo}, {data.section}
                      </SubHeader2>
                    </SubHeader1>
                    <SubHeader1 variant="h6">
                      DOB:
                      <SubHeader2 variant="h6" component="span">
                        {data.dob}
                      </SubHeader2>
                    </SubHeader1>
                  </React.Fragment>
                ))}
              </MovingTexts>
            </MovingTextContainer>
          ) : null}
        </Grid>

        <Grid item sx={{ paddingTop: "1rem" }}>
          {/* <RegistrationForm /> */}
        </Grid>
      </Grid>
    </GridContainerBox>
  );
};

export default BirthdayEvents;
