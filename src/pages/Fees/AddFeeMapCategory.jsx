/** @format */

import React from "react";
import FormModal from "../../forms/FormModal";
import { Grid } from "@mui/material";

export default function AddFeeMapCategory({ handleClose }) {
  return (
    <>
      {/* Add/Update Fee map Category ========= */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Fee Map Category"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={4} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <FormInput
              formik={entryFormik}
              name="amount"
              label="Amount"
              type="number"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
