import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { studentActivityTableKeys } from "../../data/tableKeys/studentActivity";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";

export default function StudentActivity() {
  const [data, setDate] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
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
      academicYear: "",
      class: "",
      section: "",
      student: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Student Activity" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="sectiion"
              formik={entryFormik}
              label="Select Section"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="student"
              formik={entryFormik}
              label="Select Student"
              // options={""}
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
            <FormInput
              formik={entryFormik}
              name="academicYear"
              label="Academic Year"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="student"
              label="Select Student"
              required={true}
              // showSearch={true}
              // options={employees}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="activityName"
              label="Activity Name"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="date"
              label="Select Date"
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
