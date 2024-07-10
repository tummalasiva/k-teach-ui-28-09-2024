/** @format */

import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import FormDatePicker from "../../forms/FormDatePicker";
import { studentAttendanceReportTableKeys } from "../../data/tableKeys/studentAttendanceReportData";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import StudentAttendanceTable from "./StudentAttendanceTable";
import { downloadFile } from "../../utils";

export default function StudentAttendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [reportData, setReportData] = useState([]);
  const [overViewData, setOverViewData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [fetchingAttendanceData, setFetchingAttendanceData] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [downloadingAbsent, setDownloadingAbsent] = useState(false);
  const [fetchingreport, setFetchingReport] = useState(false);
  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const downloadAbsentStudentsReport = async (values) => {
    try {
      setDownloadingAbsent(true);
      const { data } = await get(
        PRIVATE_URLS.studentAttendance.donwloadAbsentReport,
        {
          params: {
            schoolId: selectedSetting._id,
            date: dayjs(attendanceFormik.values.date).format("YYYY-MM-DD"),
            classId: values.sectionInfo.class,
            sectionId: values.section,
          },
          responseType: "blob",
        }
      );

      downloadFile("application/pdf", data, "student-absent-list");
      setDownloadingAbsent(false);
    } catch (error) {
      setDownloadingAbsent(false);
    }
  };

  const handleFindClick = async (values) => {
    try {
      setFetchingAttendanceData(true);
      const { data } = await get(PRIVATE_URLS.studentAttendance.list, {
        params: {
          schoolId: selectedSetting._id,
          classId: values.class,
          sectionId: values.section,
          date: dayjs(values.date).format("YYYY-MM-DD"),
        },
      });

      setAttendanceData(data.result);
    } catch (error) {
      console.log(error);
    }
    setFetchingAttendanceData(false);
  };

  const attendanceFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      date: dayjs(new Date()).format("YYYY/MM/DD"),
    },
    onSubmit: handleFindClick,
  });

  useEffect(() => {
    setAttendanceData([]);
  }, [attendanceFormik.values]);

  const getStudentAttendanceOverview = async (values) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.studentAttendance.getAttendanceOverview,
        {
          params: {
            schoolId: selectedSetting._id,
            date: dayjs(values.date).format("YYYY/MM/DD"),
            classId: values.class,
          },
        }
      );
      setOverViewData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const overviewFormik = useFormik({
    initialValues: {
      class: "",
      date: dayjs(new Date()).format("YYYY/MM/DD"),
    },
    onSubmit: getStudentAttendanceOverview,
  });

  // useEffect(() => {
  //   if (overviewFormik.values.class && overviewFormik.values.date) {
  //     overviewFormik.handleSubmit();
  //   }
  // }, [overviewFormik.values.class, overviewFormik.values.date]);

  useEffect(() => {
    if (overviewFormik.values.class && overviewFormik.values.date) {
      getStudentAttendanceOverview(overviewFormik.values);
    }
  }, [overviewFormik.values.class, overviewFormik.values.date]);

  const getAttendanceReport = async (values) => {
    try {
      setFetchingReport(true);
      const { data } = await get(
        PRIVATE_URLS.studentAttendance.getAttendanceReport,
        {
          params: {
            schoolId: selectedSetting._id,
            academicYearId: values.academicYear,
            classId: values.class,
            sectionId: values.section,
            month: dayjs(new Date(values.month)).get("month") + 1,
            year: dayjs(new Date(values.month)).get("year"),
          },
        }
      );
      setReportData(data.result);
      setFetchingReport(false);
    } catch (error) {
      console.log(error);
      setFetchingReport(false);
    }
  };

  const reportFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      month: null,
    },
    onSubmit: getAttendanceReport,
    enableReinitialize: true,
  });

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);

      setAcademicYearList(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      reportFormik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      overviewFormik.setFieldValue("class", data.result[0]?._id);
      attendanceFormik.setFieldValue("class", data.result[0]?._id);
      reportFormik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class:
              overviewFormik.values.class ||
              attendanceFormik.values.class ||
              reportFormik.values.class,
          },
        },
      });

      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );

      attendanceFormik.setFieldValue("section", data.result[0]?._id);
      reportFormik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      overviewFormik.values.class ||
      attendanceFormik.values.class ||
      reportFormik.values.class
    ) {
      getSections();
    }
  }, [
    overviewFormik.values.class,
    attendanceFormik.values.class,
    reportFormik.values.class,
    selectedSetting._id,
  ]);

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    attendanceFormik.resetForm();
    reportFormik.resetForm();
    overviewFormik.resetForm();
  }, [value]);

  return (
    <>
      <PageHeader title="Student Attedance" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Overview", "Attedance", "Report"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="class"
                formik={overviewFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                disableFutureDates={true}
                formik={overviewFormik}
                label="Date"
                name="date"
              />
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
              }}>
              <TableRow>
                <TableCell align="center">Section</TableCell>
                <TableCell align="center">Present</TableCell>
                <TableCell align="center">Absent</TableCell>
                <TableCell align="center">Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {overViewData.length > 0 &&
                overViewData.map((attendanceStudent, index) => (
                  <TableRow key={attendanceStudent._id}>
                    <TableCell align="center">
                      {attendanceStudent.sectionInfo.name}
                    </TableCell>
                    <TableCell align="center">
                      {attendanceStudent.totalPresent}
                    </TableCell>
                    <TableCell align="center">
                      {attendanceStudent.totalAbsent}
                      <LoadingButton
                        size="small"
                        loading={downloadingAbsent}
                        variant="contained"
                        sx={{ ml: 1 }}
                        onClick={() =>
                          downloadAbsentStudentsReport(attendanceStudent)
                        }>
                        Download
                      </LoadingButton>
                    </TableCell>
                    <TableCell align="center">
                      {attendanceStudent.percentage}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!overViewData.length && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", margin: "5px", padding: "5px" }}>
              No data found
            </Typography>
          )}
        </TableContainer>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={attendanceFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={attendanceFormik}
                label="Select Section"
                options={sections}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                disableFutureDates={true}
                formik={attendanceFormik}
                label="Date"
                name="date"
              />
            </Grid>
            <Grid xs={12} md={3} lg={3} item sx={{ alignSelf: "center" }}>
              <LoadingButton
                loading={fetchingAttendanceData}
                onClick={attendanceFormik.handleSubmit}
                size="small"
                variant="contained">
                Find
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
        <StudentAttendanceTable
          date={attendanceFormik.values.date}
          bodyData={attendanceData}
          setBodyData={setAttendanceData}
          classId={attendanceFormik.values.class}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={reportFormik}
                label="Select Academic Year"
                options={academicYearList}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={reportFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={reportFormik}
                label="Select Section"
                options={sections}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                disableFutureDates={true}
                formik={reportFormik}
                label="Month"
                name="month"
                openTo="month"
                inputFormat="MM"
                views={["month"]}
                required={true}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              item
              display={"flex"}
              gap={1}
              justifyContent={"flex-end"}>
              <LoadingButton
                loading={fetchingreport}
                onClick={reportFormik.handleSubmit}
                size="small"
                variant="contained">
                Find
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="reports"
          bodyData={reportData}
          tableKeys={studentAttendanceReportTableKeys}
        />
      </TabPanel>
    </>
  );
}
