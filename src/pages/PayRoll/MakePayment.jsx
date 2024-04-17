import React from "react";
import { paymentHistoryTableKeys } from "../../data/tableKeys/paymentHistoryData";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";

export default function MakePayment() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      month: dayjs(new Date()),
      year: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  const formik = useFormik({
    initialValues: {
      type: dayjs(new Date()),
      date: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Salary Sheet", "History", "Salary Deduction"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Month"
                name="month"
                openTo="month"
                inputFormat="MM"
                views={["month"]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Year"
                name="year"
                openTo="year"
                inputFormat="YYYY"
                views={["year"]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3} style={{ alignSelf: "center" }}>
              <Button size="small" variant="contained">
                Process
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          tableKeys={paymentHistoryTableKeys}
          bodyData={data}
          bodyDataModal="history"
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="type"
                formik={formik}
                label="Select Deduction Type"
                // options={""}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker formik={formik} label="Date" name="date" />
            </Grid>

            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
