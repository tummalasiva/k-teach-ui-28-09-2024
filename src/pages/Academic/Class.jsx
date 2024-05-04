import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { academicClassTableKeys } from "../../data/tableKeys/academicClassData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import SettingContext from "../../context/SettingsContext";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

const Active = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const IS_PUBLIC = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function Class() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
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
    getData();
    getEmployees();
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
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.class.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.class.create, payload);
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
      classTeachers: dataToEdit?.classTeachers?.map((c) => c._id) || [],
      active: dataToEdit?.active || false,
      isPublic: dataToEdit?.isPublic || false,
      orderSequence: dataToEdit?.orderSequence || data.length + 1,
      numericName: dataToEdit?.numericName || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.class.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Classes" />
      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={academicClassTableKeys}
        bodyDataModal="class"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Class" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit classes ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Class" : "Add Class"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}
      >
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Class Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="classTeachers"
              label={`Class Teachers - (${entryFormik.values.classTeachers.length})`}
              required={false}
              showSearch={true}
              multiple={true}
              options={employees}
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
            <FormInput
              disabled={dataToEdit ? false : true}
              formik={entryFormik}
              name="orderSequence"
              label="Order Sequence"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="numericName"
              label="Numeric Name"
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
