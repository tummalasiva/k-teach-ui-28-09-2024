/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import { examAttendanceTableKeys } from "../../data/tableKeys/examAttendanceData";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

export default function ExamAttendance() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);

  const [subject, setSubject] = useState([]);

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      exam: "",
      subject: "",
    },
    onSubmit: console.log("nnnn"),
  });

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
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
            section: entryFormik.values.section,
          },
        },
      });
      setSubject(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("subject", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClass();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.section) {
      getSubject();
    }
  }, [entryFormik.values.class, entryFormik.values.section, selectedSetting]);

  return (
    <>
      <PageHeader title="Exam Attendance" />

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
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="subject"
              formik={entryFormik}
              label="Select Subject"
              options={subject}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="exam attendance"
        bodyData={data}
        tableKeys={examAttendanceTableKeys}
      />
    </>
  );
}
