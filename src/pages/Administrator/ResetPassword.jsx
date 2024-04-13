import React from "react";
import { Paper, Grid, Button } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import PageHeader from "../../components/PageHeader";

export default function ResetPassword() {
  const entryFormik = useFormik({
    initialValues: {
      type: "",
      employee: "",
    },
    onSubmit: console.log("data"),
  });
  return (
    <>
      <PageHeader title="User Password Reset" />
      <Paper sx={{ padding: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="type"
              formik={entryFormik}
              label="User Type"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="employee"
              formik={entryFormik}
              label="Employees"
              // options={""}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={4} item>
            <FormInput
              formik={entryFormik}
              label="Password"
              type="password"
              name="password"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
