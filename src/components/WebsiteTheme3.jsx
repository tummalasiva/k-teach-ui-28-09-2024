/** @format */

import React, { useEffect } from "react";
import Footer from "../theme-three/components/Footer";

import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import TopNav from "../theme-three/components/Navbar/TopNav";
import MainNav from "../theme-three/components/Navbar/MainNav";

const Home = React.lazy(() => import("../theme-three/page/HomePage"));
const About = React.lazy(() =>
  import("../theme-three/components/Navbar/navbar/About")
);
const Primary = React.lazy(() =>
  import("../theme-three/components/Navbar/navbar/Primary")
);
const PrePrimary = React.lazy(() =>
  import("../theme-three/components/Navbar/navbar/PrePrimary")
);
const Gallery = React.lazy(() =>
  import("../theme-three/components/Navbar/navbar/gallery/Gallery")
);
const ContactUs = React.lazy(() =>
  import("../theme-three/components/Navbar/navbar/ContactUs")
);

const Activitydetails = React.lazy(() =>
  import("../theme-three/components/activities/ActivityDetail")
);

export default function WebsiteTheme3() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (window.location.pathname.startsWith("/sch")) return null;

  return (
    <>
      <TopNav />
      <MainNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/primary" element={<Primary />} />
        <Route path="/pre-primary" element={<PrePrimary />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/activity-details/:id" element={<Activitydetails />} />
      </Routes>
      <Footer />
      <Outlet />
    </>
  );
}
