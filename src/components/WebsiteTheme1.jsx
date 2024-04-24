import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import TopNav from "../theme-one/components/Navbar/TopNav";
import MainNav from "../theme-one/components/Navbar/MainNav";
import HomePage from "../theme-one/page/HomePage";
import Overview from "../theme-one/components/Navbar/navbar/about/Overview";
import AboutFounder from "../theme-one/components/Navbar/navbar/about/AboutFounder";
import VissionMission from "../theme-one/components/Navbar/navbar/about/VissionMission";
import Library from "../theme-one/components/Navbar/navbar/facilities/Library";
import Food from "../theme-one/components/Navbar/navbar/facilities/Food";
import DanceAndSinging from "../theme-one/components/Navbar/navbar/facilities/DanceAndSinging";
import Transport from "../theme-one/components/Navbar/navbar/facilities/Transport";
import ContactUs from "../theme-one/components/Navbar/navbar/ContactUs";
import Result from "../theme-one/components/Navbar/navbar/Result";
import PreAdmission from "../theme-one/components/Navbar/navbar/PreAdmission";
import Footer from "../theme-one/components/Footer";

const WebsiteTheme1 = () => {
  if (window.location.pathname.startsWith("/sch")) return null;

  return (
    <>
      <TopNav />
      <MainNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/overview" element={<Overview />} />
        <Route path="/about/founder" element={<AboutFounder />} />
        <Route path="/about/visionandmission" element={<VissionMission />} />
        <Route path="/facilities/library" element={<Library />} />
        <Route path="/facilities/canteen" element={<Food />} />
        <Route
          path="/facilities/dance-and-singing"
          element={<DanceAndSinging />}
        />
        <Route path="/facilities/transport" element={<Transport />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/results" element={<Result />} />
        <Route path="/pre-admission" element={<PreAdmission />} />
      </Routes>

      <Footer />
      <Outlet />
    </>
  );
};

export default WebsiteTheme1;
