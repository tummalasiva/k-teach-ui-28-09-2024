/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

import FormSelect from "../../forms/FormSelect";
import {
  Box,
  Button,
  Checkbox,
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
} from "@mui/material";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import { get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { hasAllValues } from "../../utils";
import { toast } from "react-toastify";
import StickyBar from "../../components/StickyBar";
import { LoadingButton } from "@mui/lab";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Promotion() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [activeAcademicYear, setActiveAcademicYear] = useState({});
  const [checkBox, setCheckBox] = useState([]);
  const [promoting, setPromoting] = useState(false);
  const [gettingStudentsList, setGettingStudentsList] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter pagination==========
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // ==============

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      let allAcademicYears = data.result;
      let activeAcademicYear = allAcademicYears.find((a) => a.active);

      setAcademicYear(
        allAcademicYears
          .filter((a) => a._id !== activeAcademicYear?._id)
          .map((d) => ({ label: `${d.from}-${d.to}`, value: d._id }))
      );
      setActiveAcademicYear(activeAcademicYear);
      entryFormik.setFieldValue("promoteAcademicYearId", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentList = async (values) => {
    try {
      if (!hasAllValues(values, [])) {
        return;
      }
      setGettingStudentsList(true);
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          search: {
            academicYear: activeAcademicYear._id,
            "academicInfo.section": values.currentSectionId,
            "academicInfo.class": values.currentClassId,
            active: true,
          },
        },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
    setGettingStudentsList(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      promoteAcademicYearId: "",
      currentClassId: "",
      currentSectionId: "",
      promoteClassId: "",
      promoteSectionId: "",
    },
    onSubmit: getStudentList,
  });

  useEffect(() => {
    setData([]);
  }, [entryFormik.values]);

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setSectionData(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
      entryFormik.setFieldValue("currentSectionId", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClassData(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
      entryFormik.setFieldValue("currentClassId", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get data on page load
  useEffect(() => {
    getAcademicYear();
    getClass();
    getSection();
  }, [selectedSetting._id]);

  const handlePromotionCheckBox = (_id, e) => {
    if (e.target.checked) {
      setCheckBox((prev) => [...prev, _id]);
    } else {
      setCheckBox(checkBox.filter((item) => item !== _id));
    }
  };

  const handleMultipleChecks = (e) => {
    if (e.target.checked) {
      const ids = data.map((item) => item._id);
      setCheckBox([...ids]);
    } else {
      setCheckBox([]);
    }
  };

  const handlePromotion = async () => {
    try {
      const payload = {
        schoolId: selectedSetting._id,
        ...entryFormik.values,
        studentIds: checkBox,
      };
      setPromoting(true);
      console.log(payload, "payload");
      const { data } = await put(PRIVATE_URLS.student.promote, payload);
      entryFormik.resetForm();
    } catch (error) {
      console.log(error);
    }
    setPromoting(false);
  };

  return (
    <>
      <PageHeader title="Promotion" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box sx={{ fontSize: 16, fontWeight: "bold" }}>
          <Typography component="span" color="forestgreen" fontWeight="bold">
            Running Session:{" "}
          </Typography>
          <Typography component="span" fontWeight="bold">
            {activeAcademicYear?.from}-{activeAcademicYear?.to}
          </Typography>
        </Box>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="promoteAcademicYearId"
              formik={entryFormik}
              label="Promote To Session"
              options={academicYear}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="currentClassId"
              formik={entryFormik}
              label="Current Class"
              options={classData}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="currentSectionId"
              formik={entryFormik}
              label="Current Section"
              options={sectionData
                .filter(
                  (s) => s.class._id === entryFormik.values.currentClassId
                )
                .map((s) => ({ label: s.name, value: s._id }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="promoteClassId"
              formik={entryFormik}
              label="Promote Class"
              options={classData
                .filter((s) => s._id !== entryFormik.values.currentClassId)
                .map((s) => ({ label: s.name, value: s._id }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="promoteSectionId"
              formik={entryFormik}
              label="Promote Section"
              options={sectionData
                .filter(
                  (s) => s.class._id === entryFormik.values.promoteClassId
                )
                .map((s) => ({ label: s.name, value: s._id }))}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={2}
            display="flex"
            alignItems="center"
            // justifyContent="flex-end"
          >
            <LoadingButton
              loading={gettingStudentsList}
              disabled={!hasAllValues(entryFormik.values, [], false)}
              onClick={entryFormik.handleSubmit}
              size="small"
              variant="contained">
              Find
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                S.No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Roll No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Father Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                <Checkbox
                  onClick={handleMultipleChecks}
                  {...label}
                  sx={{
                    padding: 0,
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.basicInfo.name}</TableCell>
                  <TableCell align="center">
                    {row.academicInfo.rollNumber}
                  </TableCell>
                  <TableCell align="center">{row.fatherInfo.name}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      size="small"
                      checked={checkBox.includes(row._id)}
                      onChange={(e) => handlePromotionCheckBox(row._id, e)}
                      {...label}
                      sx={{
                        color: "#1b3779",
                        "&.Mui-checked": {
                          color: "#1b3779",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!data.length && (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", margin: "5px", padding: "5px" }}>
            No data found
          </Typography>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: "flex",
            justifyContent: "flex-start,",
          }}
        />
      </TableContainer>

      {data.length > 0 && (
        <StickyBar
          content={
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <LoadingButton
                loading={promoting}
                variant="contained"
                size="small"
                type="submit"
                onClick={handlePromotion}>
                Promote
              </LoadingButton>
            </Box>
          }
        />
      )}
    </>
  );
}
