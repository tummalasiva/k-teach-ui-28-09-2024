import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicSectionTableKeys } from "../../data/tableKeys/academicSectionData";
import FormSelect from "../../forms/FormSelect";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import CustomSelect from "../../forms/CustomSelect";

const Active = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const IS_PUBLIC = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function Section() {
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
      const { data } = await get(PRIVATE_URLS.section.list, {
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
  }, [selectedSetting]);

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
      if (!payload.sectionTeacher) {
        delete payload.sectionTeacher;
      }
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.section.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.section.create, payload);
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
      class: dataToEdit?.class?._id || "",
      sectionTeacher: dataToEdit?.sectionTeacher?._id || "",
      active: dataToEdit?.active || false,
      isPublic: dataToEdit?.isPublic || false,
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selectedClass) {
      getData();
    }
  }, [selectedClass, selectedSetting]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.section.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSelectedClass = (e) => {
    setSelectedClass(e.target.value);
  };

  useEffect(() => {
    entryFormik.setFieldValue("class", selectedClass);
  }, [selectedClass]);

  return (
    <>
      <PageHeader title="Section" />

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
        tableKeys={academicSectionTableKeys}
        bodyDataModal="section"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />
      {/* ====== Fab button component =======*/}
      <AddForm title="Add Section" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit sections ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Section" : "Add Section"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Add"}
        adding={loading}
      >
        <Grid rowSpacing={1} columnSpacing={1} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Section Name"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="sectionTeacher"
              label="Section Teacher"
              options={employees}
              showSearch={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="active"
              label="Active"
              options={Active}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="isPublic"
              label="Is-Public"
              options={IS_PUBLIC}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
