/** @format */

import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { studentAttendanceOverviewTableKeys } from "../../data/tableKeys/studentAttendanceOverviewData";
import { studentAttendanceTableKeys } from "../../data/tableKeys/studentAttendanceData";
import FormDatePicker from "../../forms/FormDatePicker";
import { studentAttendanceReportTableKeys } from "../../data/tableKeys/studentAttendanceReportData";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import StudentAttendanceTable from "./StudentAttendanceTable";

export default function StudentAttendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [fetchingAttendanceData, setFetchingAttendanceData] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const handleFindClick = async (values) => {
    try {
      setFetchingAttendanceData(true);
      const { data } = await get(PRIVATE_URLS.studentAttendance.list, {
        params: {
          schoolId: selectedSetting._id,
          classId: values.class,
          sectionId: values.section,
          date: values.date,
        },
      });
      console.log(data);
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

  const getStudentAttendanceOverview = async (values) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.studentAttendance.getAttendanceOverview,
        {
          params: {
            schoolId: selectedSetting._id,
            date: values.date,
            classId: values.class,
          },
        }
      );
      console.log(data);
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

  useEffect(() => {
    if (overviewFormik.values.class && overviewFormik.values.date) {
      overviewFormik.handleSubmit();
    }
  }, [overviewFormik.values]);

  const reportFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      month: null,
    },
    onSubmit: console.log,
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
      overviewFormik.setFieldValue("class", data.result[0]._id);
      attendanceFormik.setFieldValue("class", data.result[0]._id);
      reportFormik.setFieldValue("class", data.result[0]._id);
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
    overviewFormik.values.class ||
      attendanceFormik.values.class ||
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
                formik={overviewFormik}
                label="Date"
                name="date"
              />
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="overview"
          bodyData={data}
          tableKeys={studentAttendanceOverviewTableKeys}
        />
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
                formik={attendanceFormik}
                label="Date"
                name="date"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
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
              justifyContent={"flex-end"}>
              <LoadingButton size="small" variant="contained">
                Find
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="reports"
          bodyData={data}
          tableKeys={studentAttendanceReportTableKeys}
        />
      </TabPanel>
    </>
  );
}
