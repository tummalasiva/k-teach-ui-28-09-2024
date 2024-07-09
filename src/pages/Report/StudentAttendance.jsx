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

export default function StudentAttendance() {
  const [data, setData] = useState([
    {
      name: "abc",
      workingDays: "7",
      presentDays: "9",
      absentDays: "5",
    },
  ]);

  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);

  const [academicYear, setAcademicYear] = useState([]);

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

  const handleFetchReport = async (values) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.report.getAllStudentsAttendanceReportForParticularMonth,
        {
          params: {
            schoolId: selectedSetting._id,
            month: new Date(entryFormik.values.month).getMonth() + 1,
            year: new Date(entryFormik.values.month).getFullYear(),
            academicYearId: entryFormik.values.academicYear,
            classId: entryFormik.values.class,
            sectionId: entryFormik.values.section,
          },
        }
      );

      console.log(data, "student attendance data");
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",

      month: dayjs(new Date()),
    },
    onSubmit: handleFetchReport,
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

  const numbers = [];
  for (let i = 1; i <= 31; i++) {
    numbers.push(
      <TableCell sx={{ color: "white", display: "inline" }} key={i}>
        {i}
      </TableCell>
    );
  }
  return (
    <>
      <PageHeader title="Student Attendance Report" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              options={academicYear}
              label="Select Academic Year"
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
            <FormDatePicker
              formik={entryFormik}
              label="Month"
              name="month"
              openTo="month"
              inputFormat="MM"
              views={["month"]}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
            item
            display="flex"
            justifyContent="flex-end">
            <Button
              onClick={entryFormik.handleSubmit}
              size="small"
              variant="contained">
              Find
            </Button>
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
            <TableCell align="center">Student Name</TableCell>

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
          {data.map((dat) => (
            <TableRow>
              <TableCell align="center">{dat.name}</TableCell>
              <TableCell align="center">{dat.workingDays}</TableCell>
              <TableCell align="center">{dat.presentDays}</TableCell>
              <TableCell align="center">{dat.absentDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
