import React, { useState, useEffect } from "react";
import "./App.css";
import themeData from "./data/themeData";
import ThemeModeContext from "./context/ThemeModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SettingContext from "./context/SettingsContext";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import WebsiteThemeContext from "./context/WebsiteThemeContext";
import ForgotPassword from "../src/components/Authentication/ForgotPassword";
import Login from "./components/Authentication/Login";

const Web1 = React.lazy(() => import("./components/WebsiteTheme1"));
const Web2 = React.lazy(() => import("./components/WebsiteTheme2"));
const DashBoard = React.lazy(() => import("./components/NavDrawer"));

function App() {
  const [selectedTheme, setSelectedTheme] = useState(2);
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
    let theme = window.localStorage.getItem("selectedTheme");
    if (!theme) {
      window.localStorage.setItem("selectedTheme", 1);
    } else {
      setSelectedTheme(parseInt(theme));
    }
  }, []);

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
          <WebsiteThemeContext.Provider
            value={{ selectedTheme, setSelectedTheme }}
          >
            <Routes>
              {/* <Route
                path="/*"
                element={
                  <React.Suspense fallback={<Loader />}>
                    {selectedTheme % 2 !== 0 ? <Web1 /> : <Web2 />}
                  </React.Suspense>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/sch/*"
                element={
                  <React.Suspense fallback={<Loader />}>
                    <DashBoard />
                  </React.Suspense>
                }
              /> */}
              <Route path="/login" element={<Login />} />
            </Routes>
          </WebsiteThemeContext.Provider>
        </SettingContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
