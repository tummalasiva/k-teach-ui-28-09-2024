/** @format */

import {
  Box,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Groups } from "@mui/icons-material";
import ChartBar from "./ChartBar";
import { Link } from "react-router-dom";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

const OuterCard = styled(Card)(({ theme }) => ({
  marginBottom: "15px",
  padding: "20px 0",
  height: "auto",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  justifyContent: "center",
}));

const Content = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 600,
}));

const Data = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
}));

const Count = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3px",
}));

export default function Attendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [studentAttendence, setStudentAttendence] = useState([]);
  const [employeeAttendence, setEmployeeAttendence] = useState([]);

  const getStudentAttendanceSummary = async () => {
    try {
      const [studentData, employeeData] = await Promise.all([
        get(PRIVATE_URLS.studentAttendance.getAttendanceSummaryForToday, {
          params: {
            schoolId: selectedSetting._id,
          },
        }),
        get(
          PRIVATE_URLS.employeeAttendance.getEmployeeAttendanceSummaryForToday,
          {
            params: {
              schoolId: selectedSetting._id,
            },
          }
        ),
      ]);

      // console.log(studentData.data?.result, "student attendance data");
      // console.log(employeeData?.data?.result, "employee attendance data");
      setStudentAttendence(studentData.data?.result);
      setEmployeeAttendence(employeeData?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentAttendanceSummary();
  }, [selectedSetting._id]);

  const darkMode = window.localStorage.getItem("isDarkMode");

  return (
    <>
      <Paper
        sx={{
          padding: { xs: 2, sm: 2, md: "0px 15px", lg: "0px 15px" },

          margin: "30px 0px 15px 0px",

          backgroundColor: "whitesmoke",
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <OuterCard>
              <InnerBox>
                <Groups
                  sx={{
                    width: "80px",
                    height: "70px",
                    color: darkMode === "true" ? "#fff" : "#1b3779",
                  }}
                />
              </InnerBox>
              {/* <Content> */}
              <Data>
                <Typography sx={{ fontWeight: 600 }}>
                  Students Attendance
                </Typography>
                <Count>
                  <Stack direction="row" spacing={2}>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#FF8042" }}>Total Students: </span>
                      {studentAttendence?.totalStudents}
                    </Typography>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#00C49F" }}>Not Taken: </span>
                      {studentAttendence?.attendanceNotTaken}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#0088FE" }}>Total Present: </span>
                      {studentAttendence?.totalPresent}
                    </Typography>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "red" }}>Total Absent: </span>
                      {studentAttendence?.totalAbsent}
                    </Typography>
                  </Stack>
                </Count>
              </Data>
              {/* </Content> */}
            </OuterCard>
            <OuterCard>
              <InnerBox>
                <Groups
                  sx={{
                    width: "80px",
                    height: "70px",
                    color: darkMode === "true" ? "#fff" : "#1b3779",
                  }}
                />
              </InnerBox>

              {/* <Content> */}
              <Data>
                <Typography sx={{ fontWeight: 600 }}>
                  Employees Attendance
                </Typography>
                <Count>
                  <Stack direction="row" spacing={2}>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#FF8042" }}>
                        Total Employees:{" "}
                      </span>
                      {employeeAttendence?.totalEmployees}
                    </Typography>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#00C49F" }}>Not Taken: </span>
                      {employeeAttendence?.attendanceNotTaken}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#0088FE" }}>Total Present: </span>
                      {employeeAttendence?.totalPresent}
                    </Typography>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "red" }}>Total Absent: </span>
                      {employeeAttendence?.totalAbsent}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Typography fontSize="12px" fontWeight={600}>
                      <span style={{ color: "#FFBB28" }}>Total Late: </span>
                      {employeeAttendence?.totalLate}
                    </Typography>
                  </Stack>
                </Count>
              </Data>
              {/* </Content> */}
            </OuterCard>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ChartBar />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
