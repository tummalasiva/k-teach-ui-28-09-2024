/** @format */

import React, { useState } from "react";
import {
  Accordion,
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled, useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import menuItems from "../data/menuItems";
import logo from "../../../theme-one/assets/Images/bannback.png";
import themeData from "../../../data/themeData";
import { Person } from "@mui/icons-material";

const MainMenuContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MainMenuItems = styled(Typography)({
  textTransform: "none",
  textDecoration: "none",
  fontSize: "16px",
  "&:hover": {
    color: themeData.darkPalette.primary.main,
  },
});

const MainMenuChildrenContainer = styled(Box)({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "170px",
  backgroundColor: "#fff",
  zIndex: 1,
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  borderTop: `3px solid ${themeData.darkPalette.primary.main}`,
});

const MainMenuDropDownItems = styled(Typography)({
  fontSize: "16px",
  textTransform: "none",
});

const MainMenuDropdownContainer = styled(Box)({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
});

const MainNav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSubMenu = (menuTitle) => {
    setSubMenuOpen(menuTitle);
  };

  const handleCloseSubMenu = () => {
    setSubMenuOpen("");
  };

  let handleChange = (data) => {
    navigate(data);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between(900, 980));

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#fff",
          color: "#333",
          height: "120px",
          px: { xs: 2, sm: 1, md: 1, lg: 10 },
        }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Link to="/">
            <img
              alt=""
              width={matches ? 100 : 200}
              height={120}
              src={logo}
              style={{ paddingTop: "4px", objectFit: "contain" }}
            />
          </Link>

          <MainMenuContainer>
            {menuItems.map((item) => {
              if (item.dropdown) {
                return (
                  <MainMenuDropdownContainer
                    key={item.title}
                    onMouseEnter={() => handleOpenSubMenu(item.title)}
                    onMouseLeave={handleCloseSubMenu}>
                    <MainMenuDropDownItems
                      sx={{
                        color:
                          pathname === item.path
                            ? themeData.darkPalette.primary.main
                            : "black",
                        fontWeight: pathname === item.path ? "bold" : "normal",
                        mx: 0.5, // Adjust horizontal margin as needed
                      }}
                      onClick={() => handleChange(item.path)}>
                      {item.title}
                    </MainMenuDropDownItems>
                    <KeyboardArrowDownIcon />
                    {subMenuOpen === item.title && (
                      <MainMenuChildrenContainer>
                        <List component="nav">
                          {item.dropdown.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              button
                              component={Link}
                              to={subItem.path}
                              onClick={handleCloseSubMenu}>
                              <ListItemText
                                sx={{
                                  fontWeight:
                                    pathname === subItem.path
                                      ? "bold"
                                      : "normal",
                                  color:
                                    pathname === subItem.path
                                      ? themeData.darkPalette.primary.main
                                      : "black",
                                  "&:hover": {
                                    color: themeData.darkPalette.primary.main,
                                  },
                                  my: 0.5, // Adjust vertical margin as needed
                                }}
                                primary={subItem.title}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </MainMenuChildrenContainer>
                    )}
                  </MainMenuDropdownContainer>
                );
              } else {
                return (
                  <MainMenuItems
                    key={item.title}
                    component={Link}
                    to={item.path}
                    onClick={() => handleChange(item.path)}
                    sx={{
                      fontWeight: pathname === item.path ? "bold" : "normal",
                      color:
                        pathname === item.path
                          ? themeData.darkPalette.primary.main
                          : "inherit",
                      mx: 0.5, // Adjust horizontal margin as needed
                    }}>
                    {item.title}
                  </MainMenuItems>
                );
              }
            })}

            <Box
              sx={{
                paddingLeft: { lg: 5 },
                display: { xs: "none", md: "block" },
              }}>
              <Button
                startIcon={<Person sx={{ color: "#ffff" }} />}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: themeData.darkPalette.primary.main,
                }}
                onClick={() => navigate("login")}>
                Login
              </Button>
            </Box>
          </MainMenuContainer>

          <Box
            sx={{
              display: { xs: "block", sm: "block", md: "none", lg: "none" },
            }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {menuItems.map((item, i) => {
                if (item.dropdown) {
                  return (
                    <Accordion
                      key={i}
                      sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`submenu-${item.title}`}
                        id={`submenu-${item.title}`}>
                        <Typography
                          sx={{
                            "&:hover": {
                              color: themeData.darkPalette.primary.main,
                            },
                            color:
                              pathname === item.path
                                ? themeData.darkPalette.primary.main
                                : "inherit",
                          }}>
                          {item.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.path}
                              style={{
                                textDecoration: "none",
                                color:
                                  pathname === subItem.path
                                    ? themeData.darkPalette.primary.main
                                    : "inherit",
                              }}
                              onClick={handleCloseNavMenu}>
                              <MenuItem
                                sx={{
                                  "&:hover": {
                                    color: themeData.darkPalette.primary.main,
                                  },
                                }}
                                onClick={handleCloseNavMenu}>
                                {subItem.title}
                              </MenuItem>
                            </Link>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                } else {
                  return (
                    <Link
                      key={item.title}
                      to={item.path}
                      style={{ textDecoration: "none", color: "#333" }}
                      onClick={handleCloseNavMenu}>
                      <MenuItem
                        sx={{
                          "&:hover": {
                            color: themeData.darkPalette.primary.main,
                            backgroundColor: "transparent",
                          },
                          color:
                            pathname === item.path
                              ? themeData.darkPalette.primary.main
                              : "inherit",
                        }}
                        onClick={handleCloseNavMenu}>
                        {item.title}
                      </MenuItem>
                    </Link>
                  );
                }
              })}
            </Menu>
            <IconButton
              size="large"
              aria-label="menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default MainNav;
