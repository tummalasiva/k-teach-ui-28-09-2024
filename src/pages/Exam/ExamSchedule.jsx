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
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import AddForm from "../../forms/AddForm";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";

const ShowIn_HallTick = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const ShowIn_Exam_Results = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const Pratical_Marks = [
  { label: "Active", value: "active" },
  { label: "In-Active", value: "inactive" },
];

export default function ExamSchedule() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [examtitle, setExamTitle] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.examSchedule.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: values.class,
            examTerm: values.examTerm,
          },
        },
      });
      setData(data.result.map((s) => ({ ...s, subject: s.subject })));
      // console.log(data.result, "resullttttt");
    } catch (error) {
      console.log(error);
    }
  };

  const handelExamSchedule = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    entryFormik.resetForm();
  };

  const getExamTerm = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });

      setExamTitle(
        data.result.map((c) => ({ ...c, label: c.title, value: c._id }))
      );
      formik.setFieldValue("examTerm", data.result[0]?._id);
      entryFormik.setFieldValue("examTerm", data.result[0]?._id);
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

      formik.setFieldValue("class", data.result[0]?._id);
      entryFormik.setFieldValue("class", data.result[0]?._id);
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
      examTerm: "",
    },
    onSubmit: getData,
    enableReinitialize: true,
  });

  const handleCreateOrUpdate = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        examDate: dayjs(values.examDate).format("YYYY/MM/DD"),
        marksFreezDate: dayjs(values.marksFreezDate).format("YYYY/MM/DD"),
      };

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.examSchedule.update + "/" + dataToEdit._id,
          payload
        );
        handleClose();
      } else {
        const { data } = await post(PRIVATE_URLS.examSchedule.create, payload);
        handleClose();
      }
      resetForm();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      examTerm: dataToEdit?.examTerm._id || "",
      class: dataToEdit?.class._id || "",
      subject: dataToEdit?.subject._id || "",
      examDate: dataToEdit?.examDate
        ? dayjs(dataToEdit.examDate).format("YYYY/MM/DD")
        : null,

      startTime: dataToEdit?.startTime || "",
      endTime: dataToEdit?.endTime || "",
      marksFreezDate: dataToEdit?.marksFreezDate
        ? dayjs(dataToEdit?.marksFreezDate).format("YYYY/MM/DD")
        : null,

      maximumMarks: dataToEdit?.maximumMarks || "",

      pratical: dataToEdit?.pratical || "",
      minimumMarks: dataToEdit?.minimumMarks || "",
      praticalMarks: dataToEdit?.praticalMarks || "",
      showInHallTick: dataToEdit?.showInHallTick || "",
      showInExamResults: dataToEdit?.showInExamResults || "",
      orderSequence: dataToEdit?.orderSequence || "",
      praticalMarks: dataToEdit?.praticalMarks || "",
      showInHallTick: dataToEdit?.showInHallTick || true,
      showInExamResults: dataToEdit?.showInExamResults || true,
      obtainedMarks: dataToEdit?.obtainedMarks || 0,
    },
    onSubmit: handleCreateOrUpdate,
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

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.examTerm) {
      entryFormik.handleSubmit();
    }
  }, [entryFormik.values.class, entryFormik.values.examTerm, selectedSetting]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.examSchedule.delete + "/" + id);
      getData();
      entryFormik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Exam Schedule" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Exam List", "Schedule List"]}
      />
      <TabPanel index={0} value={value}>
        {/* <Paper sx={{ padding: 2, marginBottom: 2 }}>
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
        </Paper> */}
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
                name="class"
                formik={entryFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                name="examTerm"
                formik={entryFormik}
                label="Select Exam"
                options={examtitle}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* =========== Add exam schedule ========= */}
        <AddForm
          title="Add Exam Schedule"
          module="Exam Schedule"
          onAddClick={handelExamSchedule}
        />

        {/* =========== Table ========= */}
        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="schedule list"
          module="Exam Schedule"
          bodyData={data}
          tableKeys={scheduleListTableKeys}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />

        {/* =========== Add/update exam schedule ========= */}
        <FormModal
          open={open}
          formik={formik}
          formTitle={dataToEdit ? "Update Exam Schedule" : "Add Exam Schedule"}
          onClose={handleClose}
          submitButtonTitle={dataToEdit ? "Update" : "Submit"}
          adding={loading}>
          <Grid rowSpacing={0} columnSpacing={2} container>
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="examTerm"
                label="Exam"
                required={true}
                options={examtitle}
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
                name="examDate"
                formik={formik}
                label="Exam Date"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="startTime"
                type="time"
                formik={formik}
                label="Start Time"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="endTime"
                type="time"
                formik={formik}
                label="End Time"
              />
            </Grid>

            <Grid xs={12} md={6} lg={6} item>
              <FormDatePicker
                required={true}
                label="Marks Freez Date"
                formik={formik}
                name="marksFreezDate"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="maximumMarks"
                formik={formik}
                label="Maximum Marks"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                required={true}
                name="minimumMarks"
                formik={formik}
                label="MinMarks"
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="praticalMarks"
                label="Pratical Marks"
                options={Pratical_Marks}
              />
            </Grid>

            {formik.values.praticalMarks === "active" && (
              <Grid xs={12} sm={6} md={6} item>
                <FormInput
                  required={true}
                  name="pratical"
                  formik={formik}
                  label="Pratical"
                />
              </Grid>
            )}

            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={formik}
                name="orderSequence"
                label="Order Sequence"
                required={true}
              />
            </Grid>
            {/* <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="showInHallTick"
                label="ShowIn HallTick"
                options={ShowIn_HallTick}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={formik}
                name="showInExamResults"
                label="Show In Exam Results"
                options={ShowIn_Exam_Results}
              />
            </Grid> */}
          </Grid>
        </FormModal>
      </TabPanel>
    </>
  );
}
