import { useState } from "react";
import "./App.css";

import NavDrawer from "./components/NavDrawer";
import themeData from "./data/themeData";
import ThemeModeContext from "./context/ThemeModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import SettingContext from "./context/SettingsContext";

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
          <NavDrawer />
        </SettingContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
