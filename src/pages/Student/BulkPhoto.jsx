/** @format */

import React, { useContext, useEffect, useState } from "react";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FileSelect from "../../forms/FileSelect";

export default function BulkPhoto() {
  const { selectedSetting } = useContext(SettingContext);
  const navigate = useNavigate();
  const [academicYearList, setAcademicYearList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);

      setAcademicYearList(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      formik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: formik.values.class,
          },
        },
      });

      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: values.academicYear,
            "academicInfo.class": values.class,
            "academicInfo.section": values.section,
          },
        },
      });
      setStudents(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: getStudents,
    enableReinitialize: true,
  });

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);
  useEffect(() => {
    if (formik.values.class) {
      getSections();
    }
  }, [formik.values.class, selectedSetting]);

  useEffect(() => {
    if (
      formik.values.academicYear &&
      formik.values.class &&
      formik.values.section
    ) {
      getStudents(formik.values);
    }
  }, [
    formik.values.academicYear,
    formik.values.class,
    formik.values.section,
    selectedSetting,
  ]);

  const handleNavigateStudent = (student) => {
    navigate(`/sch/student/edit-student/${student._id}`);
  };

  const handleChangeFiles = async (e, studentId) => {
    const { files } = e.target;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("photo", files[0]);

      try {
        await put(
          PRIVATE_URLS.student.updatePhoto + "/" + studentId,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        getStudents(formik.values);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <PageHeader title="Bulk Photo" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="div"
            onSubmit={formik.handleSubmit}>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={formik}
                label="Select Academic Year"
                options={academicYearList}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={formik}
                label="Select Class"
                options={classes}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={formik}
                label="Select Section"
                options={sections}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item sx={{ alignSelf: "center" }}>
              <Button type="submit" variant="contained" size="small">
                Find
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}>
            <TableRow>
              <TableCell align="center">SL</TableCell>
              <TableCell align="center">Roll No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Photo</TableCell>
              <TableCell align="center">File</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {student.academicInfo.rollNumber}
                </TableCell>
                <TableCell align="center">{student.basicInfo.name}</TableCell>
                <TableCell align="center">
                  <Avatar src={student.photo} sx={{ margin: "auto" }} />
                </TableCell>
                <TableCell align="center" sx={{ maxWidth: "100px" }}>
                  {/* <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChangeFiles(e, student._id)}
                    style={{ display: "block", margin: "auto" }}
                  /> */}

                  <FileSelect
                    multi={false}
                    onChange={(e) => handleChangeFiles(e, student._id)}
                    customOnChange={true}
                    label="Select Image"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleNavigateStudent(student)}>
                      <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
