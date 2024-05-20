/** @format */

import React, { useContext, useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { studentCheckOutTableKeys } from "../../data/tableKeys/studentCheckoutData";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import FormInput from "../../forms/FormInput";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { LoadingButton } from "@mui/lab";

const Relation_With_Student = [
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Sister", value: "Sister" },
  { label: "Brother", value: "Brother" },
  { label: "Uncle", value: "Uncle" },
  { label: "Other Relative", value: "Other Relative" },
];

export default function StudentCheckout() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExce] = useState(false);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.studentCheckout.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const AddStudentCheckoutHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      formik.setFieldValue("academicYear", data.result[0]._id);
      setAcademicYearList(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: formik.values.class,
          },
        },
      });
      formik.setFieldValue("section", data.result[0]?._id);
      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: formik.values.academicYear,
            "academicInfo.class": formik.values.class,
            "academicInfo.section": formik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );

      formik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      student: "",
    },
    // onSubmit: getData,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (formik.values.class) {
      getSections();
    }
  }, [formik.values.class]);

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (
      formik.values.academicYear &&
      formik.values.class &&
      formik.values.section &&
      selectedSetting
    ) {
      getStudents();
    }
  }, [
    formik.values.academicYear,
    formik.values.class,
    formik.values.section,
    selectedSetting,
  ]);

  useEffect(() => {
    if (formik.values.class) {
      getSections();
    }
  }, [formik.values.class]);

  useEffect(() => {
    if (formik.values.academicYear) {
      getData();
    }
  }, [formik.values.academicYear]);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        student: formik.values.student,
      };

      setLoading(true);

      const { data } = await put(PRIVATE_URLS.studentCheckout.update, payload);
      getData();
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      student:
        students.find((student) => student._id === formik.values.student)
          ?.basicInfo.name || "",
      relationship: "",
      reason: "",
      visitorName: "",
      visitorContactNumber: "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleGetPrintPdf = async () => {
    try {
      setLoadingPdf(true);
      const { data } = await get(PRIVATE_URLS.studentCheckout.downloadPdf, {
        params: { schoolId: selectedSetting._id },
        responseType: "blob",
      });
      const uri = URL.createObjectURL(data.data);
      window.open(uri, "__blank");
      setLoadingPdf(false);
    } catch (error) {
      console.log(error);
      setLoadingPdf(false);
    }
  };

  const handleGetDownloadExcel = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.studentCheckout.donwloadExcel, {
        params: { schoolId: selectedSetting._id },
        responseType: "blob",
      });
      const uri = URL.createObjectURL(data.data);
      const link = document.createElement("a");
      console.log(uri);
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Student Checkout" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={formik}
                label="Select Academic Year"
                options={academicYearList}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={formik}
                label="Select Class"
                options={classes}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={formik}
                label="Select Section"
                options={sections}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="student"
                formik={formik}
                label="Select Student"
                options={students}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              item
              display="flex"
              justifyContent="flex-end"
              gap={1}>
              <Button size="small" variant="contained" type="submit">
                Find
              </Button>
              <LoadingButton
                size="small"
                loading={loadingPdf}
                onClick={handleGetPrintPdf}
                variant="contained">
                Print
              </LoadingButton>

              <Button
                size="small"
                onClick={handleGetDownloadExcel}
                variant="contained">
                Excel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <AddForm
        title="Student Checkout"
        onAddClick={AddStudentCheckoutHandel}
        disabled={!formik.values.student}
      />
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit ? "Update Student Checkout" : "Add Student Checkout"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              name="student"
              label="Student Name"
            />
          </Grid>

          <Grid xs={12} md={6} item>
            <FormSelect
              name="relationship"
              formik={entryFormik}
              label="Select Relation With Student"
              options={Relation_With_Student}
            />
          </Grid>

          <Grid xs={12} md={6} item>
            <FormInput
              name="reason"
              formik={entryFormik}
              label="Enter Reason"
            />
          </Grid>

          <Grid xs={12} md={6} item>
            <FormInput
              name="visitorName"
              formik={entryFormik}
              label="Enter Visitor Name"
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormInput
              name="visitorContactNumber"
              formik={entryFormik}
              label="Enter Visitor Phone"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 2,
            }}>
            <Button size="small" variant="contained" sx={{ color: "#fff" }}>
              Send OTP
            </Button>
          </Grid>

          <Grid xs={12} md={6} item>
            <FormInput name="otp" formik={entryFormik} label="Enter Otp" />
          </Grid>
        </Grid>
      </FormModal>
      <CustomTable
        actions={["view"]}
        tableKeys={studentCheckOutTableKeys}
        bodyDataModal="student checkout"
        bodyData={data}
      />
    </>
  );
}
