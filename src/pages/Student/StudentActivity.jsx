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
import { get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

export default function StudentActivity() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setDate] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({});
  const [classes, setClasses] = useState([]);

  console.log(dataToEdit, "dataToEdit");

  //get academic year
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
          // search: {
          //   class: formData.class,
          // },
        },
      });
      console.log(data, "aca");
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );

      // if (data.result?.length) {
      //        setFormData(data.result[0]._id);
      //   entryFormik.setFieldValue("class", data.result[0]._id);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setFormData({ academicYear: data.result[0]._id });
      setAcademicYearList(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      // if (data.result?.length) {
      //   setFormData(data.result[0]._id);
      //   entryFormik.setFieldValue("academicYear", data.result[0]._id);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  //get academic year
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          // search: {
          //   academicYear: dataToEdit.academicYear,
          // },
        },
      });
      // console.log(data, "aca");
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d.basicInfo._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    console.log(values, "jjjj");
    try {
      const payload = {
        ...values,
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

  const entryFormik = useFormik({
    initialValues: {
      academicYear: dataToEdit?.academicYear || "",
      student: dataToEdit?.student || "",
      date: dataToEdit?.date || "",
      description: dataToEdit?.description || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const Formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      student: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getAcademicYear();
  }, []);

  useEffect(() => {
    getStudents();
    getClasses();
  }, [formData?.academicYear, selectedSetting]);

  return (
    <>
      <PageHeader title="Student Activity" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              name="sectiion"
              formik={Formik}
              label="Select Section"
              // options={""}
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
            justifyContent="flex-end"
          >
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={studentActivityTableKeys}
        bodyDataModal="student activity"
        bodyData={data}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Student Activity" onAddClick={AddDepartmentHandel} />
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
        adding={loading}
      >
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="academicYear"
              label="Academic Year"
              required={true}
              options={academicYearList}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="student"
              label="Select Student"
              required={true}
              showSearch={true}
              options={students}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="name" label="Activity Name" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="date"
              label="Select Date"
            />
          </Grid>

          <Grid xs={12} sm={12} md={12} item>
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
