import React, { useState } from "react";
import { designationTableKeys } from "../../data/tableKeys/designation";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormInput from "../../forms/FormInput";

export default function ManageDesignation() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const AddDesigationHandel = () => {
    setOpen(true);
  };

  const entryFormik = useFormik({
    initialValues: {
      desigation: "",
      order: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Designation" />
      <CustomTable
        actions={["edit"]}
        tableKeys={designationTableKeys}
        bodyDataModal="designation"
        bodyData={data}
      />
      {/* ====== Add form fab button =======*/}
      <AddForm title="Add Desigation" onAddClick={AddDesigationHandel} />
      {/* ================================== */}

      {/* ==== add department ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Desigation"
        onClose={handleClose}
        submitButtonTitle="Apply"
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="desigation"
              label="Desigation"
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
    </>
  );
}
