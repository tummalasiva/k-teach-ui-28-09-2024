/** @format */

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Grid, Paper } from "@mui/material";
import FormSelect from "../forms/FormSelect";
import { useFormik } from "formik";
import AddForm from "../forms/AddForm";

export default function ClassRoutine() {
  const [open, setOpen] = useState(false);
  const entryFormik = useFormik({
    initialValues: {
      class: "",
    },
    onSubmit: console.log("nnnn"),
  });

  const AddClassRoutine = () => {
    setOpen(true);
  };

  return (
    <>
      <PageHeader title="Class Routine" />
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
        </Grid>
      </Paper>
      <AddForm title="Add Class Routine" onAddClick={AddClassRoutine} />
      {/* ================================== */}

      {/* ==== add/edit classes ======== */}
    </>
  );
}
