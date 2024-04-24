import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import themeData from "./data/themeData";
import ThemeModeContext from "./context/ThemeModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import SettingContext from "./context/SettingsContext";
import HomePage1 from "./theme-one/page/HomePage";
import HomePage2 from "./theme-two/page/HomePage";
import Overview1 from "./theme-one/components/Navbar/navbar/about/Overview";
import MainNav from "./theme-one/components/Navbar/MainNav";
import AboutFounder from "./theme-one/components/Navbar/navbar/about/AboutFounder";
import VissionMission from "./theme-one/components/Navbar/navbar/about/VissionMission";
import Library from "./theme-one/components/Navbar/navbar/facilities/Library";
import Food from "./theme-one/components/Navbar/navbar/facilities/Food";
import DanceAndSinging from "./theme-one/components/Navbar/navbar/facilities/DanceAndSinging";
import Transport from "./theme-one/components/Navbar/navbar/facilities/Transport";
import ContactUs from "./theme-one/components/Navbar/navbar/ContactUs";
import Result from "./theme-one/components/Navbar/navbar/Result";
import PreAdmission from "./theme-one/components/Navbar/navbar/PreAdmission";
import Overview2 from "./theme-two/components/About-us/Overview";
import PublicRoute from "./theme-one/components/PublicRoute";
import Founder from "./theme-two/components/About-us/Founder";
import VisionAndMission from "./theme-two/components/About-us/VisionAndMission";

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
          </Routes> */}
          {/* ======================= // ======================== */}

          {/* ========= Theme 2 route ========== */}
          <Routes>
            <Route path="/" element={<HomePage2 />} />
            <Route path="/about/overview" element={<Overview2 />} />
            <Route path="/about/founder" element={<Founder />} />
            <Route
              path="/about/vision-mission"
              element={<VisionAndMission />}
            />
          </Routes>
          {/* ============== // ================= */}
        </SettingContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
