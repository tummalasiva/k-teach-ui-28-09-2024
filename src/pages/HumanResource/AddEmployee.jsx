import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Stack, styled, Box } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { LoadingButton } from "@mui/lab";
import PageHeader from "../../components/PageHeader";
import avatar from "../../assets/images/avatar.jpg";
import SettingContext from "../../context/SettingsContext";

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
const MuiBox = styled(Box)({
  background: "#ececec",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundPosition: "center",
});

const BasicData = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "15px",
  padding: "15px 0px",
});

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

const Active = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const View_Web = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const Salary_Type = [
  { label: "Monthly", value: "monthly" },
  { label: "Hourly", value: "hourly" },
];

export default function AddEmployee() {
  const { selectedSetting } = useContext(SettingContext);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [loading, setLoading] = useState(false);
  const [designationData, setDesgnationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [previewCreateUrl, setPreviewCreateUrl] = useState(null);
  const navigate = useNavigate();

  const getDesignationData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.designation.list);
      setDesgnationData(
        data.result.map((s) => ({
          label: s.name,
          value: s._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartmentData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.department.list);
      setDepartmentData(
        data.result.map((s) => ({
          label: s.name,
          value: s._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);
      setRolesData(
        data.result.map((r) => ({
          label: r.name,
          value: r._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDesignationData();
    getDepartmentData();
    getRoles();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        basicInfo: {
          name: values.name,
          empId: values.empId,
          designation: values.designation,
          secMobileNo: values.secMobileNo,
          gender: values.gender,
          religion: values.religion,
          presentAddress: values.presentAddress,
          permanentAddress: values.permanentAddress,
          dob: dayjs(values.dob),
          fatherName: values.fatherName,
          spouseName: values.spouseName,
          aadharNo: values.aadharNo,
          fatherOccupation: values.fatherOccupation,
          spouseOccupation: values.spouseOccupation,
        },
        academicInfo: {
          workExperience: values.workExperience,
          salaryGrade: values.salaryGrade,
          email: values.email,
          salaryType: values.salaryType,
          department: values.department,
          joiningDate: dayjs(values.joiningDate),
          resume: values.resume,
        },
        otherInfo: {
          public: values.public,
          showDetailsForWeb: values.showDetailsForWeb || false,
        },
        contactNumber: values.contactNumber,
        role: values.role,
        username: values.username,
        password: values.password,
        active: values.active,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.employee.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.employee.create, payload);

        navigate("/sch/human-resource/employee");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: "",
      empId: "",
      responsibility: "",
      designation: "",
      contactNumber: "",
      secMobileNo: "",
      gender: "",
      bloodGroup: "",
      religion: "",
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
      salaryGrade: "",
      email: "",
      salaryType: "",
      role: "",
      department: "",
      joiningDate: dayjs(new Date()),
      resume: "",
      username: "",
      password: "",
      public: "",
      showDetailsForWeb: "",
      photo: "",
      resume: "",
      active: "",
    },
    onSubmit: handleCreateOrUpdate,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewCreateUrl(imageUrl);
    }
  };

  return (
    <>
      <PageHeader title="Add Employee" showTextField={false} />

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
              name="photo"
              formik={entryFormik}
              label="Photo"
              type="file"
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
      </BasicData>
      <form onSubmit={entryFormik.handleSubmit}>
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
                  name="empId"
                  formik={entryFormik}
                  label="Employee Id"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="responsibility"
                  formik={entryFormik}
                  label="Responsibility"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="designation"
                  formik={entryFormik}
                  label="Designation"
                  options={designationData}
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
                  name="secMobileNo"
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
                  options={Gender_Options}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="bloodGroup"
                  formik={entryFormik}
                  label="Select Blood Group"
                  options={BloodGroup_Options}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="religion"
                  formik={entryFormik}
                  label="Religon"
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
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="fatherName"
                  formik={entryFormik}
                  label="Father Name"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="spouseName"
                  formik={entryFormik}
                  label="Spouse Name"
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
                <FormInput
                  name="fatherOccupation"
                  formik={entryFormik}
                  label="Father Occupation"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="spouseOccupation"
                  formik={entryFormik}
                  label="Spouse Occupation"
                />
              </Grid>
            </Grid>
          </Box>
        </FormBox>
        <FormBox>
          <Title id="modal-modal-title" variant="h6" component="h2">
            Academic Information
          </Title>
          <Box sx={{ padding: "10px" }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="qualification"
                  formik={entryFormik}
                  label="Qualification              "
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="workExperience"
                  formik={entryFormik}
                  label="Work Experience"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="salaryGrade"
                  formik={entryFormik}
                  label="Select Salary Grade"
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
                  options={Salary_Type}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="role"
                  formik={entryFormik}
                  label="Select Role"
                  options={rolesData}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="department"
                  formik={entryFormik}
                  label="Select Department"
                  options={departmentData}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormDatePicker
                  required={true}
                  name="joiningDate"
                  formik={entryFormik}
                  label="Joining Date"
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  name="resume"
                  formik={entryFormik}
                  label="Resume"
                  type="file"
                />
              </Grid>
            </Grid>
          </Box>
        </FormBox>
        <FormBox>
          <Title id="modal-modal-title" variant="h6" component="h2">
            Log In Information
          </Title>
          <Box sx={{ padding: "10px" }}>
            <Grid container spacing={2}>
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
                  label="Password"
                />
              </Grid>
            </Grid>
          </Box>
        </FormBox>
        <FormBox>
          <Title id="modal-modal-title" variant="h6" component="h2">
            Other Information
          </Title>
          <Box sx={{ padding: "10px" }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="public"
                  formik={entryFormik}
                  label="Is public"
                  options={Is_Public}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="showDetailsForWeb"
                  formik={entryFormik}
                  label="Show Details For Web"
                  options={View_Web}
                />
              </Grid>
              {/* <Grid xs={12} md={6} lg={3} item>
                <FormInput
                  required={true}
                  name="photo"
                  formik={entryFormik}
                  label="Photo"
                  type="file"
                />
              </Grid> */}
            </Grid>
          </Box>
        </FormBox>
        <FormBox sx={{ marginBottom: "60px" }}>
          <Title id="modal-modal-title" variant="h6" component="h2">
            Profile Information
          </Title>
          <Box sx={{ padding: "10px" }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  name="active"
                  formik={entryFormik}
                  label="Status"
                  options={Active}
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
