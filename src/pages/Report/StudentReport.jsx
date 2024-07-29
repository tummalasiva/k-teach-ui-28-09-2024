/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
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
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import themeData from "../../data/themeData";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { LoadingButton } from "@mui/lab";
import { downloadFile } from "../../utils";
import CheckPermission from "../../components/Authentication/CheckPermission";

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
    value: "library",
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

const classCombineData = (data) => {
  const combinedData = data.map((item) => {
    return {
      name: item?.className,
      male: item?.maleCount,
      female: item?.femaleCount,
      total: item?.totalCount,
    };
  });

  return combinedData;
};
const genderCombineData = (data) => {
  const combinedData = data.map((item) => {
    return {
      name: "gender",
      male: item?.maleCount,
      female: item?.femaleCount,
      total: item?.totalCount,
    };
  });

  return combinedData;
};
const libraryCombineData = (data) => {
  const combinedData = data.map((item) => {
    return {
      name: "library",
      male: item?.maleCount,
      female: item?.femaleCount,
      total: item?.totalCount,
    };
  });

  return combinedData;
};
const vehcileCombineData = (data) => {
  const combinedData = data.map((item) => {
    return {
      name: item?.vehicleNumber,
      male: item?.maleCount,
      female: item?.femaleCount,
      total: item?.totalCount,
    };
  });

  return combinedData;
};
const hostelCombineData = (data) => {
  const combinedData = data.map((item) => {
    return {
      name: item?.hostelName,
      male: item?.maleCount,
      female: item?.femaleCount,
      total: item?.totalCount,
    };
  });

  return combinedData;
};

