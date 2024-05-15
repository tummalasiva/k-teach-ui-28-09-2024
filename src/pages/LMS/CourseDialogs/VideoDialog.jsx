/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";

export default function VideoDialog({ open , setOpenVideo,Formik}) {
  const { selectedSetting } = useContext(SettingContext);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(Formik,"ooopen");

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit ? dataToEdit.name : "",
      contentHours: dataToEdit ? dataToEdit.contentHours : "",
    },
    onSubmit: console.log("null"),
    // enableReinitialize: true,
  });

  const handleClose = () => {
    setOpenVideo(false);
    setDataToEdit(null);
  };

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Notice" : "Add Notice"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Video Name 0/80*"
              type="text"
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
          <Grid xs={12} md={6} lg={6} item>
            <FormInput
              formik={entryFormik}
              name="file"
              label="Select Video"
              required={true}
              type="file"
              accept="video/*"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
