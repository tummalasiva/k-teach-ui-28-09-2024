import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

import FormSelect from "../../forms/FormSelect";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { promotionTableKeys } from "../../data/tableKeys/promotionData";

export default function Promotion() {
  const [data, setDate] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      currentClass: "",
      currentSection: "",
      promoteClass: "",
      promoteSection: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Promotion" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box sx={{ fontSize: 16, fontWeight: "bold" }}>
          <Typography component="span" color="forestgreen" fontWeight="bold">
            Running Session:{" "}
          </Typography>
          <Typography component="span" fontWeight="bold">
            2023-2024
          </Typography>
        </Box>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={2} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Promote To Session"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={2} item>
            <FormSelect
              required={true}
              name="currentClass"
              formik={entryFormik}
              label="Current Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={2} item>
            <FormSelect
              required={true}
              name="currentSectionn"
              formik={entryFormik}
              label="Current Section"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={2} item>
            <FormSelect
              required={true}
              name="promoteClass"
              formik={entryFormik}
              label="Promote Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={2} item>
            <FormSelect
              required={true}
              name="promoteSection"
              formik={entryFormik}
              label="Promote Section"
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
        tableKeys={promotionTableKeys}
        bodyDataModal="students"
        bodyData={data}
      />
    </>
  );
}
