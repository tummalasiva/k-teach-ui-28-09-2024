import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import { libraryReportTableKeys } from "../../data/tableKeys/libraryTabularData";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import AssessmentIcon from "@mui/icons-material/Assessment";
import dayjs from "dayjs";

import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const graphData = [
  { name: "Issue", value: 400 },
  { name: "Return", value: 300 },
  { name: "Remain", value: 300 },
];

const colors = ["#FFBB28", "#00C49F", "#32CD32"];

const GroupBYData_Options = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Class",
    value: "class",
  },
];

const HeadingContainer = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const DataContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
}));
export default function LibraryReport() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      groupByData: "",

      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  const formik = useFormik({
    initialValues: {
      academicYear: "",

      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Library Report" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Tabular Report", "Grapical Report"]}
      />
      <TabPanel index={0} value={value}>
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
                name="groupByData"
                formik={entryFormik}
                label="Select Group By Data"
                options={GroupBYData_Options}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="To Date"
                name="toDate"
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="flex-end"
              alignSelf="center"
              gap={1}
              item
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
          tableKeys={libraryReportTableKeys}
          bodyData={data}
          bodyDataModal="library report"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, mb: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={formik}
                label="Select Academic Year"
                // options={""}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker
                formik={formik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker formik={formik} label="To Date" name="toDate" />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              display="flex"
              alignSelf="center"
              gap={1}
              item
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

        <HeadingContainer container>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Paper sx={{ padding: 2, mt: 2 }}>
              <img
                src=""
                height={60}
                width={60}
                style={{
                  display: "block",
                  margin: "auto",
                }}
              />

              <Typography gutterBottom fontSize={18} textAlign="center">
                Kayaka School
              </Typography>
              <Typography gutterBottom textAlign="center">
                Vijaya Nagara
              </Typography>

              <DataContainer>
                {" "}
                <AssessmentIcon sx={{ color: "#196838" }} />
                <Typography textAlign="center" color="error">
                  Libary Report
                </Typography>
              </DataContainer>
            </Paper>
          </Grid>
        </HeadingContainer>

        <Box display="flex" justifyContent="center" mt={2}>
          <PieChart width={1000} height={380}>
            <Legend
              wrapperStyle={{ textAlign: "center" }}
              formatter={(value) => value}
            />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={graphData}
              outerRadius={150}
              label
            >
              {graphData.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </Box>
      </TabPanel>
    </>
  );
}
