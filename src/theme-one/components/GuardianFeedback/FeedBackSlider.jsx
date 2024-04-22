import React, { useEffect, useState } from "react";
import Feedbacks from "./FeedBacks";
import { config } from "react-spring";
import { Box, Paper, Typography, styled, useMediaQuery } from "@mui/material";
import { useCallback } from "react";
import Carousel from "react-spring-3d-carousel";
import themeData from "../../../data/themeData";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const data = [
  {
    studentName: "Raju",
    feedback: "10",
    parentName: "hjbbhhA ghvchvg",
  },
  {
    studentName: "Monika",
    feedback: "10",
    parentName: "Chgchtft  ghcvhgv",
  },
  {
    studentName: "Alia",
    feedback: "8hjvbkn ftghjk",
    parentName: "Acfggcj ghvhgvj",
  },
  {
    studentName: "Raina",
    feedback: "9ersdfhgjkn rdtfygkhjk",
    parentName: "Dersdfgh",
  },
  {
    studentName: "Rainagvhhgvhgvhgv",
    feedback: "9ersdfhgjkn rdtfygkhjk",
    parentName: "Dersdfgh",
  },
  {
    studentName: "Rainafgcfgh",
    feedback: "9ersdfhgjkn rdtfygkhjk",
    parentName: "Dersdfgh",
  },
  {
    studentName: "Rainafgcfgfgcghcghvhgvh",
    feedback: "9ersdfhgjkn rdtfygkhjk",
    parentName: "Dersdfgh",
  },
];

const TextBox1 = styled(Box)(({ theme }) => ({
  marginTop: "5%",
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
}));

const Dot = styled(Paper)(({ theme, active }) => ({
  height: "15px",
  width: "15px",
  borderRadius: "50%",
  cursor: "pointer",
}));

export default function FeedBackSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const slidesToShow = isMobile ? 1 : 3;

  const onChangeSlide = useCallback((newSlide) => {
    setCurrentSlide(newSlide);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TextBox1>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              color="black"
              sx={{ fontWeight: "bold", fontSize: "40px" }}
            >
              Guardian
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
              Feedback
            </Typography>
          </Box>
        </Box>
      </TextBox1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Typography component="p">_____________</Typography>
        <FiberManualRecordIcon sx={{ fontSize: "8px", marginTop: "15px" }} />
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
        <Typography component="p">_____________</Typography>
      </Box>
      {!data.length ? null : (
        <Box
          sx={{
            height: "50vh",
            width: "80%",
            margin: "auto",
          }}
        >
          <Carousel
            slides={data.map((data, i) => ({
              key: i,
              content: (
                <Feedbacks
                  studentName={data.studentName}
                  feedback={data.feedback}
                  parentName={data.parentName}
                />
              ),
            }))}
            showNavigation={false}
            autoPlay={true}
            goToSlide={currentSlide}
            animationConfig={config.default}
            slidesToShow={slidesToShow}
            offsetRadius={1}
          />
          <DotsContainer style={{ textAlign: "center" }}>
            {data.map((slide, index) => (
              <Dot
                key={slide.key}
                onClick={() => onChangeSlide(index)}
                style={{
                  backgroundColor:
                    index === currentSlide
                      ? themeData.darkPalette.secondary.main
                      : "rgba(0, 0, 0, 0.2)",
                }}
              />
            ))}
          </DotsContainer>
        </Box>
      )}
    </>
  );
}
