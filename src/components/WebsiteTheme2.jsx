import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import TopNav from "../theme-one/components/Navbar/TopNav";
import Navbar from "../theme-two/layout/header/Navbar";
import Footer from "../theme-two/layout/Footer";

// ===== code splitting ==================
const HomePage = React.lazy(() => import("../theme-two/page/HomePage"));
const Overview = React.lazy(() =>
  import("../theme-two/components/about-us/Overview")
);
const Founder = React.lazy(() =>
  import("../theme-two/components/about-us/Founder")
);
const VisionAndMission = React.lazy(() =>
  import("../theme-two/components/about-us/VisionAndMission")
);
const Food = React.lazy(() =>
  import("../theme-two/components/facilities/Food")
);
const Library = React.lazy(() =>
  import("../theme-two/components/facilities/Library")
);
const Transport = React.lazy(() =>
  import("../theme-two/components/facilities/Transport")
);
const DanceAndSinging = React.lazy(() =>
  import("../theme-two/components/facilities/DanceAndSinging")
);
const Labs = React.lazy(() =>
  import("../theme-two/components/facilities/Labs")
);
const AdmissionForm = React.lazy(() =>
  import("../theme-two/components/pre-admission/AdmissionForm")
);
const Gallery = React.lazy(() =>
  import("../theme-two/components/gallery/GalleryComponents")
);
const Results = React.lazy(() =>
  import("../theme-two/components/result/Results")
);
const ContactUs = React.lazy(() =>
  import("../theme-two/components/contact/Contact")
);

// =================================================

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
