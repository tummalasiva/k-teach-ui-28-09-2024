/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicSubjectTableKeys } from "../../data/tableKeys/academicSubjectData";
import FormSelect from "../../forms/FormSelect";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import CustomSelect from "../../forms/CustomSelect";

const Subject_Type = [
  { label: "Mandatory", value: "mandatory" },
  { label: "Optional", value: "optional" },
];

const Subject_Group = [
  { label: "Scholastic", value: "scholastic" },
  { label: "Co-scholastic", value: "co-scholastic" },
];

export default function Subject() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

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

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: selectedClass },
        },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      if (data.result?.length) {
        setSelectedClass(data.result[0]._id);
        entryFormik.setFieldValue("class", data.result[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
    getClasses();
  }, [selectedSetting, selectedSetting._id]);

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        class: selectedClass,
        schoolId: selectedSetting._id,
      };

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.subject.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.subject.create, payload);
        getData();
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      code: dataToEdit?.code || "",
      subjectType: dataToEdit?.subjectType || "",
      subjectGroup: dataToEdit?.subjectGroup || "",
      class: dataToEdit?.class?._id || "",
      subjectTeachers: dataToEdit?.subjectTeachers?.map((t) => t._id) || [],
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    console.log(selectedClass, "000000");
    if (selectedClass) {
      setData([]);
      getData();
    } else {
      setData([]);
    }
  }, [selectedClass, selectedSetting._id]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleChangeSelectedClass = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.subject.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    entryFormik.setFieldValue("class", selectedClass);
  }, [selectedClass]);

  return (
    <>
      <PageHeader title="Subject" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <CustomSelect
              required={true}
              name="selectedClass"
              value={selectedClass}
              onChange={handleChangeSelectedClass}
              label="Select Class"
              options={classes}
            />
          </Grid>
        </Grid>
      </Paper>

      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={academicSubjectTableKeys}
        bodyDataModal="subject"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Subject" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit Subjects ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update" : "Add Subject"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Add"}
        adding={loading}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Subject Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="code"
              label="Subject Code"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              required={true}
              formik={entryFormik}
              name="subjectType"
              label="Subject Type"
              options={Subject_Type}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              required={true}
              formik={entryFormik}
              name="subjectGroup"
              label="Group"
              options={Subject_Group}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              showSearch={true}
              multiple={true}
              formik={entryFormik}
              name="subjectTeachers"
              label={`Subject Teachers-(${entryFormik.values.subjectTeachers.length})`}
              required={true}
              options={employees}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
