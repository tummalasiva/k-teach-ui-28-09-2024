import React from "react";
import { Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormDatePicker from "../../forms/FormDatePicker";
import { useState } from "react";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function AddHorizontalSplash() {
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddHorizontalSplashNews = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",

      text: dataToEdit?.text || "",

      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <AddForm
        title="Add Horizontal Splash News"
        onAddClick={AddHorizontalSplashNews}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit
            ? "Update Horizontal Splash News"
            : "Add Horizontal Splash News"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}
      >
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Title"
              required={true}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              name="isPublic"
              formik={entryFormik}
              label="Is Public"
              options={Is_Public}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              formik={entryFormik}
              name="text"
              label="Text"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
