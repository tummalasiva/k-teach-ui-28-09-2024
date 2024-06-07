/** @format */

import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "../../../src/components/Styles/Dashboard.css";
import CircleIcon from "@mui/icons-material/Circle";

import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const renderCell = ({ date }) => {
    const calenderDate = dayjs(new Date(date)).get("date");
    const calenderMonth = dayjs(new Date(date)).get("month") + 1;
    const calenderYear = dayjs(new Date(date)).get("year");

    const attendance = attendanceData.find(
      (data) =>
        dayjs(new Date(data.date)).get("date") === calenderDate &&
        dayjs(new Date(data.date)).get("month") + 1 === calenderMonth &&
        dayjs(new Date(data.date)).get("year") === calenderYear
    );
    let cellClassName = "";
    if (attendance.attendanceDetails.attendanceStatus === true) {
      cellClassName = "present";
    } else if (attendance.attendanceDetails.attendanceStatus === false) {
      cellClassName = "absent";
    }
    return <div className={`cell ${cellClassName}`}></div>;
  };

  const tileContent = ({ date }) => {
    const calenderDate = dayjs(new Date(date)).get("date");
    const calenderMonth = dayjs(new Date(date)).get("month") + 1;
    const calenderYear = dayjs(new Date(date)).get("year");

    const attendance = attendanceData.find(
      (data) =>
        dayjs(new Date(data.date)).get("date") === calenderDate &&
        dayjs(new Date(data.date)).get("month") + 1 === calenderMonth &&
        dayjs(new Date(data.date)).get("year") === calenderYear
    );
    console.log(attendance, "tilecontentS");
    if (attendance) {
      return renderCell({ date });
    }
    return null;
  };

  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    const isSaturday = date.getDay() === 6;

    if (date.toDateString() === currentDate.toDateString()) {
      return "blue-day";
    }
    if (isSaturday) {
      return "saturday-date";
    }
    return "";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0px",
          gap: 5,
        }}>
        <Box className="colorBotton">
          <CircleIcon sx={{ fontSize: 15, color: "green" }} />
          <Typography>Present</Typography>
        </Box>
        <Box className="colorBotton">
          <CircleIcon sx={{ fontSize: 15, color: "red" }} />
          <Typography>Absent</Typography>
        </Box>
      </Box>
      <Calendar tileContent={tileContent} tileClassName={tileClassName} />
    </>
  );
};
export default Attendance;
