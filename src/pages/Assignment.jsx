import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { assignmentTableKeys } from "../data/tableKeys/assignmentData";
import CustomTable from "../components/Tables/CustomTable";
import TabPanel from "../components/Tabs/TabPanel";
import TabList from "../components/Tabs/Tablist";
import FormSelect from "../forms/FormSelect";
import FormDatePicker from "../forms/FormDatePicker";
import FormInput from "../forms/FormInput";
import { PRIVATE_URLS } from "../services/urlConstants";
import { get, post, put } from "../services/apiMethods";
import SettingContext from "../context/SettingsContext";
import FileSelect from "../forms/FileSelect";
import { LoadingButton } from "@mui/lab";
import AddEditAssignment from "./AddEditAssignment";

export default function Assignment() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [value, setSelectValue] = useState(0);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // get section
  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.assignment.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: values.class,
            section: values.section,
          },
        },
      });

      setData(
        data.result.map((assignment) => ({
          ...assignment,
          className: assignment.class.name,
          subjectName: assignment.subject.name,
          id: assignment._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get section
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
    },
    onSubmit: getData,
    enableReinitialize: true,
  });

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
      getData();
    }
  }, [entryFormik.values.class]);

  const handleClose = () => {
    setSelectValue(0);
    setDataToEdit(null);
    getData();
  };

  const handleEditClick = (data) => {
    // console.log(data, "fff");
    setDataToEdit({
      ...data,
      class: data.class._id,
      subject: data.subject._id,
    });
    setSelectValue(1);
  };

  useEffect(() => {
    if (value === 0) {
      setDataToEdit(null);
    }
  }, [value]);

  // console.log(dataToEdit, "dataToEdit");

  return (
    <>
      <PageHeader title="Assignment" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={[
          "Assignment",
          dataToEdit && value != 0 ? "Edit Assignment" : "Add Assignment",
        ]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}
          >
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
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button
                size="small"
                type="submit"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={["view", "edit", "delete"]}
          bodyDataModal="Assignment"
          bodyData={data}
          tableKeys={assignmentTableKeys}
          onEditClick={handleEditClick}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <AddEditAssignment
          dataToEdit={dataToEdit}
          handleClose={handleClose}
          onUpdateFormik={entryFormik}
        />
      </TabPanel>
    </>
  );
}
