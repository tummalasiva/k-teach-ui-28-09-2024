import React, { useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Button, Grid, Paper } from "@mui/material";
import FormDatePicker from "../../forms/FormDatePicker";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { feeOverviewPaymentTableKeys } from "../../data/tableKeys/feeOverviewPaymentData";
import { feeOverviewReceiptTableKeys } from "../../data/tableKeys/feeOverviewReceiptData";
import FormInput from "../../forms/FormInput";

export default function FeeOverview() {
  const [data, setData] = useState([]);

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      collected: "",
      feeReceipt: "",
      feeMap: "",
      class: "",
      section: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Fee Overview" />
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
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
              name="collected"
              formik={entryFormik}
              label="Select Collected By"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeReceipt"
              formik={entryFormik}
              label="Select Fee Receipt"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeMap"
              formik={entryFormik}
              label="Select Fee Map"
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
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              name="fromDate"
              label="From Date"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              name="toDate"
              label="To Date"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <Button variant="contained">Find</Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="data"
        bodyData={data}
        tableKeys={feeOverviewPaymentTableKeys}
      />
      <Grid
        rowSpacing={1}
        columnSpacing={2}
        container
        sx={{ display: "flex", alignItems: "center", my: 1 }}
      >
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="addmisionNo"
            formik={entryFormik}
            label="Select Addmision No"
            // options={""}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <FormInput formik={entryFormik} name="search" label="Search..." />
        </Grid>
      </Grid>
      <CustomTable
        actions={[]}
        bodyDataModal="data"
        bodyData={data}
        tableKeys={feeOverviewReceiptTableKeys}
      />
    </>
  );
}
