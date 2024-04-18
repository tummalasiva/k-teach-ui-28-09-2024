import React, { useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { stockListTableKeys } from "../../data/tableKeys/stockListData";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import OverviewTable from "./OverviewTable";

export default function StockList() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Item Stock" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="From Date"
              name="fromDate"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              name="toDate"
              label="To Date"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
          <Grid xs={12} md={12} lg={12} style={{ alignSelf: "center" }} item>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              sx={{ mr: 2, mt: 1 }}
            >
              Sell
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              sx={{ mr: 2, mt: 1 }}
            >
              Issue
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              sx={{ mr: 2, mt: 1 }}
            >
              Add Item
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              sx={{ mr: 2, mt: 1 }}
            >
              Add Vendor
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* overview table component ======= */}
      <Grid xs={12} md={12} lg={12} style={{ alignSelf: "center" }} item>
        <Button size="small" variant="contained" sx={{ mr: 2, mt: 1 }}>
          Excel
        </Button>
        <Button size="small" variant="contained" sx={{ mr: 2, mt: 1 }}>
          PDF
        </Button>
      </Grid>
      <OverviewTable />
      {/* ================================ */}
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="div"
        textAlign="start"
        sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
      >
        List of Stocks
      </Typography>
      <CustomTable
        actions={[]}
        bodyDataModal="Item stock"
        bodyData={data}
        tableKeys={stockListTableKeys}
      />
    </>
  );
}
