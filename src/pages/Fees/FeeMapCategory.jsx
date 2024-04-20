import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import { feeMapCategoryTableKeys } from "../../data/tableKeys/feeMapCategoryData";
import { Add } from "@mui/icons-material";

export default function FeeMapCategory() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      receiptName: "",
      feeMap: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Fee Map Category" />
      <Grid
        rowSpacing={1}
        columnSpacing={2}
        container
        sx={{ display: "flex", alignItems: "center", mb: 1 }}
      >
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="receiptName"
            formik={entryFormik}
            label="Select Receipt Name"
            // options={""}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="feeMap"
            formik={entryFormik}
            label="Select Fee Maps"
            // options={""}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <Button variant="contained" startIcon={<Add />}>
            Add Fee Category
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Fee Map Category"
        bodyData={data}
        tableKeys={feeMapCategoryTableKeys}
        feeMapTableKeys
      />
    </>
  );
}
