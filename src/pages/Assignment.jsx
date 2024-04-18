import React, { useState } from "react";
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

export default function Assignment() {
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: "",
      class: "",
      section: "",
      subject: "",
      type: "",
      deadline: dayjs(new Date()),
      attachmentType: "",
      isPublish: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

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
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                // options={}
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
              <FormSelect
                required={true}
                name="title"
                formik={entryFormik}
                label="Select Assignment Title"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="subject"
                formik={entryFormik}
                label="Select Subject"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="type"
                formik={entryFormik}
                label="Select Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Deadline"
                name="deadline"
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
                required={true}
                name="isPublish"
                formik={entryFormik}
                label="Is Publish To Web"
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note here"
              />
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
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
