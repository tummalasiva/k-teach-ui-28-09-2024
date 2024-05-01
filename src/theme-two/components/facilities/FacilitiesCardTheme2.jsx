import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import themeData from "../../../data/themeData";

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  height: "300px",
  width: "250px",
  borderRadius: "10px",
  padding: "6px 0",
}));

const CircleBox = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.2)",
  height: "120px",
  width: "120px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const MuiButton = styled(Box)(({ theme }) => ({
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  color: "black",
  fontSize: "16px",
  padding: "14px",
  transition: "0.5s",
  borderRadius: "5px",
  "&:hover": {
    background: "#fff",
    color: themeData.darkPalette.secondary.main,
  },
}));

const MuiTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#fff",
  fontSize: 22,
}));

export default function FacilitiesCardTheme2({
  role,
  color,
  image,
  courses,
  path,
  title,
}) {
  let navigate = useNavigate();

  let handlePath = (path) => {
    navigate(path);
  };

  return (
    <>
      <Box component="div" title={title} className="facilitiesMain">
        <MainBox
          sx={{
            bgcolor: `${color}`,
          }}
        >
          <CircleBox>
            <img
              src={image}
              alt="loading..."
              style={{ height: "65px", width: "65px" }}
            />
          </CircleBox>

          <MuiTypography variant="h6">{role}</MuiTypography>
          <MuiButton
            className="facilitiesButton"
            onClick={() => handlePath(path)}
          >
            {courses}
          </MuiButton>
        </MainBox>
      </Box>
    </>
  );
}
