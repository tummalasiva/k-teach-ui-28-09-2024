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
import Enquiries from "../pages/Pre-Admission/Enquiries";
import Exams from "../pages/Pre-Admission/Exams";
import ExamSchedules from "../pages/Pre-Admission/ExamSchedules";
import Result from "../pages/Pre-Admission/Result";
import Class from "../pages/Academic/Class";
import Section from "../pages/Academic/Section";
import Subject from "../pages/Academic/Subject";
import StudentAttendance from "../pages/Attendance/StudentAttendance";
import EmployeeAttendance from "../pages/Attendance/EmployeeAttendance";
import ClassRoutine from "../pages/ClassRoutine";
import Overview from "../pages/Student/Overview";
import AdmitStudent from "../pages/Student/AdmitStudent";
import Reshuffle from "../pages/Student/Reshuffle";
import Promotion from "../pages/Student/Promotion";
import BulkAdmission from "../pages/Student/BulkAdmission";
import Credential from "../pages/Student/Credential";
import QuickAdmit from "../pages/Student/QuickAdmit";
import StudentActivity from "../pages/Student/StudentActivity";
import Assignment from "../pages/Assignment";
import Notice from "../pages/Announcement/Notice";
import News from "../pages/Announcement/News";
import Holiday from "../pages/Announcement/Holiday";
import AwardsAndAchievements from "../pages/Announcement/AwardsAndAchievements";
import SplashNews from "../pages/Announcement/SplashNews";
import Gallery from "../pages/Gallery";
import Notifications from "../pages/Notifications";
import Event from "../pages/Event";
import ExamGrade from "../pages/Exam/ExamGrade";
import ExamTerm from "../pages/Exam/ExamTerm";
import ExamSchedule from "../pages/Exam/ExamSchedule";
import ExamHallTicket from "../pages/Exam/ExamHallTicket";
import DivisionWiseReport from "../pages/ExamMark/DivisionWiseReport";
import SubjectWiseReport from "../pages/ExamMark/SubjectWiseReport";
import ConsolidatedMarkSheet from "../pages/ExamMark/ConsolidatedMarkSheet";
import Markscard from "../pages/ExamMark/Markscard";
import ExamResult from "../pages/ExamMark/ExamResult";
import ManageMark from "../pages/ExamMark/ManageMark";
import ExamAttendance from "../pages/ExamMark/ExamAttendance";
import Courses from "../pages/LMS/Courses";
import CourseContent from "../pages/LMS/CourseContent";
import Live from "../pages/LMS/Live";
import Storage from "../pages/LMS/Storage";
import Books from "../pages/Library/Books";
import Periodical from "../pages/Library/Periodical";
import StudentLibraryMember from "../pages/Library/StudentLibraryMember";
import StudentIssueReturn from "../pages/Library/StudentIssueReturn";
import EmployeeLibraryMember from "../pages/Library/EmployeeLibraryMember";
import EmployeeIssueReturn from "../pages/Library/EmployeeIssueReturn";
import LeaveType from "../pages/LeaveManagement/LeaveType";
import StudentsLeave from "../pages/LeaveManagement/StudentsLeave";
import EmployeeLeave from "../pages/LeaveManagement/EmployeeLeave";
import LeaveReport from "../pages/LeaveManagement/LeaveReport";
import Item from "../pages/Inventory/Item";
import Vendor from "../pages/Inventory/Vendor";
import InOutTransaction from "../pages/Inventory/InOutTransaction";
import StockList from "../pages/Inventory/StockList";
import Issue from "../pages/Inventory/Issue";
import Sell from "../pages/Inventory/Sell";
import StudyCertificate from "../pages/Certificate/StudyCertificate";
import TransferCertificate from "../pages/Certificate/TransferCertificate";
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
import Vehicle from "../pages/Transport/Vehicle";
import ManageRouteAndTrips from "../pages/Transport/ManageRouteAndTrips";
import TransportMember from "../pages/Transport/TransportMember";
import VehicleRoutes from "../pages/Transport/Routes";
import VehicleLog from "../pages/Transport/VehicleLog";
import VehicleMaintenance from "../pages/Transport/VehicleMaintenance";
import SalaryGrade from "../pages/PayRoll/SalaryGrade";
import MakePayment from "../pages/PayRoll/MakePayment";
import LibraryReport from "../pages/Report/LibraryReport";
import StudentYearlyAttendance from "../pages/Report/StudentYearlyAttendance";
import EmployeeYearlyAttendance from "../pages/Report/EmployeeYearlyAttendance";
import StudentActivityReport from "../pages/Report/StudentActivityReport";

