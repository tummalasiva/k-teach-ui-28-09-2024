/** @format */

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
import { PRIVATE_URLS, PUBLIC_URLS } from "./services/urlConstants";
import SplashNewsHorizontal from "./theme-one/components/SpalshNews/SpalshNewsHorizontal";
import SpalshNewsPopup from "./theme-one/components/SpalshNews/SpalshNewsPopup";
import UserTypeContext from "./context/UserTypeContext";
import CourseContext from "./context/CourseContext";

const Web1 = React.lazy(() => import("./components/WebsiteTheme1"));
const Web2 = React.lazy(() => import("./components/WebsiteTheme2"));
const EmployeeDashBoard = React.lazy(() => import("./components/NavDrawer"));
const StudentDashBoard = React.lazy(() =>
  import("./components/NavDrawerStudent")
);

function App() {
  const [selectedTheme, setSelectedTheme] = useState(2);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userType, setUserType] = useState("employee");

  const [settings, setSettings] = useState([]);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState([]);
  const [selectedSetting, setSelectedSetting] = useState({
    name: "ABC School",
  });

  const [popupData, setPopupData] = useState({
    open: false,
    data: {},
  });
  const [horizontalData, setHorizontalData] = useState([]);
  const handleClosePopup = () => setPopupData({ open: false, data: null });

  useEffect(() => {
    let userType = window.localStorage.getItem("userType");
    if (userType) {
      setUserType(userType);
    }
  }, []);

  const getSplashNews = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.splashNews.listPublic, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      if (data.result.length) {
        let allSplashNews = data.result;
        setHorizontalData(
          allSplashNews.filter((s) => s.type !== "Popup" && s.enabled === true)
        );
        setPopupData({
          open: false,
          data: allSplashNews.filter(
            (s) => s.type === "Popup" && s.enabled === true
          )[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedSetting && selectedSetting._id) {
      getSplashNews();
    }
  }, [selectedSetting]);

  useEffect(() => {
    if (popupData.data) {
      setPopupData({ ...popupData, open: true });
    }
  }, [popupData.data]);

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
      borderRadius: 5,
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
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px rgba(0, 0, 0, 0) inset",
                boxShadow: "0 0 0 100px rgba(0, 0, 0, 0) inset",
                backgroundColor: "transparent !important",
                WebkitTextFillColor: isDarkMode
                  ? "#fff !important"
                  : "#000 !important", // Ensure text color is set
                transition: "background-color 5000s ease-in-out 0s",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {},
          sizeSmall: {
            fontSize: "12px",
          },
          root: {
            boxShadow: "none",
            borderRadius: 5,
          },
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
            padding: "4px",
            height: "50px",
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

  const webTheme = createTheme({
    palette: themeData.lightPalette,
    shape: {
      borderRadius: 5,
    },
    typography: {
      allVariants: {
        // color: isDarkMode ? "white" : "black",
        fontSize: "14px",
      },
    },

    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px rgba(0, 0, 0, 0) inset",
                boxShadow: "0 0 0 100px rgba(0, 0, 0, 0) inset",
                backgroundColor: "transparent !important",
                WebkitTextFillColor: "#000 !important", // Ensure text color is set
                transition: "background-color 5000s ease-in-out 0s",
              },
            },
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
    refetchOnWindowFocus: false,
  });

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
    <SettingContext.Provider
      value={{
        settings,
        setSettings,
        selectedSetting,
        setSelectedSetting,
      }}>
      <UserTypeContext.Provider value={{ userType, setUserType }}>
        <WebsiteThemeContext.Provider
          value={{ selectedTheme, setSelectedTheme }}>
          <ThemeProvider theme={webTheme}>
            <SpalshNewsPopup
              open={popupData.open}
              sharedData={popupData.data}
              handleClose={handleClosePopup}
            />
            {horizontalData.length ? (
              <SplashNewsHorizontal horizontalData={horizontalData} />
            ) : null}
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
              <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
          <CourseContext.Provider
            value={{ selectedCourseDetails, setSelectedCourseDetails }}>
            <ThemeModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
              <ThemeProvider theme={theme}>
                <Routes>
                  <Route
                    path="/sch/*"
                    element={
                      <React.Suspense fallback={<Loader />}>
                        {userType === "employee" ? (
                          <EmployeeDashBoard />
                        ) : (
                          <StudentDashBoard />
                        )}
                      </React.Suspense>
                    }
                  />
                </Routes>
              </ThemeProvider>
            </ThemeModeContext.Provider>
          </CourseContext.Provider>
        </WebsiteThemeContext.Provider>
        <ToastContainer />
      </UserTypeContext.Provider>
    </SettingContext.Provider>
  );
}

export default App;
