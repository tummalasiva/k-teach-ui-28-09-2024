/** @format */

import React, { useEffect, useState } from "react";
import { examsTableKeys } from "../../data/tableKeys/exams";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import { LoadingButton } from "@mui/lab";
import AddForm from "../../forms/AddForm";
import AddOrUpdateExamModal from "./AddOrUpdateExamModal";

export default function Exams() {
  const { selectedSetting } = useContext(SettingContext);
  const [gettingList, setGettingList] = useState(false);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  // question model;
  const [openQuestionModel, setOpenQuestionModel] = useState(false);
  const handleCloseQuestionModel = () => setOpenQuestionModel(false);
  const handleOpenQuestionModel = () => setOpenQuestionModel(true);

  // get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

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
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  const getExamList = async (values) => {
    try {
      setGettingList(true);
      const { data } = await get(PRIVATE_URLS.preadmissionExam.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: values.academicYear,
            class: values.class,
          },
        },
      });
      // console.log(data.result, "exam list");
      setData(data.result.map((d) => ({ ...d, class: d.class.name })));
    } catch (error) {
      console.log(error);
    }
    setGettingList(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
    },
    onSubmit: getExamList,
  });

  const handleDelete = async (_id) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.preadmissionExam.delete + "/" + _id
      );
      getExamList();
      entryFormik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Exams" />

      <AddForm title="Add Exam" onAddClick={handleOpenQuestionModel} />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
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

          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <LoadingButton
              loading={gettingList}
              size="small"
              variant="contained"
              type="submit">
              Find
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>

      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={examsTableKeys}
        bodyDataModal="exams"
        bodyData={data}
        onDeleteClick={handleDelete}
      />
      <AddOrUpdateExamModal
        open={openQuestionModel}
        onClose={handleCloseQuestionModel}
      />
    </>
  );
}
