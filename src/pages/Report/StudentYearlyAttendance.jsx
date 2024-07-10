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

import PageHeader from "../../components/PageHeader";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";

export default function StudentYearlyAttendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);
  const [students, setStudents] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSection(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: entryFormik.values.academicYear,
            "academicInfo.class": entryFormik.values.class,
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetReport = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(
        PRIVATE_URLS.report.getStudentAttendanceReport,
        {
          params: {
            schoolId: selectedSetting._id,
            academicYearId: values.academicYear,
            studentId: values.student,
          },
        }
      );
      setAttendanceData(data.result);
      console.log(data.result, "fdxfgvbnm,.");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",

      student: "",
    },
    onSubmit: handleGetReport,
  });

  useEffect(() => {
    getAcademicYear();
    getClass();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  useEffect(() => {
    if (
      entryFormik.values.academicYear &&
      entryFormik.values.class &&
      entryFormik.values.section
    ) {
      getStudents();
    }
  }, [
    entryFormik.values.academicYear,
    entryFormik.values.class,
    entryFormik.values.section,
    selectedSetting,
  ]);

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
    } else {
      return "-";
    }
  };

  return (
    <>
      <PageHeader title="Student Yearly Attendance" />
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
              name="class"
              formik={entryFormik}
              label="Select Class"
              options={classes}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              options={section}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="student"
              formik={entryFormik}
              label="Select Student"
              options={students}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
            item
            display="flex"
            justifyContent="flex-end">
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
