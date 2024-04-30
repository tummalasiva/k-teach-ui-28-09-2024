import React, { useEffect, useState } from "react";
import image from "../../theme-one/assets/Images/top.png";
import { Box, styled } from "@mui/material";

const CustomBox = styled(Box)(({ theme }) => ({
  zIndex: 100,
  position: "fixed",
  bottom: 20,
  right: 1,
  [theme.breakpoints.down(600)]: {
    display: "none",
  },
}));

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setHeight(scrollTop);

    setIsVisible(scrollTop > 400); // Show button when scrolled down 200 pixels
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (height > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [height]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <CustomBox
        // marginRight={8}
        marginBottom={5}
        // className={`scroll-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        {/* <i className="fas fa-chevron-up"></i> */}
        <img
          src={image}
          style={{
            height: "70px",
            width: "auto",
            objectFit: "contain",
            cursor: "pointer",
          }}
          alt=""
        />
      </CustomBox>
    </>
  );
};

export default ScrollTop;
