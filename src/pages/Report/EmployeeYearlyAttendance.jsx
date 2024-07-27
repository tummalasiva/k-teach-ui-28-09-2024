/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import CheckPermission from "../../components/Authentication/CheckPermission";

export default function EmployeeYearlyAttendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [academicYear, setAcademicYear] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      setEmployee(
        data.result.map((emp) => ({
          ...emp,
          label: emp.basicInfo.name,
          value: emp._id,
        }))
      );

      entryFormik.setFieldValue("employee", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetReport = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(
        PRIVATE_URLS.report.getEmployeeAttendanceReport,
        {
          params: {
            schoolId: selectedSetting._id,
            academicYearId: values.academicYear,
            employeeId: values.employee,
          },
        }
      );
      setAttendanceData(data.result);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      employee: "",
    },
    onSubmit: handleGetReport,
  });

  useEffect(() => {
    getAcademicYear();
    getEmployees();
  }, [selectedSetting._id]);

  // useEffect(() => {
  //   if (entryFormik.values.academicYear && entryFormik.values.employee) {
  //     handleGetReport(entryFormik.values);
  //   }
  // }, [entryFormik.values.academicYear, entryFormik.values.employee]);

  const numbers = [];
  for (let i = 1; i <= 31; i++) {
    numbers.push(
      <TableCell sx={{ color: "white", display: "inline" }} key={i}>
        {i}
      </TableCell>
    );
  }

  const getAttendanceForDay = (attendance, yearMonth, day) => {
    const dayKey = `${yearMonth}-${String(day).padStart(2, "0")}`;
    const status = attendance[dayKey];

    if (status === "present") {
      return "P";
    } else if (status === "absent") {
      return "A";
    } else if (status === "late") {
      return "L";
    } else {
      return "-";
    }
  };

  return (
    <>
      <PageHeader title="Employee Yearly Attendance" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              options={academicYear}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="employee"
              formik={entryFormik}
              label="Select Employee"
              options={employees}
            />
          </Grid>
          <CheckPermission module="Emplyee Yearly Attendance" permission="view">
            <Grid xs={12} md={6} lg={3} item alignSelf="center">
              <LoadingButton
                loading={loading}
                onClick={entryFormik.handleSubmit}
                size="small"
                variant="contained">
                Find
              </LoadingButton>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>

      <Table>
        <TableHead
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
          }}>
          <TableRow>
            <TableCell align="center">Month</TableCell>
            <TableCell align="center">Working Days</TableCell>
            <TableCell align="center">Present Days</TableCell>
            <TableCell align="center">Absent Days</TableCell>
            {numbers.map((num) => (
              <TableCell key={num.key} align="center">
                {num.key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData &&
            Object.keys(attendanceData).map((month) => (
              <TableRow key={month}>
                <TableCell align="center">{month}</TableCell>
                <TableCell align="center">
                  {attendanceData[month].totalWorkingDays}
                </TableCell>
                <TableCell align="center">
                  {attendanceData[month].totalPresentDays}
                </TableCell>
                <TableCell align="center">
                  {attendanceData[month].totalAbsentDays}
                </TableCell>
                {numbers.map((num) => (
                  <TableCell key={num.key} align="center">
                    {getAttendanceForDay(
                      attendanceData[month].attendance,
                      month,
                      num.key
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
