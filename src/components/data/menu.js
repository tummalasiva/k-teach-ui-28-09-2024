import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

import React from "react";
import GiteIcon from "@mui/icons-material/Gite";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ManIcon from "@mui/icons-material/Man";
import InventoryIcon from "@mui/icons-material/Inventory";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import WcIcon from "@mui/icons-material/Wc";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";

import {
  SettingsSuggest,
  AccountBalance,
  AccessTime,
  Groups,
  CheckBox,
  TextSnippet,
  SchoolRounded,
  CardMembershipRounded,
  CampaignRounded,
  Person,
  CurrencyRupee,
  BarChart,
} from "@mui/icons-material";

import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import Diversity2Icon from "@mui/icons-material/Diversity2";

const SIDE_MENU_DATA = [
  {
    name: "Dashboard",
    path: "/dashboard",
    renderName: [],
    subMenus: [],
    icon: <DashboardRoundedIcon color="primary" fontSize="small" />,
  },
  {
    name: "Manage Institute",
    path: "/manageInstitute",
    renderName: [""],
    subMenus: [],
    icon: <SettingsSuggest color="primary" fontSize="small" />,
  },

  {
    name: "Administrator",
    path: "",
    renderName: [
      "academicYear",
      "userRole",
      "rolePermission",
      "userPasswordReset",
    ],

    icon: <Person color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Academic Year",
        renderName: "academicYear",
        path: "/administrator/academicYear",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "User Role(ACL)",
        renderName: "userRole",
        path: "/administrator/user-role",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Role Permission(ACL)",
        renderName: "rolePermission",
        path: "/administrator/role-permission",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "User Password Reset",
        renderName: "userPasswordReset",
        path: "/administrator/reset-password",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Human Resource",
    path: "",
    renderName: [
      "manageDesignation",
      "manageDepartment",
      "employee",
      "offerLetter",
      "relievingLetter",
      "offBoarding",
      "experienceLetter",
      "teacherActivity",
    ],
    icon: <Diversity2Icon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Manage Designation",
        renderName: "manageDesignation",
        path: "/human-resource/manage-designation",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Manage Department",
        renderName: "manageDepartment",
        path: "/human-resource/manage-department",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Employee",
        renderName: "employee",
        path: "/human-resource/employee",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Offer-Letter",
        renderName: "offerLetter",
        path: "/human-resource/offer-letter",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Relieving Letter",
        renderName: "relievingLetter",
        path: "/human-resource/relieving-letter",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Off Boarding",
        renderName: "offBoarding",
        path: "/human-resource/off-boarding",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Experience Letter",
        renderName: "experienceLetter",
        path: "/human-resource/experience-letter",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Teacher Activity",
        renderName: "teacherActivity",
        path: "/human-resource/teacher-activity",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },
  {
    name: "Pre-Admission",
    path: "",
    renderName: ["enquiries", "enquiries", "examSchedules", "result"],
    icon: <ManIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Enquiries",
        renderName: "enquiries",
        path: "/pre-admission/enquiries",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Exams",
        renderName: "exams",
        path: "/pre-admission/exams",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Exam Schedules",
        renderName: "examSchedules",
        path: "/pre-admission/exam-schedules",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Result",
        renderName: "result",
        path: "/pre-admission/result",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Academic",
    path: "",
    renderName: ["class", "section", "subject"],
    icon: <AccountBalance color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Class",
        renderName: "class",
        path: "/academic/class",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Secion",
        renderName: "section",
        path: "/academic/section",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Subjet",
        renderName: "subject",
        path: "/academic/subject",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Attendance",
    path: "",
    renderName: ["studentAttendance", "employeeAttendance"],
    icon: <CheckBox color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Student Attendance",
        renderName: "studentAttendance",
        path: "/attendence/student-attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Employee Attendance",
        renderName: "employeeAttendance",
        path: "/attendence/employee-attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },
  {
    name: "Class Routine",
    path: "/class-routine",
    renderName: ["class-routine"],
    subMenus: [],
    icon: <AccessTime color="primary" fontSize="small" />,
  },

  {
    name: "Student",
    path: "",
    renderName: [
      "overview",
      "admitStudent",
      "reshuffle",
      "promotion",
      "bulkAdmission",
      "credential",
      "quickAdmit",
      "studentActivity",
    ],
    icon: <Groups color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Overview",
        renderName: "overview",
        path: "/student/overview",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Admit Student",
        renderName: "admitStudent",
        path: "/student/admit-student",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Reshuffle",
        renderName: "reshuffle",
        path: "/student/reshuffle",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Promotion",
        renderName: "promotion",
        path: "/student/promotion",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },

      {
        name: "Bulk Admission",
        renderName: "bulkAdmission",
        path: "/student/bulk-admission",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Credential",
        renderName: "credential",
        path: "/student/credential",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Quick Admit",
        renderName: "quickAdmit",
        path: "/student/quick-admit",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Activity",
        renderName: "studentActivity",
        path: "/student/student-activity",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Assignment",
    path: "/assignment",
    renderName: ["assgnment"],
    subMenus: [],
    icon: <AssignmentRoundedIcon color="primary" fontSize="small" />,
  },

  {
    name: "Announcement",
    path: "",
    renderName: [
      "notice",
      "news",
      "holiday",
      "awardsAndAchievements",
      "splashNews",
    ],
    icon: <CampaignRounded color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Notice",
        renderName: "notice",
        path: "/announcement/notice",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "News",
        renderName: "news",
        path: "/announcement/news",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Holiday",
        renderName: "holiday",
        path: "/announcement/holiday",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Awards And Achievements",
        renderName: "awardsAndAchievements",
        path: "/announcement/awardsAndAchievements",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },

      {
        name: "Splash News",
        renderName: "splashNews",
        path: "/announcement/splashNews",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },
  {
    name: "Gallery",
    path: "/gallery",
    renderName: ["gallery"],
    subMenus: [],
    icon: <PhotoRoundedIcon color="primary" fontSize="small" />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    renderName: ["notifications"],
    subMenus: [],
    icon: <NotificationsActiveRoundedIcon color="primary" fontSize="small" />,
  },
  {
    name: "Event",
    path: "/event",
    renderName: ["event"],
    subMenus: [],
    icon: <Groups color="primary" fontSize="small" />,
  },

  {
    name: "Exam",
    path: "",
    renderName: ["examGrade", "examTerm", "examSchedule", "examHallTicket"],
    icon: <TextSnippet color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Exam Grade",
        renderName: "examGrade",
        path: "/exam/exam-grade",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Exam Term",
        renderName: "examTerm",
        path: "/exam/exam-term",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Exam Schedule",
        renderName: "examSchedule",
        path: "/exam/exam-schedule",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Exam Hall Ticket",
        renderName: "examHallTicket",
        path: "/exam/exam-hall-ticket",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Exam Mark",
    path: "",
    renderName: [
      "examAttendance",
      "manageMark",
      "examResult",
      "marksCard",
      "consolidatedMarksSheet",
      "subjectWiseReport",
      "divisionWiseReport",
    ],
    icon: <SchoolRounded color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Exam Attendance",
        renderName: "examAttendance",
        path: "/exam-Mark/exam-Attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Manage Mark",
        renderName: "manageMark",
        path: "/exam-Mark/manage-mark",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Exam Result",
        renderName: "examResult",
        path: "/exam-Mark/exam-result",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Marks Card",
        renderName: "marksCard",
        path: "/exam-Mark/marks-card",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },

      {
        name: "Consolidated Marks Sheet",
        renderName: "consolidatedMarksSheet",
        path: "/exam-Mark/consolidated-marks-sheet",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Subject Wise Report",
        renderName: "subjectWiseReport",
        path: "/exam-Mark/subject-wise-report",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Division Wise Report",
        renderName: "divisionWiseReport",
        path: "/exam-Mark/division-wise-report",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "LMS",
    path: "",
    renderName: ["storage", "courses", "courseContent", "live"],
    icon: <LibraryBooksIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Storage",
        renderName: "storage",
        path: "/lms/storage",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Courses",
        renderName: "courses",
        path: "/lms/courses",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Course Content",
        renderName: "courseContent",
        path: "/lms/course-content",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Live",
        renderName: "live",
        path: "/lms/live",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Library",
    path: "",
    renderName: [
      "books",
      "periodical",
      "studentLibraryMember",
      "studentIssueReturn",
      "employeeLibraryMember",
      "employeeIssueReturn",
    ],
    icon: <LibraryBooksIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Books",
        renderName: "books",
        path: "/library/books",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Periodical",
        renderName: "periodical",
        path: "/library/periodical",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Library Member",
        renderName: "studentLibraryMember",
        path: "/library/student-library-member",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Issue & Return",
        renderName: "studentIssueReturn",
        path: "/library/student-issue-return",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },

      {
        name: "Employee Library Member",
        renderName: "employeeLibraryMember",
        path: "/library/employee-library-member",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Employee Issue & Return",
        renderName: "employeeIssueReturn",
        path: "/library/employee-issue-return",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Leave Management",
    path: "",
    renderName: ["leaveType", "employeeLeave", "studentLeave", "leaveReport"],
    icon: <CheckBox color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Leave Type",
        renderName: "leaveType",
        path: "/leave-management/leave-type",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Employee Leave",
        renderName: "employeeLeave",
        path: "/leave-management/employee-leave",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Students Leave",
        renderName: "studentLeave",
        path: "/leave-management/student-leave",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Leave Report",
        renderName: "leaveReport",
        path: "/leave-management/leave-report",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Inventory",
    path: "",
    renderName: ["item", "vendor", "transaction", "stockList", "issue", "sell"],
    icon: <InventoryIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Item",
        renderName: "item",
        path: "/inventory/item",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Vendor",
        renderName: "vendor",
        path: "/inventory/vendor",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "In/Out Transaction",
        renderName: "transaction",
        path: "/inventory/transaction",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Stock List",
        renderName: "stockList",
        path: "/inventory/stockList",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Issue",
        renderName: "issue",
        path: "/inventory/issue",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Sell",
        renderName: "sell",
        path: "/inventory/sell",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Certificate",
    path: "",
    renderName: ["studyCertificate", "transferCertificate"],
    icon: <CardMembershipRounded color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Study Certificate",
        renderName: "studyCertificate",
        path: "/certificate/study-certificate",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Transfer Certificate",
        renderName: "transferCertificate",
        path: "/certificate/transfer-certificate",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Fees",
    path: "",
    renderName: [
      "receiptBook",
      "feeMapCategory",
      "collectFees",
      "balanceFee",
      "feeOverview",
      "reconciliation",
    ],
    icon: <CurrencyRupee color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Receipt Book",
        renderName: "receiptBook",
        path: "/fees/receipt-book",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Fee Map Category",
        renderName: "feeMapCategory",
        path: "/fees/feeMap-category",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Collect Fees",
        renderName: "collectFees",
        path: "/fees/collect-fees",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Balance Fee",
        renderName: "balanceFee",
        path: "/fees/balance-fee",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Fee Overview",
        renderName: "feeOverview",
        path: "/fees/fee-overview",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Reconciliation",
        renderName: "reconciliation",
        path: "/fees/re-conciliation",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Hostel",
    path: "",
    renderName: [
      "manageHostel",
      "manageRoomType",
      "manageRoomBed",
      "hostelMember",
    ],
    icon: <GiteIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Manage Hostel",
        renderName: "manageHostel",
        path: "/hostel/manage-hostel",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Manage Room Type",
        renderName: "manageRoomType",
        path: "/hostel/manage-room-type",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Manage Room Bed",
        renderName: "manageRoomBed",
        path: "/hostel/manage-room-bed",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Hostel Member",
        renderName: "hostelMember",
        path: "/hostel/hostel-member",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Transport",
    path: "",
    renderName: [
      "vehicle",
      "manageRoute",
      "routes",
      "trasportMember",
      "vehicleLog",
      "vehicleMaintenance",
    ],
    icon: <DirectionsBusIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Vehicle",
        renderName: "vehicle",
        path: "/transport/vehicle",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Manage Route & Trips",
        renderName: "manageRoute",
        path: "/transport/manage-route",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Routes",
        renderName: "routes",
        path: "/transport/routes",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Trasport Member",
        renderName: "trasportMember",
        path: "/transport/trasport-member",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Vehicle Log",
        renderName: "vehicleLog",
        path: "/transport/vehicle-log",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Vehicle Maintenance",
        renderName: "vehicleMaintenance",
        path: "/transport/vehicle-maintenance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Payroll",
    path: "",
    renderName: ["salaryGrade", "makePayment"],
    icon: <CurrencyRupeeIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Salary Grade",
        renderName: "salaryGrade",
        path: "/payroll/salary-grade",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Make Payment",
        renderName: "makePayment",
        path: "/payroll/make-payment",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },

  {
    name: "Report",
    path: "",
    renderName: [
      "libraryReport",
      "studentAttendance",
      "studentYearlyAttendane",
      "employeeAttendance",
      "employeeYearlyAttendance",
      "studentActivityReport",
    ],
    icon: <BarChart color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Library Report",
        renderName: "libraryReport",
        path: "/report/library-report",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Attendance",
        renderName: "studentAttendance",
        path: "/report/student-attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Yearly Attendane",
        renderName: "studentYearlyAttendaneroutes",
        path: "/report/student-yearly-attendane",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Employee Attendance",
        renderName: "employeeAttendance",
        path: "/report/employee-attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Employee Yearly Attendance",
        renderName: "employeeYearlyAttendance",
        path: "/report/employee-yearly-attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Activity Report",
        renderName: "studentActivityReport",
        path: "/report/student-activity-report",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },
  {
    name: "Visitor Info",
    path: "",
    renderName: ["visitorInfo", "studentCheckout"],
    icon: <WcIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Visitor Info",
        renderName: "visitorInfo",
        path: "/visitorInfo/visitor-info",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Student Checkout",
        renderName: "studentCheckout",
        path: "/visitorInfo/student-checkout",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
    ],
  },
  {
    name: "Help Desk",
    path: "/help-desk",
    renderName: ["Help desk"],
    subMenus: [],
    icon: <Groups color="primary" fontSize="small" />,
  },
  {
    name: "Guardian Feedback",
    path: "/guardian-feedback",
    renderName: ["guardianFeedback"],
    subMenus: [],
    icon: <FeedbackIcon color="primary" fontSize="small" />,
  },
];

export default {
  SIDE_MENU_DATA,
};
