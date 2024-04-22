import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { calculateSlidersData } from "../data/carousal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../../theme-one/assets/Images/school1.avif";
import image2 from "../../../theme-one/assets/Images/school-white.avif";
import image3 from "../../../theme-one/assets/Images/school-green.avif";
import image4 from "../../../theme-one/assets/Images/school1.avif";
import Awards from "./Awards";
import themeData from "../../../data/themeData";
const theme = createTheme();

const AppSlider = styled(Slider)`
  width: 100%;
  .slick-track {
    display: flex;
    //flex-shrink: 1;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    //margin-bottom: 1;
    outline: none;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: "4rem",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {
    padding: "7%",
    width: "100%",
  },
}));

const TextBox1 = styled(Box)(({ theme }) => ({
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const awards = [
  {
    title: "Learning Management System",
    note: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum corrupti unde dolor aliquam commodi cum aut magnam a cumque, veritatis repellat facere eos tempora quas! Esse quas praesentium numquam minus dicta",
    image: image1,
  },
  {
    title: "Marketing and Management ",
    note: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    image: image2,
  },
  {
    title: "Marketing and Management ",
    note: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    image: image3,
  },
  {
    title: "Marketing and Management ",
    note: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptate.",
    image: image4,
  },
];

const AwardsAndAchievment = () => {
  //   const [awards, setAwards] = useState([]);

  let sliderRef = useRef(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <TextBox1>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: { xs: "center" },
                flexDirection: { md: "row", xs: "column" },
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  color="black"
                  sx={{ fontWeight: "bold", fontSize: "40px" }}
                >
                  AWARDS &{" "}
                </Typography>
              </Box>
              &nbsp;&nbsp;
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    color: themeData.darkPalette.primary.main,
                    fontWeight: "bold",
                    fontSize: "40px",
                  }}
                >
                  ACHIEVEMENTS
                </Typography>
              </Box>
            </Box>
          </TextBox1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <Typography component="p">________</Typography>
            <FiberManualRecordIcon
              sx={{ fontSize: "8px", marginTop: "15px" }}
            />
            <FiberManualRecordIcon
              sx={{
                color: themeData.darkPalette.primary.main,
                fontSize: "10px",
                marginTop: "14px",
                marginLeft: "5px",
              }}
            />
            <FiberManualRecordIcon
              sx={{ fontSize: "8px", marginTop: "15px", marginLeft: "6px" }}
            />
            <Typography component="p">________</Typography>
          </Box>

          <AppSlider ref={sliderRef} {...calculateSlidersData(awards.length)}>
            {awards.map((d, i) => (
              <Awards key={i} coursedata={d} />
            ))}
          </AppSlider>
        </MainContainer>
      </ThemeProvider>
    </>
  );
};

export default AwardsAndAchievment;
