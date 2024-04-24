import React from "react";
import FormSelect from "../../../../forms/FormSelect";
import FormInput from "../../../../forms/FormInput";
import FormDatePicker from "../../../../forms/FormDatePicker";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import dayjs from "dayjs";
import themeData from "../../../../data/themeData";
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

const BloodGroup_Options = [
  {
    label: "A+",
    value: "a",
  },
  {
    label: "A-",
    value: "a-",
  },
  {
    label: "B+",
    value: "b+",
  },
  {
    label: "B-",
    value: "b-",
  },
  {
    label: "O+",
    value: "o+",
  },
  {
    label: "O-",
    value: "o-",
  },
  {
    label: "AB+",
    value: "ab+",
  },
  {
    label: "AB-",
    value: "ab-",
  },
];

export default function PreAdmission() {
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      name: "",
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
      {" "}
      <Container>
        <Grid container mt={2}>
          <Paper
            sx={{
              width: "100%",
              bgcolor: "whitesmoke",
              padding: 3,
              textAlign: "center",
            }}
            elevation={3}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                style={{
                  fontSize: 20,
                  color: themeData.darkPalette.primary.main,
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                }}
              >
                Pre-Admission Form
              </Typography>
            </Grid>
          </Paper>
        </Grid>
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
              <FormSelect
                required={true}
                name="bloodGroup"
                formik={entryFormik}
                label="Select Blood Group"
                options={BloodGroup_Options}
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
                name="castIncomeCertificateNumber"
                formik={entryFormik}
                label="cast Income Certificate Number"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="motherTongue"
                formik={entryFormik}
                label="Mother Tongue"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="birthPlace"
                formik={entryFormik}
                label="Birth Place"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="aadharNumber"
                formik={entryFormik}
                label="Aadhar Number"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Contact Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="contactNumber"
                formik={entryFormik}
                label="Contact Number"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="guardianName"
                formik={entryFormik}
                label="Guardian Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="guardianNumber"
                formik={entryFormik}
                label="Guardian Number"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="alternateNumber"
                formik={entryFormik}
                label="Alternate Number"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="relationWithGuardian"
                formik={entryFormik}
                label="Relation With Guardian"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="nationalId"
                formik={entryFormik}
                label="National Id"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="presentAddress"
                formik={entryFormik}
                label="presentAddress"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="permanentAddress"
                formik={entryFormik}
                label="permanentAddress"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Previous School Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="previousSchool"
                formik={entryFormik}
                label="Previous School"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="previousClass"
                formik={entryFormik}
                label="Previous Class"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="TcNumber"
                formik={entryFormik}
                label="TC Number"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Father Information
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
                name="fatherPhoneNumber"
                formik={entryFormik}
                label="Father Phone Number"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="fatherEducation"
                formik={entryFormik}
                label="Father Education"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="fatherProfession"
                formik={entryFormik}
                label="Father Profession"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="fatherDesignation"
                formik={entryFormik}
                label="Father Designation"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Mother Information
              </Typography>
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
                name="motherPhoneNumber"
                formik={entryFormik}
                label="Mother Phone Number"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="motherEducation"
                formik={entryFormik}
                label="Mother Education"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="MotherProfession"
                formik={entryFormik}
                label="Mother Profession"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="motherDesignation"
                formik={entryFormik}
                label="Mother Designation"
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
                name="academicYear"
                formik={entryFormik}
                label="Select Academic Year"
                // options={""}
              />
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
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Other Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="email"
                formik={entryFormik}
                label="Email"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="healthCondition"
                formik={entryFormik}
                label="Health Condition"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="hostel"
                formik={entryFormik}
                label="Hostel Required"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="transportRequired"
                formik={entryFormik}
                label="Transport Required"
              />
            </Grid>
          </Grid>
        </Paper>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
        >
          <Button size="small" color="error" variant="contained">
            Cancel
          </Button>
          <Button size="small" variant="contained">
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
}
