import React, { useEffect, useState } from "react";
import Feedbacks from "./FeedBacks";
import { config } from "react-spring";
import {
  Box,
  Paper,
  ThemeProvider,
  styled,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import { useCallback } from "react";
import Carousel from "react-spring-3d-carousel";
import Header from "../Header";

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
  const theme = createTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = useMediaQuery("(max-width:700px)");
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
      <ThemeProvider theme={theme}>
        <Header title1="Guardian" title2="Feedback" />

        {!data.length ? null : (
          <Box
            sx={{
              height: "40vh",
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
                  sx={{
                    backgroundColor:
                      index === currentSlide ? "#1565c0" : "rgba(0, 0, 0, 0.2)",
                  }}
                />
              ))}
            </DotsContainer>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
