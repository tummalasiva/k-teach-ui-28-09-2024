import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import PageHeader from "../components/PageHeader";
import { assignmentTableKeys } from "../data/tableKeys/assignmentData";
import CustomTable from "../components/Tables/CustomTable";
import TabPanel from "../components/Tabs/TabPanel";
import TabList from "../components/Tabs/Tablist";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../forms/FormSelect";
import FormDatePicker from "../forms/FormDatePicker";
import FormInput from "../forms/FormInput";
import { PRIVATE_URLS } from "../services/urlConstants";
import { get } from "../services/apiMethods";
import SettingContext from "../context/SettingsContext";

export default function Assignment() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subject, setSubject] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  console.log(selectedClass, "usha");

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      console.log(data, "clss");

      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      if (data.result?.length) {
        setSelectedClass(data.result[0]?._id);
        entryFormik.setFieldValue("class", data.result[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: selectedClass },
        },
      });
      console.log(data, "section");
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      setSections(data.result.filter((d) => ({ label: d.name, value: d._id })));
      // if (data.result?.length) {
      //   setSelectedClass(data.result[0]?._id);
      //   entryFormik.setFieldValue("class", data.result[0]._id);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: { schoolId: selectedSetting._id },
      });
      setSubject(data.result.map((d) => ({ label: d.name, value: d._id })));
      // if (data.result?.length) {
      //   setSelectedClass(data.result[0]?._id);
      //   entryFormik.setFieldValue("class", data.result[0]._id);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      title: "",
      class: "",
      section: "",
      subject: "",
      assignmentType: "",
      deadline: dayjs(new Date()),
      attachmentType: "",
      isPublish: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  const Formik = useFormik({
    initialValues: {
      class: "",
      section: "",
      subject: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    // entryFormik.setFieldValue("class", selectedClass);
    getClasses();
    getSections();
    getSubject();
  }, []);

  const handleChangeSelectedClass = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <>
      <PageHeader title="Assignment" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Assignment", "Add Assignment"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="selectedClass"
                // value={selectedClass}
                formik={Formik}
                // onChange={handleChangeSelectedClass}
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
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="Assignment"
          bodyData={data}
          tableKeys={assignmentTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="title"
                formik={entryFormik}
                label="Assignment Title"
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
                label="Select Subject"
                options={subject}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="assignmentType"
                formik={entryFormik}
                label="Select Assignment Type"
                options={[
                  { label: "Class", value: "class" },
                  { label: "Assignment", value: "assignment" },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                required={true}
                formik={entryFormik}
                name="deadline"
                label="Deadline"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="attachmentType"
                formik={entryFormik}
                label="Select Attachment Type"
                options={[
                  { label: "File", value: "File" },
                  { label: "Link", value: "Link" },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                name="isPublish"
                formik={entryFormik}
                label="Publish To Web"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput name="note" formik={entryFormik} label="Note" />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button
                size="small"
                type="submit"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
