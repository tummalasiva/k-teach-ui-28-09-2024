/** @format */

import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import themeData from "../data/themeData";
import WebsiteThemeContext from "../context/WebsiteThemeContext";
import SettingContext from "../context/SettingsContext";

export default function ThemeSelector({ onThemeSelect = () => {} }) {
  const { selectedSetting } = React.useContext(SettingContext);
  const { setSelectedTheme: setTheme } = React.useContext(WebsiteThemeContext);
  const [selectedTheme, setSelectedTheme] = React.useState(
    selectedSetting?.selectedTheme || 1
  );

  const handleClick = (theme) => {
    onThemeSelect(theme);
    setSelectedTheme(theme);
  };

  return (
    <React.Fragment>
      <Box dividers>
        <Grid spacing={2} container>
          {themeData.websiteThemes.map((t) => (
            <Grid
              key={t.theme + t.image}
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <div onClick={() => handleClick(t.theme)}>
                <img
                  style={{
                    height: "150px",
                    width: "200px",
                    objectFit: "contain",
                    border:
                      parseInt(selectedTheme) === t.theme
                        ? "2px solid green"
                        : "2px solid lightgray",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                  src={t.image}
                  alt={`Theme ${t.theme}`}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
