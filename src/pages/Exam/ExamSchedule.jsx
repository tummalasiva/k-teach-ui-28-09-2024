/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid, Paper } from "@mui/material";
import { examListTableKeys } from "../../data/tableKeys/examListData";
import { scheduleListTableKeys } from "../../data/tableKeys/ScheduleListData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import TabPanel from "../../components/Tabs/TabPanel";
import TabList from "../../components/Tabs/Tablist";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import AddForm from "../../forms/AddForm";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import FormDatePicker from "../../forms/FormDatePicker";

export default function ExamSchedule() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [examtitle, setExamTitle] = useState([]);
  const [exam, setExam] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);

  const handelExamSchedule = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getExamTerm = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });

      setExamTitle(data.result);
      setExam(data.result.map((c) => ({ ...c, label: c.title, value: c._id })));
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

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: formik.values.class },
        },
      });
      setSubject(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik.setFieldValue("subject", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      exam: "",
    },
    onSubmit: console.log("nnnn"),
  });

  const formik = useFormik({
    initialValues: {
      class: "",
      exam: "",
      subject: "",
      examDate: "",
      startTime: "",
      endTime: "",
      marksFreezDate: "",

      maxMarks: "",
      written: "",
      pratical: "",
      minMarks: "",
      praticalMarks: "",
      showInHallTick: "",
      showInExamResults: "",
      orderSequence: "",
    },
    onSubmit: console.log("nnnn"),
    enableReinitialize: true,
  });

  useEffect(() => {
    getExamTerm();
    getClasses();
  }, [selectedSetting]);

  useEffect(() => {
    if (formik.values.class) {
      getSubject();
    }
  }, [selectedSetting, formik.values.class]);

  return (
    <>
      <PageHeader title="Exam Schedule" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Exam List", "Schedule List"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="exam list"
          bodyData={examtitle}
          tableKeys={examListTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="exam"
                formik={entryFormik}
                label="Select Exam"
                // options={""}
              />
            </Grid>
          </Grid>
        </Paper>

        <AddForm title="Add Exam Schedule" onAddClick={handelExamSchedule} />

        <FormModal
          open={open}
          formik={entryFormik}
          formTitle={dataToEdit ? "Update Exam Schedule" : "Add Exam Schedule"}
          onClose={handleClose}
          submitButtonTitle={dataToEdit ? "Update" : "Submit"}
          adding={loading}>
          <Grid rowSpacing={0} columnSpacing={2} container>
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="exam"
                label="Exam"
                required={true}
                options={exam}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="class"
                label="Class"
                required={true}
                options={classes}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="subject"
                label="Subject"
                required={true}
                options={subject}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormDatePicker
                required={true}
                name="Exam Date"
                formik={formik}
                label="examDate"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="Start Time"
                type="time"
                formik={entryFormik}
                label="Start Time"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="End Time"
                type="time"
                formik={entryFormik}
                label="End Time"
              />
            </Grid>

            <Grid xs={12} md={6} lg={6} item>
              <FormDatePicker
                required={true}
                name="Marks Freez Date"
                formik={formik}
                label="marksFreezDate"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="written"
                formik={entryFormik}
                label="Written"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="pratical"
                formik={entryFormik}
                label="Pratical"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="minMarks"
                formik={entryFormik}
                label="MinMarks"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                disabled={dataToEdit ? false : true}
                formik={entryFormik}
                name="orderSequence"
                label="Order Sequence"
                required={true}
              />
            </Grid>
          </Grid>
        </FormModal>

        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="schedule list"
          bodyData={data}
          tableKeys={scheduleListTableKeys}
        />
      </TabPanel>
    </>
  );
}
