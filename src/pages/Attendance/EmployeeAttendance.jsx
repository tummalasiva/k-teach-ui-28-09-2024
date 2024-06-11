/** @format */

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import CustomTable from "../../components/Tables/CustomTable";
import { employeeAttendanceTableKeys } from "../../data/tableKeys/employeeAttendanceData";
import { employeeAttendanceReportTableKeys } from "../../data/tableKeys/employeeReportData";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function EmployeeAttendance() {
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [roles, setRoles] = useState([]);

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

  const entryFormik = useFormik({
    initialValues: {
      role: "",
      date: dayjs(new Date()),
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });

  const handleFindClick = async () => {};

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
              <Button
                onClick={handleFindClick}
                size="small"
                variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="attendance"
          bodyData={data}
          tableKeys={employeeAttendanceTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="role"
                formik={entryFormik}
                label="Select Roles"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="To Date"
                name="toDate"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained">
                Find
              </Button>
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
