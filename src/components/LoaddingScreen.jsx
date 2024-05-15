/** @format */

import { Box, Typography } from "@mui/material";
import React from "react";

export default function LoadingScreen({ message = "Loading... Please wait!" }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
        {message}
      </Typography>
    </Box>
  );
}
