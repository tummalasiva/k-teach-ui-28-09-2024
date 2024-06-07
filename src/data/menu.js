/** @format */

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
  InstallMobileRounded,
} from "@mui/icons-material";

import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import Diversity2Icon from "@mui/icons-material/Diversity2";

const SIDE_MENU_DATA = [
  {
    name: "Dashboard",
    path: "/sch/dashboard",
    renderName: [],
    subMenus: [],
    icon: <DashboardRoundedIcon color="primary" fontSize="small" />,
  },

  {
    name: "Manage Institute",
    path: "/sch/manage-institute",
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
        path: "/sch/administrator/academicYear",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      // {
      //   name: "User Role(ACL)",
      //   renderName: "userRole",
      //   path: "/sch/administrator/user-role",
      //   icon: (
      //     <SubdirectoryArrowRightOutlinedIcon
      //       color="primary"
      //       fontSize="small"
      //     />
      //   ),
      // },
      {
        name: "Roles & Permissions",
        renderName: "rolePermission",
        path: "/sch/administrator/role-permission",
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
        path: "/sch/administrator/reset-password",
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
        path: "/sch/human-resource/manage-designation",
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
        path: "/sch/human-resource/manage-department",
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
        path: "/sch/human-resource/employee",
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
        path: "/sch/human-resource/offer-letter",
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
        path: "/sch/human-resource/relieving-letter",
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
        path: "/sch/human-resource/off-boarding",
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
        path: "/sch/human-resource/experience-letter",
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
        path: "/sch/human-resource/teacher-activity",
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
        path: "/sch/pre-admission/enquiries",
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
        path: "/sch/pre-admission/exams",
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
        path: "/sch/pre-admission/exam-schedules",
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
        path: "/sch/pre-admission/result",
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
        path: "/sch/academic/class",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Section",
        renderName: "section",
        path: "/sch/academic/section",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Subject",
        renderName: "subject",
        path: "/sch/academic/subject",
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
        path: "/sch/attendence/student-attendance",
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
        path: "/sch/attendence/employee-attendance",
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
    path: "/sch/class-routine",
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
        path: "/sch/student/overview",
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
        path: "/sch/student/admit-student",
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
        path: "/sch/student/reshuffle",
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
        path: "/sch/student/promotion",
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
        path: "/sch/student/bulk-admission",
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
        path: "/sch/student/credential",
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
        path: "/sch/student/quick-admit",
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
        path: "/sch/student/student-activity",
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
    path: "/sch/assignment",
    renderName: ["assgnment"],
    subMenus: [],
    icon: <AssignmentRoundedIcon color="primary" fontSize="small" />,
  },

  {
    name: "Communication",
    path: "",
    renderName: ["compose", "report", "credentials"],
    icon: <InstallMobileRounded color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Compose",
        renderName: "compose",
        path: "/sch/communication_compose",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Report",
        renderName: "report",
        path: "/sch/communication_report",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Credentials",
        renderName: "credentials",
        path: "/sch/communication_credentials",
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
        path: "/sch/announcement/notice",
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
        path: "/sch/announcement/news",
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
        path: "/sch/announcement/holiday",
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
        path: "/sch/announcement/awardsAndAchievements",
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
        path: "/sch/announcement/splashNews",
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
    path: "/sch/gallery",
    renderName: ["gallery"],
    subMenus: [],
    icon: <PhotoRoundedIcon color="primary" fontSize="small" />,
  },
  {
    name: "Notifications",
    path: "/sch/notifications",
    renderName: ["notifications"],
    subMenus: [],
    icon: <NotificationsActiveRoundedIcon color="primary" fontSize="small" />,
  },
  {
    name: "Event",
    path: "/sch/event",
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
        path: "/sch/exam/exam-grade",
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
        path: "/sch/exam/exam-term",
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
        path: "/sch/exam/exam-schedule",
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
        path: "/sch/exam/exam-hall-ticket",
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
        path: "/sch/exam-Mark/exam-Attendance",
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
        path: "/sch/exam-Mark/manage-mark",
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
        path: "/sch/exam-Mark/exam-result",
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
        path: "/sch/exam-Mark/marks-card",
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
        path: "/sch/exam-Mark/consolidated-marks-sheet",
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
        path: "/sch/exam-Mark/subject-wise-report",
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
        path: "/sch/exam-Mark/division-wise-report",
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
        path: "/sch/lms/storage",
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
        path: "/sch/lms/courses",
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
        path: "/sch/lms/course-content",
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
        path: "/sch/lms/live",
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
      "employeeLibraryMember",
      "studentIssueReturn",
    ],
    icon: <LibraryBooksIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Books",
        renderName: "books",
        path: "/sch/library/books",
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
        path: "/sch/library/periodical",
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
        path: "/sch/library/student-library-member",
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
        path: "/sch/library/employee-library-member",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Issue & Return",
        renderName: "studentIssueReturn",
        path: "/sch/library/student-issue-return",
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
        path: "/sch/leave-management/leave-type",
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
        path: "/sch/leave-management/employee-leave",
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
        path: "/sch/leave-management/student-leave",
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
        path: "/sch/leave-management/leave-report",
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
        path: "/sch/inventory/item",
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
        path: "/sch/inventory/vendor",
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
        path: "/sch/inventory/transaction",
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
        path: "/sch/inventory/stockList",
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
        path: "/sch/inventory/issue",
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
        path: "/sch/inventory/sell",
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
        path: "/sch/certificate/study-certificate",
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
        path: "/sch/certificate/transfer-certificate",
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
        path: "/sch/fees/receipt-book",
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
        path: "/sch/fees/feeMap-category",
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
        path: "/sch/fees/collect-fees",
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
        path: "/sch/fees/balance-fee",
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
        path: "/sch/fees/fee-overview",
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
        path: "/sch/fees/re-conciliation",
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
        path: "/sch/hostel/manage-hostel",
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
        path: "/sch/hostel/manage-room-type",
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
        path: "/sch/hostel/manage-room-bed",
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
        path: "/sch/hostel/hostel-member",
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
        path: "/sch/transport/vehicle",
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
        path: "/sch/transport/manage-route",
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
        path: "/sch/transport/routes",
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
        path: "/sch/transport/trasport-member",
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
        path: "/sch/transport/vehicle-log",
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
        path: "/sch/transport/vehicle-maintenance",
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
        path: "/sch/payroll/salary-grade",
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
        path: "/sch/payroll/make-payment",
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
      "studentReport",
      "studentActivityReport",
    ],
    icon: <BarChart color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Library Report",
        renderName: "libraryReport",
        path: "/sch/report/library-report",
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
        path: "/sch/report/student-attendance",
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
        path: "/sch/report/student-yearly-attendane",
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
        path: "/sch/report/employee-attendance",
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
        path: "/sch/report/employee-yearly-attendance",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },

      {
        name: "Student Report",
        renderName: "studentReport",
        path: "/sch/report/student-report",
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
        path: "/sch/report/student-activity-report",
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
        path: "/sch/visitorInfo/visitor-info",
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
        path: "/sch/visitorInfo/student-checkout",
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
    path: "/sch/help-desk",
    renderName: ["Help desk"],
    subMenus: [],
    icon: <Groups color="primary" fontSize="small" />,
  },
  {
    name: "Guardian Feedback",
    path: "/sch/guardian-feedback",
    renderName: ["guardianFeedback"],
    subMenus: [],
    icon: <FeedbackIcon color="primary" fontSize="small" />,
  },
];

export default {
  SIDE_MENU_DATA,
};
