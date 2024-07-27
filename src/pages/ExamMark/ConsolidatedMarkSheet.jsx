/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, IconButton, Paper } from "@mui/material";
import { consolidateMarksTableKeys } from "../../data/tableKeys/consolidateMarksCardData";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import FormInput from "../../forms/FormInput";
import { Close } from "@mui/icons-material";
import CheckPermission from "../../components/Authentication/CheckPermission";

export default function ConsolidatedMarkSheet() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);
  const [consolidated, setConsolidated] = useState([]);

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
  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getClass();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  const handleRemoveSubject = (examIndex, subjectIndex) => {
    setConsolidated(
      consolidated.map((con, i) => {
        if (i === examIndex) {
          return {
            ...con,
            subjects: con.subjects.filter(
              (subject, index) => index !== subjectIndex
            ),
          };
        } else {
          return con;
        }
      })
    );
  };

  return (
    <>
      <PageHeader title="Consolidate Marks Sheet" />

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
          <CheckPermission module="Consolidated Marks Sheet" permission="add">
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained">
                Add exams
              </Button>
            </Grid>
          </CheckPermission>
          <Grid xs={12} md={12} lg={12} item display="flex" gap={2}>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="compress"
                formik={entryFormik}
                label="Compress"
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
            <Grid xs={12} md={6} lg={3} item display="flex" alignItems="center">
              <IconButton color="error">
                {/* <Button onClick={() => handleRemoveSubject(index, subjectIndex)}> */}
                <Close />
              </IconButton>
              <Button>Add Subject</Button>
            </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={12} item display="flex" gap={2}>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="compress"
                formik={entryFormik}
                label="Compress"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="subject"
                formik={entryFormik}
                label="Select Subject"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item display="flex" alignItems="center">
              <IconButton color="error">
                {/* <Button onClick={() => handleRemoveSubject(index, subjectIndex)}> */}
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="Consolidate marks card"
        bodyData={data}
        tableKeys={consolidateMarksTableKeys}
      />
    </>
  );
}
