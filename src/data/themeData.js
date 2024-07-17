/** @format */

import Theme1 from "../assets/images/theme1.png";
import Theme2 from "../assets/images/theme2.png";
import Card1 from "../assets/images/card1.png";
import Card2 from "../assets/images/card2.png";

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

const idCardThemes = [
  {
    image: Card1,
    theme: 1,
  },
  {
    image: Card2,
    theme: 2,
  },
];

export default {
  lightPalette,
  darkPalette,
  shapeProperties,
  websiteThemes,
  idCardThemes,
};
