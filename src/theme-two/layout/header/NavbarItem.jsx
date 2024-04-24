import React from "react";
import { Box, Typography } from "@mui/material";

const NavbarItem = ({ onClick, title, open, path, isSelected }) => {
  return (
    <>
      <Box
        onClick={onClick}
        open={open}
        sx={{
          cursor: "pointer",
          borderBottom: isSelected ? "2px solid white" : "none",
        }}
      >
        <Typography
          component="div"
          onClick={path}
          sx={{ fontWeight: "bold", color: "white" }}
        >
          {title}
        </Typography>
      </Box>
    </>
  );
};
export default NavbarItem;
