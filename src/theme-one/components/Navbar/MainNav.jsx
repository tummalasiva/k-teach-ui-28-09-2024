import React, { useContext, useState } from "react";
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
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import menuItems from "./menuItems";
import logo from "../../../theme-one/assets/Images/bannback.png";

const SideMenuContainer = styled(Box)({
  display: { xs: "flex", md: "none", justifyContent: "flex-end" },
});

const MainMenuContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginRight: "3.5rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ManinMenuItems = styled(Button)({
  textTransform: "none",

  fontSize: "16px",
  "&:hover": {
    color: "#F86F03",
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
  borderTop: "3px solid #F86F03",
});

const MainMenuDropDownItems = styled(Button)({
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

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ backgroundColor: "#fff", color: "#333" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 0, sm: 0, md: 0, lg: 5 },
          }}
        >
          <Link to="/">
            <img
              alt=""
              style={{
                marginLeft: "3.2rem",
                objectFit: "contain",
                padding: "2px",
                maxWidth: "200px",
                maxHeight: "150px",
              }}
              src={logo}
            />
          </Link>
          <SideMenuContainer>
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
              }}
            >
              {menuItems.map((item, i) => {
                if (item.dropdown) {
                  return (
                    <Accordion
                      key={i}
                      sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`submenu-${item.title}`}
                        id={`submenu-${item.title}`}
                      >
                        <Typography
                          sx={{
                            "&:hover": {
                              color: "#F86F03",
                            },
                            color:
                              pathname === item.path ? "#F86F03" : "inherit",
                          }}
                        >
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
                                    ? "#F86F03"
                                    : "inherit",
                              }}
                              onClick={handleCloseNavMenu}
                            >
                              <MenuItem
                                sx={{
                                  "&:hover": {
                                    color: "#F86F03",
                                  },
                                }}
                                onClick={handleCloseNavMenu}
                              >
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
                      onClick={handleCloseNavMenu}
                    >
                      <MenuItem
                        sx={{
                          "&:hover": {
                            color: "#F86F03",
                            backgroundColor: "transparent",
                          },
                          color: pathname === item.path ? "#F86F03" : "inherit",
                        }}
                        onClick={handleCloseNavMenu}
                      >
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </SideMenuContainer>

          <MainMenuContainer>
            {menuItems.map((item) => {
              if (item.dropdown) {
                return (
                  <MainMenuDropdownContainer
                    key={item.title}
                    onMouseEnter={() => handleOpenSubMenu(item.title)}
                    onMouseLeave={handleCloseSubMenu}
                  >
                    <MainMenuDropDownItems
                      sx={{
                        color: pathname === item.path ? "#F86F03" : "inherit",
                      }}
                      onClick={() => handleChange(item.path)}
                    >
                      {item.title}
                      <KeyboardArrowDownIcon />
                    </MainMenuDropDownItems>
                    {subMenuOpen === item.title && (
                      <MainMenuChildrenContainer>
                        <List component="nav">
                          {item.dropdown.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              button
                              component={Link}
                              to={subItem.path}
                              onClick={handleCloseSubMenu}
                            >
                              <ListItemText
                                sx={{
                                  color:
                                    pathname === subItem.path
                                      ? "#F86F03"
                                      : "inherit",
                                  "&:hover": {
                                    color: "#F86F03",
                                  },
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
                  <ManinMenuItems
                    key={item.title}
                    component={Link}
                    to={item.path}
                    onClick={() => handleChange(item.path)}
                    sx={{
                      color: pathname === item.path ? "#F86F03" : "inherit",
                    }}
                  >
                    {item.title}
                  </ManinMenuItems>
                );
              }
            })}
          </MainMenuContainer>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default MainNav;
