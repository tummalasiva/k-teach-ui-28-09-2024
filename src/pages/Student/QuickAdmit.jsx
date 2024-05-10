import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";

const Gender_Options = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

export default function QuickAdmit() {
  const [data, setDate] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      name: "",
      admissionDate: dayjs(new Date()),
      dob: dayjs(new Date()),

      gender: "",
      cast: "",
      contactNumber: "",
      fatherName: "",
      fatherContactNumber: "",
      motherName: "",
      motherContactNumber: "",
      class: "",
      section: "",
      rollNo: "",
      status: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Quick Admit" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              component="span"
              color="red"
              fontWeight="bold"
              sx={{ display: "inline" }}
            >
              Note:{" "}
            </Typography>
            <Typography
              variant="h6"
              component="span"
              fontWeight="bold"
              sx={{ display: "inline" }}
            >
              Student will be admited to session
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              // options={""}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={12} lg={12} item>
            <Typography variant="h6" fontWeight="bold">
              Basic Information
            </Typography>
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="name"
              formik={entryFormik}
              label="Name"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              required={true}
              name="admissionDate"
              formik={entryFormik}
              label="Admission Date"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              required={true}
              name="dob"
              formik={entryFormik}
              label="DOB"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="gender"
              formik={entryFormik}
              label="Select Gender"
              options={Gender_Options}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="cast"
              formik={entryFormik}
              label="Cast"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="contactNumber"
              formik={entryFormik}
              label="Contact Number"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={12} lg={12} item>
            <Typography variant="h6" fontWeight="bold">
              Parent Information
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="fatherName"
              formik={entryFormik}
              label="Father Name"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="fatherContactNumber"
              formik={entryFormik}
              label="Father Phone Number"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="motherName"
              formik={entryFormik}
              label="Mother Name"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="motherContactNumber"
              formik={entryFormik}
              label="Mother Phone Number"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={12} lg={12} item>
            <Typography variant="h6" fontWeight="bold">
              Academic Information
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="rollNo"
              formik={entryFormik}
              label="Select Roll No"
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="status"
              formik={entryFormik}
              label="Select Status"
              // options={""}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button size="small" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
}
