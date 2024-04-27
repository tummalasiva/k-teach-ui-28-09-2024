import React from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Button } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";

export default function AddEmployee() {
  const navigation = useNavigate();
  const onCloseHandle = (e) => {
    navigation(-1);
  };
  const entryFormik = useFormik({
    initialValues: {
      name: "",
      EmpId: "",
      responsibility: "",
      designation: "",
      contactNumber: "",
      secondContactNumber: "",
      gender: "",
      bloodGroup: "",
      Religon: "",
      presentAddress: "",
      permanentAddress: "",
      dob: dayjs(new Date()),
      fatherName: "",
      spouseName: "",
      aadharNo: "",
      fatherOccupation: "",
      spouseOccupation: "",
      qualification: "",
      workExperience: "",
      grad: "",
      email: "",
      salaryType: "",
      role: "",
      department: "",
      grad: "",
      admisionDate: "",
      resume: "",
      username: "",
      password: "",
      viewOnWeb: "",
      detailsOnWeb: "",
      photo: "",
      resume: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
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
            <FormInput
              required={true}
              name="EmpId"
              formik={entryFormik}
              label="Employee Id"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="responsibility"
              formik={entryFormik}
              label="Responsibility"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="designation"
              formik={entryFormik}
              label="Designation"
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
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="secondContactNumber"
              formik={entryFormik}
              label="Secondary Contact Number"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="gender"
              formik={entryFormik}
              label="Select Gender"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="bloodGroup"
              formik={entryFormik}
              label="Select Blood Group"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="religon"
              formik={entryFormik}
              label="Religon"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="Date of Birth"
              name="dob"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="presentAddress"
              formik={entryFormik}
              label="Present Address"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="permanentAddress"
              formik={entryFormik}
              label="Permanent Address"
            />
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
              name="spouseName"
              formik={entryFormik}
              label="Spouse Name"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="aadharNo"
              formik={entryFormik}
              label="Aadhar No."
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="fatherOccupation"
              formik={entryFormik}
              label="Father Occupation"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="spouseOccupation"
              formik={entryFormik}
              label="Spouse Occupation"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Academic Information
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="qualification"
              formik={entryFormik}
              label="Qualification              "
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="workExperience"
              formik={entryFormik}
              label="Work Experience"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="grad"
              formik={entryFormik}
              label="Select Salary Grad"
              // options={""}
            />
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
            <FormSelect
              required={true}
              name="salaryType"
              formik={entryFormik}
              label="Select Salary Type"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="role"
              formik={entryFormik}
              label="Select Role"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="department"
              formik={entryFormik}
              label="Select Department"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="admisionDate"
              formik={entryFormik}
              label="Admission Date"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="resume"
              formik={entryFormik}
              label="Resume"
              type="file"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Log In Information:
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="username"
              formik={entryFormik}
              label="User Name"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="password"
              formik={entryFormik}
              label="password"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Other Information:
            </Typography>
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={false}
              name="viewOnWeb"
              formik={entryFormik}
              label="View on Web"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={false}
              name="detailsOnWeb"
              formik={entryFormik}
              label="Details For Web"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="photo"
              formik={entryFormik}
              label="Photo"
              type="file"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} item>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="start"
              sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
            >
              Profile Information:
            </Typography>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={false}
              name="status"
              formik={entryFormik}
              label="Status"
              // options={""}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid
        xs={12}
        md={6}
        lg={3}
        style={{ alignSelf: "center", marginTop: "10px" }}
        item
      >
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={onCloseHandle}
        >
          Cancel
        </Button>
        <Button size="small" variant="contained" sx={{ ml: 2 }}>
          Submit
        </Button>
      </Grid>
    </>
  );
}
