/** @format */

import Theme1 from "../assets/images/theme1.png";
import Theme2 from "../assets/images/theme2.png";

const darkPalette = {
  primary: {
    main: "#184880",
  },
  secondary: {
    main: "#2c4c71",
  },
  mode: "dark",
};

const lightPalette = {
  primary: {
    main: "#184880",
  },
  secondary: {
    main: "#446285",
  },
  mode: "light",
};

const shapeProperties = {
  borderRadius: 2,
};

const websiteThemes = [
  {
    image: Theme1,
    theme: 1,
  },
  {
    image: Theme2,
    theme: 2,
  },
];

export default {
  lightPalette,
  darkPalette,
  shapeProperties,
  websiteThemes,
};
