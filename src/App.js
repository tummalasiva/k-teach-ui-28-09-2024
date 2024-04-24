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
import Overview from "./theme-one/components/Navbar/navbar/about/Overview";
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
          <MainNav />
          <Routes>
            {/* <Route path="/" element={<HomePage1 />} /> */}
            <Route path="/about/overview" element={<Overview />} />
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
            <Route path="/results" element={<Result show={true} />} />
            <Route path="/pre-admission" element={<PreAdmission />} />
            <Route path="/home-gallery" element={<Gallery />} />
          </Routes>

          {/* <HomePage1 /> */}
          {/* <HomePage2 /> */}
          {/* <Routes>
         
            <Route path="/" element={<HomePage2 />} />
 
            <Route path="/about/overview" element={<Overview />} />
            <Route path="/about/founder" element={<Founder />} />
          </Routes> */}
          {/* ======================= // ======================== */}
        </SettingContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
