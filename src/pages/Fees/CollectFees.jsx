import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";

export default function CollectFees() {
  const [data, setData] = useState([]);

  const entryFormik = useFormik({
    initialValues: {
      receiptName: "",
      feeMap: "",
      class: "",
      section: "",
      student: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Collect Fees" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="receiptName"
              formik={entryFormik}
              label="Select Receipt Name"
              // options={}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeMap"
              formik={entryFormik}
              label="Select Fee Map"
              // options={}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              // options={}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="student"
              formik={entryFormik}
              label="Select Students"
              // options={}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={3}
            style={{ alignSelf: "center", marginTop: "10px" }}
            item
          >
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
