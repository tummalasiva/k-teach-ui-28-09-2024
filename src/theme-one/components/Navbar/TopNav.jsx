import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Person } from "@mui/icons-material";
import themeData from "../../../data/themeData";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schools, setSchools] = useState([
    "Kayaka School",
    "Anjuman",
    "Siddhart Pu college",
  ]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSchoolSelect = (schoolName) => {
    setSelectedSchool(schoolName);
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
              +91 9999999999
            </Typography>
          </DataContainer>
          <DataContainer>
            <EmailIcon
              sx={{ color: `${themeData.darkPalette.secondary.main}` }}
              fontSize="small"
            />
            <Typography variant="body2" fontWeight="bold" color="black">
              abc@gmail.com
            </Typography>
          </DataContainer>
        </SideContainer>

        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <SelectButton
            variant="contained"
            onClick={handleClick}
            size="small"
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectedSchool || "Sample School Name"}
          </SelectButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {schools.map((schoolName) => (
              <MenuItem
                key={schoolName}
                onClick={() => handleSchoolSelect(schoolName)}
              >
                {schoolName}
              </MenuItem>
            ))}
          </Menu>

          <Button
            startIcon={<Person sx={{ color: "#ffff" }} />}
            variant="contained"
            size="small"
          >
            Login
          </Button>
        </Stack>
      </MainContainer>
    </>
  );
}
