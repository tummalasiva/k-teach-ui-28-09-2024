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
import Gallery from "./Gallery";
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
  marginTop: "4rem",
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const AwardsAndAchievment = () => {
  const [awards, setAwards] = useState([]);

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
                  color="#f86f03"
                  sx={{ fontWeight: "bold", fontSize: "40px" }}
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
                color: "#F86F03",
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
              <Gallery key={i} coursedata={d} />
            ))}
          </AppSlider>
        </MainContainer>
      </ThemeProvider>
    </>
  );
};

export default AwardsAndAchievment;
