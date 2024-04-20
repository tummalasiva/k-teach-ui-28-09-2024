import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { PrintSharp } from "@mui/icons-material";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";

import FormSelect from "../../forms/FormSelect";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { admitStudentTableKeys } from "../../data/tableKeys/admitStudentData";
import { Link } from "react-router-dom";

export default function AdmitStudent() {
  const [data, setDate] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      status: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Students" />
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
            <FormSelect
              required={true}
              name="status"
              formik={entryFormik}
              label="Select Status"
              // options={""}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-start"
          >
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Stack direction="row">
            <Tooltip title="Download">
              <IconButton>
                <DownloadForOfflineSharpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton>
                <PrintSharp />
              </IconButton>
            </Tooltip>
            <Link to={"/student/student-bulk-photo"}>
              <Button size="small" sx={{ p: 1, ml: 1 }} variant="contained">
                Bulk Photo
              </Button>
            </Link>
          </Stack>
        </Box>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={admitStudentTableKeys}
        bodyDataModal="students"
        bodyData={data}
      />
    </>
  );
}
