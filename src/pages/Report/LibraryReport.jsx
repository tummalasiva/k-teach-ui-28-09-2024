/** @format */

import React, { useContext, useEffect, useState } from "react";
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
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import themeData from "../../data/themeData";
import { downloadFile } from "../../utils";

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
  const { selectedSetting } = useContext(SettingContext);
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearGraph, setAcademicYearGraph] = useState([]);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      setAcademicYearGraph(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDataByGroup = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.report.groupedLibraryData, {
        params: {
          schoolId: selectedSetting._id,
          groupByData: values.groupByData,
          fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
          toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
        },
      });
      setData(data.result);

      console.log(data.result, "data999999999999999999=======");
    } catch (error) {}
  };
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      groupByData: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: handleGetDataByGroup,
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

  const handleGetPrintPdf = async () => {
    try {
      const getPdf = await get(PRIVATE_URLS.report.downloadGroupedLibraryData, {
        params: {
          schoolId: selectedSetting._id,
          academicYear: entryFormik.values.academicYear,

          groupByData: entryFormik.values.groupByData,
          fromDate: dayjs(entryFormik.values.fromDate).format("YYYY/MM/DD"),
          toDate: dayjs(entryFormik.values.toDate).format("YYYY/MM/DD"),
        },
        responseType: "blob",
      });

      downloadFile("application/pdf", getPdf.data, "libraryReport.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAcademicYear();
  }, [selectedSetting]);
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
          <form onSubmit={entryFormik.handleSubmit}>
            {" "}
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="academicYear"
                  formik={entryFormik}
                  label="Select Academic Year"
                  options={academicYear}
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
                item>
                <Button type="submit" size="small" variant="contained">
                  Find
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleGetPrintPdf}>
                  Print
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <CustomTable
          tableKeys={libraryReportTableKeys}
          bodyData={data}
          bodyDataModal="library report"
          actions={[]}
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
                options={academicYearGraph}
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
              item>
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
                src={selectedSetting.logo}
                height={60}
                width={60}
                style={{
                  display: "block",
                  margin: "auto",
                }}
              />

              <Typography fontSize={18} textAlign="center">
                {selectedSetting.name}
              </Typography>
              <Typography gutterBottom fontSize={12} textAlign="center">
                {selectedSetting.address}
              </Typography>

              <DataContainer>
                {" "}
                <AssessmentIcon
                  sx={{ color: themeData.darkPalette.primary.main }}
                />
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
              label>
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
