export const navbarData = [
  {
    href: "#",
    id: "button",
    "aria-haspopup": "true",
    // "aria-expanded": open ? "true" : undefined,
    // onClick: handleClick,
    variant: "contained",
    title: "Home ",
    path: "/",
  },
  {
    href: "#",
    id: "button",
    "aria-haspopup": "true",
    // "aria-expanded": open1 ? "true" : undefined,
    // onClick: handleClick1,
    variant: "contained",
    title: "About +",

    items: [
      {
        title: "About us",
        pathName: "/about/overview",
      },
      {
        title: "About Founder",
        pathName: "/about/founder",
      },
      {
        title: " Vision & Mission",
        pathName: "/about/visionandmission",
      },
    ],
  },

  {
    href: "#",
    id: "button",
    "aria-haspopup": "true",
    variant: "contained",
    title: "Pre-Admission ",
    // onClick: handleClick7,
    path: "/pre-admission",
  },
  {
    href: "#",
    id: "button",
    "aria-haspopup": "true",
    variant: "contained",
    title: "Gallery ",
    path: "/home-gallery",
    // onClick: () => navigate("/home-gallery"),
  },

  {
    href: "#",
    id: "button",
    // "aria-haspopup": "true",
    // "aria-expanded": open2 ? "true" : undefined,
    // onClick: handleClick2,
    variant: "contained",
    title: "Facilities + ",
    items: [
      {
        title: "Food",
        pathName: "/facilities/canteen",
      },
      {
        title: "Library",
        pathName: "/library",
      },
      {
        title: "Transport",
        pathName: "/transport",
      },
      {
        title: "Dance And Singing",
        pathName: "/facilities/dance-and-singing",
      },
      {
        title: "Lab Facilities",
        pathName: "/facilities/labs",
      },
    ],
  },

  {
    href: "#",
    id: "button",
    "aria-haspopup": "true",
    // "aria-expanded": open5 ? "true" : undefined,
    // onClick: handleClick5,
    variant: "contained",
    title: "Results ",
    path: "/results",
  },

  {
    href: "#",
    id: "button",
    "aria-haspopup": "true",
    // "aria-expanded": open6 ? "true" : undefined,
    // onClick: handleClick6,
    variant: "contained",
    title: "Contact us ",
    path: "/contact-us",
  },
];
