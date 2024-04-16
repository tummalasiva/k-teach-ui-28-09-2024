import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicSubjectTableKeys } from "../../data/tableKeys/academicSubjectData";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";

export default function Subject() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      class: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Subject" />

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

          <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <CustomTable
        actions={["edit"]}
        tableKeys={academicSubjectTableKeys}
        bodyDataModal="subject"
        bodyData={data}
      />
    </>
  );
}
