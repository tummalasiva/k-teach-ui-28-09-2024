import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { coursesDataTableKeys } from "../../data/tableKeys/lmsCoursesData";
import CustomTable from "../../components/Tables/CustomTable";
import { useNavigate } from "react-router-dom";
import AddForm from "../../forms/AddForm";
import { Grid, Paper } from "@mui/material";
import CustomSelect from "../../forms/CustomSelect";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";

export default function Courses() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const navigate = useNavigate();

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClassData(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get data on page load
  useEffect(() => {
    getClass();
  }, [selectedSetting]);

  const getCourse = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.course.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: selectedClass },
        },
      });

      setData(data.result.map((s) => ({ ...s, class: s.class })));

      console.log(data.result, "mmmmmmbbbbbbnnnnnn");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      getCourse();
    }
  }, [selectedClass, selectedSetting]);

  useEffect(() => {
    if (classData.length > 0) {
      setSelectedClass([classData[0]?.value]);
    }
  }, [classData]);

  const handleSubmit = () => {
    navigate("/sch/lms/add-courses");
  };

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
  };

  return (
    <>
      <PageHeader title="Courses" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <CustomSelect
              required={true}
              name="class"
              multiple={true}
              value={selectedClass}
              onChange={handleChange}
              label="Select Class"
              options={classData}
            />
          </Grid>
        </Grid>
      </Paper>

      <CustomTable
        actions={["edit"]}
        tableKeys={coursesDataTableKeys}
        bodyDataModal="course"
        bodyData={data}
      />

      <AddForm onAddClick={handleSubmit} />
    </>
  );
}
