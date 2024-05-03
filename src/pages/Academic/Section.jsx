import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicSectionTableKeys } from "../../data/tableKeys/academicSectionData";
import FormSelect from "../../forms/FormSelect";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";

export default function Section() {
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
      class: dataToEdit?.class || "",
      sectionTeacher: dataToEdit?.sectionTeacher || "",
      active: dataToEdit?.active || "",
      isPublic: dataToEdit?.isPublic || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: console.log("comming..."),
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Section" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={""}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <CustomTable
        actions={["edit"]}
        tableKeys={academicSectionTableKeys}
        bodyDataModal="section"
        bodyData={data}
      />
      {/* ====== Fab button component =======*/}
      <AddForm title="Add Section" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit sections ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Section"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              name="class"
              label="Class"
              required={false}
              // options={}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="sectionTeacher"
              label="Section Teacher"
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
          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
