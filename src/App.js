import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import themeData from "./data/themeData";
import ThemeModeContext from "./context/ThemeModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SettingContext from "./context/SettingsContext";
import HomePage1 from "./theme-one/page/HomePage";
import HomePage2 from "./theme-two/page/HomePage";
import Overview1 from "./theme-one/components/Navbar/navbar/about/Overview";
import MainNav from "./theme-one/components/Navbar/MainNav";
import AboutFounder from "./theme-one/components/Navbar/navbar/about/AboutFounder";
import VissionMission from "./theme-one/components/Navbar/navbar/about/VissionMission";
import Library1 from "./theme-one/components/Navbar/navbar/facilities/Library";
import Food1 from "./theme-one/components/Navbar/navbar/facilities/Food";
import DanceAndSinging1 from "./theme-one/components/Navbar/navbar/facilities/DanceAndSinging";
import Transport1 from "./theme-one/components/Navbar/navbar/facilities/Transport";
import ContactUs from "./theme-one/components/Navbar/navbar/ContactUs";
import Result from "./theme-one/components/Navbar/navbar/Result";
import PreAdmission from "./theme-one/components/Navbar/navbar/PreAdmission";
import PublicRoute from "./theme-one/components/PublicRoute";
import Founder from "./theme-two/components/about-us/Founder";
import VisionAndMission from "./theme-two/components/about-us/VisionAndMission";
import Overview2 from "./theme-two/components/about-us/Overview";
import Food2 from "./theme-two/components/facilities/Food";
import Library2 from "./theme-two/components/facilities/Library";
import Transport2 from "./theme-two/components/facilities/Transport";
import DanceAndSinging2 from "./theme-two/components/facilities/DanceAndSinging";
import Labs from "./theme-two/components/facilities/Labs";
import AdmissionForm from "./theme-two/components/pre-admission/AdmissionForm";
import Results from "./theme-two/components/result/Results";
import Contact from "./theme-two/components/contact/Contact";
import GalleryComponents from "./theme-two/components/gallery/GalleryComponents";
import Gallery from "./theme-one/components/Navbar/navbar/gallery/Gallery";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settingsContext, setSettingsContext] = useState({
    schoolName: "",
    schoolLogo: "",
    activeAcademicYear: "",
  });
  const [settings, setSettings] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState({
    schoolName: "ABC School",
  });

  useEffect(() => {
    let isDark = window.localStorage.getItem("isDarkMode");

    setIsDarkMode(isDark === "true" ? true : false);
  }, [window.localStorage.getItem("isDarkMode")]);

  const theme = createTheme({
    palette: isDarkMode ? themeData.darkPalette : themeData.lightPalette,
    shape: {
      borderRadius: themeData.shapeProperties.borderRadius,
    },
    typography: {
      allVariants: {
        color: isDarkMode ? "white" : "black",
        fontSize: "14px",
      },
    },

    components: {
      MuiTextField: {
        styleOverrides: {
          root: {},
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: isDarkMode ? "#4f4f4f" : "#e8eaed",
            },
          },
        },
      },
      MuiIcon: {
        defaultProps: {
          color: "primary",
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            height: "40px",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#fff",
          },
          root: {
            padding: "8px",
            height: "40px",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            height: "40px",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
          },
        },
      },

      MuiGrid: {
        styleOverrides: {
          root: {
            paddingTop: 0,
          },
        },
      },
    },
  });

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ThemeProvider theme={theme}>
        <SettingContext.Provider
          value={{
            settingsContext,
            setSettingsContext,
            settings,
            setSettings,
            selectedSetting,
            setSelectedSetting,
          }}
        >
          {/* <NavDrawer /> */}
          {/* <HomePage1 /> */}
          {/* ========= Theme 1 route ========== */}
          {/* <Routes>
            <Route path="/" element={<HomePage1 />} />
            <Route path="/about/overview" element={<Overview1 />} />
            <Route path="/about/founder" element={<AboutFounder />} />
            <Route
              path="/about/visionandmission"
              element={<VissionMission />}
            />
            <Route path="/facilities/library" element={<Library1 />} />
            <Route path="/facilities/canteen" element={<Food1 />} />
            <Route
              path="/facilities/dance-and-singing"
              element={<DanceAndSinging1 />}
            />
            <Route path="/facilities/transport" element={<Transport1 />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/results" element={<Result />} />
            <Route path="/pre-admission" element={<PreAdmission />} />
            <Route path="/home-gallery" element={<Gallery />} />
          </Routes> */}
          {/* ======================= // ======================== */}

          {/* ========= Theme 2 route ========== */}
          <Routes>
            <Route path="/" element={<HomePage2 />} />
            <Route path="/about/overview" element={<Overview2 />} />
            <Route path="/about/founder" element={<Founder />} />
            <Route
              path="/about/vision-and-mission"
              element={<VisionAndMission />}
            />
            <Route path="/facilities/food" element={<Food2 />} />
            <Route path="/facilities/library" element={<Library2 />} />
            <Route path="/facilities/transport" element={<Transport2 />} />
            <Route
              path="/facilities/dance-and-singing"
              element={<DanceAndSinging2 />}
            />
            <Route path="/facilities/labs" element={<Labs />} />
            <Route path="/pre-admission" element={<AdmissionForm />} />
            <Route path="/results" element={<Results show={false} />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/discover-gallery" element={<GalleryComponents />} />
          </Routes>
          {/* ============== // ================= */}
        </SettingContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
