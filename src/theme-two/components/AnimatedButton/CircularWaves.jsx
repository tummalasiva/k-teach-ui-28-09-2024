import React, { useState } from "react";
import { Box } from "@mui/material";
import css from "../AnimatedButton/style.css";

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
        className={css.circular1}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className={css.circular2}></Box>
        <Box className={css.circular3}></Box>
        <Box className={css.circular4}></Box>
      </Box>
    </>
  );
}
