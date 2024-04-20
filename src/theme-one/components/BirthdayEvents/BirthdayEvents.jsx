import { Box, Grid, Typography, styled, css, keyframes } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Balloon from "../../../theme-one/assets/Images/baloon.png.png";
import RedImg from "../../../theme-one/assets/Images/redImg.png.png";
import dayjs from "dayjs";
import RegistrationForm from "./RegistrationForm";

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

const GridBox1 = styled(Box)(({ theme }) => ({
  marginTop: "5%",
}));

let names = [
  {
    name: "Raju",
    class: "10",
    section: "A",
  },
  {
    name: "Monika",
    class: "10",
    section: "C",
  },
  {
    name: "Alia",
    class: "8",
    section: "A",
  },
  {
    name: "Raina",
    class: "9",
    section: "D",
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
          <GridBox1>
            <BirthdayBox>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "3px 3px black",
                  fontSize: { sm: "50px", xs: "30px" },
                }}
              >
                HAPPY{" "}
              </Typography>
              &nbsp;&nbsp;
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#0E4BF1",
                  fontSize: { sm: "50px", xs: "30px" },
                }}
              >
                BIRTHDAY{" "}
              </Typography>
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
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#FFD24D",
                          mt: 4,
                          width: "150px",
                        }}
                      ></Typography>
                      <img
                        src={Balloon}
                        alt="loading..."
                        style={{
                          height: "170px",
                          objectFit: "contain",
                        }}
                      />
                      <Typography variant="h6" sx={{ fontSize: "16px", mt: 1 }}>
                        <b style={{ color: "#FFD24D" }}>Name: </b>
                        {data.name}
                      </Typography>
                      <Typography variant="h6" sx={{ fontSize: "16px", mt: 1 }}>
                        <b style={{ color: "#FFD24D" }}>Class: </b>
                        {data.class}
                      </Typography>
                      <Typography variant="h6" sx={{ fontSize: "16px" }}>
                        <b style={{ color: "#FFD24D" }}>Roll No: </b>
                        {data.rollNo}, {data.section}
                      </Typography>
                      {/* <Typography variant="h6" sx={{ fontSize: "16px" }}>
                        <b style={{ color: "#FFD24D" }}>DOB: </b>
                        {dayjs(data.basicInfo.dob).format("DD, MMMM, YYYY")}
                      </Typography> */}
                    </React.Fragment>
                  ))}
                </MovingTexts>
              </MovingTextContainer>
            ) : null}
          </GridBox1>
        </Grid>

        <Grid item sx={{ paddingTop: "2rem" }}>
          <RegistrationForm />
        </Grid>
      </Grid>
    </GridContainerBox>
  );
};

export default BirthdayEvents;
