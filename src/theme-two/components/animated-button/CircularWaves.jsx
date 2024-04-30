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
        className={Style.circular1}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className={Style.circular2}></Box>
        <Box className={Style.circular3}></Box>
        <Box className={Style.circular4}></Box>
      </Box>
    </>
  );
}