export default function StudentReport() {
  const componentRef = useRef();
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classBar, setClassBar] = useState([]);
  const [genderBar, setGenderBar] = useState([]);
  const [libraryBar, setLibraryBar] = useState([]);
  const [vehicleBar, setVehicleBar] = useState([]);
  const [hostelBar, setHostelBar] = useState([]);
  const [groupData, setGroupdata] = useState("");
  const [groupDataGraph, setGroupdataGraph] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classCombinedData = classCombineData(classBar);
  const genderCombinedData = genderCombineData(genderBar);
  const libraryCombinedData = libraryCombineData(libraryBar);
  const vehicleCombinedData = vehcileCombineData(vehicleBar);
  const hostelCombinedData = hostelCombineData(hostelBar);

  const [loading, setLoading] = useState(false);

  const [loadingGraph, setLoadingGraph] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  let totalMaleStudents = 0;
  let totalFemaleStudents = 0;
  // filter pagination==========
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  const handleGetStudentReport = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(PRIVATE_URLS.report.getStudentReport, {
        params: {
          schoolId: selectedSetting._id,
          groupBy: values.groupByData,
          academicYearId: values.academicYear,
        },
      });
      setData(data.result);
      setGroupdata(values.groupByData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGetPrintPdf = async () => {
    try {
      setLoadingPdf(true);
      const getPdf = await get(PRIVATE_URLS.report.downloadStudentReport, {
        params: {
          schoolId: selectedSetting._id,
          groupBy: entryFormik.values.groupByData,
          academicYearId: entryFormik.values.academicYear,
        },
        responseType: "blob",
      });

      downloadFile("application/pdf", getPdf.data, "studentReport.pdf");
      setLoadingPdf(false);
    } catch (error) {
      console.log(error);
      setLoadingPdf(false);
    }
  };

  const handleGetStudentReportByGraph = async (values) => {
    try {
      setLoadingGraph(true);
      const { data } = await get(PRIVATE_URLS.report.getStudentReport, {
        params: {
          schoolId: selectedSetting._id,
          groupBy: values.groupByData,
          academicYearId: values.academicYear,
        },
      });

      setGroupdataGraph(values.groupByData);
      if (values.groupByData === "class") {
        setClassBar(data.result);
      }
      if (values.groupByData === "gender") {
        setGenderBar(data.result);
      }
      if (values.groupByData === "library") {
        setLibraryBar(data.result);
      }
      if (values.groupByData === "vehicle") {
        setVehicleBar(data.result);
      }
      if (values.groupByData === "hostel") {
        setHostelBar(data.result);
      }
      setLoadingGraph(false);
    } catch (error) {
      console.log(error);
      setLoadingGraph(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      groupByData: "",
    },
    onSubmit: handleGetStudentReport,
  });
  const formik = useFormik({
    initialValues: {
      academicYear: "",
      groupByData: "",
    },
    onSubmit: handleGetStudentReportByGraph,
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

              <Grid
                xs={12}
                md={6}
                lg={3}
                alignSelf="center"
                display="flex"
                gap={1}
                item>
                <CheckPermission module="Student Report" permission="view">
                  <LoadingButton
                    loading={loading}
                    size="small"
                    variant="contained"
                    type="submit">
                    Find
                  </LoadingButton>
                </CheckPermission>
                <CheckPermission module="Student Report" permission="view">
                  <LoadingButton
                    loading={loadingPdf}
                    size="small"
                    variant="contained"
                    onClick={handleGetPrintPdf}>
                    Print
                  </LoadingButton>
                </CheckPermission>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <TableContainer component={Paper}>
          {groupData === "class" && (
            <Table size="small">
              <TableHead
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                }}>
                <TableRow>
                  <TableCell align="center">SL</TableCell>

                  <TableCell align="center">Class</TableCell>
                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => {
                  totalMaleStudents += data.maleCount;
                  totalFemaleStudents += data.femaleCount;

                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell align="center">{data.className}</TableCell>
                      <TableCell align="center">{data.maleCount}</TableCell>
                      <TableCell align="center">{data.femaleCount}</TableCell>
                      <TableCell align="center">{data.totalCount}</TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell
                    align="start"
                    colSpan={2}
                    sx={{ fontWeight: "bold" }}>
                    Total:
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalMaleStudents}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalFemaleStudents}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalMaleStudents + totalFemaleStudents}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          {groupData === "gender" && (
            <Table size="small">
              <TableHead
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                }}>
                <TableRow>
                  <TableCell align="center">SL</TableCell>

                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>

                    <TableCell align="center">{data.maleCount}</TableCell>
                    <TableCell align="center">{data.femaleCount}</TableCell>
                    <TableCell align="center">{data.totalCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {groupData === "vehicle" && (
            <Table size="small">
              <TableHead
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                }}>
                <TableRow>
                  <TableCell align="center">SL</TableCell>

                  <TableCell align="center">Vehicle Number</TableCell>
                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => {
                  totalMaleStudents += data.maleCount;
                  totalFemaleStudents += data.femaleCount;

                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell align="center">{data.vehicleNumber}</TableCell>
                      <TableCell align="center">{data.maleCount}</TableCell>
                      <TableCell align="center">{data.femaleCount}</TableCell>
                      <TableCell align="center">{data.totalCount}</TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    align="start"
                    colSpan={2}>
                    Total:
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalMaleStudents}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalFemaleStudents}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalMaleStudents + totalFemaleStudents}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          {groupData === "library" && (
            <Table size="small">
              <TableHead
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                }}>
                <TableRow>
                  <TableCell align="center">SL</TableCell>

                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center"> {index + 1}</TableCell>

                    <TableCell align="center">{data.maleCount}</TableCell>
                    <TableCell align="center">{data.femaleCount}</TableCell>
                    <TableCell align="center">{data.totalCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {groupData === "hostel" && (
            <Table size="small">
              <TableHead
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.light,
                }}>
                <TableRow>
                  <TableCell align="center">SL</TableCell>

                  <TableCell align="center">Hostel Name</TableCell>
                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => {
                  totalMaleStudents += data.maleCount;
                  totalFemaleStudents += data.femaleCount;

                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell align="center">{data.hostelName}</TableCell>
                      <TableCell align="center">{data.maleCount}</TableCell>
                      <TableCell align="center">{data.femaleCount}</TableCell>
                      <TableCell align="center">{data.totalCount}</TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell
                    align="start"
                    colSpan={2}
                    sx={{ fontWeight: "bold" }}>
                    Total:
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalMaleStudents}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalFemaleStudents}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalMaleStudents + totalFemaleStudents}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <TablePagination
            size="small"
            component="div"
            count={data ? (data.length ? data.length : 0) : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: "flex",
              justifyContent: "flex-start,",
            }}
          />
        </TableContainer>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            {" "}
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
                <CheckPermission module="Student Report" permission="view">
                  <LoadingButton
                    loading={loadingGraph}
                    size="small"
                    variant="contained"
                    type="submit">
                    Find
                  </LoadingButton>
                </CheckPermission>
                <CheckPermission module="Student Report" permission="view">
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handlePrint}>
                        Print
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />
                </CheckPermission>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box ref={componentRef}>
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
                    Student Report
                  </Typography>
                </DataContainer>
              </Paper>
            </Grid>
          </HeadingContainer>
          {groupDataGraph === "class" && (
            <Box display="flex" justifyContent="center" mt={3}>
              <ResponsiveContainer width={700} height={300}>
                <BarChart data={classCombinedData}>
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
          )}

          {groupDataGraph === "gender" && (
            <Box display="flex" justifyContent="center" mt={3}>
              <ResponsiveContainer width={700} height={300}>
                <BarChart data={genderCombinedData}>
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
          )}

          {groupDataGraph === "vehicle" && (
            <Box display="flex" justifyContent="center" mt={3}>
              <ResponsiveContainer width={700} height={300}>
                <BarChart data={vehicleCombinedData}>
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
          )}

          {groupDataGraph === "hostel" && (
            <Box display="flex" justifyContent="center" mt={3}>
              <ResponsiveContainer width={700} height={300}>
                <BarChart data={hostelCombinedData}>
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
          )}

          {groupDataGraph === "library" && (
            <Box display="flex" justifyContent="center" mt={3}>
              <ResponsiveContainer width={700} height={300}>
                <BarChart data={libraryCombinedData}>
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
          )}
        </Box>
      </TabPanel>
    </>
  );
}
