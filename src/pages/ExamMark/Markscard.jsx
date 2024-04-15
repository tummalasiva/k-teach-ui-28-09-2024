import React, { useState } from "react";
import { useFormik } from "formik";
import { Grid, Paper } from "@mui/material";
import { marksCardTableKeys } from "../../data/tableKeys/marksCardData";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";

export default function Markscard() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Marks Card" />

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
              name="section"
              formik={entryFormik}
              label="Select Section"
              // options={""}
            />
          </Grid>

          {/* <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid> */}
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="marks card"
        bodyData={data}
        tableKeys={marksCardTableKeys}
      />
    </>
  );
}
