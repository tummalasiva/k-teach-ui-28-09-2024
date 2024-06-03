/** @format */

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Button, Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import FormDatePicker from "../../forms/FormDatePicker";
import { communicatonReportTableKeys } from "../../data/tableKeys/communicationReportData";
import CustomTable from "../../components/Tables/CustomTable";

const Type_Options = [
  {
    label: "Manual",
    value: "manual",
  },
  {
    label: "Automatic",
    value: "automatic",
  },
];

export default function Report() {
  const [data, setdData] = useState([]);
  const getList = async (values) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      type: "",
      fromDate: null,
      toDate: null,
    },
    onSubmit: getList,
    enableReinitialize: true,
  });
  return (
    <>
      <PageHeader title="Report" />
      <Grid container spacing={2}>
        <Grid xs={12} md={3} item>
          <FormSelect
            required={true}
            name="type"
            formik={entryFormik}
            label="Type"
            options={Type_Options}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <FormDatePicker
            formik={entryFormik}
            label="From Date"
            name="fromDate"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <FormDatePicker formik={entryFormik} label="To Date" name="toDate" />
        </Grid>
        <Grid item xs={12} md={3} lg={3} display="flex" alignSelf="center">
          <Button size="small" type="submit" variant="contained">
            Find
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        actions={["delete"]}
        bodyData={data}
        bodyDataModal="report"
        tableKeys={communicatonReportTableKeys}
      />
    </>
  );
}
