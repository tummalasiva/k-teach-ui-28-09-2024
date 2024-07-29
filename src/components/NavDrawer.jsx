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
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import menu from "../data/menu";
import Dashboard from "../pages/Dashboard";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LOGO from "../assets/images/deleteicon.png";

import { useNavigate } from "react-router-dom";

import ThemeModeContext from "../context/ThemeModeContext";
import AcademicYear from "../pages/Administrator/AcademicYear";
import ManageDesignation from "../pages/HumanResource/ManageDesignation";
import ManageDepartment from "../pages/HumanResource/ManageDepartment";
import Employee from "../pages/HumanResource/Employee";
import OfferLetter from "../pages/HumanResource/OfferLetter";
import RelievingLetter from "../pages/HumanResource/RelievingLetter";
import OffBoarding from "../pages/HumanResource/OffBoarding";
import ExperienceLetter from "../pages/HumanResource/ExperienceLetter";
import TeacherActivity from "../pages/HumanResource/TeacherActivity";
import RolePermission from "../pages/Administrator/RolePermission";
import UserRole from "../pages/Administrator/UserRole";
import ResetPassword from "../pages/Administrator/ResetPassword";
import Class from "../pages/Academic/Class";
import Section from "../pages/Academic/Section";
import Subject from "../pages/Academic/Subject";

import Overview from "../pages/Student/Overview";
import AdmitStudent from "../pages/Student/AdmitStudent";
import Reshuffle from "../pages/Student/Reshuffle";
import Promotion from "../pages/Student/Promotion";
import BulkAdmission from "../pages/Student/BulkAdmission";
import Credential from "../pages/Student/Credential";
import StudentActivity from "../pages/Student/StudentActivity";

import ReceiptBook from "../pages/Fees/ReceiptBook";
import FeeMapCategory from "../pages/Fees/FeeMapCategory";
import CollectFees from "../pages/Fees/CollectFees";
import BalanceFeeReport from "../pages/Fees/BalanceFeeReport";
import FeeOverview from "../pages/Fees/FeeOverview";
import Reconciliation from "../pages/Fees/Reconciliation";
import ManageHostel from "../pages/Hostel/ManageHostel";
import ManageRoomType from "../pages/Hostel/ManageRoomType";
import ManageRoomAndBed from "../pages/Hostel/ManageRoomAndBed";
import HostelMember from "../pages/Hostel/HostelMember";
import StudentBulkPhoto from "../pages/Student/StudentBulkPhoto";
import AddEmployee from "../pages/HumanResource/AddEmployee";
import ManageInstitute from "../pages/ManageInstitute/ManageInstitute";
import AddInstitute from "../pages/ManageInstitute/AddInstitute";
import Profile from "../pages/AccountSettings/Profile";
import UpdateEmployee from "../pages/HumanResource/UpdateEmployee";
import { PRIVATE_URLS } from "../services/urlConstants";
import { get } from "../services/apiMethods";
import SettingContext from "../context/SettingsContext";
import AddStudent from "../pages/Student/AddStudent";
import Compose from "../pages/Communication/Compose";
import Report from "../pages/Communication/Report";
import Credentials from "../pages/Communication/Credentials";
import BulkPhoto from "../pages/Student/BulkPhoto";
import PageNotFound from "./PageNotFound";
import Notifications from "../pages/Notifications";

// exlnt_70471681
// 9538063455

const drawerWidth = 250;

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

