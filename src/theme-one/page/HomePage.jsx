/** @format */

import React from "react";
import Slider from "../components/Slider";
import Features from "../components/Features/FeatureMain";
import BirthdayEvents from "../components/BirthdayEvents/BirthdayEvents";
import OurEvents from "../components/OurEvents/OurEvents";
import IntroVideo from "../components/IntroVideo";
import AwardsAndAchievment from "../components/AwardsAndAchievment/AwardsAndAchievment";
import QuickLook from "../components/QuickLook";
import OurGallery from "../components/OurGallery/OurGallery";
import ScrollTop from "../components/ScrollTop";
import AddFeedback from "../components/GuardianFeedback/AddFeedback";
import GuardianFeedback from "../components/GuardianFeedback/FeedBackSlider";
import NewsAndNotices from "../components/NewsAndNotice/NewsAndNotices";

export default function HomePage() {
  return (
    <>
      <ScrollTop />
      <AddFeedback />
      <Slider />
      <Features />
      <BirthdayEvents />
      <GuardianFeedback />
      <NewsAndNotices />
      <OurEvents />

      <IntroVideo />
      <AwardsAndAchievment />
      <QuickLook />
      <OurGallery />
    </>
  );
}
