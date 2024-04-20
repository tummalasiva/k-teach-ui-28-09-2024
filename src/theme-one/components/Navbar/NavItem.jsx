import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const NavItem = ({ onClick, title, open, path, isSelected }) => {
  return (
    <>
      <Box
        onClick={onClick}
        open={open}
        sx={{
          color: "white",
          cursor: "pointer",
          borderBottom: isSelected ? "2px solid white" : "none",
        }}
      >
        <Typography component="div" onClick={path} sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
    </>
  );
};
export default NavItem;
