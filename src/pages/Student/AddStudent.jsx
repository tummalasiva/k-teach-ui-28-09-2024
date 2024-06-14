/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";
import dayjs from "dayjs";

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

const Relation_With_Guardian = [
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Sister", value: "Sister" },
  { label: "Brother", value: "Brother" },
  { label: "Uncle", value: "Uncle" },
  { label: "Other Relative", value: "Other Relative" },
];

const RTE_Options = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export default function AddStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigate = useNavigate();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStudentPhoto, setSelectedStuentPhoto] = useState([]);
  const [selectedMotherPhoto, setSelectedMotherPhoto] = useState([]);
  const [selectedFatherPhoto, setSelectedFatherPhoto] = useState([]);
  const [transferCertificate, setTransperCertificate] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const { id } = useParams();
  const getStudentDetails = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.details + "/" + id);
      console.log(data.result, "==========");
      setDataToEdit(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getStudentDetails();
    }
  }, [id, selectedSetting]);

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

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        basicInfo: {
          name: values.name,
          admissionDate: dayjs(values.admissionDate).format("YYYY/MM/DD"),
          dob: dayjs(values.dob).format("YYYY/MM/DD"),
          gender: values.gender,
          bloodGroup: values.bloodGroup,
          religion: values.religion,
          rte: values.rte || "no",
          caste: values.caste,
          motherTongue: values.motherTongue,
          birthPlace: values.birthPlace,
          aadharNo: values.aadharNo,
          cicn: values.cicn,
          satNo: values.satNo,
          grNo: values.grNo,
        },
        motherInfo: {
          name: values.motherName,
          contactNumber: values.motherPhone,
          education: values.motherEdu,
          profession: values.motherProfession,
          designation: values.motherDesignation,
        },
        fatherInfo: {
          name: values.fatherName,
          contactNumber: values.fatherPhone,
          education: values.fatherEdu,
          profession: values.fatherProfession,
          designation: values.fatherDesignation,
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
          hostelMember: values.hostelMember || false,
          transportMember: values.transportMember || false,
          libraryMember: values.libraryMember || false,
          busStop: values.busStop,
          extraInfo: values.extraInfo,
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
          name: values.prevSchName,
          tcNo: values.tcNo,
          prevClass: values.prevClass,
        },
        academicYear: values.academicYear,
        schoolId: selectedSetting._id,
        contactNumber: values.contactNumber,
        active: values.active || true,
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
      transferCertificate.forEach((file) =>
        formData.append("transferCertificate", file)
      );

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.student.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log(formData, "kkkkkk");
        navigate("/sch/student/admit-student");
      } else {
        const { data } = await post(PRIVATE_URLS.student.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/sch/student/admit-student");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const entryFormik = useFormik({
    initialValues: {
      academicYear: dataToEdit?.academicYear._id || "",
      name: dataToEdit?.basicInfo.name || "",

      admissionDate: dataToEdit?.basicInfo?.admissionDate
        ? dayjs(dataToEdit.basicInfo.admissionDate).format("YYYY/MM/DD")
        : null,

      motherTongue: dataToEdit?.basicInfo.motherTongue || "",

      dob: dataToEdit?.basicInfo?.dob
        ? dayjs(dataToEdit.basicInfo.dob).format("YYYY/MM/DD")
        : null,
      gender: dataToEdit?.basicInfo.gender || "",
      bloodGroup: dataToEdit?.basicInfo.bloodGroup || "",
      cicn: dataToEdit?.basicInfo.cicn || "",
      religion: dataToEdit?.basicInfo.religion || "",
      caste: dataToEdit?.basicInfo.caste || "",
      rte: dataToEdit?.basicInfo.rte || "",
      aadharNo: dataToEdit?.basicInfo.aadharNo || "",
      satNo: dataToEdit?.basicInfo.satNo || "",
      grNo: dataToEdit?.basicInfo.grNo || "",
      birthPlace: dataToEdit?.basicInfo.birthPlace || "",

      class: dataToEdit?.academicInfo?.class?._id || "",
      section: dataToEdit?.academicInfo?.section?._id || "",
      rollNumber: dataToEdit?.academicInfo?.rollNumber || "",
      admissionNumber: dataToEdit?.academicInfo?.admissionNumber || "",

      contactNumber: dataToEdit?.contactNumber || "",

      guardianName: dataToEdit?.contactInfo?.guardianName || "",
      guardianContactNumber:
        dataToEdit?.contactInfo?.guardianContactNumber || "",
      guardianContactNumberSecondary:
        dataToEdit?.contactInfo?.guardianContactNumberSecondary || "",
      guardianRelation: dataToEdit?.contactInfo?.guardianRelation || "",
      nationId: dataToEdit?.contactInfo?.nationId || "",
      presentAddress: dataToEdit?.contactInfo?.presentAddress || "",
      permanentAddress: dataToEdit?.contactInfo?.permanentAddress || "",

      prevSchName: dataToEdit?.prevSchInfo?.name || "",
      tcNo: dataToEdit?.prevSchInfo?.tcNo || "",
      prevClass: dataToEdit?.prevSchInfo?.prevClass || "",

      email: dataToEdit?.otherInfo?.email || "",
      healthCondition: dataToEdit?.otherInfo?.healthCondition || "",
      transportMember: dataToEdit?.otherInfo?.transportMember || "",
      hostelMember: dataToEdit?.otherInfo?.hostelMember || "",
      libraryMember: dataToEdit?.otherInfo?.libraryMember || "",
      busStop: dataToEdit?.otherInfo?.busStop || "",
      extraInfo: dataToEdit?.otherInfo?.extraInfo || "",
      active: dataToEdit?.active || true,

      fatherName: dataToEdit?.fatherInfo.name || "",
      fatherPhone: dataToEdit?.fatherInfo.contactNumber || "",
      fatherEdu: dataToEdit?.fatherInfo.education || "",
      fatherProfession: dataToEdit?.fatherInfo.profession || "",
      fatherDesignation: dataToEdit?.fatherInfo.designation || "",

      motherName: dataToEdit?.motherInfo.name || "",
      motherPhone: dataToEdit?.motherInfo.contactNumber || "",
      motherEdu: dataToEdit?.motherInfo.education || "",
      motherProfession: dataToEdit?.motherInfo.profession || "",
      motherDesignation: dataToEdit?.motherInfo.designation || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: entryFormik.values.class },
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
  }, []);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  const handleChangePhoto = (e, type) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      if (type === "fatherPhoto") {
        setSelectedFatherPhoto(fileList);
      } else if (type === "motherPhoto") {
        setSelectedMotherPhoto(fileList);
      } else if (type === "transferCertificate") {
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

  const handleDownloadFatherPhoto = () => {
    const downloadUrl = dataToEdit?.fatherInfo?.photo;

    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  const handleDownloadMotherPhoto = () => {
    const downloadUrl = dataToEdit?.motherInfo?.photo;

    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  const handleDownloadStudentPhoto = () => {
    const downloadUrl = dataToEdit?.photo;

    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  const handleDownloadTransferCertificate = () => {
    const downloadUrl = dataToEdit?.prevSchInfo.transferCertificate;

    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
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
                sx={{ display: "inline" }}>
                Note:{" "}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                fontWeight="bold"
                sx={{ display: "inline" }}>
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
                  name="rte"
                  formik={entryFormik}
                  label="Select RTE"
                  options={RTE_Options}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput name="caste" formik={entryFormik} label="Cast" />
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
                  name="aadharNo"
                  formik={entryFormik}
                  label="Aadhar No."
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput name="satNo" formik={entryFormik} label="SAT No." />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput name="grNo" formik={entryFormik} label="GR No." />
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
                  name="guardianName"
                  formik={entryFormik}
                  label="Guardian Name"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="guardianContactNumber"
                  formik={entryFormik}
                  label="Guardian Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="guardianContactNumberSecondary"
                  formik={entryFormik}
                  label="Alternate Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="guardianRelation"
                  formik={entryFormik}
                  label="Select Relation With Guardian"
                  options={Relation_With_Guardian}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="nationId"
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
                <FormInput
                  name="rollNumber"
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
                  name="prevSchName"
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
                  multi={false}
                  name="transferCertificate"
                  label="Select File"
                  onChange={(e) => handleChangePhoto(e, "transferCertificate")}
                  customOnChange={true}
                  selectedFiles={transferCertificate}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
                  accept="image/*,.pdf"
                />
              </Grid>

              {dataToEdit?.prevSchInfo &&
              dataToEdit.prevSchInfo?.transferCertificate ? (
                <Grid xs={12} md={6} lg={6} item sx={{ alignSelf: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleDownloadTransferCertificate}>
                    Download File
                  </Button>
                </Grid>
              ) : null}
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
                  label="Father Profession"
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
                  multi={false}
                  label="Select Photo"
                  onChange={(e) => handleChangePhoto(e, "fatherPhoto")}
                  customOnChange={true}
                  selectedFiles={selectedFatherPhoto}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
                  accept="image/jpeg, image/png"
                />
              </Grid>
              {dataToEdit?.fatherInfo && dataToEdit.fatherInfo?.photo ? (
                <Grid xs={12} md={6} lg={6} item sx={{ alignSelf: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleDownloadFatherPhoto}>
                    Download Photo
                  </Button>
                </Grid>
              ) : null}
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
                  label="Select Photo"
                  multi={false}
                  name="motherPhoto"
                  onChange={(e) => handleChangePhoto(e, "motherPhoto")}
                  customOnChange={true}
                  selectedFiles={selectedMotherPhoto}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
                  accept="image/jpeg, image/png"
                />
              </Grid>

              {dataToEdit?.motherInfo && dataToEdit.motherInfo?.photo ? (
                <Grid xs={12} md={6} lg={6} item sx={{ alignSelf: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleDownloadMotherPhoto}>
                    Download Photo
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </Box>
        </FormBox>
        {/* Other Information*/}
        <FormBox
          sx={{
            marginBottom: "60px",
          }}>
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
                  name="active"
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
                  name="hostelMember"
                  formik={entryFormik}
                  label="Select Hostel Member"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="transportMember"
                  formik={entryFormik}
                  label="Select Transport Member"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="libraryMember"
                  formik={entryFormik}
                  label="Select Library Member"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
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
                  multi={false}
                  label="Select Photo"
                  onChange={(e) => handleChangePhoto(e, "studentPhoto")}
                  customOnChange={true}
                  selectedFiles={selectedStudentPhoto}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
                  accept="image/jpeg, image/png"
                />
              </Grid>

              {dataToEdit && dataToEdit?.photo ? (
                <Grid xs={12} md={6} lg={6} item sx={{ alignSelf: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleDownloadStudentPhoto}>
                    Download Photo
                  </Button>
                </Grid>
              ) : null}
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
                  onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  size="small"
                  variant="contained">
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
