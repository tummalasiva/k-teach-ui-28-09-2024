import React, { useState } from "react";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import PageHeader from "../../components/PageHeader";
import dayjs from "dayjs";
import FormDatePicker from "../../forms/FormDatePicker";

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
  const [value, setSelectValue] = useState(0);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);
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
    onSubmit: console.log("nnnn"),
  });

  const formik = useFormik({
    initialValues: {
      academicYear: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
      type: "",
      userType: "",
      class: "",
      section: "",
      student: "",
      role: "",
      employee: "",
    },
    onSubmit: console.log("nnnn"),
  });
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
                // options={""}
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
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="section"
                    formik={entryFormik}
                    label="Select Section"
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="student"
                    formik={entryFormik}
                    label="Select Student"
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
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="employee"
                    formik={entryFormik}
                    label="Select Employee"
                  />
                </Grid>
              </>
            )}

            <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained">
                Download
              </Button>
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
                // options={""}
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
                // options={""}
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
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="section"
                    formik={formik}
                    label="Select Section"
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="student"
                    formik={formik}
                    label="Select Student"
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
                  />
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormSelect
                    required={true}
                    name="employee"
                    formik={formik}
                    label="Select Employee"
                  />
                </Grid>
              </>
            )}

            <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained">
                Print
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
