import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import { consolidateMarksTableKeys } from "../../data/tableKeys/consolidateMarksCardData";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";

export default function ConsolidatedMarkSheet() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Consolidate Marks Sheet" />

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
          <Grid xs={12} md={6} lg={3} item>
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
              Add exams
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="Consolidate marks card"
        bodyData={data}
        tableKeys={consolidateMarksTableKeys}
      />
    </>
  );
}
