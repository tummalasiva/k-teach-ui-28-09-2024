/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";

export default function MaterialsDialog({ title, open, setOpenMaterial }) {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const entryFormik = useFormik({
    initialValues: {
      material: "",
      contentHours: "",
    },
    onSubmit: console.log("q"),
  });

  const handleClose = () => {
    setOpenMaterial(false);
    setDataToEdit(null);
  };

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? `Update ${title}` : `Add ${title}`}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="material"
              label="Material Name"
              required={true}
              inputProps={{ maxLength: 80 }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="contentHours"
              label="Content Hours"
              required={true}
              type="number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="image"
              label="Upload Material"
              type="file"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
