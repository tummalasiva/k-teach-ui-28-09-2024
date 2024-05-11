import { Box, Fab, Tooltip } from "@mui/material";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import themeData from "../data/themeData";
export default function AddForm({ disabled, title, onAddClick = () => {} }) {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "-moz-fit-content",
          width: "fit-content",
          right: "70px",
          bottom: "20px",
        }}
      >
        <Tooltip title={title}>
          <Fab
            variant="contained"
            onClick={onAddClick}
            disabled={disabled}
            sx={{
              color: "#ffff",
              background: themeData.darkPalette.primary.main,
              ":hover": { background: themeData.darkPalette.primary.main },
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
}
