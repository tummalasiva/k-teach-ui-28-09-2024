/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import { studentActivityReportTableKeys } from "../../data/tableKeys/studentActivityReportData";
import CustomTable from "../../components/Tables/CustomTable";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { downloadFile } from "../../utils";
import { LoadingButton } from "@mui/lab";

export default function StudentActivityReport() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

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
    } catch (error) {
      console.log(error);
    }
  };

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: entryFormik.values.academicYear,
            "academicInfo.class": entryFormik.values.class,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStudentActivityReport = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(PRIVATE_URLS.report.getStudentActivityReport, {
        params: {
          schoolId: selectedSetting._id,
          academicYearId: values.academicYear,
          studentId: values.student,
        },
      });

      setData(data.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGetPrintPdf = async () => {
    try {
      setLoadingPdf(true);
      const getPdf = await get(
        PRIVATE_URLS.report.getStudentActivityReportPdf,
        {
          params: {
            schoolId: selectedSetting._id,
            academicYearId: entryFormik.values.academicYear,
            studentId: entryFormik.values.student,
          },
          responseType: "blob",
        }
      );

      downloadFile("application/pdf", getPdf.data, "studentActivityReport.pdf");
      setLoadingPdf(false);
    } catch (error) {
      console.log(error);
      setLoadingPdf(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      student: "",
    },
    onSubmit: handleGetStudentActivityReport,
  });

  useEffect(() => {
    getAcademicYear();
    getClass();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.academicYear && entryFormik.values.class) {
      getStudents();
    }
  }, [
    entryFormik.values.academicYear,
    entryFormik.values.class,

    selectedSetting,
  ]);
  return (
    <>
      <PageHeader title="Student Activity Report" />
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
                name="class"
                formik={entryFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="student"
                formik={entryFormik}
                label="Select Student"
                options={students}
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={3}
              item
              display="flex"
              gap={1}
              alignSelf="center">
              <LoadingButton
                loading={loading}
                size="small"
                variant="contained"
                type="submit">
                Find
              </LoadingButton>
              <LoadingButton
                loading={loadingPdf}
                size="small"
                variant="contained"
                onClick={handleGetPrintPdf}>
                Print
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <CustomTable
        actions={[]}
        tableKeys={studentActivityReportTableKeys}
        bodyDataModal="student activity report"
        bodyData={data}
      />
    </>
  );
}
