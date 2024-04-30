import React from "react";
import HomeComponents from "../components/home/HomeComponents";
import LearningInfo from "../components/home/LearningInfo";
import HomeAbout from "../components/home/HomeAbout";
import OurGallery from "../components/home/gallery/OurGallery";
import NewsAndNotice from "../components/home/news-notice/NewsAndNotice";
import CountUpTimer from "../components/home/CountUpTimer";
import OurEvents from "../components/events/OurEvents";
import AwardAndAchivement from "../components/events/AwardAndAchivement";

export default function HomePage() {
  return (
    <>
      <HomeComponents />
      <LearningInfo />
      <HomeAbout />
      <OurGallery />
      <NewsAndNotice />
      <OurEvents />
      <CountUpTimer />
      <AwardAndAchivement />
    </>
  );
}
