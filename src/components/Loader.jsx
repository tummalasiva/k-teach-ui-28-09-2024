import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const MuiBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
}));

export default function Loader() {
  return (
    <MuiBox>
      <CircularProgress />
    </MuiBox>
  );
}
