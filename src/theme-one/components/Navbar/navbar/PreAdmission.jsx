/** @format */

import React from "react";
import dayjs from "dayjs";
import PreAdmissionFileSelect from "../../../../forms/preAdmissionForm/PreAdmissionFileSelect";
import FormInput from "../../../../forms/FormInput";
import FormDatePicker from "../../../../forms/FormDatePicker";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import themeData from "../../../../data/themeData";
import { get, post, put } from "../../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../../services/urlConstants";
import SettingContext from "../../../../context/SettingsContext";

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

const Relation_With_Guardian = [
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Sister", value: "Sister" },
  { label: "Brother", value: "Brother" },
  { label: "Uncle", value: "Uncle" },
  { label: "Other Relative", value: "Other Relative" },
];

export default function PreAdmission() {
  const { selectedSetting } = React.useContext(SettingContext);
  const [loading, setLoading] = React.useState(false);
  const [dataToEdit, setDataToEdit] = React.useState(null);
  const [academicYear, setAcademicYear] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );

      entryFormik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get claass
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));

      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        studentDetails: {
          basicDetails: {
            name: values.name,
            dob: values.dob,
            gender: values.gender,
            bloodGroup: values.bloodGroup,
            cast: values.cast,
            casteIncomeCertificateNumber: values.casteIncomeCertificateNumber,
            motherTongue: values.motherTongue,
            birthPlace: values.birthPlace,
            aadharNumber: values.aadharNumber,
          },
          motherDetails: {
            name: values.motherName,
            contactNumber: values.motherPhoneNumber,
            education: values.motherEducation,
            profession: values.MotherProfession,
            designation: values.motherDesignation,
          },
          fatherDetails: {
            name: values.fatherName,
            contactNumber: values.fatherPhoneNumber,
            education: values.fatherEducation,
            profession: values.fatherProfession,
            designation: values.fatherDesignation,
          },
          academicDetails: {
            class: values.class,
            academicYear: values.academicYear,
          },
          otherDetails: {
            email: values.email,
            healthCondition: values.healthCondition,
            hostelRequired: values.hostelRequired || "no",
            transportRequired: values.transportRequired || "no",
          },
          contactDetails: {
            contactNumber: values.contactNumber,
            guardianName: values.guardianName,
            guardianContactNumber: values.guardianContactNumber,
            alternateNumber: values.alternateNumber,
            relationWithGuardian: values.relationWithGuardian,
            nationalId: values.nationalId,
            presentAddress: values.presentAddress,
            permanentAddress: values.permanentAddress,
          },
          previousSchoolDetails: {
            name: values.schoolName,
            tcNumber: values.tcNumber,
            class: values.previousClass,
          },
        },
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.preadmissionEnqiry.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.preadmissionEnqiry.create,
          payload
        );
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getAcademicYear();
    getClasses();
  }, []);

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.basicDetails?.name || "",
      dob: dataToEdit?.basicDetails?.dob || null,
      gender: dataToEdit?.basicDetails?.gender || "",
      bloodGroup: dataToEdit?.basicDetails?.bloodGroup || "",
      cast: dataToEdit?.basicDetails?.cast || "",
      casteIncomeCertificateNumber:
        dataToEdit?.basicDetails?.casteIncomeCertificateNumber || "",
      motherTongue: dataToEdit?.basicDetails?.motherTongue || "",
      birthPlace: dataToEdit?.basicDetails?.birthPlace || "",
      aadharNumber: dataToEdit?.basicDetails?.aadharNumber || "",

      motherName: dataToEdit?.motherDetails?.name || "",
      motherPhoneNumber: dataToEdit?.motherDetails?.contactNumber || "",
      motherEducation: dataToEdit?.motherDetails?.education || "",
      MotherProfession: dataToEdit?.motherDetails?.profession || "",
      motherDesignation: dataToEdit?.motherDetails?.designation || "",

      fatherName: dataToEdit?.fatherDetails?.name || "",
      fatherPhoneNumber: dataToEdit?.fatherDetails?.contactNumber || "",
      fatherEducation: dataToEdit?.fatherDetails?.education || "",
      fatherProfession: dataToEdit?.fatherDetails?.profession || "",
      fatherDesignation: dataToEdit?.fatherDetails?.designation || "",

      class: dataToEdit?.academicDetails?.class || "",
      academicYear: dataToEdit?.academicDetails?.academicYear || "",

      email: dataToEdit?.otherDetails?.email || "",
      healthCondition: dataToEdit?.otherDetails?.healthCondition || "",
      hostelRequired: dataToEdit?.otherDetails?.hostelRequired || "no",
      transportRequired: dataToEdit?.otherDetails?.transportRequired || "no",

      contactNumber: dataToEdit?.contactDetails?.contactNumber || "",
      guardianName: dataToEdit?.contactDetails?.guardianName || "",
      guardianContactNumber:
        dataToEdit?.contactDetails?.guardianContactNumber || "",
      alternateNumber: dataToEdit?.contactDetails?.relationWithGuardian || "",
      relationWithGuardian:
        dataToEdit?.contactDetails?.relationWithGuardian || "",
      nationalId: dataToEdit?.contactDetails?.nationalId || "",
      presentAddress: dataToEdit?.contactDetails?.presentAddress || "",
      permanentAddress: dataToEdit?.contactDetails?.permanentAddress || "",

      schoolName: dataToEdit?.previousSchoolDetails?.name || "",
      previousClass: dataToEdit?.previousSchoolDetails?.class || "",
      tcNumber: dataToEdit?.previousSchoolDetails?.tcNumber || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setDataToEdit(null);
    setOpen(false);
    entryFormik.resetForm();
  };

  return (
    <>
      <Container>
        <Grid container mt={2}>
          <Paper
            sx={{
              width: "100%",
              bgcolor: "whitesmoke",
              padding: 3,
              textAlign: "center",
            }}
            elevation={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                style={{
                  fontSize: 20,
                  color: themeData.darkPalette.primary.main,
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                }}>
                Pre-Admission Form
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Box component="form" onSubmit={entryFormik.handleSubmit}>
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
                <PreAdmissionFileSelect
                  required={true}
                  name="gender"
                  formik={entryFormik}
                  label="Select Gender"
                  options={Gender_Options}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <PreAdmissionFileSelect
                  name="bloodGroup"
                  formik={entryFormik}
                  label="Select Blood Group"
                  options={BloodGroup_Options}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput name="cast" formik={entryFormik} label="Cast" />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="casteIncomeCertificateNumber"
                  formik={entryFormik}
                  label="Cast Income Certificate Number"
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
                  name="guardianContactNumber"
                  formik={entryFormik}
                  label="Guardian Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="alternateNumber"
                  formik={entryFormik}
                  label="Alternate Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <PreAdmissionFileSelect
                  name="relationWithGuardian"
                  formik={entryFormik}
                  label="Relation With Guardian"
                  options={Relation_With_Guardian}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="nationalId"
                  formik={entryFormik}
                  label="National Id"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="presentAddress"
                  formik={entryFormik}
                  label="presentAddress"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
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
                  name="schoolName"
                  formik={entryFormik}
                  label="Previous School"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="previousClass"
                  formik={entryFormik}
                  label="Previous Class"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="tcNumber"
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
                  name="fatherName"
                  formik={entryFormik}
                  label="Father Name"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherPhoneNumber"
                  formik={entryFormik}
                  label="Father Phone Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherEducation"
                  formik={entryFormik}
                  label="Father Education"
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
                  name="motherName"
                  formik={entryFormik}
                  label="Mother Name"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="motherPhoneNumber"
                  formik={entryFormik}
                  label="Mother Phone Number"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="motherEducation"
                  formik={entryFormik}
                  label="Mother Education"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="MotherProfession"
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
                <PreAdmissionFileSelect
                  required={true}
                  name="academicYear"
                  formik={entryFormik}
                  label="Select Academic Year"
                  options={academicYear}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <PreAdmissionFileSelect
                  required={true}
                  name="class"
                  formik={entryFormik}
                  label="Select Class"
                  options={classes}
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
                <PreAdmissionFileSelect
                  name="hostelRequired"
                  formik={entryFormik}
                  label="Hostel Required"
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <PreAdmissionFileSelect
                  name="transportRequired"
                  formik={entryFormik}
                  label="Transport Required"
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                />
              </Grid>
            </Grid>
          </Paper>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
            mb={1}>
            <Button size="small" color="error" variant="contained">
              Cancel
            </Button>
            <Button size="small" variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
