/** @format */

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import SettingContext from "../../context/SettingsContext";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import AddOrUpdateExamSchedule from "./AddOrUpdateExamSchedule";
import EditIcon from "@mui/icons-material/Edit";
import copy from "clipboard-copy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import DeleteModal from "../../forms/DeleteModal";

export default function ExamSchedules() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter pagination==========
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // get years
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
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
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get exam list
  const getExamList = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.preadmissionExam.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: entryFormik?.values.academicYear,
            class: entryFormik?.values.class,
          },
        },
      });
      // console.log(data.result, "exam list");
      setExams(data.result.map((d) => ({ label: d.examName, value: d._id })));
      entryFormik.setFieldValue("exam", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get exam list
  const getExamSchedules = async (values) => {
    console.log(values, "exam values");

    try {
      setLoading(true);
      const { data } = await get(PRIVATE_URLS.preadmissionExamSchedule.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: values.academicYear,
            class: values.class,
            exam: values.exam,
            fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
          },
        },
      });
      console.log(data.result, "exam list");
      setData(data.result.map((d) => ({ ...d, class: d.class.name })));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      exam: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getExamSchedules,
  });

  useEffect(() => {
    if (entryFormik?.values.academicYear && entryFormik?.values.class) {
      getExamList();
    }
  }, [
    entryFormik?.values.academicYear,
    entryFormik?.values.class,
    selectedSetting,
  ]);

  const AddExamSchedules = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setDataToEdit(null);
  };

  const handleCopyLink = (copylink) => {
    console.log(copylink, "copylink");
    copy(`${copylink}`);
    toast.success("Exam Link Copied successfully");
  };

  const handleUpdateLink = async (id) => {
    try {
      const res = await put(
        `${PRIVATE_URLS.preadmissionExamSchedule.enableExamLink}${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitNotify = async (e, id) => {
    e.preventDefault();
    try {
      const res = await post(
        `${PRIVATE_URLS.preadmissionExamSchedule.sendVenueDetailsToStudents}/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(
        PRIVATE_URLS.preadmissionExamSchedule.delete + "/" + id
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Exam Schedules" />

      <AddForm title="Add Exam Schedules" onAddClick={AddExamSchedules} />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
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
              options={classes}
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

          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="From Date"
              name="fromDate"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="To Date"
              name="toDate"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained" type="submit">
              Find
            </Button>
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
              <TableCell align="center">SL</TableCell>
              <TableCell align="center">Academic Year</TableCell>

              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Exam</TableCell>
              <TableCell align="center">Exam Link</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          {data.map((data, index) => (
            <TableRow>
              <TableCell align="center">
                {page * rowsPerPage + index + 1}
              </TableCell>
              <TableCell align="center">
                {data.academicYear.academicYearFrom}-
                {data.academicYear.academicYearTo}
              </TableCell>

              <TableCell align="center">{data.class.name}</TableCell>
              <TableCell align="center">{data.exam?.examName}</TableCell>
              <TableCell align="center">
                <Tooltip
                  title={`${
                    data.examLinkEnabled === true ? "Enable" : "Disable"
                  }`}>
                  <Switch
                    key={data._id}
                    onClick={() => handleUpdateLink(data._id)}
                    defaultChecked={data.examLinkEnabled ? true : false}
                  />
                </Tooltip>

                <Tooltip title="Copy Link">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleCopyLink(data?.examLink)}>
                    <ContentCopyIcon fontSize="small" color="primary" />
                  </IconButton>
                </Tooltip>
              </TableCell>

              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}>
                  <Tooltip title="Update">
                    <IconButton
                      style={{
                        color: "#1b3779",
                      }}
                      size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteModal(data._id)}>
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <DeleteModal
                    deleteModal={deleteModal}
                    handleDelete={handleDelete}
                    id={data._id}
                    setDeleteModal={setDeleteModal}
                  />

                  <Button
                    size="small"
                    onClick={(e) => handleSubmitNotify(e, data._id)}
                    disabled={data.notified === true}
                    variant="contained">
                    {data.notified === true ? "Notified" : "Notify"}
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        {!data.length && (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", margin: "5px", padding: "5px" }}>
            No data found
          </Typography>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: "flex",
            justifyContent: "flex-start,",
          }}
        />
      </TableContainer>

      {/* ==== add/edit exam schedules ======== */}
      <AddOrUpdateExamSchedule
        open={open}
        handleClose={handleClose}
        selectedSetting={selectedSetting}
      />
    </>
  );
}
