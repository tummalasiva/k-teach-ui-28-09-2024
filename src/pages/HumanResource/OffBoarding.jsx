import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";

import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { offBoardingDataTableKeys } from "../../data/tableKeys/offBoardingData";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
const Gender_Options = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const BloodGroup_Options = [
  {
    label: "A+",
    value: "a",
  },
  {
    label: "A-",
    value: "a-",
  },
  {
    label: "B+",
    value: "b+",
  },
  {
    label: "B-",
    value: "b-",
  },
  {
    label: "O+",
    value: "o+",
  },
  {
    label: "O-",
    value: "o-",
  },
  {
    label: "AB+",
    value: "ab+",
  },
  {
    label: "AB-",
    value: "ab-",
  },
];
export default function OffBoarding() {
  const [value, setSelectValue] = useState(0);
  const [formFields, setFormFields] = useState([{ name: "", file: null }]);
  const [data, setData] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      userType: "",
      user: "",
      name: "",
      bloodGroup: "",
      dob: dayjs(new Date()),
      joiningDate: dayjs(new Date()),
      resignDate: dayjs(new Date()),
      relivingDate: dayjs(new Date()),
      gender: "",
      contactNumber: "",
      status: "",
      feedback: "",
    },
    onSubmit: console.log("nnnn"),
  });
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  const handleAddRow = () => {
    setFormFields([...formFields, { name: "", file: "" }]);
  };
  const handleRemove = (index) => {
    const list = [...formFields];
    list.splice(index, 1);
    setFormFields(list);
  };

  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Off-Boarding letter list", "Add Off-Boarding  Letter"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit"]}
          tableKeys={offBoardingDataTableKeys}
          bodyDataModal="Off-Boarding letter"
          bodyData={data}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="userType"
                formik={entryFormik}
                label="Select User Type"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="user"
                formik={entryFormik}
                label="Select User"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item alignSelf="center">
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Basic Information
              </Typography>
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="gender"
                formik={entryFormik}
                label="Select Gender"
                options={Gender_Options}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="bloodGroup"
                formik={entryFormik}
                label="Select Blood Group"
                options={BloodGroup_Options}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                required={true}
                name="dob"
                formik={entryFormik}
                label="DOB"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Working Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                required={true}
                name="joiningDate"
                formik={entryFormik}
                label="Joining Date"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                required={true}
                name="resignDate"
                formik={entryFormik}
                label="Resign Date"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                required={true}
                name="relivingDate"
                formik={entryFormik}
                label="RelivingD ate"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Profile Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Select Status"
              />
            </Grid>

            <Grid xs={12} md={12} lg={9} item>
              <FormInput
                required={true}
                name="feedback"
                formik={entryFormik}
                label="Feedback"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography variant="h6" fontWeight="bold">
                Additional Document Information
              </Typography>
            </Grid>
            {formFields.map((field, index) => (
              <>
                <Grid xs={12} md={6} lg={4} item>
                  <FormInput
                    required={true}
                    name="name"
                    formik={entryFormik}
                    label="Name"
                  />
                </Grid>

                <Grid xs={12} md={12} lg={4} item>
                  <FormInput
                    required={true}
                    name="file"
                    formik={entryFormik}
                    label="Select Image"
                    type="file"
                  />
                </Grid>
                <Grid item xs={1} md={1} lg={3} mt={1} alignSelf="center">
                  <Button onClick={() => handleRemove(index)}>
                    <ClearIcon color="error" />
                  </Button>
                </Grid>
              </>
            ))}
            <Grid xs={12} md={12} lg={12} item>
              <Button
                size="small"
                variant="outlined"
                onClick={handleAddRow}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button size="small" color="error" variant="contained">
            Cancel
          </Button>
          <Button size="small" variant="contained">
            Submit
          </Button>
        </Box>
      </TabPanel>
    </>
  );
}
