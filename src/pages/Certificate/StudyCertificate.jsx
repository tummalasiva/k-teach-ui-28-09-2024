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
  fontFamily: "Lucida Handwriting, Brush Script MT, cursive",
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
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      student: "",

      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getAcademicYear();
    getStudents();
  }, [selectedSetting._id]);
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
            <Button size="small" variant="contained">
              Issue
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Container>
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="space-between">
          <Grid item xs={6} md={6} lg={3} textAlign="start">
            <img src="" alt="logo" height={110} width={100} />
          </Grid>

          <Grid item xs={6} md={6} lg={6} textAlign="center">
            {" "}
            <Typography textAlign="center" fontSize="20px">
              Kayaka School
            </Typography>
            <Typography textAlign="center" fontSize="16px">
              VjayaNagara
            </Typography>
          </Grid>

          <Grid item xs={6} md={6} lg={3} textAlign="end">
            <img src="" alt="photo" height={120} width={100} />
          </Grid>
        </Grid>

        <Heading>STUDY CERTIFICATE</Heading>

        <TextOuterContent>
          <Typography
            component="span"
            sx={{
              fontSize: "25px",
              fontFamily: " Georgia, sans-serif",
            }}>
            {" "}
            This is to certify Mister/Miss son/daughter of Sri{" "}
            <Content component={"span"}>abc</Content> a resident of{" "}
            <Content component={"span"}>xyz</Content> is a bonafide student of
            our school. He / She is studying in class
            <Content component={"span"}>1</Content>
            for the academic year
            <Content component={"span"}>2023-2024</Content>
            and His/Her date of birth is
            <Content component={"span"}>04-08-1999</Content>
            as per our school record G R No is{" "}
            <Content component={"span"}>123</Content>
          </Typography>
        </TextOuterContent>

        <DateContaner>
          <Box>
            <Typography gutterBottom fontSize="20px">
              {" "}
              23-1-2024
            </Typography>
            <Typography component="span" fontSize="20px">
              Place:
            </Typography>
            <Typography component="span" fontSize="20px">
              Bhatkal
            </Typography>
          </Box>

          <Typography fontSize="20px">Sign Of Head Master</Typography>
        </DateContaner>
      </Container>

      <MuiBox>
        <Button variant="contained" size="small">
          Download
        </Button>
        <Button variant="contained" size="small" aria-label="search">
          Print
        </Button>
      </MuiBox>
    </>
  );
}
