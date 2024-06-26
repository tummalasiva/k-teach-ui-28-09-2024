/** @format */

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { examSchedulesTableKeys } from "../../data/tableKeys/examSchedules";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import AddOrUpdateExamSchedule from "./AddOrUpdateExamSchedule";

export default function ExamSchedules() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // get years
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

  // get exam list
  const getExamList = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.preadmissionExam.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: entryFormik?.values.academicYear,
            class: entryFormik?.values.class,
          },
        },
      });
      // console.log(data.result, "exam list");
      setExams(data.result.map((d) => ({ label: d.examName, value: d._id })));
      entryFormik.setFieldValue("exam", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get exam list
  const getExamSchedules = async (values) => {
    console.log(values, "exam values");

    try {
      setLoading(true);
      const { data } = await get(PRIVATE_URLS.preadmissionExamSchedule.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: values.academicYear,
            class: values.class,
            exam: values.exam,
            fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
          },
        },
      });
      console.log(data.result, "exam list");
      // setData(data.result.map((d) => ({ ...d, class: d.class.name })));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      exam: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getExamSchedules,
  });

  useEffect(() => {
    if (entryFormik?.values.academicYear && entryFormik?.values.class) {
      getExamList();
    }
  }, [
    entryFormik?.values.academicYear,
    entryFormik?.values.class,
    selectedSetting,
  ]);

  const AddExamSchedules = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setDataToEdit(null);
  };

  return (
    <>
      <PageHeader title="Exam Schedules" />

      <AddForm title="Add Exam Schedules" onAddClick={AddExamSchedules} />

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
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="exam"
              formik={entryFormik}
              label="Select Exam"
              options={exams}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="From Date"
              name="fromDate"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="To Date"
              name="toDate"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained" type="submit">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <CustomTable
        actions={["edit"]}
        tableKeys={examSchedulesTableKeys}
        bodyDataModal="exam schedules"
        bodyData={data}
      />

      {/* ==== add/edit exam schedules ======== */}
      <AddOrUpdateExamSchedule
        open={open}
        handleClose={handleClose}
        selectedSetting={selectedSetting}
      />
    </>
  );
}
