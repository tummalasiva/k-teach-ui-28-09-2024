/** @format */

import { AiFillHome } from "react-icons/ai";
import { RiInformationFill } from "react-icons/ri";
import { MdPhoto } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { HiDocumentSearch } from "react-icons/hi";
import { BsLifePreserver } from "react-icons/bs";

const menuItems = [
  {
    title: "Home",
    path: "/",
    logo: <AiFillHome />,
  },
  {
    title: "About",
    logo: <RiInformationFill />,
    dropdown: [
      {
        title: "Overview",
        path: "/about/overview",
      },
      {
        title: "About Founder",
        path: "/about/founder",
      },
      {
        title: "Vision & Mission",
        path: "/about/visionandmission",
      },
    ],
  },

  {
    title: "Pre-Admission",
    path: "/pre-admission",
    logo: <HiDocumentSearch />,
  },
  {
    title: "Gallery",
    path: "/home-gallery",
    logo: <MdPhoto />,
  },
  {
    title: "Facilities",
    logo: <BsLifePreserver />,
    dropdown: [
      {
        title: "Library",
        path: "/facilities/library",
      },
      {
        title: "Transport",
        path: "/facilities/transport",
      },
      {
        title: "Dance & Singing",
        path: "/facilities/dance-and-singing",
      },
      {
        title: "Food",
        path: "/facilities/canteen",
      },
    ],
  },

  {
    title: "Assignment",
    path: "/assignment",
    logo: <HiDocumentSearch />,
  },
  {
    title: "Results",
    path: "/results",
    logo: <HiDocumentSearch />,
  },

  {
    title: "Contact Us",
    path: "/contact-us",
    logo: <RiContactsFill />,
  },
];

export default menuItems;
