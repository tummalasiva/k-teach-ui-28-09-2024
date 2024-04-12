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

export default function TeacherActivity() {
  const [data, setData] = useState([]);
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
  return (
    <>
      <PageHeader title="Teacher Activity" />

      <Paper sx={{ padding: 2 }}>
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
    </>
  );
}
