/** @format */

import React, { useContext, useEffect, useState } from "react";
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
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";
import SettingContext from "../../context/SettingsContext";

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
  marginBottom: "50px",
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

export default function ProfileUpdate({
  getEmployees = () => {},
  employee = "",
  setSelectValue = 0,
}) {
  const navigate = useNavigate();
  const { selectedSetting } = useContext(SettingContext);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [previewCreateUrl, setPreviewCreateUrl] = useState(null);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileImages, setProfileImages] = useState([]);
  const [resume, setResume] = useState([]);

  console.log(employee, "usha");

  const getDesignation = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.designation.list);
      setDesignations(
        data.result.map((m) => ({ label: m.name, value: m._id }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        schoolId: selectedSetting._id,
        basicInfo: {
          name: values.name,
          aadharNo: values.aadharNo,
          designation: values.designation,
          gender: values.gender,
          bloodGroup: values.bloodGroup,
          religion: values.religion,
          dob: values.dob,
          presentAddress: values.presentAddress,
          permanentAddress: values.permanentAddress,
        },
        academicInfo: {
          email: values.email,
          username: values.username,
          joiningDate: values.joiningDate,
          resume: values.resume,
        },
        otherInfo: {
          facebookUrl: values?.facebookUrl,
          twitterUrl: values?.twitterUrl,
          linkedinUrl: values?.linkedinUrl,
          googlePlusUrl: values?.googlePlusUrl,
          youtubeUrl: values?.youtubeUrl,
          instagramUrl: values?.instagramUrl,
          pinterestUrl: values?.pinterestUrl,
        },
        username: values.username,
        photo: values.photo,
        contactNumber: values.contactNumber,
      };
      setLoading(true);

      const formData = new FormData();
      formData.append("body", JSON.stringify(payload));
      profileImages.forEach((file) => formData.append("employeePhoto", file));
      resume.forEach((file) => formData.append("resume", file));

      const { data } = await put(
        PRIVATE_URLS.employee.update + "/" + employee._id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(data, "put");

      window.localStorage.setItem(
        "current_ecs_user",
        JSON.stringify(data.result)
      );
      getEmployees();
      setSelectValue(0);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChangePhoto = (e, type) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      if (type === "photo") {
        console.log(fileList, "photo");
        setProfileImages(fileList);
      } else if (type === "resume") {
        setResume(fileList);
      }
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setResume(resume.filter((img) => img.name != fileName));
    setProfileImages(profileImages.filter((img) => img.name != fileName));
  };

  useEffect(() => {
    getDesignation();
  }, []);

  const entryFormik = useFormik({
    initialValues: {
      name: employee?.basicInfo?.name || "",
      aadharNo: employee?.basicInfo?.aadharNo || "",
      designation: employee?.basicInfo?.designation?._id || "",
      gender: employee?.basicInfo?.gender || "",
      bloodGroup: employee?.basicInfo?.bloodGroup || "",
      religion: employee?.basicInfo?.religion || "",
      dob: employee?.basicInfo?.dob ? dayjs(employee?.dob) : null,
      presentAddress: employee?.basicInfo?.presentAddress || "",
      permanentAddress: employee?.basicInfo?.permanentAddress || "",
      email: employee?.academicInfo?.email || "",
      joiningDate: employee?.academicInfo?.joiningDate
        ? dayjs(employee?.academicInfo?.joiningDate)
        : null,
      resume: employee?.academicInfo?.resume || "",
      facebookUrl: employee?.otherInfo?.facebookUrl || "",
      twitterUrl: employee?.otherInfo?.twitterUrl || "",
      linkedinUrl: employee?.otherInfo?.linkedinUrl || "",
      youtubeUrl: employee?.otherInfo?.youtubeUrl || "",
      instagramUrl: employee?.otherInfo?.instagramUrl || "",
      pinterestUrl: employee?.otherInfo?.pinterestUrl || "",
      username: employee?.username || "",
      contactNumber: employee?.contactNumber || "",
      photo: employee?.photo || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: false,
  });

  return (
    <>
      <form onSubmit={entryFormik.handleSubmit}>
        <BasicData>
          <MuiBox>
            <img
              // src={profileImages || avatar}
              src={
                profileImages.length > 0
                  ? URL.createObjectURL(profileImages[0])
                  : employee?.photo
                  ? employee?.photo
                  : avatar
              }
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                objectFit: "cover",
                margin: "0 auto",
              }}
              alt="Preview"
            />
          </MuiBox>
          <Grid container spacing={2} display="flex" justifyContent="center">
            <Grid xs={12} md={6} lg={3} item>
              <FileSelect
                multi={false}
                name="photo"
                label="Select Profile"
                onChange={(e) => handleChangePhoto(e, "photo")}
                previousFile={employee?.photo}
                customOnChange={true}
                selectedFiles={profileImages}
                onRemove={(fileName) => handleRemoveFile(fileName)}
                accept="image/jpeg, image/png"
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
                  options={designations}
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
                <FileSelect
                  multi={false}
                  name="resume"
                  label="Select Resume"
                  onChange={(e) => handleChangePhoto(e, "resume")}
                  previousFile={employee?.academicInfo?.resume}
                  customOnChange={true}
                  selectedFiles={resume}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
                  accept="image/*,.pdf"
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
                  label="X URL"
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

        <StyledBox>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => setSelectValue(0)}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              size="small"
              variant="contained">
              Update
            </LoadingButton>
          </Stack>
        </StyledBox>
      </form>
    </>
  );
}
