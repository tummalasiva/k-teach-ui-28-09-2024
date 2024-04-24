import React from "react";
import Footer from "../layout/Footer";
import TopNav from "../../theme-one/components/Navbar/TopNav";
import HomeComponents from "../components/home/HomeComponents";
import LearningInfo from "../components/home/LearningInfo";
import HomeAbout from "../components/home/HomeAbout";
import OurGallery from "../components/home/gallery/OurGallery";
import NewsAndNotice from "../components/home/news-notice/NewsAndNotice";
import Navbar from "../layout/header/Navbar";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <Navbar />
      <HomeComponents />
      <LearningInfo />
      <HomeAbout />
      <OurGallery />
      <NewsAndNotice />
      <Footer />
    </>
  );
}
