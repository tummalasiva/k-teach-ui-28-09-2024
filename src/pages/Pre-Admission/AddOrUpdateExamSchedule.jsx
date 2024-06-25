/** @format */

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function AddOrUpdateExamSchedule({
  open,
  selectedSetting,
  handleClose = () => {},
}) {
  const [dataToEdit, setDataToEdit] = useState();
  const [loading, setLoading] = useState(false);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);

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

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        dateOfExam: dayjs(values.dateOfExam).format("YYYY/MM/DD"),
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.preadmissionExamSchedule.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.preadmissionExamSchedule.create,
          payload
        );
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      exam: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: handleCreateOrUpdate,
  });

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik?.values.academicYear && entryFormik?.values.class) {
      getExamList();
    }
  }, [
    entryFormik?.values.academicYear,
    entryFormik?.values.class,
    selectedSetting,
  ]);

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Exam Schedules" : "Add Exam Schedules"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              options={academicYear}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              options={classes}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              required={true}
              name="exam"
              formik={entryFormik}
              label="Select Exam"
              options={exams}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              required={true}
              formik={entryFormik}
              name="dateOfExam"
              label="Date of Exam"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              required={true}
              formik={entryFormik}
              type="time"
              name="startTime"
              label="Start Time"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              required={true}
              formik={entryFormik}
              type="time"
              name="endTime"
              label="End Time"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="roomNumber"
              label="Room No."
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="address" label="Address" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
