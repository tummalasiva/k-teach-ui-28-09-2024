import React, { useContext, useState } from "react";
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
import { useEffect } from "react";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";

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

const RTE_Options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export default function AddStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigate = useNavigate();
  const [data, setDate] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStudentPhoto, setSelectedStuentPhoto] = useState([]);
  const [selectedMotherPhoto, setSelectedMotherPhoto] = useState([]);
  const [selectedFatherPhoto, setSelectedFatherPhoto] = useState([]);
  const [transferCertificate, setTransperCertificate] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);

  const [classData, setClassData] = useState([]);

  const [sectionData, setSectionData] = useState([]);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({ label: `${d.from}-${d.to}`, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setSectionData(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };
  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClassData(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get data on page load
  useEffect(() => {
    getAcademicYear();
    getClass();
    getSection();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        basicInfo: {
          name: values.name,
          admissionDate: values.admissionDate,
          dob: values.dob,
          gender: values.gender,
          bloodGroup: values.bloodGroup,
          religion: values.religion,
          rte: values.rte || false,
          caste: values.caste,
          motherTongue: values.motherTongue,
          birthPlace: values.birthPlace,
          aadharNo: values.aadharNo,
          cicn: values.cicn,
        },
        motherInfo: {
          name: values.motherName,
          contactNumber: values.motherPhone,
          education: values.motherEdu,
          profession: values.motherProfession,
          designation: values.designation,
        },
        fatherInfo: {
          name: values.fatherName,
          contactNumber: values.fatherPhone,
          education: values.fatherEdu,
          profession: values.fatherProfession,
          designation: values.motherDesignation,
        },
        academicInfo: {
          class: values.class,
          section: values.section,
          rollNumber: values.rollNumber,
          admissionNumber: values.admissionNumber,
        },
        otherInfo: {
          email: values.email,
          healthCondition: values.healthCondition,
          hostelMember: values.hostelMember,
          transportMember: values.transportMemberl,
          busStop: values.busStop,
        },
        contactInfo: {
          guardianName: values.guardianName,
          guardianContactNumber: values.guardianContactNumber,
          guardianContactNumberSecondary: values.guardianContactNumberSecondary,
          guardianRelation: values.guardianRelation,
          nationId: values.nationId,
          presentAddress: values.presentAddress,
          permanentAddress: values.permanentAddress,
        },
        prevSchInfo: {
          name: values.name,
          tcNo: values.tcNo,
        },
        academicYear: values.academicYear,
        schoolId: selectedSetting._id,
        contactNumber: values.contactNumber,
      };
      const formData = new FormData();
      formData.append("body", JSON.stringify(payload));
      selectedStudentPhoto.forEach((file) =>
        formData.append("studentPhoto", file)
      );
      selectedFatherPhoto.forEach((file) =>
        formData.append("fatherPhoto", file)
      );
      selectedMotherPhoto.forEach((file) =>
        formData.append("motherPhoto", file)
      );

      transferCertificate.forEach((file) => formData.append("transfer", file));

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.student.update + "/" + dataToEdit._id,
          formData
        );
      } else {
        const { data } = await post(PRIVATE_URLS.student.create, formData);
        navigate("/sch/student/admit-student");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      name: "",
      admissionDate: null,
      dob: null,
      gender: "",
      bloodGroup: "",
      cicn: "",
      religion: "",
      cast: "",
      contactNumber: "",
      fatherName: "",
      rte: "",
      fatherContactNumber: "",
      motherName: "",
      motherContactNumber: "",
      class: "",
      section: "",
      rollNo: "",
      status: "",

      fatherName: "",
      fatherPhone: "",
      fatherEdu: "",
      fatherProfession: "",
      motherDesignation: "",

      fatherName: "",
      fatherPhone: "",
      fatherEdu: "",
      fatherProfession: "",
      motherDesignation: "",
    },
    onSubmit: handleCreateOrUpdate,
  });
  const handleChangePhoto = (e, type) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      if (type === "father") {
        setSelectedFatherPhoto(fileList);
      } else if (type === "mother") {
        setSelectedMotherPhoto(fileList);
      } else if (type === "transfer") {
        setTransperCertificate(fileList);
      } else {
        setSelectedStuentPhoto(fileList);
      }
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setSelectedStuentPhoto(
      selectedStudentPhoto.filter((img) => img.name != fileName)
    );
    setSelectedFatherPhoto(
      selectedFatherPhoto.filter((img) => img.name != fileName)
    );
    setSelectedMotherPhoto(
      selectedMotherPhoto.filter((img) => img.name != fileName)
    );

    setTransperCertificate(
      transferCertificate.filter((img) => img.name != fileName)
    );
  };

  return (
    <>
      <PageHeader title="Admit Student" />
      <form onSubmit={entryFormik.handleSubmit}>
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
                options={academicYear}
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
                  name="admissionNumber"
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
                  name="bloodGroup"
                  formik={entryFormik}
                  label="Select Blood Group"
                  options={Blood_Group}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
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
                  name="cicn"
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
              {/* <Grid xs={12} md={6} lg={3} item>
              <FormInput name="satNo" formik={entryFormik} label="SAT No." />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="grNo"
                formik={entryFormik}
                label="GR No."
              />
            </Grid> */}
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
                  name="guardianName"
                  formik={entryFormik}
                  label="Guardian Name"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="guardianNo"
                  formik={entryFormik}
                  label="Guardian Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="alternateNo"
                  formik={entryFormik}
                  label="Alternate Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="relationGuardian"
                  formik={entryFormik}
                  label="Select Relation With Guardian"
                  // options={""}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="nationalId"
                  formik={entryFormik}
                  label="Select National Id"
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
                  options={classData}
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={entryFormik}
                  label="Select Section"
                  options={sectionData}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput name="rollNo" formik={entryFormik} label="Roll No" />
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
                  name="prevSchool"
                  formik={entryFormik}
                  label="Previous School"
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="prevClass"
                  formik={entryFormik}
                  label="Previous Class"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput name="tcNo" formik={entryFormik} label="TC No." />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FileSelect
                  name="transfer"
                  onChange={(e) => handleChangePhoto(e, "transfer")}
                  customOnChange={true}
                  selectedFiles={transferCertificate}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
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
                  name="fatherName"
                  formik={entryFormik}
                  label="Father Name"
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherPhone"
                  formik={entryFormik}
                  label="Father Phone"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherEdu"
                  formik={entryFormik}
                  label="Father Education."
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherProfession"
                  formik={entryFormik}
                  label="father Profession"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherDesignation"
                  formik={entryFormik}
                  label="Father Designation"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FileSelect
                  name="fatherPhoto"
                  onChange={(e) => handleChangePhoto(e, "father")}
                  customOnChange={true}
                  selectedFiles={selectedFatherPhoto}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
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
                  name="motherName"
                  formik={entryFormik}
                  label="Mother Name"
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="motherPhone"
                  formik={entryFormik}
                  label="Mother Phone"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="motherEdu"
                  formik={entryFormik}
                  label="Mother Education."
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="motherProfession"
                  formik={entryFormik}
                  label="Mother Profession"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="motherDesignation"
                  formik={entryFormik}
                  label="Mother Designation"
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FileSelect
                  name="motherPhoto"
                  onChange={(e) => handleChangePhoto(e, "mother")}
                  customOnChange={true}
                  selectedFiles={selectedMotherPhoto}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
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
                <FormInput name="email" formik={entryFormik} label="Email" />
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
                  name="status"
                  formik={entryFormik}
                  label="Select Status"
                  options={[
                    { label: "Inactive", value: false },
                    { label: "Active", value: true },
                  ]}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="hostel"
                  formik={entryFormik}
                  label="Select Hostel"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
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
                  name="busStop"
                  formik={entryFormik}
                  label="Bus Stop"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="extraInfo"
                  formik={entryFormik}
                  label="Other Info"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FileSelect
                  name="studentPhoto"
                  onChange={(e) => handleChangePhoto(e, "student")}
                  customOnChange={true}
                  selectedFiles={selectedStudentPhoto}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
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
      </form>
    </>
  );
}
