import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";

export default function FilterStudent() {
  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      student: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <Paper sx={{ padding: 2 }}>
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
              name="seecion"
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
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
