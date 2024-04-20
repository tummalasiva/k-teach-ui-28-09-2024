import React, { useState } from "react";

import CustomTable from "../Tables/CustomTable";
import { vehicleTireTableKeys } from "../../data/tableKeys/vehicleTireData";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";

export default function VehicleTire() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      vehicle: "",
      firm: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="vehicle"
              formik={entryFormik}
              label="Select Vehicle"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="firm"
              formik={entryFormik}
              label="Select Firm"
              // options={""}
            />
          </Grid>

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
              label="To Date"
              name="toDate"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
            alignSelf="center"
            gap={1}
          >
            <Button size="small" variant="contained">
              Find
            </Button>
            <Button size="small" variant="contained">
              Print
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        tableKeys={vehicleTireTableKeys}
        bodyData={data}
        bodyDataModal="tire/resole"
        actions={["edit"]}
      />
    </>
  );
}
