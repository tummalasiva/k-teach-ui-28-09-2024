import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarItem = ({ onClick, title, open, isSelected, pathname }) => {
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
        <Link to={pathname} style={{ textDecoration: "none" }}>
          <Typography
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            {title}
          </Typography>
        </Link>
      </Box>
    </>
  );
};
export default NavbarItem;
