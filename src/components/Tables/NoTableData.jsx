import { Typography } from "@mui/material";
import React from "react";

export default function NoTableData({ dataPresent, title }) {
  if (dataPresent) return null;
  return (
    <Typography
      variant="h6"
      sx={{
        textAlign: "center",
        margin: "5px",
        padding: "5px",
      }}
    >
      {title.charAt(0).toUpperCase() + title.slice(1)} not found!
    </Typography>
  );
}
