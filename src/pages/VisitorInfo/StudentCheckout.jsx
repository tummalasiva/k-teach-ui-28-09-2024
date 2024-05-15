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
  const [academicYearList, setAcademicYearList] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

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

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  useEffect(() => {
    if (formik.values.academicYear) {
      // getData();
    }
  }, [formik.values.academicYear]);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.studentCheckout.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.studentCheckout.create,
          payload
        );
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      student: formik.values.student || "",
      relationship: dataToEdit?.relationship || "",
      visitorName: dataToEdit?.visitorName || "",
      visitorPhone: dataToEdit?.visitorPhone || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
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
              <Button size="small" variant="contained">
                Print
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
              name="visitorName"
              formik={entryFormik}
              label="Enter Visitor Name"
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormInput
              name="visitorPhone"
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
        actions={["edit"]}
        tableKeys={studentCheckOutTableKeys}
        bodyDataModal="student checkout"
        bodyData={data}
      />
    </>
  );
}
