import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicSubjectTableKeys } from "../../data/tableKeys/academicSubjectData";
import FormSelect from "../../forms/FormSelect";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";

const Subject_Type = [
  { label: "Mandatory", value: "mandatory" },
  { label: "Optional", value: "optional" },
];

const Subject_Group = [
  { label: "Scholastic", value: "scholastic" },
  { label: "Co-scholastic", value: "co-scholastic" },
];

export default function Subject() {
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
      subjectName: dataToEdit?.subjectName || "",
      subjectCode: dataToEdit?.subjectCode || "",
      subjectType: dataToEdit?.subjectType || "",
      subjectGroup: dataToEdit?.subjectGroup || "",
      class: dataToEdit?.class || "",
      subjectTeacher: dataToEdit?.subjectTeacher || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: console.log("comming..."),
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Subject" />

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
        tableKeys={academicSubjectTableKeys}
        bodyDataModal="subject"
        bodyData={data}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Subject" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit Subjects ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Subject"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="subjectName"
              label="Subject Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="subjectCode"
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
              formik={entryFormik}
              name="class"
              label="Class"
              required={true}
              // options={}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="subjectTeacher"
              label="Subject Teacher"
              required={true}
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
