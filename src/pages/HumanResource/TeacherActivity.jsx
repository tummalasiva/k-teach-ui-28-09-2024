import { Button, Grid, Paper } from "@mui/material";
import React, { useState } from "react";

import { useFormik } from "formik";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { teacherActivityTableKeys } from "../../data/tableKeys/teacherActivityData";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import dayjs from "dayjs";
import FormDatePicker from "../../forms/FormDatePicker";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";

export default function TeacherActivity() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  const entryFormik = useFormik({
    initialValues: {
      teacher: "",
      class: "",
      section: "",
      subject: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  const formik = useFormik({
    initialValues: {
      class: "",
      section: "",
      studentt: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Teacher Activity" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["All Activity", "Add Activity"]}
      />
      <TabPanel index={0} value={value}>
        {" "}
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="teacher"
                formik={entryFormik}
                label="Select Teacher"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="seecion"
                formik={entryFormik}
                label="Select Section"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="subject"
                formik={entryFormik}
                label="Select Subject"
                // options={""}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={entryFormik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
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
          actions={["edit"]}
          tableKeys={teacherActivityTableKeys}
          bodyDataModal="teacher activity"
          bodyData={data}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={formik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={formik}
                label="Select Section"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="student"
                formik={formik}
                label="Select Student"
                // options={""}
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={formik}
                label="Topic coverd"
              />
            </Grid>

            <Grid
              xs={12}
              md={12}
              lg={12}
              mt={1}
              display="flex"
              justifyContent="flex-end"
              gap={1}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
