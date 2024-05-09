import React, { useState } from "react";
import { Box } from "@mui/material";
import Style from "../animated-button/style.css";

export default function CircularWaves() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Box
        className="circular1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className="circular2"></Box>
        <Box className="circular3"></Box>
        <Box className="circular4"></Box>
      </Box>
    </>
  );
}
