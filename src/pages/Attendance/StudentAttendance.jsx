import React, { useState } from "react";
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
import localeData from "dayjs/plugin/localeData";
import { studentAttendanceReportTableKeys } from "../../data/tableKeys/studentAttendanceReportData";
dayjs.extend(localeData);

export default function StudentAttendance() {
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      fromDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });

  // get month
  const getMonthOption = dayjs.months().map((m) => ({ value: m, label: m }));

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
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={entryFormik}
                label="Date"
                name="fromDate"
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
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Date"
                name="fromDate"
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
          bodyDataModal="attendance"
          bodyData={data}
          tableKeys={studentAttendanceTableKeys}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academic year"
                formik={entryFormik}
                label="Select Academic Year"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="month"
                formik={entryFormik}
                label="Select Month"
                options={getMonthOption}
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
          tableKeys={studentAttendanceReportTableKeys}
        />
      </TabPanel>
    </>
  );
}
