import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { hostelMemberTableKeys } from "../../data/tableKeys/hostelMemberData";
import { hostelNNonMemberTableKeys } from "../../data/tableKeys/hostelNonMember";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";

export default function HostelMember() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });
  const formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Hostel Member" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Member List", "Non Member List"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={entryFormik}
                label="Select Academic Year"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                // options={""}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          tableKeys={hostelMemberTableKeys}
          bodyData={data}
          bodyDataModal="hostel member"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={formik}
                label="Select Academic Year"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={formik}
                label="Select Class"
                // options={""}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={formik}
                label="Select Section"
                // options={""}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          tableKeys={hostelNNonMemberTableKeys}
          bodyData={data}
          bodyDataModal="hostel member"
        />
      </TabPanel>
    </>
  );
}
