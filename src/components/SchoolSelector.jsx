/** @format */

import React, { useContext, useState } from "react";
import SettingContext from "../context/SettingsContext";
import { Box, IconButton, MenuItem, Select, styled } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import { Home } from "@mui/icons-material";
import themeData from "../data/themeData";

export default function SchoolSelector() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedSetting, settings, setSelectedSetting } =
    useContext(SettingContext);

  const handleGoHome = () => navigate("/");

  const handleUpdateSelectSchool = (e) => {
    setSelectedSetting(settings.filter((s) => s._id == e.target.value)[0]);
  };

  return (
    <Box
      sx={{
        boxShadow: (theme) => theme.shadows[3],
        borderRadius: "20px",
        overflow: "hidden",
      }}>
      <Select
        fullWidth
        size="small"
        value={selectedSetting._id}
        onChange={handleUpdateSelectSchool}
        open={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          paddingLeft: "0px",
          borderRadius: "20px",
          backgroundColor: themeData.darkPalette.primary.main,
          border: "none",

          color: "#ffff",
        }}
        startAdornment={
          <InputAdornment>
            <IconButton onClick={handleGoHome}>
              <Home style={{ color: "skyblue" }} />
            </IconButton>
          </InputAdornment>
        }>
        {settings
          .filter((s) => s.active)
          .map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
}
