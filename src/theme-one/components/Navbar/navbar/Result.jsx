import React, { useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { DownloadForOffline, Print } from "@mui/icons-material";
import { useFormik } from "formik";
import FormSelect from "../../../../forms/FormSelect";
import PageHeader from "../../../../components/PageHeader";

import SubHeader from "../../SubHeader";
import CustomTable from "../../../../components/Tables/CustomTable";
import { examResultHomePageTableKeys } from "../../../../data/tableKeys/examResultsHomePageData";

export default function Result() {
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      exam: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <SubHeader
        show={false}
        title="Results"
        leftSideHeader="Home"
        rightSideHeader="Results"
      />
      <Box sx={{ margin: "15px", px: 4 }}>
        <PageHeader title="Exam Result" />
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
                name="exam"
                formik={entryFormik}
                label="Select Exam"
                // options={""}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
          >
            {" "}
            <IconButton>
              <DownloadForOffline />
            </IconButton>
            <IconButton>
              <Print />
            </IconButton>
          </Box>
        </Paper>

        <CustomTable
          actions={["view", "card"]}
          tableKeys={examResultHomePageTableKeys}
          bodyDataModal="exam result"
          bodyData={data}
        />
      </Box>
    </>
  );
}
