/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, styled, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import ThemeSelector from "../../components/ThemeSelector";

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "14px",
  padding: "5px 10px",
  borderBottom: "1px solid",
  borderBottomColor: "lightgray",
  fontWeight: "bold",
  color: "white",
  background: theme.palette.secondary.main,
}));

export default function IdCard() {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
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

  useEffect(() => {
    getClasses();
  }, [selectedSetting._id]);

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
      console.error(error);
    }
  };

  // get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            "academicInfo.class": entryFormik.values.class,
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      student: "",
      selectedIdCard: "",
    },
    onSubmit: console.log("log"),
  });

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class, selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.section) {
      getStudents();
    }
  }, [entryFormik.values.class, entryFormik.values.section, selectedSetting]);

  const handleSelectTheme = (theme) => {
    entryFormik.setFieldValue("selectedIdCard", theme);
  };

  return (
    <>
      <PageHeader title="Id Card" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={12} lg={12} item>
            <Title id="modal-modal-title" variant="h6" component="h2">
              Select Your Id Card Theme
            </Title>
            <Box m={2}>
              <ThemeSelector
                onThemeSelect={handleSelectTheme}
                webTheme={false}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              options={classes}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              options={sections}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="student"
              formik={entryFormik}
              label="Select Student"
              options={students}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Generate
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
