/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import PageHeader from "../../components/PageHeader";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";

export default function EmployeeAttendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [academicYear, setAcademicYear] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );

      entryFormik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchReport = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(
        PRIVATE_URLS.report.getAllEmployeesAttendanceReportForParticularMonth,
        {
          params: {
            schoolId: selectedSetting._id,
            month: new Date(entryFormik.values.month).getMonth() + 1,
            year: new Date(entryFormik.values.month).getFullYear(),
            academicYearId: entryFormik.values.academicYear,
          },
        }
      );
      setAttendanceData(data.result);
      setSelectedMonthYear(dayjs(entryFormik.values.month).format("YYYY-MM"));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      month: dayjs(new Date()),
    },
    onSubmit: handleFetchReport,
  });

  useEffect(() => {
    getAcademicYear();
  }, [selectedSetting]);

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
      <PageHeader title="Employee Attendance" />
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
            <FormDatePicker
              formik={entryFormik}
              label="Month"
              name="month"
              openTo="month"
              inputFormat="MM"
              views={["month"]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item alignSelf="center">
            <LoadingButton
              loading={loading}
              onClick={entryFormik.handleSubmit}
              size="small"
              variant="contained">
              Find
            </LoadingButton>
          </Grid>
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
            <TableCell align="center">Employee Name</TableCell>
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
          {attendanceData.map((employee) => (
            <TableRow key={employee.employeeId}>
              <TableCell align="center">{employee.employeeName}</TableCell>
              <TableCell align="center">{employee.totalWorkingDays}</TableCell>
              <TableCell align="center">{employee.totalPresentDays}</TableCell>
              <TableCell align="center">{employee.totalAbsentDays}</TableCell>
              {numbers.map((num) => (
                <TableCell key={num.key} align="center">
                  {getAttendanceForDay(
                    employee.attendance,
                    selectedMonthYear,
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