import StudentAttendanceReport from "../pages/Report/StudentAttendance";
import EmployeeAttendanceReport from "../pages/Report/EmployeeAttendance";
import VisitorInfo from "../pages/VisitorInfo/VisitorInfo";
import StudentCheckout from "../pages/VisitorInfo/StudentCheckout";
import HelpDesk from "../pages/HelpDesk";
import GuardianFeedback from "../pages/GuardianFeedback";
import StudentBulkPhoto from "../pages/Student/StudentBulkPhoto";
import StudentReport from "../pages/Report/StudentReport";
import AddForm from "../forms/AddForm";
import AddEmployee from "../pages/HumanResource/AddEmployee";
import ManageInstitute from "../pages/ManageInstitute/ManageInstitute";
import AddInstitute from "../pages/ManageInstitute/AddInstitute";
import themeData from "../data/themeData";
import Profile from "../pages/AccountSettings/Profile";

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

export default function NavDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  // const { setUser, user } = React.useContext(UserContext);
  const [sideMenuData, setSideMenuData] = React.useState([]);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openProfile = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeModeContext);
  const [selecteSubMenu, setSelectedSubMenu] = React.useState("");
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  const { SIDE_MENU_DATA } = menu;
  React.useEffect(() => {
    setSideMenuData(SIDE_MENU_DATA);
  });

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
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            color="white"
            textAlign="center"
            fontSize="18px"
          >
            ERP School [2025-2025]
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          > */}
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              width: "100%",
              justifyContent: "flex-end",
            }}
            spacing={2}
            direction="row"
          >
            <Tooltip title="Notification">
              <Link to="/sch/notifications">
                <IconButton color="red">
                  <NotificationsIcon
                    fontSize="large"
                    sx={{ color: "#BDBDBD" }}
                  />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Account Settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openProfile ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
              >
                <Avatar sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="websites">
              <Link to="/">
                <img
                  src="/world-wide-web.png"
                  alt="loading..."
                  width={30}
                  height={30}
                  color="#fff"
                />
              </Link>
            </Tooltip>
          </Stack>
          {/* </Box> */}
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
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/sch/profile"
            style={{ display: "flex", textDecoration: "none" }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={{ color: "black" }}>Profile</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="/sch/administrator/reset-password"
            style={{ display: "flex", textDecoration: "none" }}
          >
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
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Box></Box>
          <img
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
            src={LOGO}
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
                    style={{ textDecoration: "none", display: "flex", flex: 1 }}
                  >
                    <ListItemButton
                      onClick={() => setSelectedMenu(index)}
                      selected={
                        selectedMenu === index ||
                        window.location.pathname === m.path
                      }
                    >
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
                    onClick={() => handleToggleMenuOpen(index)}
                  >
                    <ListItemIcon>{m.icon}</ListItemIcon>
                    <ListItemText primary={m.name} />

                    {selectedMenu === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  timeout="auto"
                  unmountOnExit
                  in={selectedMenu === index}
                  sx={{ width: "100%" }}
                >
                  <List>
                    {m.subMenus.map((sub) => (
                      <ListItem sx={{ width: "100%" }} key={sub.name}>
                        <Link
                          to={sub.path}
                          style={{
                            textDecoration: "none",
                            display: "flex",
                            flex: 1,
                          }}
                        >
                          <ListItemButton
                            onClick={() => setSelectedSubMenu(sub.path)}
                            selected={
                              selecteSubMenu === sub.path ||
                              window.location.pathname === sub.path
                            }
                          >
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
              <Link
                to={"/settings"}
                style={{ textDecoration: "none", display: "flex", flex: 1 }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={"Settings"} />
                </ListItemButton>
              </Link>
            </ListItem>
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
        }}
      >
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
          <Route path="human-resource/offer-letter" element={<OfferLetter />} />
          <Route
            path="human-resource/relieving-letter"
            element={<RelievingLetter />}
          />

          <Route path="human-resource/off-boarding" element={<OffBoarding />} />
          <Route
            path="human-resource/experience-letter"
            element={<ExperienceLetter />}
          />

          <Route
            path="human-resource/teacher-activity"
            element={<TeacherActivity />}
          />

          <Route path="pre-admission/enquiries" element={<Enquiries />} />
          <Route path="pre-admission/exams" element={<Exams />} />
          <Route
            path="pre-admission/exam-schedules"
            element={<ExamSchedules />}
          />
          <Route path="pre-admission/result" element={<Result />} />

          <Route path="academic/class" element={<Class />} />
          <Route path="academic/section" element={<Section />} />
          <Route path="academic/subject" element={<Subject />} />

          <Route
            path="attendence/student-attendance"
            element={<StudentAttendance />}
          />
          <Route
            path="attendence/employee-attendance"
            element={<EmployeeAttendance />}
          />

          <Route path="class-routine" element={<ClassRoutine />} />
          <Route path="student/overview" element={<Overview />} />

          <Route path="student/admit-student" element={<AdmitStudent />} />
          <Route path="student/reshuffle" element={<Reshuffle />} />
          <Route path="student/promotion" element={<Promotion />} />
          <Route path="student/bulk-admission" element={<BulkAdmission />} />
          <Route path="student/credential" element={<Credential />} />
          <Route path="student/quick-admit" element={<QuickAdmit />} />
          <Route
            path="student/student-activity"
            element={<StudentActivity />}
          />
          <Route
            path="student/student-bulk-photo"
            element={<StudentBulkPhoto />}
          />

          <Route path="assignment" element={<Assignment />} />

          <Route path="announcement/notice" element={<Notice />} />
          <Route path="announcement/news" element={<News />} />
          <Route path="announcement/holiday" element={<Holiday />} />
          <Route
            path="announcement/awardsAndAchievements"
            element={<AwardsAndAchievements />}
          />
          <Route path="announcement/splashNews" element={<SplashNews />} />

          <Route path="gallery" element={<Gallery />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="event" element={<Event />} />

          <Route path="exam/exam-grade" element={<ExamGrade />} />
          <Route path="exam/exam-term" element={<ExamTerm />} />
          <Route path="exam/exam-schedule" element={<ExamSchedule />} />
          <Route path="exam/exam-hall-ticket" element={<ExamHallTicket />} />
          <Route
            path="exam-Mark/exam-Attendance"
            element={<ExamAttendance />}
          />
          <Route path="exam-Mark/manage-mark" element={<ManageMark />} />
          <Route path="exam-Mark/exam-result" element={<ExamResult />} />
          <Route path="exam-Mark/marks-card" element={<Markscard />} />
          <Route
            path="exam-Mark/consolidated-marks-sheet"
            element={<ConsolidatedMarkSheet />}
          />
          <Route
            path="exam-Mark/subject-wise-report"
            element={<SubjectWiseReport />}
          />
          <Route
            path="exam-Mark/division-wise-report"
            element={<DivisionWiseReport />}
          />

          <Route path="lms/storage" element={<Storage />} />
          <Route path="lms/courses" element={<Courses />} />
          <Route path="lms/course-content" element={<CourseContent />} />
          <Route path="lms/live" element={<Live />} />

          <Route path="library/books" element={<Books />} />
          <Route path="library/periodical" element={<Periodical />} />
          <Route
            path="library/student-library-member"
            element={<StudentLibraryMember />}
          />
          <Route
            path="library/student-issue-return"
            element={<StudentIssueReturn />}
          />
          <Route
            path="library/employee-library-member"
            element={<EmployeeLibraryMember />}
          />
          <Route
            path="library/employee-issue-return"
            element={<EmployeeIssueReturn />}
          />

          <Route path="leave-management/leave-type" element={<LeaveType />} />
          <Route
            path="leave-management/student-leave"
            element={<StudentsLeave />}
          />
          <Route
            path="leave-management/employee-leave"
            element={<EmployeeLeave />}
          />
          <Route
            path="leave-management/leave-report"
            element={<LeaveReport />}
          />

          <Route path="inventory/item" element={<Item />} />
          <Route path="inventory/vendor" element={<Vendor />} />
          <Route path="inventory/transaction" element={<InOutTransaction />} />
          <Route path="inventory/stockList" element={<StockList />} />
          <Route path="inventory/issue" element={<Issue />} />
          <Route path="inventory/sell" element={<Sell />} />
          <Route
            path="certificate/study-certificate"
            element={<StudyCertificate />}
          />
          <Route
            path="certificate/transfer-certificate"
            element={<TransferCertificate />}
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

          <Route path="transport/vehicle" element={<Vehicle />} />
          <Route
            path="transport/manage-route"
            element={<ManageRouteAndTrips />}
          />
          <Route path="transport/routes" element={<VehicleRoutes />} />
          <Route
            path="transport/trasport-member"
            element={<TransportMember />}
          />

          <Route path="transport/vehicle-log" element={<VehicleLog />} />
          <Route
            path="transport/vehicle-maintenance"
            element={<VehicleMaintenance />}
          />

          <Route path="payroll/salary-grade" element={<SalaryGrade />} />
          <Route path="payroll/make-payment" element={<MakePayment />} />

          <Route path="report/library-report" element={<LibraryReport />} />
          <Route
            path="report/student-attendance"
            element={<StudentAttendanceReport />}
          />
          <Route
            path="report/student-yearly-attendane"
            element={<StudentYearlyAttendance />}
          />
          <Route
            path="report/employee-attendance"
            element={<EmployeeAttendanceReport />}
          />
          <Route
            path="report/employee-yearly-attendance"
            element={<EmployeeYearlyAttendance />}
          />
          <Route path="report/student-report" element={<StudentReport />} />
          <Route
            path="report/student-activity-report"
            element={<StudentActivityReport />}
          />

          <Route path="visitorInfo/visitor-info" element={<VisitorInfo />} />
          <Route
            path="visitorInfo/student-checkout"
            element={<StudentCheckout />}
          />

          <Route path="help-desk" element={<HelpDesk />} />
          <Route path="guardian-feedback" element={<GuardianFeedback />} />
          <Route path="human-resource/add-employee" element={<AddEmployee />} />
          <Route
            path="manage-institute/add-institute"
            element={<AddInstitute />}
          />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}
