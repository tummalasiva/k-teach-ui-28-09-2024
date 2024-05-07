import React from "react";
import { Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { useState } from "react";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const Contennt_Type_Options = [
  { label: "Link", value: "Link" },
  { label: "Text", value: "Text" },

  { label: "Image", value: "Image" },
  { label: "Document", value: "Document" },
];

export default function AddPopup() {
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
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
      contentType: dataToEdit?.contentType || "",
      text: dataToEdit?.text || "",
      link: dataToEdit?.link || "",
      document: dataToEdit?.document || "",
      image: dataToEdit?.image || "",
      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <AddForm
        title="Add Vertical Splash News"
        onAddClick={AddHorizontalSplashNews}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit
            ? "Update Vertical Splash News"
            : "Add Vertical Splash News"
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

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="contentType"
              label="Content Type"
              required={true}
              options={Contennt_Type_Options}
            />
          </Grid>
          {entryFormik.values.contentType === "Link" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="link"
                label="Link"
                required={true}
              />
            </Grid>
          )}

          {entryFormik.values.contentType === "Text" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="text"
                label="Text"
                required={true}
              />
            </Grid>
          )}

          {entryFormik.values.contentType === "Image" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="image"
                type="file"
                label="Image"
                required={true}
              />
            </Grid>
          )}

          {entryFormik.values.contentType === "Document" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="document"
                type="file"
                label="Document"
                required={true}
              />
            </Grid>
          )}
        </Grid>
      </FormModal>
    </>
  );
}
