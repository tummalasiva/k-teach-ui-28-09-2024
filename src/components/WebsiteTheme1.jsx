/** @format */

import React, { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import TopNav from "../theme-one/components/Navbar/TopNav";
import MainNav from "../theme-one/components/Navbar/MainNav";
import Footer from "../theme-one/components/Footer";

// ===== code splitting ===================================
const Home = React.lazy(() => import("../theme-one/page/HomePage"));
const Overview = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/about/Overview")
);
const AboutFounder = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/about/AboutFounder")
);
const VissionMission = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/about/VissionMission")
);
const Library = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/facilities/Library")
);

const Assignment = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/Assignment")
);

const AwardsDetails = React.lazy(() =>
  import("../theme-one/components/AwardsAndAchievment/AwardsDetails")
);

const NewsAndNoticeDetails = React.lazy(() =>
  import("../theme-one/components/NewsAndNotice/NewsAndNoticeDetails")
);

const Food = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/facilities/Food")
);
const DanceAndSinging = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/facilities/DanceAndSinging")
);
const Transport = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/facilities/Transport")
);

const ContactUs = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/ContactUs")
);
const Result = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/Result")
);
const PreAdmission = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/PreAdmission")
);

const Gallery = React.lazy(() =>
  import("../theme-one/components/Navbar/navbar/gallery/Gallery")
);
const EventDetails = React.lazy(() =>
  import("../theme-one/components/OurEvents/EventDetails")
);

const News = React.lazy(() =>
  import("../theme-one/components/NewsAndNotice/News")
);

const UniqueFeature = React.lazy(() =>
  import("../theme-one/components/Features/features/UniqueFeature")
);

const KnowledgeOfParent = React.lazy(() =>
  import("../theme-one/components/Features/features/KnowledgeOfParent")
);
// ============================================

const WebsiteTheme1 = () => {
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
        <Route path="/about/overview" element={<Overview />} />
        <Route path="/about/founder" element={<AboutFounder />} />
        <Route path="/about/visionandmission" element={<VissionMission />} />
        <Route path="/facilities/library" element={<Library />} />
        <Route path="/facilities/canteen" element={<Food />} />
        <Route
          path="/facilities/dance-and-singing"
          element={<DanceAndSinging />}
        />
        <Route path="/features/unique-features" element={<UniqueFeature />} />
        <Route
          path="/features/to-the-knowledge-of-parents"
          element={<KnowledgeOfParent />}
        />
        <Route path="/facilities/transport" element={<Transport />} />
        <Route path="/home-gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/results" element={<Result />} />

        <Route path="/assignment" element={<Assignment />} />
        <Route path="/pre-admission" element={<PreAdmission />} />
        <Route path="/eventDetails/:id" element={<EventDetails />} />
        <Route path="/awardsDetails/:id" element={<AwardsDetails />} />

        <Route path="/news-and-notice-details/:id" element={<News />} />
      </Routes>
      <Footer />
      <Outlet />
    </>
  );
};

export default WebsiteTheme1;
