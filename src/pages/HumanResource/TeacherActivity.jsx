import { Button, Grid, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { teacherActivityTableKeys } from "../../data/tableKeys/teacherActivityData";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import dayjs from "dayjs";
import FormDatePicker from "../../forms/FormDatePicker";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

export default function TeacherActivity() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      // if (data.result?.length) {
      //   setSelectedClass(data.result[0]._id);
      //   entryFormik.setFieldValue("class", data.result[0]._id);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: { schoolId: selectedSetting._id },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      // if (data.result?.length) {
      //   setSelectedClass(data.result[0]._id);
      //   entryFormik.setFieldValue("class", data.result[0]._id);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: { schoolId: selectedSetting._id },
      });
      setSubjects(data.result.map((d) => ({ label: d.name, value: d._id })));
      // if (data.result?.length) {
      //   setSelectedClass(data.result[0]._id);
      //   entryFormik.setFieldValue("class", data.result[0]._id);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    console.log(values, "valuesvaluesvalues");
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
        // getData();
      } else {
        const { data } = await post(
          PRIVATE_URLS.teacherActivity.create,
          payload
        );
        // getData();
      }
      // handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getClasses();
    getSections();
    getSubject();
  }, []);

  const entryFormik = useFormik({
    initialValues: {
      class: dataToEdit?.class || "",
      section: dataToEdit?.section || "",
      subject: dataToEdit?.subject || "",
      topic: dataToEdit?.topic || "",
    },
    onSubmit: handleCreateOrUpdate,
  });

  const formik = useFormik({
    initialValues: {
      teacher: "",
      selectedClass: "",
      selectedSection: "",
      selectedSubject: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Teacher Activity" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["All Activity", "Add Activity"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="teacher"
                formik={entryFormik}
                label="Select Teacher"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="selectedClass"
                formik={entryFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="selectedSeecion"
                formik={entryFormik}
                label="Select Section"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="selectedSubject"
                formik={entryFormik}
                label="Select Subject"
                // options={""}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={entryFormik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={entryFormik}
                label="To Date"
                name="toDate"
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
          actions={["edit"]}
          tableKeys={teacherActivityTableKeys}
          bodyDataModal="teacher activity"
          bodyData={data}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper
          sx={{ padding: 2, marginBottom: 2 }}
          component="form"
          onClick={entryFormik.handleSubmit}
        >
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={classes}
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
                label="Topic coverd"
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
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
