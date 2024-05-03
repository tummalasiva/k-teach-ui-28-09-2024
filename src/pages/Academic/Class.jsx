import React, { useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { academicClassTableKeys } from "../../data/tableKeys/academicClassData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";

export default function Class() {
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      classTeachers: dataToEdit?.classTeachers || "",
      active: dataToEdit?.active || "",
      isPublic: dataToEdit?.isPublic || "",
      orderSequence: dataToEdit?.orderSequence || "",
      numericName: dataToEdit?.numericName || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: console.log("comming..."),
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Classes" />
      <CustomTable
        actions={["edit"]}
        tableKeys={academicClassTableKeys}
        bodyDataModal="class"
        bodyData={data}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Class" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit classes ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Class"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              label="Class Teachers"
              required={false}
              // options={}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="active"
              label="Status"
              // options={}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="isPublic"
              label="Public"
              // options={}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
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
