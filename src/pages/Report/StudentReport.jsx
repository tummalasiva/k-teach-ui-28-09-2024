/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

const GroupBYData_Options = [
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Vehicle",
    value: "vehicle",
  },
  {
    label: "Library",
    value: "llbrary",
  },
  {
    label: "Hostel",
    value: "hostel",
  },
  {
    label: "Class",
    value: "class",
  },
];
const graphData = [
  { name: "1", male: 400, female: 60, total: 400 },
  { name: "2", male: 300, female: 300, total: 300 },
  { name: "3", male: 200, female: 570, total: 300 },
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

export default function StudentReport() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);

  const [academicYear, setAcademicYear] = useState([]);

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
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
      formik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      groupByData: "",
    },
    onSubmit: console.log("nnnn"),
  });
  const formik = useFormik({
    initialValues: {
      academicYear: "",
      groupByData: "",
    },
    onSubmit: console.log("nnnn"),
  });
  useEffect(() => {
    getAcademicYear();
  }, [selectedSetting]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Student Report" />
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

            <Grid
              xs={12}
              md={6}
              lg={3}
              alignSelf="center"
              display="flex"
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
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={formik}
                label="Select Academic Year"
                options={academicYear}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="groupByData"
                formik={formik}
                label="Select Group By Data"
                options={GroupBYData_Options}
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={3}
              alignSelf="center"
              display="flex"
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
                  Student Report
                </Typography>
              </DataContainer>
            </Paper>
          </Grid>
        </HeadingContainer>
        <Box display="flex" justifyContent="center" mt={3}>
          <ResponsiveContainer width={700} height={300}>
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend
                wrapperStyle={{ textAlign: "center" }}
                formatter={(value) => value}
                layout="horizontal"
                align="center"
              />
              <Bar dataKey="male" fill="#8884d8" />
              <Bar dataKey="female" fill="#82ca9d" />
              <Bar dataKey="total" fill="#ff7f50" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>
    </>
  );
}
