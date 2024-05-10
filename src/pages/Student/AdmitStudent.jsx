import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { PrintSharp } from "@mui/icons-material";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";

import FormSelect from "../../forms/FormSelect";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { admitStudentTableKeys } from "../../data/tableKeys/admitStudentData";
import { Link, useNavigate } from "react-router-dom";
import AddForm from "../../forms/AddForm";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
const Status_Options = [
  { label: "Active", value: true },
  { label: "InActive", value: false },
];

export default function AdmitStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const handelAddStudent = (e) => {
    navigation("/sch/student/add-student");
  };

  const handleEditClick = (data) => {
    navigation(`/sch/student/edit-student/${data._id}`);

    console.log(data, "kkkk");
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({ label: `${d.from}-${d.to}`, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: selectedClass },
        },
      });
      setSectionData(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };
  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClassData(data.result.map((s) => ({ label: s.name, value: s._id })));
      if (data.result?.length) {
        setSelectedClass(data.result[0]._id);
        entryFormik.setFieldValue("class", data.result[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAcademicYear();
    getClass();
  }, []);
  useEffect(() => {
    if (selectedClass) {
      getSection();
    }
  }, [selectedClass, selectedSetting]);

  useEffect(() => {
    entryFormik.setFieldValue("class", selectedClass);
  }, [selectedClass]);

  const getList = async (values) => {
    try {
      const { academicYear, class: selectedClass, section, active } = values;

      const params = {
        schoolId: selectedSetting._id,
        search: {
          academicYear,
          class: selectedClass,
          section,
          active,
        },
      };

      const { data } = await get(PRIVATE_URLS.student.list, { params });
      setData(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      status: "",
    },
    onSubmit: getList,
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Students" />
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
                options={classData}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                options={sectionData}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="active"
                formik={entryFormik}
                label="Select Status"
                options={Status_Options}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="flex-start"
            >
              <Button size="small" variant="contained" type="submit">
                Find
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Stack direction="row">
            <Tooltip title="Download">
              <IconButton>
                <DownloadForOfflineSharpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton>
                <PrintSharp />
              </IconButton>
            </Tooltip>
            <Link to={"/student/student-bulk-photo"}>
              <Button size="small" sx={{ p: 1, ml: 1 }} variant="contained">
                Bulk Photo
              </Button>
            </Link>
          </Stack>
        </Box>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={admitStudentTableKeys}
        bodyDataModal="students"
        bodyData={data}
        onEditClick={handleEditClick}
      />
      {/* add student */}
      <AddForm title="Add Students" onAddClick={handelAddStudent} />
    </>
  );
}
