/** @format */

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  Collapse,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Tooltip,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
// icons

import NotificationsIcon from "@mui/icons-material/Notifications";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import studentMenu from "../data/studentMenu";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LOGO from "../assets/images/deleteicon.png";

import { useNavigate } from "react-router-dom";

import ThemeModeContext from "../context/ThemeModeContext";

import { PRIVATE_URLS } from "../services/urlConstants";
import { get } from "../services/apiMethods";
import SettingContext from "../context/SettingsContext";

import News from "../pages/StudentDashboard/News";
import Notice from "../pages/StudentDashboard/Notice";
import Invoice from "../pages/StudentDashboard/Invoice";
import Routine from "../pages/StudentDashboard/Routine";
import Live from "../pages/StudentDashboard/Live";
import Courses from "../pages/StudentDashboard/Courses";
import Feedback from "../pages/StudentDashboard/Feedback";
import Assignment from "../pages/StudentDashboard/Assignment";
import Attendance from "../pages/StudentDashboard/Attendance";
import Receipts from "../pages/StudentDashboard/Receipts";
import Profile from "../pages/StudentDashboard/accountSetting/Profile";

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavDrawerStudent() {
  const theme = useTheme();
  const { selectedSetting } = React.useContext(SettingContext);
  const [open, setOpen] = React.useState(true);
  // const { setUser, user } = React.useContext(UserContext);
  const [sideMenuData, setSideMenuData] = React.useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const [activeYear, setActiveYear] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeModeContext);
  const [selecteSubMenu, setSelectedSubMenu] = React.useState("");
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  const { SIDE_MENU_DATA_STUDENT } = studentMenu;

  React.useEffect(() => {
    setSideMenuData(SIDE_MENU_DATA_STUDENT);
    getActiveAcademicYear();
  }, []);

  //get academic year
  const getActiveAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setActiveYear(data.result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // on load if any selected sub-menu was there then open
  React.useEffect(() => {
    const openPreviousMenu = () => {
      let path = window.location.pathname;
      let menuIndex = null;

      for (let menu of SIDE_MENU_DATA_STUDENT) {
        if (menu.subMenus.length) {
          let pathNames = menu.subMenus.map((s) => s.path);
          if (pathNames.includes(path)) {
            menuIndex = SIDE_MENU_DATA_STUDENT.indexOf(menu);
          }
        }
      }

      if (menuIndex) {
        setSelectedMenu(menuIndex);
        setOpen(true);
      }
    };

    openPreviousMenu();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
    window.localStorage.setItem("isDarkMode", !isDarkMode);
  };

  const handleToggleMenuOpen = (index) => {
    if (selectedMenu === index) {
      return setSelectedMenu(null);
    }
    setSelectedMenu(index);
  };

  const handleLogout = () => {
    // window.localStorage.removeItem("inventory_current_user");
    // window.localStorage.removeItem("access_token");
    // window.localStorage.removeItem("role");
    // setUser(null);
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            color="white"
            textAlign="center"
            fontSize="18px"
            sx={{ display: { xs: "none", md: "block" } }}>
            {selectedSetting.name} [{activeYear ? activeYear.from : "-"} -{" "}
            {activeYear ? activeYear.to : "-"}]
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              spacing={1}
              direction="row">
              <Tooltip title="Notification">
                <Link to="/sch/notifications">
                  <IconButton>
                    <NotificationsIcon
                      sx={{ color: "#BDBDBD", width: 26, height: 26 }}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Account Settings">
                <IconButton
                  onClick={handleClick}
                  // size="small"
                  // sx={{ ml: 2 }}
                  aria-controls={openProfile ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openProfile ? "true" : undefined}>
                  <Avatar sx={{ width: 26, height: 26 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="websites">
                <Link to="/">
                  <IconButton>
                    <Avatar
                      src="/world-wide-web.png"
                      alt="loading..."
                      sx={{ width: 26, height: 26 }}
                    />
                  </IconButton>

                  {/* <img
                  src="/world-wide-web.png"
                  alt="loading..."
                  width={30}
                  height={30}
                  color="#fff"
                /> */}
                </Link>
              </Tooltip>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openProfile}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={handleClose}>
          <Link
            to="/sch/student_profile"
            style={{ display: "flex", textDecoration: "none" }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={{ color: "black" }}>Profile</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/sch/administrator/reset-password"
            style={{ display: "flex", textDecoration: "none" }}>
            <ListItemIcon>
              <LockResetIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={{ color: "black" }}>
              Reset Password
            </ListItemText>
          </Link>
        </MenuItem>
      </Menu>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: isDarkMode ? "#000" : "#fff",
            overflow: "hidden",
          }}>
          <Box></Box>
          <img
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
            src={selectedSetting?.logo}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon color="primary" />
            ) : (
              <ChevronLeftIcon color="primary" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideMenuData.map((m, index) =>
            !m.subMenus.length ? (
              <div key={m.path}>
                <ListItem disablePadding>
                  <Link
                    to={m.path}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      flex: 1,
                    }}>
                    <ListItemButton
                      onClick={() => setSelectedMenu(index)}
                      selected={
                        selectedMenu === index ||
                        window.location.pathname === m.path
                      }>
                      <ListItemIcon>{m.icon}</ListItemIcon>
                      <ListItemText primary={m.name} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                {/* <Divider /> */}
              </div>
            ) : (
              <div key={m.path + m.name}>
                <ListItem key={m.path} sx={{ padding: 0 }}>
                  <ListItemButton
                    selected={
                      selectedMenu === index ||
                      window.location.pathname === m.path
                    }
                    onClick={() => handleToggleMenuOpen(index)}>
                    <ListItemIcon>{m.icon}</ListItemIcon>
                    <ListItemText primary={m.name} />

                    {selectedMenu === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  timeout="auto"
                  unmountOnExit
                  in={selectedMenu === index}
                  sx={{ width: "100%" }}>
                  <List>
                    {m.subMenus.map((sub) => (
                      <ListItem sx={{ width: "100%" }} key={sub.name}>
                        <Link
                          to={sub.path}
                          style={{
                            textDecoration: "none",
                            display: "flex",
                            flex: 1,
                          }}>
                          <ListItemButton
                            onClick={() => setSelectedSubMenu(sub.path)}
                            selected={
                              selecteSubMenu === sub.path ||
                              window.location.pathname === sub.path
                            }>
                            <ListItemIcon>{sub.icon}</ListItemIcon>
                            <ListItemText primary={sub.name} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                {/* <Divider /> */}
              </div>
            )
          )}
        </List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton sx={{ paddingLeft: 0 }}>
            <Switch
              sx={{ marginRight: "15px" }}
              checked={isDarkMode}
              onChange={handleModeChange}
            />
            <ListItemText primary={isDarkMode ? "Dark Mode" : "Light Mode"} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ marginBottom: "20px" }} />
        <DrawerFooter>
          <List sx={{ width: "100%" }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </DrawerFooter>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,

          overflowX: "hidden",
          overflowY: "auto",
        }}>
        <DrawerHeader />

        <Routes>
          <Route path="student_news" element={<News />} />
          <Route path="student_notice" element={<Notice />} />
          <Route path="student_routine" element={<Routine />} />
          <Route path="student_invoice" element={<Invoice />} />
          <Route path="student_receipts" element={<Receipts />} />
          <Route path="student_attendance" element={<Attendance />} />

          <Route path="student_assignment" element={<Assignment />} />
          <Route path="student_feedback" element={<Feedback />} />

          <Route path="student_courses" element={<Courses />} />
          <Route path="student_live" element={<Live />} />
          <Route path="student_profile" element={<Profile />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}
