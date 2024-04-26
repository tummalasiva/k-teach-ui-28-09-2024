import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import { departmentTableKeys } from "../../data/tableKeys/departmentData";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import AddForm from "../../forms/AddForm";

export default function ManageDepartment() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const entryFormik = useFormik({
    initialValues: {
      department: "",
      order: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Department" />
      <CustomTable
        actions={["edit"]}
        tableKeys={departmentTableKeys}
        bodyDataModal="department"
        bodyData={data}
      />
      {/* ====== Add form fab button =======*/}
      <AddForm title="Add Department" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add department ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Department"
        onClose={handleClose}
        submitButtonTitle="Apply"
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="department"
              label="Department"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              type="number"
              formik={entryFormik}
              name="order"
              label="Order Sequence"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="note"
              label="Drop a note"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
      {/* =========================== */}
    </>
  );
}
