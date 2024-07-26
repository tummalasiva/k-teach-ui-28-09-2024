/** @format */

import React from "react";
import WhyUs from "../components/WhyUs";
import RecentActivitySlider from "../components/RecentActivitySlider";
import OurCourses from "../components/OurCourses";
import Enhance from "../components/Enhance";
import Experience from "../components/Experience";
import ParentAbout from "../components/ParentAbout";
import Slider from "../components/slider/Slider";
import Recentactivities from "../components/activities/RecentActivities";

export default function HomePage() {
  return (
    <>
      <Slider />
      <WhyUs />
      <Enhance />
      <OurCourses />
      <Experience />
      <ParentAbout />
      <Recentactivities />
      <RecentActivitySlider />
    </>
  );
}
