/** @format */

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Person } from "@mui/icons-material";
import themeData from "../../../data/themeData";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "../../../components/ThemeSelector";
import SettingContext from "../../../context/SettingsContext";

const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "#C8C8C8",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: "10px 80px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px ",
  },
}));

const SideContainer = styled(Grid)(({ theme }) => ({
  padding: "10px",
  gap: "20px",
}));

const DataContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

const SelectButton = styled(Button)(({ theme }) => ({
  backgroundColor: themeData.darkPalette.secondary.main,
  "&:hover": { backgroundColor: themeData.darkPalette.secondary.main },
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

export default function TopNav() {
  const navigate = useNavigate();
  const { settings, setSelectedSetting, selectedSetting } =
    useContext(SettingContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSchoolSelect = (school) => {
    setSelectedSetting(school);
    handleClose();
  };
  return (
    <>
      <MainContainer>
        <SideContainer container>
          <DataContainer>
            <CallIcon
              sx={{ color: `${themeData.darkPalette.secondary.main}` }}
              fontSize="small"
            />
            <Typography variant="body2" fontWeight="bold" color="black">
              +91 {selectedSetting.phone ? selectedSetting.phone : "9999999999"}
            </Typography>
          </DataContainer>
          <DataContainer>
            <EmailIcon
              sx={{ color: `${themeData.darkPalette.secondary.main}` }}
              fontSize="small"
            />

            <Link
              to={`mailto:${
                selectedSetting.email ? selectedSetting.email : "abc@gmail.com"
              }`}
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
              }}>
              {" "}
              {selectedSetting.email ? selectedSetting.email : "abc@gmail.com"}
            </Link>
          </DataContainer>
        </SideContainer>

        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}>
          {/* <ThemeSelector /> */}
          {settings.length >= 1 && (
            <>
              <SelectButton
                variant="contained"
                onClick={handleClick}
                size="small"
                endIcon={<KeyboardArrowDownIcon />}>
                {selectedSetting.name || "NA"}
              </SelectButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {settings.map((school, index) => (
                  <MenuItem
                    key={school.name + index}
                    onClick={() => handleSchoolSelect(school)}>
                    {school.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* {settings.length ? (
          <Button
            startIcon={<Person sx={{ color: "#ffff" }} />}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: themeData.darkPalette.primary.main,
            }}
            onClick={() => navigate("login")}
          >
            Login
          </Button>
         ) : null}  */}
        </Stack>
      </MainContainer>
    </>
  );
}
