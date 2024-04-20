import React from "react";
import TopNav from "../components/Navbar/TopNav";
import MainNav from "../components/Navbar/MainNav";
import Slider from "../components/Slider";
import Features from "../components/Features/Features";
import BirthdayEvents from "../components/BirthdayEvents/BirthdayEvents";
import GuardianFeedback from "../components/GuardianFeedback";
import OurEvents from "../components/OurEvents/OurEvents";
import IntroVideo from "../components/IntroVideo";
import AwardsAndAchievment from "../components/AwardsAndAchievment/AwardsAndAchievment";
import QuickLook from "../components/QuickLook";
import OurGallery from "../components/OurGallery/OurGallery";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <MainNav />
      <Slider />
      <Features />
      <BirthdayEvents />
      <GuardianFeedback />
      <OurEvents />
      <IntroVideo />
      <AwardsAndAchievment />
      <QuickLook />
      <OurGallery />
      <Footer />
    </>
  );
}
