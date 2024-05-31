/** @format */

import React, { useContext, useEffect, useState } from "react";
import FormSelect from "../../forms/FormSelect";
import { Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import PageHeader from "../../components/PageHeader";
import FormDatePicker from "../../forms/FormDatePicker";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { downloadFile } from "../../utils";
import { LoadingButton } from "@mui/lab";

const Type_Options = [
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Employee",
    value: "employee",
  },
];

export default function LeaveReport() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [roles, setRoles] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

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
      entryFormik.setFieldValue("academicYear", data.result[0]?._id);
      formik.setFieldValue("academicYear", data.result[0]?._id);
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
      entryFormik.setFieldValue("class", data.result[0]._id);
      formik.setFieldValue("class", data.result[0]._id);
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
            class: entryFormik.values.class || formik.values.class,
          },
        },
      });
      entryFormik.setFieldValue("section", data.result[0]?._id);
      formik.setFieldValue("section", data.result[0]?._id);
      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
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
            academicYear:
              entryFormik.values.academicYear || formik.values.academicYear,
            "academicInfo.class":
              entryFormik.values.class || formik.values.class,
            "academicInfo.section":
              entryFormik.values.section || formik.values.section,
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
      formik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getLeaveType = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.leaveType.list, {
        params: { schoolId: selectedSetting._id },
      });
      setLeaveTypes(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);

      setRoles(
        data.result.map((r) => ({
          ...r,
          label: r.name,
          value: r._id,
        }))
      );
      entryFormik.setFieldValue("role", data.result[0]?._id);
      formik.setFieldValue("role", data.result[0]?._id);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: entryFormik.values.role || formik.values.role,
          },
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
      formik.setFieldValue("employee", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  const handleGetPrintPdf = async (values) => {
    try {
      setLoadingPdf(true);
      const getPdf = await get(PRIVATE_URLS.leaveApplication.downloadPdf, {
        params: {
          schoolId: selectedSetting._id,
          fromDate: values.fromDate,
          toDate: values.toDate,
          userType: values.userType,
          academicYearId: values.academicYear,
        },
        responseType: "blob",
      });

      downloadFile("application/pdf", getPdf.data, "leave_details.pdf");

      setLoadingPdf(false);
    } catch (error) {
      console.log(error);
      setLoadingPdf(false);
    }
  };

  const handleGetDownloadExcel = async (values) => {
    try {
      setLoadingExcel(true);
      const getExcel = await get(PRIVATE_URLS.leaveApplication.downloadExcel, {
        params: {
          schoolId: selectedSetting._id,
          userType: values.userType,
          academicYearId: values.academicYear,
        },
        responseType: "blob",
      });

      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        getExcel.data,
        "leave_details.xlsx"
      );
      setLoadingExcel(false);
    } catch (error) {
      console.log(error);
      setLoadingExcel(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      type: "",
      class: "",
      section: "",
      student: "",
      role: "",
      employee: "",
    },
    onSubmit: handleGetDownloadExcel,
  });

  const formik = useFormik({
    initialValues: {
      academicYear: "",
      fromDate: null,
      toDate: null,
      type: "",
      userType: "",
      class: "",
      section: "",
      student: "",
      role: "",
      employee: "",
    },
    onSubmit: handleGetPrintPdf,
  });

  useEffect(() => {
    if (entryFormik.values.class || formik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class, formik.values.class]);

  useEffect(() => {
    getAcademicYear();
    getClasses();
    getRoles();
    getLeaveType();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (
      (entryFormik.values.academicYear &&
        entryFormik.values.class &&
        entryFormik.values.section) ||
      (formik.values.academicYear &&
        formik.values.class &&
        formik.values.section)
    ) {
      getStudents();
    }
  }, [
    entryFormik.values.academicYear,
    entryFormik.values.class,
    entryFormik.values.section,
    formik.values.academicYear,
    formik.values.class,
    formik.values.section,
    selectedSetting,
  ]);

  useEffect(() => {
    if (entryFormik.values.role || formik.values.role) {
      getEmployees();
    }
  }, [entryFormik.values.role, formik.values.role]);

  return (
    <>
      <PageHeader title="Leave Report" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Summary", "Leave Planner"]}
      />
      <TabPanel index={0} value={value}>
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
                name="type"
                formik={entryFormik}
                label="Select Type"
                options={Type_Options}
              />
            </Grid>
            {entryFormik.values.type === "student" && (
              <>
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
                    options={sections}
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
              </>
            )}
            {entryFormik.values.type === "employee" && (
              <>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="role"
                    formik={entryFormik}
                    label="Select Role"
                    options={roles}
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
              </>
            )}

            <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
              <LoadingButton
                loading={loadingPdf}
                onClick={handleGetDownloadExcel}
                size="small"
                variant="contained">
                Download
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={formik}
                label="Select Academic Year"
                options={academicYear}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker
                formik={formik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker formik={formik} label="To Date" name="toDate" />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="type"
                formik={formik}
                label="Select Type"
                options={leaveTypes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="userType"
                formik={formik}
                label="Select User Type"
                options={Type_Options}
              />
            </Grid>
            {formik.values.userType === "student" && (
              <>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="class"
                    formik={formik}
                    label="Select Class"
                    options={classes}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="section"
                    formik={formik}
                    label="Select Section"
                    options={sections}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="student"
                    formik={formik}
                    label="Select Student"
                    options={students}
                  />
                </Grid>
              </>
            )}
            {formik.values.userType === "employee" && (
              <>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="role"
                    formik={formik}
                    label="Select Role"
                    options={roles}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="employee"
                    formik={formik}
                    label="Select Employee"
                    options={employees}
                  />
                </Grid>
              </>
            )}

            <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
              <LoadingButton
                loading={loadingExcel}
                onClick={handleGetPrintPdf}
                size="small"
                variant="contained">
                Print
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
