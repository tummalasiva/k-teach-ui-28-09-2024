import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { studentActivityTableKeys } from "../../data/tableKeys/studentActivity";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";

export default function StudentActivity() {
  const [data, setDate] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      student: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Student Activity" />
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
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="sectiion"
              formik={entryFormik}
              label="Select Section"
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
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
          >
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={studentActivityTableKeys}
        bodyDataModal="student activity"
        bodyData={data}
      />
    </>
  );
}
