/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, styled } from "@mui/material";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { calculateSlidersData } from "../data/carousal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image1 from "../../../theme-one/assets/Images/school1.avif";
import image2 from "../../../theme-one/assets/Images/school-white.avif";
import image3 from "../../../theme-one/assets/Images/school-green.avif";
import image4 from "../../../theme-one/assets/Images/school1.avif";
import Awards from "./Awards";
import Header from "../Header";

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

  return (
    <>
      <MainContainer>
        <Header title1="Awards &" title2="Achievements" />

        <AppSlider ref={sliderRef} {...calculateSlidersData(data.length)}>
          {data.map((d, i) => (
            <Awards key={i} awardsDetails={d} />
          ))}
        </AppSlider>
      </MainContainer>
    </>
  );
};

export default AwardsAndAchievment;