export default function NavDrawer() {
  const theme = useTheme();
  const { selectedSetting } = React.useContext(SettingContext);
  const [open, setOpen] = React.useState(true);
  const [sideMenuData, setSideMenuData] = React.useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);
  const [activeYear, setActiveYear] = React.useState([]);
  const [employee, setEmployee] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getEmployees = async () => {
    const user = window.localStorage.getItem(
      process.env.REACT_APP_CURRENT_USER
    );
    setEmployee(JSON.parse(user));
  };

  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeModeContext);
  const [selecteSubMenu, setSelectedSubMenu] = React.useState("");
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  const { SIDE_MENU_DATA } = menu;

  React.useEffect(() => {
    let role = employee?.role;

    if (!role) {
      setSideMenuData([]);
    } else if (role.name === "SUPER ADMIN") {
      setSideMenuData(SIDE_MENU_DATA);
    } else {
      let permissions = role.permissions;
      let newSideMenuData = [];
      for (let menuData of SIDE_MENU_DATA) {
        if (menuData.subMenus.length) {
          let newMenu = { ...menuData, subMenus: [] };

          for (let ren of menuData.renderName) {
            if (
              permissions
                ?.filter(
                  (p) => p.module.toLowerCase() === ren?.toLowerCase()
                )[0]
                ?.permissions?.includes("view")
            ) {
              newMenu.subMenus = [
                ...new Set([
                  ...newMenu.subMenus,
                  ...menuData.subMenus.filter(
                    (s) => s.renderName?.toLowerCase() === ren?.toLowerCase()
                  ),
                ]),
              ];
            }
          }

          if (newMenu.subMenus.length) {
            newSideMenuData.push(newMenu);
          }
        } else {
          if (
            permissions
              ?.filter(
                (p) =>
                  p.module.toLowerCase() ===
                  menuData.renderName[0]?.toLowerCase()
              )[0]
              ?.permissions?.includes("view")
          ) {
            newSideMenuData.push(menuData);
          }
        }
      }

      setSideMenuData(newSideMenuData);
    }
  }, [employee]);

  React.useEffect(() => {
    getActiveAcademicYear();
  }, [selectedSetting]);

  React.useEffect(() => {
    getEmployees();
  }, [selectedSetting]);

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

      for (let menu of SIDE_MENU_DATA) {
        if (menu.subMenus.length) {
          let pathNames = menu.subMenus.map((s) => s.path);
          if (pathNames.includes(path)) {
            menuIndex = SIDE_MENU_DATA.indexOf(menu);
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
    window.localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
    window.localStorage.removeItem(process.env.REACT_APP_CURRENT_USER);
    window.localStorage.removeItem(process.env.REACT_APP_USER_TYPE);
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
            {selectedSetting?.name} [{activeYear ? activeYear?.from : "-"} -{" "}
            {activeYear ? activeYear?.to : "-"}]
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
                      sx={{ width: 26, height: 26, color: "#BDBDBD" }}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Account Settings">
                <IconButton
                  onClick={handleClick}
                  aria-controls={openProfile ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openProfile ? true : undefined}>
                  {employee?.photo ? (
                    <img
                      src={employee?.photo}
                      style={{
                        width: "26px",
                        height: "26px",
                        display: "block",
                        objectFit: "cover",
                        margin: "0 auto",
                        borderRadius: "50%",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      alt="Preview"
                    />
                  ) : (
                    <Avatar sx={{ width: 26, height: 26 }} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Website">
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
            to="/sch/profile"
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

        <MenuItem onClick={handleLogout}>
          <Link
            to="/sch/administrator/reset-password"
            style={{ display: "flex", textDecoration: "none" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={{ color: "black" }}>Log Out</ListItemText>
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
            style={{
              height: "50px",
              width: "80px",

              objectFit: "contain",
            }}
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
                            color: "red",
                          }}>
                          <ListItemButton
                            onClick={() => setSelectedSubMenu(sub.path)}
                            sx={{
                              "& .MuiListItemText-root": {
                                whiteSpace: "normal",
                                wordWrap: "wrap",
                              },
                              "& .MuiListItemIcon-root": {
                                // This ensures the ListItemIcon doesn't use the default minimum width
                                // Adjust this value to decrease the space
                              },
                            }}
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
          <ListItemButton
            sx={{
              paddingLeft: 0,
              "& .MuiListItemText-root": {
                whiteSpace: "normal",
                wordWrap: "wrap",
              },
              "& .MuiListItemIcon-root": {
                // This ensures the ListItemIcon doesn't use the default minimum width
                // Adjust this value to decrease the space
              },
            }}>
            <Switch
              sx={{ marginRight: "20px" }}
              checked={isDarkMode}
              onChange={handleModeChange}
            />
            <ListItemText primary={isDarkMode ? "Dark Mode" : "Light Mode"} />
          </ListItemButton>
        </ListItem>
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-institute" element={<ManageInstitute />} />
          <Route path="administrator/academicYear" element={<AcademicYear />} />
          <Route
            path="administrator/role-permission"
            element={<RolePermission />}
          />
          <Route path="administrator/user-role" element={<UserRole />} />
          <Route
            path="administrator/reset-password"
            element={<ResetPassword />}
          />
          <Route
            path="human-resource/manage-designation"
            element={<ManageDesignation />}
          />
          <Route
            path="human-resource/manage-department"
            element={<ManageDepartment />}
          />
          <Route path="human-resource/employee" element={<Employee />} />
          <Route
            path="human-resource/update-employee/:id"
            element={<UpdateEmployee />}
          />
          <Route path="human-resource/offer-letter" element={<OfferLetter />} />
          <Route
            path="human-resource/relieving-letter"
            element={<RelievingLetter />}
          />

          {/* <Route path="human-resource/off-boarding" element={<OffBoarding />} /> */}
          <Route
            path="human-resource/experience-letter"
            element={<ExperienceLetter />}
          />

          <Route
            path="human-resource/teacher-activity"
            element={<TeacherActivity />}
          />

          <Route path="academic/class" element={<Class />} />
          <Route path="academic/section" element={<Section />} />
          <Route path="academic/subject" element={<Subject />} />

          <Route path="student/overview" element={<Overview />} />
          <Route path="student/admit-student" element={<AdmitStudent />} />
          <Route path="student/add-student" element={<AddStudent />} />
          <Route path="student/edit-student/:id" element={<AddStudent />} />
          <Route path="student/reshuffle" element={<Reshuffle />} />
          <Route path="student/promotion" element={<Promotion />} />
          <Route path="student/bulk-admission" element={<BulkAdmission />} />
          <Route path="student/credential" element={<Credential />} />

          <Route path="student/bulk-photo" element={<BulkPhoto />} />
          <Route
            path="student/student-activity"
            element={<StudentActivity />}
          />
          <Route
            path="student/student-bulk-photo"
            element={<StudentBulkPhoto />}
          />

          <Route path="fees/receipt-book" element={<ReceiptBook />} />
          <Route path="fees/feeMap-category" element={<FeeMapCategory />} />
          <Route path="fees/collect-fees" element={<CollectFees />} />
          <Route path="fees/balance-fee" element={<BalanceFeeReport />} />
          <Route path="fees/fee-overview" element={<FeeOverview />} />
          <Route path="fees/re-conciliation" element={<Reconciliation />} />

          <Route path="hostel/manage-hostel" element={<ManageHostel />} />
          <Route path="hostel/manage-room-type" element={<ManageRoomType />} />
          <Route path="hostel/manage-room-bed" element={<ManageRoomAndBed />} />
          <Route path="hostel/hostel-member" element={<HostelMember />} />

          <Route path="human-resource/add-employee" element={<AddEmployee />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="communication_compose" element={<Compose />} />
          <Route path="communication_report" element={<Report />} />
          <Route path="communication_credentials" element={<Credentials />} />

          <Route
            path="human-resource/edit-employee/:id"
            element={<AddEmployee />}
          />
          <Route
            path="manage-institute/add-institute"
            element={<AddInstitute />}
          />
          <Route
            path="manage-institute/add-institute"
            element={<AddInstitute />}
          />
          <Route
            path="manage-institute/edit-institute/:id"
            element={<AddInstitute />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}
