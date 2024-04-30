import React, { useState, useEffect } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import themeData from "./data/themeData";
import ThemeModeContext from "./context/ThemeModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SettingContext from "./context/SettingsContext";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import WebsiteThemeContext from "./context/WebsiteThemeContext";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { get } from "./services/apiMethods";
import { PUBLIC_URLS } from "./services/urlConstants";

const Web1 = React.lazy(() => import("./components/WebsiteTheme1"));
const Web2 = React.lazy(() => import("./components/WebsiteTheme2"));
const DashBoard = React.lazy(() => import("./components/NavDrawer"));

function App() {
  const [selectedTheme, setSelectedTheme] = useState(2);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [settings, setSettings] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState({
    name: "ABC School",
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
          root: {
            borderRadius: 5,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderRadius: 5,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,

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
            borderRadius: 5,

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

  // get schools list
  const getAllSchools = async () => {
    const { data } = await get(PUBLIC_URLS.school.getSchools);
    return data.result;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["publicSchoolList"],
    queryFn: getAllSchools,
  });

  console.log(data, "data");

  useEffect(() => {
    if (data) {
      setSettings(data);
      if (data.length) {
        setSelectedSetting(data[0]);
      }
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ThemeProvider theme={theme}>
        <SettingContext.Provider
          value={{
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
              <Route
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
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </WebsiteThemeContext.Provider>
        </SettingContext.Provider>
      </ThemeProvider>
      <ToastContainer />
    </ThemeModeContext.Provider>
  );
}

export default App;
