/** @format */

import React, { useContext, useEffect, useState } from "react";
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

import { LoadingButton } from "@mui/lab";
import { PRIVATE_URLS } from "../../../../services/urlConstants";
import { get } from "../../../../services/apiMethods";
import SettingContext from "../../../../context/SettingsContext";

export default function Result({ show }) {
  const { selectedSetting } = useContext(SettingContext);

  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [exams, setExams] = useState([]);

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);

      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get section
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getExams = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });

      setExams(data.result.map((e) => ({ label: e.title, value: e._id })));
      entryFormik.setFieldValue("exam", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      exam: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getClasses();
    getAcademicYear();
    getExams();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class, selectedSetting._id]);

  return (
    <>
      <SubHeader
        show={show}
        title="Results"
        leftSideHeader="Home"
        rightSideHeader="Results"
      />

      <Box sx={{ margin: "15px", px: 4 }}>
        <PageHeader title="Exam Result" showTextField={false} />
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={entryFormik}
                label="Select Academic Year"
                options={academicYear}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                options={sections}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="exam"
                formik={entryFormik}
                label="Select Exam"
                options={exams}
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} textAlign="end" item>
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
            gap={1}>
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
