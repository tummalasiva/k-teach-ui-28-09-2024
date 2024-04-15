import React from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";

export default function ExamHallTicket() {
  const entryFormik = useFormik({
    initialValues: {
      exam: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Exam Hall Ticket" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="exam"
              formik={entryFormik}
              label="Select Exam"
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
              name="section"
              formik={entryFormik}
              label="Select Section"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Generate
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
