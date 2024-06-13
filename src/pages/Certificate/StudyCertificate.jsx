/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import PageHeader from "../../components/PageHeader";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";

const Heading = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "30px",
  fontWeight: "bold",
  marginTop: "40px",
  textDecoration: "underline",
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  padding: "0 5px",
  display: "inline",
  fontWeight: "bold",
  textDecoration: "underline",
  fontFamily: "Roboto ,sans-serif",
}));

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  border: "1px solid black",
  padding: "20px",
}));

const MuiBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
}));

const DateContaner = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "20px",

  justifyContent: "space-between",

  alignItems: "center",
}));

const TextOuterContent = styled(Box)(({ theme }) => ({
  padding: "20px",
  display: "flex",
  textIndent: "50px",
}));

export default function StudyCertificate() {
  const { selectedSetting } = useContext(SettingContext);
  const [academicYear, setAcademicYear] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [bulkIssue, setBulkIssue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  console.log(selectedData, "selectedData");
  console.log(students, "students");

  // console.log(selectedSetting, "sselectedSetting");
  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      // console.log(data, "data");
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d,
          // value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCertificate = async (values) => {
    console.log(values, "bfyy");
    setLoading(true);

    try {
      setSelectedData({
        ...selectedData,
        fatherName: values?.student?.fatherInfo?.name,
        academicYearFrom: values?.student?.academicYear?.from,
        academicYearTo: values?.student?.academicYear?.to,
        academicId: values?.academicYear,
        studentName: values?.student?.basicInfo.name,
        studentId: values?.student?._id,
        currentClass: values?.student?.academicInfo.class.name,
        dob: values?.student?.basicInfo.dob,
        grNo: values?.student?.basicInfo.grNo,
        studentPhoto: values?.student?.photo,
        schoolName: values?.student?.school?.name,
        schoolAddress: values?.student?.school?.address,
        schoolLogo: values?.student?.school?.logo,
        category: values?.student?.basicInfo.category,
        address: values?.student?.contactInfo.presentAddress,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      student: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: handleSubmitCertificate,
  });

  useEffect(() => {
    getAcademicYear();
    getStudents();
  }, [selectedSetting._id]);

  const handleSubmitCertificateDownload = async (e) => {
    setLoadingDownload(true);

    try {
      const response = await get(PRIVATE_URLS.certificate.getStudyCertificate, {
        responseType: "blob",
        params: {
          schoolId: selectedSetting._id,
          academicYearId: selectedData?.academicId,
          studentId: selectedData?.studentId,
        },
      });

      // Create a Blob from the data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element
      const link = document.createElement("a");
      const uri = URL.createObjectURL(blob);

      link.href = uri;
      link.setAttribute("download", "studyCertificate.pdf");

      document.body.appendChild(link);

      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(uri);
    } catch (error) {
      console.log(error);
    }
    setLoadingDownload(false);
  };

  const handleClose = () => {
    setBulkIssue(false);
  };

  const handleClickIssue = () => {
    setBulkIssue(true);
  };

  return (
    <>
      <PageHeader title="Study Certificate" />
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
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
            gap={1}
            item>
            <Button size="small" variant="contained">
              Bulk Issue
            </Button>
            <LoadingButton
              size="small"
              variant="contained"
              type="submit"
              onClick={entryFormik.handleSubmit}
              loading={loading}>
              Issue
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      {entryFormik.values.student != "" && (
        <>
          <Container>
            <Grid
              container
              spacing={2}
              display="flex"
              justifyContent="space-between">
              <Grid item xs={6} md={6} lg={3} textAlign="start">
                <img
                  src={selectedData.schoolLogo || "/world-wide-web.png"}
                  alt="loading..."
                  height={100}
                  width={95}
                  style={{ objectFit: "contain" }}
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6} textAlign="center" mt={2}>
                <Typography textAlign="center" fontSize="20px">
                  {selectedData.schoolName || "St Pauls High School"}
                </Typography>
                <Typography textAlign="center" fontSize="16px">
                  {selectedData.schoolAddress || "ABC NAGAR"}
                </Typography>
              </Grid>

              <Grid item xs={6} md={6} lg={3} textAlign="end">
                <img
                  src={selectedData.studentPhoto || "/studingimg.jpg"}
                  alt="photo"
                  height={120}
                  width={100}
                  style={{ objectFit: "contain" }}
                />
              </Grid>
            </Grid>
            <Heading>STUDY CERTIFICATE</Heading>
            <TextOuterContent>
              <Typography
                component="span"
                sx={{
                  fontSize: "25px",
                  fontFamily: "sans-serif",
                }}>
                This is to certify that Sri./Kum.
                <Content component={"span"}>
                  {selectedData.fatherName || "NA"}
                </Content>
                son/daughter of Mr.
                <Content component={"span"}>
                  {selectedData.studentName || "NA"}
                </Content>
                studying in
                <Content component={"span"}>
                  {selectedData.currentClass || "NA"}
                </Content>
                in our school for the academic year
                <Content component={"span"}>
                  {`${selectedData.academicYearFrom} - ${selectedData.academicYearTo}` ||
                    "NA"}
                </Content>
                .The residential address is as follows:
                <Content component={"span"}>
                  {selectedData.address || "NA"}
                </Content>
                . According to our school records his/her date of birth is
                <Content component={"span"}>
                  {dayjs(selectedData.dob).format("DD-MM-YYYY")}
                </Content>
                . and category is as per our school record G R No is{" "}
                <Content component={"span"}>
                  {selectedData.grNo || "NA"}
                </Content>
                .
              </Typography>
            </TextOuterContent>
            <DateContaner>
              <Box>
                <Typography gutterBottom fontSize="20px">
                  {dayjs().format("DD-MM-YYYY")}
                </Typography>
                <Typography component="span" fontSize="20px">
                  Place:{" "}
                </Typography>
                <Typography component="span" fontSize="20px">
                  {selectedData.schoolAddress}
                </Typography>
              </Box>

              <Typography fontSize="20px">Sign Of Head Master</Typography>
            </DateContaner>
          </Container>

          <MuiBox>
            <LoadingButton
              variant="contained"
              size="small"
              type="submit"
              loading={loadingDownload}
              onClick={handleSubmitCertificateDownload}>
              Download
            </LoadingButton>
            <Button variant="contained" size="small" aria-label="search">
              Print
            </Button>
          </MuiBox>
        </>
      )}
    </>
  );
}
