import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { employeeLibraryHistoryTableKeys } from "../../data/tableKeys/employeeLibraryHistroyData";
import { employeeLibraryDueTableKeys } from "../../data/tableKeys/employeeLibraryDueData";
import { employeeLibraryIssueTableKeys } from "../../data/tableKeys/employeeLibraryIssueData";
import { Button, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import FormDatePicker from "../../forms/FormDatePicker";

const BookDetailed = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
}));
export default function EmployeeIssueReturn() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Employee Issue & Return" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Issue List", "Due List", "History List"]}
      />
      <TabPanel index={0} value={value}>
        <BookDetailed sx={{ padding: 1 }}>
          <Typography variant="h6" fontWeight="bold" fontSize={16}>
            Total Books: 1
          </Typography>
          <Typography variant="h6" fontWeight="bold" fontSize={16}>
            Issued: 1
          </Typography>
          <Typography variant="h6" fontSize={16} fontWeight="bold">
            Due: 1
          </Typography>
        </BookDetailed>
        <CustomTable
          actions={[]}
          tableKeys={employeeLibraryIssueTableKeys}
          bodyData={data}
          bodyDataModal="employee"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={[]}
          tableKeys={employeeLibraryDueTableKeys}
          bodyData={data}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={entryFormik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={entryFormik}
                label="To Date"
                name="toDate"
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              sx={{ alignSelf: "center", mt: 1 }}
              item
            >
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
                <Button size="small" variant="contained">
                  Download
                </Button>
                <Button size="small" variant="contained">
                  Print
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable actions={[]} tableKeys={employeeLibraryHistoryTableKeys} />
      </TabPanel>
    </>
  );
}
