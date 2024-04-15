import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import { studentCrendentialsTableKeys } from "../../data/tableKeys/studentCredentials";

export default function Credential() {
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
      <PageHeader title="Credentials" />
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

          <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={studentCrendentialsTableKeys}
        bodyDataModal="credentials"
        bodyData={data}
      />
    </>
  );
}
