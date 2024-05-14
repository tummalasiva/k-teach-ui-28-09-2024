import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import AddForm from "../../forms/AddForm";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
  Modal,
} from "@mui/material";
import CustomSelect from "../../forms/CustomSelect";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, put } from "../../services/apiMethods";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import DialogContentText from "@mui/material/DialogContentText";
import ClearIcon from "@mui/icons-material/Clear";
import Download from "@mui/icons-material/Download";
import FileSelect from "../../forms/FileSelect";
import image from "../../assets/images/deleteicon.png";

const Data = styled(TableCell)(() => ({
  textAlign: "center",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",

  boxShadow: 24,
  p: 2,
};

const Heading = styled(TableCell)(() => ({
  fontWeight: "bold",
  textAlign: "center",
  color: "#ffff",
  backgroundColor: "#1b3779",
}));
const DownloadBox = styled(Box)(() => ({
  background: `rgb(133 140 223 / 19%)`,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "10px",
  color: "black",
}));

export default function Courses() {
  const { selectedSetting } = useContext(SettingContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [materialURL, setMaterialURL] = useState();
  const [open, setOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const [material, setMaterial] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadLoad, setUploadLoad] = useState(false);
  const navigate = useNavigate();

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
          search: { classIds: selectedClass },
        },
      });

      setData(data.result);

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

  // useEffect(() => {
  //   if (classData.length > 0) {
  //     setSelectedClass([classData[0]?.value]);
  //   }
  // }, [classData, selectedSetting]);

  const handleSubmit = () => {
    navigate("/sch/lms/add-courses");
  };

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handeleClickEdit = (data) => {
    navigate(`/sch/lms/edit-courses/${data._id}`, {
      state: { courseData: data },
    });
  };

  const handleNavigateCourse = (id) => {
    const selectedCourse = data.find((course) => course._id === id);
    if (selectedCourse) {
      const selectedCourseTitle = selectedCourse.title;
      navigate("/sch/lms/course-content", {
        state: {
          selectedCourseIds: id,
          selectedCourseTitle: selectedCourseTitle,
        },
      });
    }
  };

  const handleClickOpen = (id, material) => {
    console.log(material, "materiaAAAl");
    setOpen(true);
    setCourseId(id);
    if (material) {
      const materialURLs = new URL(material);
      const fileName = decodeURIComponent(
        materialURLs.pathname.split("/").pop()
      );
      setMaterial(fileName);
    }
    setMaterialURL(material);
  };

  const handleClose = () => {
    setOpen(false);
    setMaterial(null);
  };

  const handleDeleteMaterial = async (e) => {
    e.preventDefault();
    try {
      const res = await del(
        PRIVATE_URLS.course.deleteMaterial + "/" + courseId
      );
      getCourse();
      setMaterial(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadLoad(true);
    try {
      const formData = new FormData();
      formData.append("schoolId", selectedSetting._id);
      formData.append("file", file);

      const { data } = await put(
        PRIVATE_URLS.course.uploadCourseMaterial + "/" + courseId,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadLoad(false);
      getCourse();
      handleClose();
    } catch (error) {
      console.error(error);
      setUploadLoad(false);
    }
    setUploadLoad(false);
  };

  const handleDownload = () => {
    try {
      window.open(materialURL, "_blank");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteModal(true);
    setCourseId(id);
  };
  const handleDeleteCourse = async () => {
    try {
      const res = await del(PRIVATE_URLS.course.delete + "/" + courseId);
      getCourse();
      handleCloseDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PageHeader title="Courses" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
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

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <Heading>S.No</Heading>
              <Heading>Class</Heading>
              <Heading>Course Name</Heading>
              <Heading>Subject </Heading>
              <Heading>Duration</Heading>
              <Heading>Content</Heading>
              <Heading>Material</Heading>
              <Heading>Action</Heading>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course, index) => (
                <TableRow key={course._id}>
                  <Data>{index + 1}</Data>
                  <Data>{course.class.map((c) => c.name).join(" | ")}</Data>
                  <Data>{course.title}</Data>
                  <Data>
                    {course.class.length > 1
                      ? "Universal"
                      : course.subject.name}
                  </Data>
                  <Data>{course.courseHours}</Data>
                  <Data>
                    <Button onClick={() => handleNavigateCourse(course._id)}>
                      Upload
                    </Button>
                  </Data>

                  <Data>
                    <Tooltip title="Upload Material">
                      <Button
                        onClick={() =>
                          handleClickOpen(course._id, course.material)
                        }
                      >
                        <FileUploadIcon />
                      </Button>
                    </Tooltip>
                  </Data>

                  <Data>
                    <Tooltip title="Update course">
                      <Button
                        onClick={() => handeleClickEdit(course)}
                        sx={{ color: "#1b3779" }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleOpenDeleteModal(course._id)}
                      >
                        <Delete color="error" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Data>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!data.length && (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", margin: "5px", padding: "5px" }}
          >
            No data found
          </Typography>
        )}
      </TableContainer>
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
          justifyContent: "flex-start",
          alignItems: "center",
          my: 1,
        }}
      />

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {"Upload Your Material"} {data.material}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input type="file" onChange={handleFileChange} />
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          {material ? (
            <DownloadBox px={2} py={1}>
              <Typography>{material}</Typography>
              <Stack direction={"row"}>
                {material ? (
                  <Button size="small" onClick={handleDownload} color="error">
                    <Download fontSize="small" color="primary" />
                  </Button>
                ) : null}

                <Button
                  size="small"
                  onClick={handleDeleteMaterial}
                  color="error"
                >
                  <ClearIcon fontSize="small" />
                </Button>
              </Stack>
            </DownloadBox>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            size="small"
            variant="contained"
            loading={uploadLoad}
            onClick={handleUpload}
            autoFocus
          >
            Upload
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Modal open={deleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={style}>
          <Box sx={{ textAlign: "center", margin: "10px auto" }}>
            <img src={image} width={50} height={50} />
          </Box>

          <Typography
            textAlign="center"
            sx={{ fontSize: "18px", fontWeight: 700 }}
          >
            Delete Confirmation
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Are you sure want to delete this item?
          </Typography>
          <Box
            my={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleDeleteCourse}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <AddForm onAddClick={handleSubmit} />
    </>
  );
}
