/** @format */

import { Button, Grid, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { teacherActivityTableKeys } from "../../data/tableKeys/teacherActivityData";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";

export default function TeacherActivity() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFind, setLoadingFind] = useState(false);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  let currentUserStringified = window.localStorage.getItem(
    process.env.REACT_APP_CURRENT_USER
  );

  let currentUser = JSON.parse(currentUserStringified);

  const getData = async (values) => {
    try {
      setLoadingFind(true);
      const { data } = await get(PRIVATE_URLS.teacherActivity.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            teacher: values.teacher,
            class: values.class,
            section: values.section,
            subject: values.subject,
            fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
          },
        },
      });
      setData(data.result);
      setLoadingFind(false);
    } catch (error) {
      console.log(error);
      setLoadingFind(false);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: { schoolId: selectedSetting._id },
      });

      const emp = data.result
        ?.filter((e) =>
          e.role.name.toLowerCase().match(new RegExp(`Teacher`, "i"))
        )
        .map((d) => ({ label: d.basicInfo.name, value: d._id }));

      const empOption = [{ label: "Me", value: currentUser._id }, ...emp];
      setEmployees(empOption);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (e, newValue) => {
    if (newValue !== 1) {
      setDataToEdit(null);
    }
    setSelectValue(newValue);
  };

  const handleClose = () => {
    setSelectValue(0);
    setDataToEdit(null);
    getData();
  };

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);

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

  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      // entryFormik.setFieldValue("class", data.result[0]?._id);
      // formik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.error(error);
    }
  };

  const getSections = async (classId) => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: classId,
          },
        },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      // entryFormik.setFieldValue("section", data.result[0]?._id);
      // formik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class || formik.values.class,
          },
        },
      });

      setSubjects(data.result.map((d) => ({ label: d.name, value: d._id })));
      // entryFormik.setFieldValue("subject", data.result[0]._id);
      // formik.setFieldValue("subject", data.result[0]._id);
    } catch (error) {
      console.error(error);
    }
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.teacherActivity.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.teacherActivity.create,
          payload
        );
      }
      formik.handleSubmit();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEmployees();
  }, [selectedSetting]);

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting]);

  const entryFormik = useFormik({
    initialValues: {
      academicYear: dataToEdit?.academicYear._id || "",
      class: dataToEdit?.class._id || "",
      section: dataToEdit?.section._id || "",
      subject: dataToEdit?.subject._id || "",
      topic: dataToEdit?.topic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const formik = useFormik({
    initialValues: {
      teacher: "",
      class: "",
      section: "",
      subject: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getData,
  });

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections(entryFormik.values.class);
      getSubject();
      formik.resetForm();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    if (formik.values.class) {
      getSections(formik.values.class);
      getSubject();
      entryFormik.resetForm();
    }
  }, [formik.values.class]);

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.teacherActivity.delete + "/" + id);

      getData();
      formik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setSelectValue(1);
  };

  return (
    <>
      <PageHeader title="Teacher Activity" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["All Activity", dataToEdit ? "Edit Activity" : "Add Activity"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="teacher"
                  formik={formik}
                  label="Select Teacher"
                  options={employees}
                />
              </Grid>
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="class"
                  formik={formik}
                  label="Class"
                  options={classes}
                />
              </Grid>
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={formik}
                  label="Section"
                  options={sections}
                />
              </Grid>
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="subject"
                  formik={formik}
                  label="Subject"
                  options={subjects}
                />
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4} item>
                <FormDatePicker
                  formik={formik}
                  label="From Date"
                  name="fromDate"
                />
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={4} item>
                <FormDatePicker formik={formik} label="To Date" name="toDate" />
              </Grid>
              <Grid
                xs={12}
                md={12}
                lg={12}
                item
                display={"flex"}
                justifyContent={"flex-end"}>
                <LoadingButton
                  loading={loadingFind}
                  size="small"
                  type="submit"
                  variant="contained">
                  Find
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <CustomTable
          actions={["edit", "delete"]}
          module="Teacher Activity"
          tableKeys={teacherActivityTableKeys}
          bodyDataModal="teacher activity"
          bodyData={data}
          onDeleteClick={handleDelete}
          onEditClick={handleEditClick}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={entryFormik.handleSubmit}>
            <Grid rowSpacing={1} columnSpacing={2} container>
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
                  name="section"
                  formik={entryFormik}
                  label="Select Section"
                  options={sections}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="subject"
                  formik={entryFormik}
                  label="Select subject"
                  options={subjects}
                />
              </Grid>

              <Grid xs={12} md={12} lg={12} item>
                <FormInput
                  required={true}
                  name="topic"
                  formik={entryFormik}
                  label="Topic covered"
                />
              </Grid>

              <Grid
                xs={12}
                md={12}
                lg={12}
                mt={1}
                display="flex"
                justifyContent="flex-end"
                gap={1}
                item>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={handleClose}>
                  Cancel
                </Button>
                <LoadingButton
                  loading={loading}
                  size="small"
                  type="submit"
                  variant="contained">
                  {dataToEdit ? "Update" : "Submit"}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </TabPanel>
    </>
  );
}
