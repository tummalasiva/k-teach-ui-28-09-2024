/** @format */

import React, { useContext, useEffect, useState } from "react";
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
import themeData from "../../../data/themeData";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";

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
  const { selectedSetting } = useContext(SettingContext);

  const [data, setData] = useState([]);
  const theme = createTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = useMediaQuery("(max-width:700px)");
  const slidesToShow = isMobile ? 1 : 3;

  const onChangeSlide = useCallback((newSlide) => {
    setCurrentSlide(newSlide);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (data.length) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.guardianFeedback.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      const feedbacks = data.result
        .filter((f) => f.status === "approved")
        .slice(-6);
      setData(feedbacks.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

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
            }}>
            <Carousel
              slides={data.map((data, i) => ({
                key: data._id,
                content:
                  data.status === "approved" ? (
                    <Feedbacks
                      studentName={data.studentName}
                      feedback={data.feedback}
                      parentName={data.parentName}
                    />
                  ) : (
                    ""
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
              {data.map(
                (slide, index) =>
                  slide.status === "approved" && (
                    <Dot
                      key={slide.key}
                      onClick={() => onChangeSlide(index)}
                      sx={{
                        backgroundColor:
                          index === currentSlide
                            ? themeData.darkPalette.secondary.main
                            : "rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  )
              )}
            </DotsContainer>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
