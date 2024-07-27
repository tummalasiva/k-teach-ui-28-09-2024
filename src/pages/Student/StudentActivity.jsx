/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { studentActivityTableKeys } from "../../data/tableKeys/studentActivity";
import FormSelect from "../../forms/FormSelect";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

export default function StudentActivity() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setDate] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    academicYear: "",
    student: "",
  });
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  //get activity list
  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.studentActivity.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            student: values.student,
            academicYear: values.academicYear,
          },
        },
      });
      setDate(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      Formik.setFieldValue("academicYear", data.result[0]._id);
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
      Formik.setFieldValue("class", data.result[0]._id);
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
            class: Formik.values.class,
          },
        },
      });
      Formik.setFieldValue("section", data.result[0]?._id);
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
            academicYear: Formik.values.academicYear,
            "academicInfo.class": Formik.values.class,
            "academicInfo.section": Formik.values.section,
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
      Formik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    Formik.handleSubmit();
    setOpen(false);
    setDataToEdit(null);
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        student: values.student,
        description: values.description,
        name: values.name,
        academicYear: values.academicYear,
        schoolId: selectedSetting._id,
      };

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.studentActivity.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.studentActivity.create,
          payload
        );
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const Formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      student: "",
    },
    onSubmit: getData,
    enableReinitialize: true,
  });

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      description: dataToEdit?.description || "",
      student: Formik.values.student || "",
      academicYear: Formik.values.academicYear || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (Formik.values.class) {
      getSections();
    }
  }, [Formik.values.class]);

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (
      Formik.values.academicYear &&
      Formik.values.class &&
      Formik.values.section &&
      selectedSetting
    ) {
      getStudents();
    }
  }, [
    Formik.values.academicYear,
    Formik.values.class,
    Formik.values.section,
    selectedSetting,
  ]);

  useEffect(() => {
    if (Formik.values.class) {
      getSections();
    }
  }, [Formik.values.class]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  useEffect(() => {
    if (Formik.values.academicYear) {
      getData();
    }
  }, [Formik.values.academicYear]);

  const handleDelete = async (id) => {
    try {
      const { data } = await del(
        PRIVATE_URLS.studentActivity.delete + "/" + id
      );
      Formik.handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Student Activity" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="div"
          onSubmit={Formik.handleSubmit}>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={Formik}
              label="Select Academic Year"
              options={academicYearList}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={Formik}
              label="Select Class"
              options={classes}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={Formik}
              label="Select Section"
              options={sections}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="student"
              formik={Formik}
              label="Select Student"
              options={students}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end">
            <Button
              size="small"
              type="submit"
              variant="contained"
              disabled={!Formik.values.student}
              onClick={Formik.handleSubmit}>
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["edit", "delete"]}
        module="Student Activity"
        tableKeys={studentActivityTableKeys}
        bodyDataModal="student activity"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/* ====== Fab button component =======*/}
      <AddForm
        title="Student Activity"
        module="Student Activity"
        onAddClick={AddDepartmentHandel}
        disabled={!Formik.values.student}
      />
      {/* ================================== */}

      {/* ==== add/edit classes ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit ? "Update Student Activity" : "Add Student Activity"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          {/* <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="academicYear"
              label="Academic Year"
              required={true}
              options={academicYearList}
            />
          </Grid> */}
          {/* <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="student"
              label="Select Student"
              required={true}
              showSearch={true}
              options={students}
            />
          </Grid> */}
          <Grid xs={12} sm={12} item>
            <FormInput formik={entryFormik} name="name" label="Activity Name" />
          </Grid>

          <Grid xs={12} sm={12} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
