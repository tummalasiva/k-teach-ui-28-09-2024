/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { manageMarkTableKeys } from "../../data/tableKeys/manageMarkData";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import CustomInput from "../../forms/CustomInput";
import StickyBar from "../../components/StickyBar";

import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import FileSelect from "../../forms/FileSelect";
import { downloadFile } from "../../utils";

const modalStyle = {
  bgcolor: "background.paper",
  height: "auto",
  p: 2,
};

export default function ManageMark() {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);
  const [exams, setExams] = useState([]);
  const [subject, setSubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);
  const [updatingMarks, setUpdatingMarks] = useState(false);
  const [fetchingMarks, setFetchingMarks] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fileChoosen, setFileChoosen] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileChoosen(file);
    } else {
      setFileChoosen(null);
    }
  };

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setFileChoosen(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setFileChoosen(fileChoosen.filter((img) => img.name != fileName));
  };

  // get class list
  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get section list
  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSection(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get exam list
  const getExams = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });
      // console.log(data, "exam");
      setExams(data.result.map((e) => ({ label: e.title, value: e._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get subject list
  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSubject(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("subject", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMarks = async (values) => {
    try {
      setFetchingMarks(true);
      const { data } = await get(PRIVATE_URLS.studentMarks.listStudentMarks, {
        params: {
          schoolId: selectedSetting._id,
          classId: values.class,
          sectionId: values.section,
          subjectId: values.subject,
          examId: values.exam,
        },
      });
      setFetchingMarks(false);

      let previousValues = data.result.map((s) => ({
        rollNumber: s.academicInfo.rollNumber,
        name: s.basicInfo.name,
        studentId: s._id,
        obtainedMarks: s.studentMarks?.obtainedWrittenMarks || 0,
        comment: s.studentMarks?.comment || "",
        grade: s.studentMarks?.grade?.grade || "NA",
      }));

      setStudentMarks(previousValues);
    } catch (error) {
      setFetchingMarks(false);

      console.log(error);
    }
  };

  const updateStudentMarks = async () => {
    try {
      const payload = {
        schoolId: selectedSetting._id,
        classId: entryFormik.values.class,
        sectionId: entryFormik.values.section,
        subjectId: entryFormik.values.subject,
        examId: entryFormik.values.exam,
        studentMarks: studentMarks,
      };
      setUpdatingMarks(true);
      const { data } = await put(
        PRIVATE_URLS.studentMarks.updateStudentsMarks,
        payload
      );

      setStudentMarks(
        data.result.map((m) => ({
          studentId: m.student._id,
          rollNumber: m.student.academicInfo.rollNumber,
          name: m.student.basicInfo.name,
          obtainedMarks: m.obtainedWrittenMarks || 0,
          comment: m.comment,
          grade: m?.grade?.grade || "NA",
        }))
      );
      setUpdatingMarks(false);
    } catch (error) {
      console.log(error);
      setUpdatingMarks(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      exam: "",
      class: "",
      section: "",
      subject: "",
    },
    onSubmit: handleGetMarks,
  });

  useEffect(() => {
    getClass();
    getExams();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.section) {
      getSubject();
    }
  }, [entryFormik.values.class, entryFormik.values.section, selectedSetting]);

  useEffect(() => {
    setStudentMarks([]);
  }, [entryFormik.values]);

  const handleCustomInputChange = (e, index) => {
    let updatedMarks = [...studentMarks];
    updatedMarks[index][e.target.name] = e.target.value;
    setStudentMarks(updatedMarks);
  };

  const getbulkUpdateStudentMarksExcel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await get(
        PRIVATE_URLS.studentMarks.getbulkUpdateStudentMarks,
        {
          params: {
            schoolId: selectedSetting._id,
            classId: entryFormik.values.class,
            sectionId: entryFormik.values.section,
            subjectId: entryFormik.values.subject,
            examTermId: entryFormik.values.exam,
          },
          responseType: "blob",
        }
      );

      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        data,
        "studentMarks"
      );
    } catch (error) {}
  };

  const updateThroughScheet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("schoolId", selectedSetting._id);
      formData.append("classId", entryFormik.values.class);
      formData.append("sectionId", entryFormik.values.section);
      formData.append("subjectId", entryFormik.values.subject);
      formData.append("examTermId", entryFormik.values.exam);

      fileChoosen.forEach((f) => formData.append("file", f));
      const { data } = await put(
        PRIVATE_URLS.studentMarks.bulkUpdateStudentMarks,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <>
      <PageHeader title="Manage Marks" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              options={section}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="exam"
              formik={entryFormik}
              label="Select Exam"
              options={exams}
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
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Stack direction="row" spacing={2}>
              <LoadingButton
                loading={fetchingMarks}
                onClick={entryFormik.handleSubmit}
                size="small"
                variant="contained">
                Find
              </LoadingButton>
              <Button
                onClick={() => setOpenModal(true)}
                size="small"
                variant="contained">
                Bulk Update
              </Button>
            </Stack>
          </Grid>
        </Grid>
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
              <TableCell align="center">S.No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Roll Number
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Obtained Marks
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Grade
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentMarks.map((data, index) => (
              <TableRow key={data.studentId}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{data.name}</TableCell>

                <TableCell align="center">{data.rollNumber}</TableCell>

                <TableCell align="center">
                  <CustomInput
                    type="number"
                    style={{ maxWidth: "150px" }}
                    name="obtainedMarks"
                    value={data.obtainedMarks}
                    label="Obtained Marks"
                    onChange={(e) => handleCustomInputChange(e, index)}
                  />
                </TableCell>

                <TableCell align="center">{data.grade}</TableCell>

                <TableCell align="center">
                  <CustomInput
                    style={{ maxWidth: "200px" }}
                    name="comment"
                    value={data.comment}
                    label="Comment"
                    onChange={(e) => handleCustomInputChange(e, index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {studentMarks.length > 0 && (
        <StickyBar
          content={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <LoadingButton
                loading={updatingMarks}
                size="small"
                sx={{
                  background: "#1b3779",
                  ":hover": { background: "#1b3779" },
                }}
                onClick={updateStudentMarks}
                variant="contained">
                Update
              </LoadingButton>
            </div>
          }
        />
      )}

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
        <Box component={"form"} onSubmit={updateThroughScheet} sx={modalStyle}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                variant="h6"
                component="h2"
                textAlign="center"
                fontSize="20px"
                fontWeight="bold">
                Bulk Upload
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <LoadingButton
                // loading={downloadLoader}
                variant="contained"
                sx={{
                  width: "100%",
                  background: "rgb(27, 55, 121)",
                  ":hover": { background: "rgb(27, 55, 121)" },
                  color: "#fff",
                }}
                endIcon={<DownloadIcon />}
                onClick={getbulkUpdateStudentMarksExcel}>
                Download
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <LoadingButton
                // loading={downloadLoaderAll}
                variant="contained"
                style={{
                  width: "100%",
                  background: "rgb(27, 55, 121)",
                  ":hover": { background: "rgb(27, 55, 121)" },
                }}
                endIcon={<DownloadIcon />}
                // onClick={handleGetAllUploadSheet}
              >
                Download All Students
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FileSelect
                name="student_marks"
                label="Select updated File"
                onChange={(e) => handleChangeFiles(e)}
                customOnChange={true}
                selectedFiles={fileChoosen}
                onRemove={(fileName) => handleRemoveFile(fileName)}
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
              <LoadingButton
                // loading={sheetLoader}s
                variant="contained"
                sx={{
                  background: "rgb(27, 55, 121)",
                  ":hover": { background: "rgb(27, 55, 121)" },
                }}
                type="submit">
                Update Marks
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
