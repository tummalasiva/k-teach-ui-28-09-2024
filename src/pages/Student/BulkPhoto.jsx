/** @format */

import React, { useContext, useEffect, useState } from "react";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { bulkPhotoTableKeys } from "../../data/tableKeys/bulkPhoto";
import PageHeader from "../../components/PageHeader";

export default function BulkPhoto() {
  const { selectedSetting } = useContext(SettingContext);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [data, setDate] = useState([]);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);

      setAcademicYearList(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      formik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: formik.values.class,
          },
        },
      });

      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("hhhhjjh"),
    enableReinitialize: true,
  });

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);
  useEffect(() => {
    if (formik.values.class) {
      getSections();
    }
  }, [formik.values.class]);

  return (
    <>
      <PageHeader title="Bulk Photo" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="div"
          onSubmit={formik.handleSubmit}>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={formik}
              label="Select Academic Year"
              options={academicYearList}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={formik}
              label="Select Class"
              options={classes}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={formik}
              label="Select Section"
              options={sections}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item sx={{ alignSelf: "center" }}>
            <Button variant="contained" size="small">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={bulkPhotoTableKeys}
        bodyDataModal="bulk photo"
        bodyData={data}
      />
    </>
  );
}
