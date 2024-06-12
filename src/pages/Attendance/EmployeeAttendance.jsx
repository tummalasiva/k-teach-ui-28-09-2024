/** @format */

import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import CustomTable from "../../components/Tables/CustomTable";
import { employeeAttendanceReportTableKeys } from "../../data/tableKeys/employeeReportData";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";
import { LoadingButton } from "@mui/lab";

export default function EmployeeAttendance() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [roles, setRoles] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [fetchingAttendanceData, setFetchingAttendanceData] = useState(false);
  const [fetchingAttendanceReport, setFetchingAttendanceReport] =
    useState(false);

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);
      const roles = data.result
        .filter((r) => r.name?.toLowerCase() !== "student")
        .map((r) => ({
          label: r.name,
          value: r._id,
        }));
      setRoles(roles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const handleFindClick = async (values) => {
    try {
      setFetchingAttendanceData(true);
      const { data } = await get(PRIVATE_URLS.employeeAttendance.list, {
        params: {
          schoolId: selectedSetting._id,
          roleId: values.role,
          date: values.date,
        },
      });
      setAttendanceData(data.result);
    } catch (error) {
      console.log(error);
    }
    setFetchingAttendanceData(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      role: "",
      date: dayjs(new Date()),
    },
    onSubmit: handleFindClick,
  });

  useEffect(() => {
    if (entryFormik.values.date && entryFormik.values.role) {
      setAttendanceData([]);
      entryFormik.handleSubmit();
    }
  }, [entryFormik.values, selectedSetting._id]);

  const handleGetReport = async (values) => {
    try {
      setFetchingAttendanceReport(true);
      const { data } = await get(
        PRIVATE_URLS.employeeAttendance.getAttendanceReport,
        {
          params: {
            schoolId: selectedSetting._id,
            roleId: values.role,
            fromDate: values.fromDate,
            toDate: values.toDate,
          },
        }
      );
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
    setFetchingAttendanceReport(false);
  };

  const reportFormik = useFormik({
    initialValues: {
      role: "",
      date: dayjs(new Date()),
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: handleGetReport,
  });

  useEffect(() => {
    if (
      reportFormik.values.fromDate &&
      reportFormik.values.role &&
      reportFormik.values.toDate
    ) {
      setData([]);
      reportFormik.handleSubmit();
    }
  }, [reportFormik.values, selectedSetting._id]);

  return (
    <>
      <PageHeader title="Employee Attedance" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Attedance", "Report"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="role"
                formik={entryFormik}
                label="Select Roles"
                options={roles}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker formik={entryFormik} label="Date" name="date" />
            </Grid>
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <LoadingButton
                loading={fetchingAttendanceData}
                onClick={entryFormik.handleSubmit}
                size="small"
                variant="contained">
                Find
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
        <EmployeeAttendanceTable
          date={entryFormik.values.date}
          bodyData={attendanceData}
          setBodyData={setAttendanceData}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="role"
                formik={reportFormik}
                label="Select Roles"
                options={roles}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={reportFormik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={reportFormik}
                label="To Date"
                name="toDate"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <LoadingButton
                onClick={reportFormik.handleSubmit}
                loading={fetchingAttendanceReport}
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
          bodyData={data}
          tableKeys={employeeAttendanceReportTableKeys}
        />
      </TabPanel>
    </>
  );
}
