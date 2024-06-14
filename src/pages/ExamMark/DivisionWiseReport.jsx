/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

export default function DivisionWiseReport() {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);
  const [exams, setExams] = useState([]);

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSection(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get exam list
  const getExams = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });
      // console.log(data, "exam");
      setExams(data.result.map((e) => ({ label: e.title, value: e._id })));
      entryFormik.setFieldValue("exam", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      exam: "",
    },
    onSubmit: console.log("nnnn"),
  });
  useEffect(() => {
    getClass();
    getExams();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);
  return (
    <>
      <PageHeader title="Division Wise Report" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              options={section}
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
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
