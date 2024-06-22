/** @format */

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
import { del, get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { downloadFile } from "../../utils";

const Status_Options = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];

export default function AdmitStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);

  const handelAddStudent = (e) => {
    navigation("/sch/student/add-student");
  };

  const handleEditClick = (data) => {
    navigation(`/sch/student/edit-student/${data._id}`);
  };

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({ label: `${d.from}-${d.to}`, value: d._id }))
      );
      entryFormik.setFieldValue("academicYear", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async (values) => {
    try {
      if (values.section === "all") {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              academicYear: values.academicYear,
              "academicInfo.class": values.class,
              active: values.active,
            },
          },
        });

        setData(
          data.result.map((s) => ({
            ...s,
            section: s.academicInfo.section,
            rollNumber: s.academicInfo,
          }))
        );

        console.log(data.result, "kkkkkkkkk");
      } else {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              academicYear: values.academicYear,
              "academicInfo.class": values.class,
              "academicInfo.section": values.section,
              active: values.active,
            },
          },
        });
        setData(
          data.result.map((s) => ({
            ...s,
            section: s.academicInfo.section,
            rollNumber: s.academicInfo,
          }))
        );

        console.log(data.result, "kkkkkkkkk");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "all",
      active: true,
    },
    onSubmit: getList,
    enableReinitialize: true,
  });

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: entryFormik.values.class },
        },
      });

      const section = data.result.map((s) => ({
        label: s.name,
        value: s._id,
      }));

      const sectionAllOption = [{ label: "All", value: "all" }, ...section];
      setSectionData(sectionAllOption);
      // entryFormik.setFieldValue("section", data.result[0]?._id);
      entryFormik.setFieldValue("section", "all");
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
      entryFormik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get data on page load
  useEffect(() => {
    getAcademicYear();
    getClass();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting._id]);

  useEffect(() => {
    if (
      entryFormik.values.academicYear &&
      entryFormik.values.class &&
      entryFormik.values.section
    ) {
      entryFormik.handleSubmit();
    }
  }, [entryFormik.values, selectedSetting._id]);

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.student.delete + "/" + id);
      entryFormik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetDownloadExcel = async () => {
    try {
      const getExcel = await get(PRIVATE_URLS.student.downloadStudentsExcel, {
        params: {
          schoolId: selectedSetting._id,
          academicYearId: entryFormik.values.academicYear,
          classId: entryFormik.values.class,
          sectionId: entryFormik.values.section,
          active: entryFormik.values.active,
        },
        responseType: "blob",
      });

      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        getExcel.data,
        "students.xlsx"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDownloadPdf = async () => {
    try {
      const getStudentCheckoutPdf = await get(
        PRIVATE_URLS.student.donwloadStudentsPdf,
        {
          params: {
            schoolId: selectedSetting._id,

            academicYearId: entryFormik.values.academicYear,
            classId: entryFormik.values.class,

            active: entryFormik.values.active,
          },
          responseType: "blob",
        }
      );

      downloadFile(
        "application/pdf",
        getStudentCheckoutPdf.data,
        "student-list.pdf"
      );
    } catch (error) {
      console.log(error);
    }
  };

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
              justifyContent="flex-start">
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
          }}>
          <Stack direction="row">
            <Tooltip title="Download">
              <IconButton onClick={handleGetDownloadExcel}>
                <DownloadForOfflineSharpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={handleGetDownloadPdf}>
                <PrintSharp />
              </IconButton>
            </Tooltip>
            <Link to="/sch/student/bulk-photo">
              <Button size="small" sx={{ p: 1, ml: 1 }} variant="contained">
                Bulk Photo
              </Button>
            </Link>
          </Stack>
        </Box>
      </Paper>
      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={admitStudentTableKeys}
        bodyDataModal="students"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />
      {/* add student */}
      <AddForm title="Add Students" onAddClick={handelAddStudent} />
    </>
  );
}
