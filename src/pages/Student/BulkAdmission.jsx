import React from "react";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import DownloadIcon from "@mui/icons-material/Download";
import FormInput from "../../forms/FormInput";

export default function BulkAdmission() {
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Bulk Admission" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="image"
              formik={entryFormik}
              label="Select File"
              type="file"
            />
          </Grid>

          <Grid xs={12} md={12} lg={12} item>
            <Button endIcon={<DownloadIcon />} size="small" variant="contained">
              {" "}
              Get Sample
            </Button>
          </Grid>

          <Grid xs={12} md={12} lg={12} item>
            <ul>
              <li>
                School role type configured with{" "}
                <span style={{ color: "red" }}> manual</span>,please mention
                role number in column.
              </li>
              <li>
                School admission_no configured with auto{" "}
                <span style={{ color: "red" }}>auto _ascending_no,</span>
                admission_no column will be ignored.
              </li>
            </ul>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
          >
            <Button size="small" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box
        sx={{
          margin: "10px 10px",
          padding: "10px",

          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "rgba(32,33,32,1)" : "#FFF9C4",
        }}
      >
        <Typography sx={{ fontSize: "22px" }} fontWeight="bold">
          Instruction:
        </Typography>
        <ol>
          <li>At first select the (School), Class and Section</li>
          <li>Generate CSV file.</li>
          <li>
            Open the downloaded CSV file and enter student information with
            unique username.
          </li>
          <li>Save the edited CSV file.</li>
          <li>Upload again CSV file you just edited and submit.</li>
        </ol>
      </Box>
    </>
  );
}
