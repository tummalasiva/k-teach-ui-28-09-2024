/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Typography, Box, styled } from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import Slider from "react-slick";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { calculateSlidersSetting } from "../../data/Carousal";
import EventCards from "./EventCards";
import themeData from "../../../data/themeData";
import { AppSlider } from "../../data/AppSlider";
import Dots from "../../data/Dots";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";

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

export default function AwardAndAchivement() {
  let sliderRef = useRef(null);
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.awards.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      setData(data.result);

      console.log(data.result, "mmmmmmmmmmmmmmmmmm");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  const handleNextClick = () => {
    sliderRef.slickNext();
  };
  const handlePrevClick = () => {
    sliderRef.slickPrev();
  };

  return (
    <>
      <Container sx={{ marginTop: "8rem" }} maxWidth="xl">
        <TypographyMain variant="h5" my={6}>
          OUR AWARDS AND ACHIVEMENTS
          <Dots />
        </TypographyMain>
        <Box
          sx={{
            padding: { xs: 0, sm: 0, md: "40px" },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}>
          {data?.length > 3 && (
            <Random1
              style={{ borderColor: themeData.darkPalette.primary.main }}>
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
            {...calculateSlidersSetting(data.length)}
            ref={(slider) => {
              sliderRef = slider;
            }}>
            {data?.map((elem, i) => (
              <EventCards key={i} elem={elem} hideContent={true} view="Read" />
            ))}
          </AppSlider>
        </Box>
      </Container>
    </>
  );
}
