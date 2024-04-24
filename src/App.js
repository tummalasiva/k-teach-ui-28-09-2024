import { useState } from "react";
import "./App.css";
import NavDrawer from "./components/NavDrawer";
import themeData from "./data/themeData";
import ThemeModeContext from "./context/ThemeModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import SettingContext from "./context/SettingsContext";
import HomePage1 from "./theme-one/page/HomePage";
import HomePage2 from "./theme-two/page/HomePage";
import Overview from "./theme-two/components/About-us/Overview";
import { Route, Routes } from "react-router-dom";
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
          {/* <HomePage2 /> */}
          <Routes>
            {/* <Route path="/" element={<PublicRoute component={<HomePage1 />} />} /> */}
            <Route path="/" element={<HomePage2 />} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="/about/overview" element={<Overview />} />
            <Route path="/about/founder" element={<Founder />} />
            <Route
              path="/about/vision-mission"
              element={<VisionAndMission />}
            />
          </Routes>
        </SettingContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
