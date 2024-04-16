import React from "react";
import PageHeader from "../components/PageHeader";
import { Grid, Paper } from "@mui/material";
import FormSelect from "../forms/FormSelect";
import { useFormik } from "formik";

export default function ClassRoutine() {
  const entryFormik = useFormik({
    initialValues: {
      class: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Class Routine" />
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
        </Grid>
      </Paper>
    </>
  );
}
