/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { sellDetailTableKeys } from "../../data/tableKeys/sellDetailData";
import CheckPermission from "../../components/Authentication/CheckPermission";

export default function Sell() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      item: "",
      quantity: "",
      SellStatus: "",
      fromType: "",
      school: "",
      toType: "",
      employeeName: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Sell Details" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Sold List", "Sell"]}
      />
      <TabPanel index={0} value={value}>
        <CheckPermission module="Sell" permission="view">
          <Button size="small" variant="contained" sx={{ my: 2 }}>
            PDF
          </Button>
        </CheckPermission>
        <CheckPermission module="Sell" permission="view">
          <Button size="small" variant="contained" sx={{ ml: 2, my: 2 }}>
            Excel
          </Button>
        </CheckPermission>
        <CustomTable
          actions={["edit"]}
          bodyDataModal="Sell"
          module="Sell"
          bodyData={data}
          tableKeys={sellDetailTableKeys}
        />
      </TabPanel>
      <CheckPermission module="Sell" permission="add">
        <TabPanel index={1} value={value}>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="item"
                  formik={entryFormik}
                  label="Select Item"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="quantity"
                  formik={entryFormik}
                  label="Select Quantity"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="sellStatus"
                  formik={entryFormik}
                  label="Select Sell Status"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="fromType"
                  formik={entryFormik}
                  label="Select From Type"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="school"
                  formik={entryFormik}
                  label="Select School"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="toType"
                  formik={entryFormik}
                  label="Select To Type"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="employeeName"
                  formik={entryFormik}
                  label="Select Employee Name"
                  // options={}
                />
              </Grid>
              <Grid xs={12} md={12} lg={12} item>
                <FormInput
                  required={true}
                  name="note"
                  formik={entryFormik}
                  label="Note"
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={3}
                style={{ alignSelf: "center", marginTop: "10px" }}
                item>
                <Button size="small" color="error" variant="contained">
                  Cancel
                </Button>
                <Button size="small" variant="contained" sx={{ ml: 2 }}>
                  Sell
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </CheckPermission>
    </>
  );
}
