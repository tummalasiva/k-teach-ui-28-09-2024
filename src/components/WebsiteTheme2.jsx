import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "../theme-two/page/HomePage";
import Overview from "../theme-two/components/about-us/Overview";
import Founder from "../theme-two/components/about-us/Founder";
import VisionAndMission from "../theme-two/components/about-us/VisionAndMission";
import Food from "../theme-two/components/facilities/Food";
import Library from "../theme-two/components/facilities/Library";
import Transport from "../theme-two/components/facilities/Transport";
import DanceAndSinging from "../theme-two/components/facilities/DanceAndSinging";
import Labs from "../theme-two/components/facilities/Labs";
import AdmissionForm from "../theme-two/components/pre-admission/AdmissionForm";
import TopNav from "../theme-one/components/Navbar/TopNav";
import Navbar from "../theme-two/layout/header/Navbar";
import Footer from "../theme-two/layout/Footer";
import Gallery from "../theme-two/components/gallery/GalleryComponents";
import Results from "../theme-two/components/result/Results";
import ContactUs from "../theme-two/components/contact/Contact";

const WebsiteTheme2 = () => {
  if (window.location.pathname.startsWith("/sch")) return null;
  return (
    <>
      <TopNav />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/overview" element={<Overview />} />
        <Route path="/about/founder" element={<Founder />} />
        <Route
          path="/about/vision-and-mission"
          element={<VisionAndMission />}
        />
        <Route path="/facilities/food" element={<Food />} />
        <Route path="/facilities/library" element={<Library />} />
        <Route path="/facilities/transport" element={<Transport />} />
        <Route
          path="/facilities/dance-and-singing"
          element={<DanceAndSinging />}
        />
        <Route path="/facilities/labs" element={<Labs />} />
        <Route path="/pre-admission" element={<AdmissionForm />} />
        <Route path="/discover-gallery" element={<Gallery />} />
        <Route path="/results" element={<Results />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
      <Outlet />
    </>
  );
};

export default WebsiteTheme2;
