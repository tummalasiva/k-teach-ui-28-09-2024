import React from "react";
import { Box, Typography } from "@mui/material";
// icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import themeData from "../../data/themeData";

export default function Dots() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
      }}
    >
      <Typography component="p">_________</Typography>
      <FiberManualRecordIcon sx={{ fontSize: "8px", marginTop: "15px" }} />
      <FiberManualRecordIcon
        sx={{
          color: themeData.darkPalette.primary.main,
          fontSize: "10px",
          marginTop: "14px",
          marginLeft: "5px",
        }}
      />
      <FiberManualRecordIcon
        sx={{ fontSize: "8px", marginTop: "15px", marginLeft: "6px" }}
      />
      <Typography component="p">_________</Typography>
    </Box>
  );
}
