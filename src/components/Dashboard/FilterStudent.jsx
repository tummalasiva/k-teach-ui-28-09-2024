/** @format */

import { Button, Grid, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { useNavigate } from "react-router-dom";

export default function FilterStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });

      const classes = data.result.map((s) => ({
        label: s.name,
        value: s._id,
      }));

      const classesAllOption = [{ label: "All", value: "all" }, ...classes];
      setClasses(classesAllOption);

      entryFormik.setFieldValue("class", "all");
    } catch (error) {
      console.log(error);
    }
  };

  // get section
  const getSections = async () => {
    try {
      if (entryFormik.values.class === "all") {
        const { data } = await get(PRIVATE_URLS.section.list, {
          params: {
            schoolId: selectedSetting._id,
          },
        });
        const sectionAllOption = [{ label: "All", value: "all" }];
        setSections(sectionAllOption);
        entryFormik.setFieldValue("section", "all");
      } else {
        const { data } = await get(PRIVATE_URLS.section.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              class: entryFormik.values.class,
            },
          },
        });

        const section = data.result.map((s) => ({
          label: s.name,
          value: s._id,
        }));
        const sectionAllOption = [{ label: "All", value: "all" }, ...section];
        setSections(sectionAllOption);
        entryFormik.setFieldValue("section", "all");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async (values) => {
    try {
      if (values.class !== "all" && values.section === "all") {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              "academicInfo.class": values.class,
            },
          },
        });
        setStudents(
          data.result.map((d) => ({
            ...d,
            label: `${d.basicInfo.name}  | ${d.academicInfo.rollNumber} | ${d.contactNumber} `,
            value: d._id,
          }))
        );
      } else if (values.class === "all") {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
          },
        });

        setStudents(
          data.result.map((d) => ({
            ...d,
            label: `${d.basicInfo.name}  | ${d.academicInfo.rollNumber} | ${d.contactNumber} `,
            value: d._id,
          }))
        );
      } else {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              "academicInfo.class": values.class,
              "academicInfo.section": values.section,
            },
          },
        });
        setStudents(
          data.result.map((d) => ({
            ...d,
            label: `${d.basicInfo.name}  | ${d.academicInfo.rollNumber} | ${d.contactNumber} `,
            value: d._id,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStudent = (values) => {
    if (values.student) navigate(`/sch/student/edit-student/${values.student}`);
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      student: "",
    },
    onSubmit: handleGetStudent,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class, selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.section) {
      getStudents(entryFormik.values);
    }
  }, [
    entryFormik.values.class,
    entryFormik.values.section,
    selectedSetting._id,
  ]);

  useEffect(() => {
    getClasses();
  }, [selectedSetting._id]);

  return (
    <>
      <Paper sx={{ padding: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
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
              name="student"
              formik={entryFormik}
              label="Select Student"
              options={students}
              showSearch={true}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained" type="submit">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
