/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Typography, Box, styled } from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import Slider from "react-slick";

import { calculateSlidersSetting } from "../../data/Carousal";
import EventCards from "./EventCards";
import themeData from "../../../data/themeData";
import { AppSlider } from "../../data/AppSlider";
import Dots from "../../data/Dots";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import { get } from "../../../services/apiMethods";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export const arrData = [
  {
    id: "1",
    title: "Football – 3rd Place in ZPs",
    text: "Sports are a crucial part of a student’s growth and help in the development of mental health and physical fitness of the body.",
    image:
      "https://media.gettyimages.com/id/1148232010/photo/teachers-applauding-for-student-at-awards-ceremony.jpg?s=612x612&w=gi&k=20&c=0reS9Y-niWuUvxz2koW-7eRKETMYcH2EqlZgznHiCEM=",
  },
  {
    id: "2",
    title: "State Championship ",
    text: "Sports are a crucial part of a student’s growth and help in the development of mental health and physical fitness of the body.",
    image:
      "https://media.istockphoto.com/id/1200123163/photo/man-receiving-award-from-businesswoman.jpg?s=1024x1024&w=is&k=20&c=fXvUsoofSCYAZpViRgWHCUHujHtxHpYrKXWjdQ1lNqI=",
  },
  {
    id: "3",
    title: "District Champion",
    text: "Sports are a crucial part of a student’s growth and help in the development of mental health and physical fitness of the body.",
    image:
      "https://media.istockphoto.com/id/166193377/photo/school-boy-receiving-a-trophy-in-classroom.webp?s=612x612&w=is&k=20&c=oN-NSvxSxpWWi5du3GlRrG0Hf2xmCEdJZXxGPTTmNzo=",
  },
  {
    id: "4",
    title: "Languages",
    text: "Sports are a crucial part of a student’s growth and help in the development of mental health and physical fitness of the body.",
    image:
      "https://media.gettyimages.com/id/1148232010/photo/teachers-applauding-for-student-at-awards-ceremony.jpg?s=612x612&w=gi&k=20&c=0reS9Y-niWuUvxz2koW-7eRKETMYcH2EqlZgznHiCEM=",
  },
  {
    id: "5",
    title: "Business",
    text: "Sports are a crucial part of a student’s growth and help in the development of mental health and physical fitness of the body.",
    image:
      "https://media.istockphoto.com/id/1200123163/photo/man-receiving-award-from-businesswoman.jpg?s=1024x1024&w=is&k=20&c=fXvUsoofSCYAZpViRgWHCUHujHtxHpYrKXWjdQ1lNqI=",
  },
  {
    id: "6",
    title: "Business",
    text: "Sports are a crucial part of a student’s growth and help in the development of mental health and physical fitness of the body.",
    image:
      "https://media.istockphoto.com/id/166193377/photo/school-boy-receiving-a-trophy-in-classroom.webp?s=612x612&w=is&k=20&c=oN-NSvxSxpWWi5du3GlRrG0Hf2xmCEdJZXxGPTTmNzo=",
  },
];

const TypographyMain = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "25px",
  fontSize: "40px",
  color: themeData.darkPalette.primary.main,
  fontWeight: "bold",
  textShadow: "10px 8px 8px #969c96",
}));

const Random1 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "20px",
  marginBottom: "15px",
  marginRight: "15px",

  ".MuiSvgIcon-root": {
    cursor: "pointer",
    border: `1px solid ${themeData.darkPalette.primary.main}`,
    transition: "background-color 0.3s",
  },

  ".MuiSvgIcon-root:hover": {
    background: themeData.darkPalette.primary.main,
    color: "#fff",
  },
}));

export default function OurEvents() {
  let sliderRef = useRef(null);
  const { selectedSetting } = useContext(SettingContext);
  const [events, setEvents] = useState([]);

  const handleNextClick = () => {
    sliderRef.slickNext();
  };
  const handlePrevClick = () => {
    sliderRef.slickPrev();
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.event.list, {
        params: { schoolId: selectedSetting?._id },
      });

      setEvents(data.result);
      // console.log(data.result, "mmmmmmmmmuuusssshhhhammmmmmmmm");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  return (
    <>
      <Container sx={{ marginTop: "8rem" }} maxWidth="xl">
        <TypographyMain variant="h5" my={6}>
          OUR EVENTS
          <Dots />
        </TypographyMain>

        {events.length > 3 && (
          <Random1 style={{ borderColor: themeData.darkPalette.primary.main }}>
            <ChevronLeftIcon
              onClick={handlePrevClick}
              sx={{ color: themeData.darkPalette.primary.main }}
            />
            <ChevronRightIcon
              onClick={handleNextClick}
              sx={{ color: themeData.darkPalette.primary.main }}
            />
          </Random1>
        )}

        <AppSlider
          {...calculateSlidersSetting(events.length)}
          ref={(slider) => {
            sliderRef = slider;
          }}>
          {events.map((elem, i) => (
            <EventCards key={i} elem={elem} hideContent={false} view="View" />
          ))}
        </AppSlider>
      </Container>
    </>
  );
}
