import { Box, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import themeData from "../../../data/themeData";

const MuiBox = styled(Box)(() => ({
  overflow: "hidden",
  background: themeData.darkPalette.primary.main,
  flexShrink: 0,
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  textAlign: "center",
}));

const SplashNewsHorizontal = ({ horizontalData = [] }) => {
  let text = horizontalData.map((d) => `${d.text}`);

  return (
    <MuiBox>
      <marquee direction="left">
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#fff",
          }}
        >
          {text.join(" || ")}
        </Typography>
      </marquee>
    </MuiBox>
  );
};

export default SplashNewsHorizontal;
