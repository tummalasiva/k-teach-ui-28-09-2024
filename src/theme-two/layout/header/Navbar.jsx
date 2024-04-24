import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  styled,
  Box,
  IconButton,
  Drawer,
  List,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { navbarData } from "../../data/NavbarData";
import NavbarItem from "./NavbarItem";
import SettingContext from "../../../context/SettingsContext";
import KayakaLogo from "../../assets/images/kaykalogo.png";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MuiUl = styled("ul")(({ theme }) => ({
  "& li": {
    listStyle: "none",
    padding: "20px 15px",
    float: "left",
    margin: "0px 10px 0px 0px",
    textAlign: "center",
    cursor: "pointer",
  },
}));

const NavContainer = styled(Box)(({ theme }) => ({
  "& ul li::after": {
    content: "''",
    backgroundColor: "white",
    display: "block",
    transition: "width 0.5s",
    width: 0,
    height: "2px",
  },
  "& ul li:hover::after": {
    width: "100%",
  },
}));

const SideContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

const MainBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  zIndex: 10,
  position: "absolute",
  background: "transparent",
  borderBottom: "0.1px solid #828998",
}));

export default function Navbar() {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const { selectedSetting } = useContext(SettingContext);
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [home, setHome] = useState(null);
  const open = Boolean(home);
  const [about, setAbout] = useState(null);
  const open1 = Boolean(about);

  const [facilities, setFacilities] = useState(null);
  const open2 = Boolean(facilities);

  const [achievment, setAchievment] = useState(null);
  const open4 = Boolean(achievment);

  const [state, setState] = React.useState({
    right: false,
  });
  const [result, setResult] = useState(null);
  const open5 = Boolean(result);

  const [contact, setContact] = useState(null);
  const open6 = Boolean(contact);

  const [admission, setAdmission] = useState(null);
  const open7 = Boolean(admission);

  const handleMenuItem = () => {
    setShowMenuItem(true);
  };

  const handleClick = (e) => {
    setHome(e.currentTarget);
    navigate("/");
  };

  const handleClick1 = (e) => {
    setHome(e.currentTarget);
    navigate("/");
  };

  const handleClose1 = () => {
    // if (path){navigate(path)}
    setAbout(null);
  };

  const handleClose2 = () => {
    setFacilities(null);
  };

  const handleClick4 = (e) => {
    setAchievment(e.currentTarget);
  };
  const handleClose4 = () => {
    setAchievment(null);
  };

  const handleClick5 = (e) => {
    setResult(e.currentTarget);
    navigate("/results");
  };
  const handleClose5 = () => {
    setResult(null);
  };

  const handleClick6 = (e) => {
    setContact(e.currentTarget);
    navigate("/contact-us");
  };
  const handleClose6 = () => {
    setContact(null);
  };

  const handleClick7 = (e) => {
    setAdmission(e.currentTarget);
    navigate("/pre-admission");
  };
  const handleClose7 = () => {
    // if (path){navigate(path)}
    setAdmission(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, right: open });
  };

  let handlePath = (data) => {
    navigate(data);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(true)}
    >
      <List>
        {navbarData.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={data.items && <ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography onClick={handleClick}>{data.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {data.items &&
                    data.items.map((item, itemIndex) => {
                      return (
                        <React.Fragment key={itemIndex}>
                          <MenuItem>
                            <Typography
                              component="div"
                              onClick={() => handlePath(item.pathName)}
                              sx={{
                                color: pathname === item.pathName ? "red" : "",
                              }}
                            >
                              {item.title}
                            </Typography>
                          </MenuItem>
                        </React.Fragment>
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <MainBox>
        <Link to="/">
          <img
            height={130}
            width={140}
            src={selectedSetting?.logo?.link || KayakaLogo}
          />
        </Link>

        <NavContainer>
          <MuiUl variant="ul">
            {navbarData &&
              navbarData.map((data, i) => {
                return (
                  <React.Fragment key={i}>
                    <li>
                      <NavbarItem
                        title={data.title}
                        onClick={data.onClick}
                        open={data.open}
                        pathname={data.path}
                        isSelected={pathname === data.path}
                      />
                    </li>
                  </React.Fragment>
                );
              })}

            <Menu
              id="about"
              anchorEl={about}
              open={open1}
              onClick={handleClose1}
              style={{
                marginTop: "4%",
                Width: "15%",
                textAlign: "center",
              }}
            >
              <Link to="/about/overview" style={{ textDecoration: "none" }}>
                <MenuItem
                  style={{
                    color:
                      pathname == "/about/overview" ? "orangered" : "black",
                  }}
                >
                  Overview
                </MenuItem>
              </Link>
              <Link to="/about/founder" style={{ textDecoration: "none" }}>
                <MenuItem
                  style={{
                    color: pathname == "/about/founder" ? "orangered" : "black",
                  }}
                >
                  About Founder
                </MenuItem>
              </Link>
              <Link
                to="/about/visionandmission"
                style={{ textDecoration: "none" }}
              >
                <MenuItem
                  style={{
                    color:
                      pathname == "/about/visionandmission"
                        ? "orangered"
                        : "black",
                  }}
                >
                  Vision & Mission
                </MenuItem>
              </Link>
            </Menu>

            <Menu
              id="facilities"
              anchorEl={facilities}
              open={open2}
              onClick={handleClose2}
              style={{
                marginTop: "4%",
                Width: "15%",
                textAlign: "center",
              }}
            >
              <NavLink
                to="/facilities/canteen"
                style={{ textDecoration: "none" }}
              >
                <MenuItem
                  style={{
                    color:
                      pathname == "/facilities/canteen" ? "orangered" : "black",
                  }}
                >
                  Food
                </MenuItem>
              </NavLink>
              <Link to="/facilities/library" style={{ textDecoration: "none" }}>
                <MenuItem
                  style={{
                    color:
                      pathname == "/facilities/library" ? "orangered" : "black",
                  }}
                >
                  Library
                </MenuItem>
              </Link>
              <Link
                to="/facilities/transport"
                style={{ textDecoration: "none" }}
              >
                <MenuItem
                  style={{
                    color:
                      pathname == "/facilities/transport"
                        ? "orangered"
                        : "black",
                  }}
                >
                  Transport
                </MenuItem>
              </Link>
              <Link
                to="/facilities/dance-and-singing"
                style={{ textDecoration: "none" }}
              >
                <MenuItem
                  style={{
                    color:
                      pathname == "/facilities/dance-and-singing"
                        ? "orangered"
                        : "black",
                  }}
                >
                  Dance And Singing
                </MenuItem>
              </Link>
              <Link to="/facilities/labs" style={{ textDecoration: "none" }}>
                <MenuItem
                  style={{
                    color:
                      pathname == "/facilities/labs" ? "orangered" : "black",
                  }}
                >
                  Lab Facilities
                </MenuItem>
              </Link>
            </Menu>

            <Menu
              id="achievment"
              anchorEl={achievment}
              open={open4}
              onClick={handleClose4}
              style={{
                marginTop: "4%",
                Width: "15%",
                textAlign: "center",
              }}
            ></Menu>

            {showMenuItem && (
              <Menu
                id="result"
                onClick={handleMenuItem}
                anchorEl={result}
                open={open5}
                onClose={handleClose5}
                style={{
                  marginTop: "4%",
                  Width: "15%",
                  textAlign: "center",
                }}
              ></Menu>
            )}

            {showMenuItem && (
              <Menu
                id="contact"
                onClick={handleMenuItem}
                anchorEl={contact}
                open={open6}
                onClose={handleClose6}
                style={{
                  marginTop: "4%",
                  Width: "15%",
                  textAlign: "center",
                  background: "transparent",
                }}
              ></Menu>
            )}
          </MuiUl>
        </NavContainer>

        <SideContainer>
          <IconButton
            size="large"
            edge="start"
            color="info"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer(false)}
          >
            {list("right")}
          </Drawer>
        </SideContainer>
      </MainBox>
    </>
  );
}
