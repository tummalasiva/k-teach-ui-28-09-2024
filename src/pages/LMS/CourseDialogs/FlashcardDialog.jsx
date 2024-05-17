/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormSelect from "../../../forms/FormSelect";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";

export default function FlashcardDialog({ title, open, setOpenFlashcard }) {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const entryFormik = useFormik({
    initialValues: {
      title: "",
      contentHours: "",
      description: "",
      cardType: "",
      text: "",
    },
    onSubmit: console.log("q"),
  });

  const handleClose = () => {
    setOpenFlashcard(false);
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
              name="title"
              label="Title 0/80*"
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
            <FormSelect
              formik={entryFormik}
              name="cardType"
              label="Select Card Type"
              options={[
                { label: "Flashcard Text", value: true },
                { label: "Flashcard Image", value: false },
              ]}
            />
          </Grid>
          {entryFormik.values.cardType ? (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="text"
                label="Flashcard Text"
              />
            </Grid>
          ) : (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="image"
                label="Select Flashcard Image"
                type="file"
              />
            </Grid>
          )}
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
