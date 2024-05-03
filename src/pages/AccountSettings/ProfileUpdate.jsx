import React, { useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import avatar from "../../assets/images/avatar.jpg";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const MuiBox = styled(Box)({
  background: "#ececec",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundPosition: "center",
});

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

const BasicData = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "15px",
  padding: "15px 0px",
});

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

const Gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const [previewCreateUrl, setPreviewCreateUrl] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      aadharNo: dataToEdit.aadharNo || "",
      designation: dataToEdit.designation || "",
      contactNumber: dataToEdit?.contactNumber || "",
      gender: dataToEdit?.gender || "",
      bloodGroup: dataToEdit?.bloodGroup || "",
      religion: dataToEdit?.religion || "",
      dob: dataToEdit && dataToEdit.dob ? dayjs(dataToEdit.dob) : null,
      presentAddress: dataToEdit?.presentAddress || "",
      permanentAddress: dataToEdit?.permanentAddress || "",
      email: dataToEdit?.email || "",
      username: dataToEdit?.username || "",
      joiningDate:
        dataToEdit && dataToEdit.joiningDate
          ? dayjs(dataToEdit.joiningDate)
          : null,
      resume: dataToEdit?.resume || "",
      facebookUrl: dataToEdit?.facebookUrl || "",
      twitterUrl: dataToEdit?.twitterUrl || "",
      linkedinUrl: dataToEdit?.linkedinUrl || "",
      gplusUrl: dataToEdit?.gplusUrl || "",
      youtubeUrl: dataToEdit?.youtubeUrl || "",
      instagramUrl: dataToEdit?.instagramUrl || "",
      pinterestUrl: dataToEdit?.pinterestUrl || "",
    },
    onSubmit: console.log("soon..."),
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={entryFormik.handleSubmit}>
        <BasicData>
          <MuiBox>
            <img
              src={previewCreateUrl || avatar}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
              alt="Preview"
            />
          </MuiBox>
          <Grid container spacing={2} display="flex" justifyContent="center">
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                // required={true}
                name="logo"
                formik={entryFormik}
                label="Logo"
                type="file"
                // onChange={handleImageChange}
              />
            </Grid>
          </Grid>
        </BasicData>

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
                  name="aadharNo"
                  formik={entryFormik}
                  label="National Id"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="designation"
                  formik={entryFormik}
                  label="Designation"
                  //   options={}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  required={true}
                  name="contactNumber"
                  formik={entryFormik}
                  label="Phone No."
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="gender"
                  formik={entryFormik}
                  label="Gender"
                  options={Gender}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="bloodGroup"
                  formik={entryFormik}
                  label="Blood Group"
                  //   options={}
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
                <FormDatePicker
                  formik={entryFormik}
                  label="Date of Birth"
                  name="dob"
                  required={true}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="presentAddress"
                  formik={entryFormik}
                  label="Present Address"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="permanentAddress"
                  formik={entryFormik}
                  label="Permanent Address"
                />
              </Grid>
            </Grid>
          </Box>
        </FormBox>
        {/* Settings */}

        <FormBox>
          <Title id="modal-modal-title" variant="h6" component="h2">
            Academic Information
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
                  name="username"
                  formik={entryFormik}
                  label="User Name"
                  required={true}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormDatePicker
                  formik={entryFormik}
                  label="Date of Joining"
                  name="joiningDate"
                  required={true}
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="resume"
                  formik={entryFormik}
                  label="Upload Resume"
                  type="file"
                />
              </Grid>
            </Grid>
          </Box>
        </FormBox>

        {/* Social Info */}
        <FormBox>
          <Title id="modal-modal-title" variant="h6" component="h2">
            Other Information
          </Title>
          <Box sx={{ padding: "10px" }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="facebookUrl"
                  formik={entryFormik}
                  label="Facebook URL"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="twitterUrl"
                  formik={entryFormik}
                  label="TwitterURL"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="linkedinUrl"
                  formik={entryFormik}
                  label="Linkedin Url"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="gplusUrl"
                  formik={entryFormik}
                  label="Google Plus Url"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="youtubeUrl"
                  formik={entryFormik}
                  label="Youtube URL"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="instagramUrl"
                  formik={entryFormik}
                  label="Instagram URL"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="pinterestUrl"
                  formik={entryFormik}
                  label="Pinterest URL"
                />
              </Grid>
            </Grid>
          </Box>
        </FormBox>

        {/* <StyledBox> */}
        <Stack spacing={2} direction="row" justifyContent="flex-end">
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
            Update
          </LoadingButton>
        </Stack>
        {/* </StyledBox> */}
      </form>
    </>
  );
}
