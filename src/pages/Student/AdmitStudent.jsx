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
  Dialog,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { admitStudentTableKeys } from "../../data/tableKeys/admitStudentData";
import { Link, useNavigate } from "react-router-dom";
import AddForm from "../../forms/AddForm";
import SettingContext from "../../context/SettingsContext";
import { del, get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { downloadFile } from "../../utils";
import { LoadingButton } from "@mui/lab";
import DownloadIcon from "@mui/icons-material/Download";
import FileSelect from "../../forms/FileSelect";

const Status_Options = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];

const style = {
  bgcolor: "background.paper",
  height: "auto",
  p: 2,
};

export default function AdmitStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigation = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdmit, setOpenModalAdmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loader, setLoader] = useState(false);

  const [file, setFile] = useState([]);

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setFile(fileList);
    } else {
      console.log("No files selected");
    }
  };

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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGetDownloadPdf = async () => {
    try {
      setLoader(true);
      const getStudentPdf = await get(
        PRIVATE_URLS.student.downloadStudentsPdf,
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

      downloadFile("application/pdf", getStudentPdf.data, "student-list.pdf");
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handleSubmitBulkUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      file.forEach((f) => formData.append("file", f));
      const { data } = await put(PRIVATE_URLS.student.bulkUpdate, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUpdateSheet = async () => {
    try {
      const getExcel = await get(PRIVATE_URLS.student.bulkUpdateSheet, {
        params: {
          schoolId: selectedSetting._id,
          academicYearId: entryFormik.values.academicYear,
          classId: entryFormik.values.class,
          sectionId: entryFormik.values.section,
        },
        responseType: "blob",
      });

      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        getExcel.data,
        "student_list.xlsx"
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
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          {entryFormik.values.academicYear &&
            entryFormik.values.class &&
            entryFormik.values.section !== "all" && (
              <Stack gap={1} direction={{ xs: "column", sm: "row", md: "row" }}>
                <Tooltip title="Bulk Admit">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setOpenModalAdmit(true)}>
                    BULK ADMIT
                  </Button>
                </Tooltip>
                <Tooltip title="Bulk Update">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setOpenModal(true)}>
                    BULK UPDATE
                  </Button>
                </Tooltip>
              </Stack>
            )}

          <Stack direction="row">
            <Tooltip title="Download">
              <LoadingButton loading={loading} onClick={handleGetDownloadExcel}>
                <DownloadForOfflineSharpIcon color="primary" />
              </LoadingButton>
            </Tooltip>
            <Tooltip title="Print">
              <LoadingButton loading={loader} onClick={handleGetDownloadPdf}>
                <PrintSharp color="primary" />
              </LoadingButton>
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

      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        open={openModalAdmit}
        onClose={() => setOpenModalAdmit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                variant="h6"
                component="h2"
                textAlign="center"
                fontSize="20px"
                fontWeight="bold">
                Bulk Admit
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button variant="contained" endIcon={<DownloadIcon />}>
                Sample
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              {/* <FileSelect
             
                label="Select  File"
                onChange={(e) => handleChangeFiles(e)}
                customOnChange={true}
                selectedFiles={file}
   
                multi={false}
              /> */}
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="flex-end">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: { xs: "100%", sm: 350, md: 350, lg: 350 },
            },
          },
        }}>
        <Box sx={style}>
          <form onSubmit={handleSubmitBulkUpdate}>
            {" "}
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  variant="h6"
                  component="h2"
                  textAlign="center"
                  fontSize="20px"
                  fontWeight="bold">
                  Bulk Update
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  variant="contained"
                  onClick={handleGetUpdateSheet}
                  endIcon={<DownloadIcon />}>
                  Download
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FileSelect
                  label="Select File"
                  onChange={(e) => handleChangeFiles(e)}
                  customOnChange={true}
                  selectedFiles={file}
                  multi={false}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                display="flex"
                justifyContent="flex-end">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
