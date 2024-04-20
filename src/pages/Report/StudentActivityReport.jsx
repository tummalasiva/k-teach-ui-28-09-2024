import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import { studentActivityReportTableKeys } from "../../data/tableKeys/studentActivityReportData";
import CustomTable from "../../components/Tables/CustomTable";

export default function StudentActivityReport() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      student: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Student Activity Report" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
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
              name="student"
              formik={entryFormik}
              label="Select Student"
              // options={""}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={3}
            item
            display="flex"
            gap={1}
            alignSelf="center"
          >
            <Button size="small" variant="contained">
              Find
            </Button>
            <Button size="small" variant="contained">
              Print
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={studentActivityReportTableKeys}
        bodyDataModal="student activity report"
        bodyData={data}
      />
    </>
  );
}
