/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Grid, Paper, Typography } from "@mui/material";
import FormSelect from "../forms/FormSelect";
import { useFormik } from "formik";
import AddForm from "../forms/AddForm";
import { PRIVATE_URLS } from "../services/urlConstants";
import { get } from "../services/apiMethods";
import FormInput from "../forms/FormInput";
import FormModal from "../forms/FormModal";
import SettingContext from "../context/SettingsContext";

export default function ClassRoutine() {
  const { selectedSetting } = useContext(SettingContext);
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      subject: "",
      teacher: "",
      roomNo: "",
      startTime: "",
      endTime: "",
    },
    onSubmit: console.log("nnnnnnn"),
  });

  const formik = useFormik({
    initialValues: {
      class: "",
    },
    onSubmit: console.log("nnnnnnn"),
  });

  const AddClassRoutine = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

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
      entryFormik.setFieldValue("class", data.result[0]._id);
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
            class: entryFormik.values.class,
          },
        },
      });
      entryFormik.setFieldValue("section", data.result[0]?._id);
      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });

      setSubjects(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("subject", data.result[0]._id);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: { schoolId: selectedSetting._id },
      });

      setEmployees(
        data.result
          ?.filter((e) =>
            e.role.name.toLowerCase().match(new RegExp(`Teacher`, "i"))
          )
          .map((d) => ({ label: d.basicInfo.name, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
      getSubject();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    getClasses();

    getEmployees();
  }, [selectedSetting._id]);

  return (
    <>
      <PageHeader title="Class Routine" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={formik}
              label="Select Class"
              options={classes}
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography component="h1" sx={{ fontWeight: "bold", mt: 1 }}>
        Sections
      </Typography>

      <AddForm
        module="Class Routine"
        title="Add Class Routine"
        onAddClick={AddClassRoutine}
      />
      {/* ================================== */}

      {/* ==== add/edit classes ======== */}

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Class Routine" : "Add Routine"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="class"
              label="Class"
              required={true}
              options={classes}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="section"
              label="Section"
              required={true}
              options={sections}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="subject"
              label="Subject"
              required={true}
              options={subjects}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="teacher"
              label="Teacher"
              required={true}
              options={employees}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="roomNo" label="Room Number" />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              name="startTime"
              label="Start Time"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput formik={entryFormik} name="endTime" label="End Time" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
