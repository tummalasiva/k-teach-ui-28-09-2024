/** @format */

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

import React from "react";
import GiteIcon from "@mui/icons-material/Gite";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";

import {
  SettingsSuggest,
  AccountBalance,
  Groups,
  Person,
  CurrencyRupee,
  InstallMobileRounded,
} from "@mui/icons-material";

import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

import Diversity2Icon from "@mui/icons-material/Diversity2";

const SIDE_MENU_DATA = [
  {
    name: "Dashboard",
    path: "/sch/dashboard",
    renderName: ["Dashboard"],
    subMenus: [],
    icon: <DashboardRoundedIcon color="primary" fontSize="small" />,
  },

  {
    name: "Manage Institute",
    path: "/sch/manage-institute",
    renderName: ["Manage Institute"],
    subMenus: [],
    icon: <SettingsSuggest color="primary" fontSize="small" />,
  },

  {
    name: "Administrator",
    path: "",
    renderName: [
      "Academic Year",
      "Roles and Permissions",
      "User Password Reset",
    ],

    icon: <Person color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Academic Year",
        renderName: "Academic Year",
        path: "/sch/administrator/academicYear",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      {
        name: "Roles & Permissions",
        renderName: "Roles and Permissions",
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
        renderName: "User Password Reset",
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
      "Designation",
      "Department",
      "Employee",
      "Offer Letter",
      "Relieving Letter",
      "Off Boarding",
      "Experience Letter",
      "Teacher Activity",
    ],
    icon: <Diversity2Icon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Manage Designation",
        renderName: "Designation",
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
        renderName: "Department",
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
        renderName: "Employee",
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
        renderName: "Offer Letter",
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
        renderName: "Relieving Letter",
        path: "/sch/human-resource/relieving-letter",
        icon: (
          <SubdirectoryArrowRightOutlinedIcon
            color="primary"
            fontSize="small"
          />
        ),
      },
      // {
      //   name: "Off Boarding",
      //   renderName: "Off Boarding",
      //   path: "/sch/human-resource/off-boarding",
      //   icon: (
      //     <SubdirectoryArrowRightOutlinedIcon
      //       color="primary"
      //       fontSize="small"
      //     />
      //   ),
      // },
      {
        name: "Experience Letter",
        renderName: "Experience Letter",
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
        renderName: "Teacher Activity",
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
    name: "Academic",
    path: "",
    renderName: ["Class", "Section", "Subject"],
    icon: <AccountBalance color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Class",
        renderName: "Class",
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
        renderName: "Section",
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
        renderName: "Subject",
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
    name: "Student",
    path: "",
    renderName: [
      "Overview",
      "Admit Student",
      "Resuffle",
      "Promotion",
      "Bulk Admission",
      "Credential",
      "Quick Admit",
      "ID card",
      "Student Activity",
    ],
    icon: <Groups color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Overview",
        renderName: "Overview",
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
        renderName: "Admit Student",
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
        renderName: "Resuffle",
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
        renderName: "Promotion",
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
        renderName: "Bulk Admission",
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
        renderName: "Credential",
        path: "/sch/student/credential",
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
    name: "Communication",
    path: "",
    renderName: ["Compose", "Sms Report", "Sms Credentials"],
    icon: <InstallMobileRounded color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Compose",
        renderName: "Compose",
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
        renderName: "Sms Report",
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
        renderName: "Sms Credentials",
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
    name: "Notifications",
    path: "/sch/notifications",
    renderName: ["Sms-Notifications"],
    subMenus: [],
    icon: <NotificationsActiveRoundedIcon color="primary" fontSize="small" />,
  },

  {
    name: "Fees",
    path: "",
    renderName: [
      "Receipt Book",
      "Fee Map Category",
      "Collect Fees",
      "Balance Fee",
      "Fee Overview",
      "Reconciliation",
    ],
    icon: <CurrencyRupee color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Receipt Book",
        renderName: "Receipt Book",
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
        renderName: "Fee Map Category",
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
        renderName: "Collect Fees",
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
        renderName: "Balance Fee",
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
        renderName: "Fee Overview",
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
        renderName: "Reconciliation",
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
      "Manage Hostel",
      "Manage Room Type",
      "Manage Room Bed",
      "Hostel Member",
    ],
    icon: <GiteIcon color="primary" fontSize="small" />,
    subMenus: [
      {
        name: "Manage Hostel",
        renderName: "Manage Hostel",
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
        renderName: "Manage Room Type",
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
        renderName: "Manage Room Bed",
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
        renderName: "Hostel Member",
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
];

export default {
  SIDE_MENU_DATA,
};
