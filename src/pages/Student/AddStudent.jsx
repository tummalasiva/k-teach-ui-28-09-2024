import React, { useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const FormBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: "lightgray",
  marginBottom: "20px",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "14px",
  padding: "5px 10px",
  borderBottom: "1px solid",
  borderBottomColor: "lightgray",
  fontWeight: "bold",
  color: "white",
  background: theme.palette.secondary.main,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  background: "whitesmoke",
  padding: theme.spacing(2),
  zIndex: 1000,
}));

const Gender_Options = [
  { label: "Male", Value: "male" },
  { label: "Female", value: "female" },
];

const Blood_Group = [
  { label: "A+", value: "a+" },
  { label: "B+", value: "b+" },
  { label: "A-", value: "a-" },
  { label: "B-", value: "b-" },
  { label: "O+", value: "o+" },
  { label: "O-", value: "o-" },
  { label: "AB+", value: "ab+" },
  { label: "AB-", value: "ab-" },
];

const RTE_Options = [
  { label: "Yes", Value: true },
  { label: "No", value: false },
];

export default function AddStudent() {
  const navigate = useNavigate();
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <PageHeader title="Admit Student" />
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

      {/* Basic Info */}
      <FormBox>
        <Title id="modal-modal-title" variant="h6" component="h2">
          Basic Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
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
                name="admissionNo"
                formik={entryFormik}
                label="Admission No."
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
                label="Date Of Birth"
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
                options={Blood_Group}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="religion"
                formik={entryFormik}
                label="Religion"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="rte"
                formik={entryFormik}
                label="Select RTE"
                options={RTE_Options}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput name="cast" formik={entryFormik} label="Cast" />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="castIncomeCertificate"
                formik={entryFormik}
                label="Cast Income Certificate No."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="motherTongue"
                formik={entryFormik}
                label="Mother Tongue"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="birthPlace"
                formik={entryFormik}
                label="Birth Place"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="aadhar"
                formik={entryFormik}
                label="Aadhar No."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput name="satNo" formik={entryFormik} label="SAT No." />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="grNo"
                formik={entryFormik}
                label="GR No."
              />
            </Grid>
          </Grid>
        </Box>
      </FormBox>
      {/* contact Info */}
      <FormBox>
        <Title id="modal-modal-title" variant="h6" component="h2">
          Contact Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
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
                name="guardianNo"
                formik={entryFormik}
                label="Guardian Number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="alternateNo"
                formik={entryFormik}
                label="Alternate Number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="relationGuardian"
                formik={entryFormik}
                label="Select Relation With Guardian"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="nationalId"
                formik={entryFormik}
                label="Select National Id"
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
          </Grid>
        </Box>
      </FormBox>
      {/* Academic Info */}
      <FormBox>
        <Title id="modal-modal-title" variant="h6" component="h2">
          Academic Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
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
                label="Roll No"
              />
            </Grid>
          </Grid>
        </Box>
      </FormBox>
      {/* Previous school Info */}
      <FormBox>
        <Title id="modal-modal-title" variant="h6" component="h2">
          Previous School Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="prevSchool"
                formik={entryFormik}
                label="Previous School"
                // options={""}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="prevClass"
                formik={entryFormik}
                label="Previous Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="tcNo"
                formik={entryFormik}
                label="TC No."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="transferCertificate"
                formik={entryFormik}
                label="Select Transfer Certificate."
                type="file"
              />
            </Grid>
          </Grid>
        </Box>
      </FormBox>
      {/* Father Information*/}
      <FormBox>
        <Title id="modal-modal-title" variant="h6" component="h2">
          Father Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
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
                name="fatherPhone"
                formik={entryFormik}
                label="Father Phone"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="fatherEdu"
                formik={entryFormik}
                label="Father Education."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="fatherProfession"
                formik={entryFormik}
                label="father Profession"
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
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="fatherPhoto"
                formik={entryFormik}
                label="Select Photo"
                type="file"
              />
            </Grid>
          </Grid>
        </Box>
      </FormBox>
      {/* Mother Information*/}
      <FormBox>
        <Title id="modal-modal-title" variant="h6" component="h2">
          Mother Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
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
                name="motherPhone"
                formik={entryFormik}
                label="Mother Phone"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="motherEdu"
                formik={entryFormik}
                label="Mother Education."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="motherProfession"
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
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="motherPhoto"
                formik={entryFormik}
                label="Select Photo"
                type="file"
              />
            </Grid>
          </Grid>
        </Box>
      </FormBox>
      {/* Other Information*/}
      <FormBox
        sx={{
          marginBottom: "60px",
        }}
      >
        <Title id="modal-modal-title" variant="h6" component="h2">
          Other Information
        </Title>
        <Box sx={{ padding: "10px" }}>
          <Grid container spacing={2}>
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
                name="healthCondition"
                formik={entryFormik}
                label="Health Condition"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Select Status"
                options={[
                  { label: "Inactive", value: false },
                  { label: "active", value: true },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="hostel"
                formik={entryFormik}
                label="Select Hostel"
                options={[
                  { label: "Yes", value: false },
                  { label: "No", value: true },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="transport"
                formik={entryFormik}
                label="Select Transport"
                options={[
                  { label: "Yes", value: false },
                  { label: "No", value: true },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="busStop"
                formik={entryFormik}
                label="Bus Stop"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="extraInfo"
                formik={entryFormik}
                label="Other Info"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="studentPhoto"
                formik={entryFormik}
                label="Select Photo"
                type="file"
              />
            </Grid>
          </Grid>
        </Box>
      </FormBox>
      <Grid container>
        <Grid item xs={12} md={12}>
          <StyledBox>
            <Stack spacing={2} direction="row">
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                type="submit"
                size="small"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Stack>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
}
