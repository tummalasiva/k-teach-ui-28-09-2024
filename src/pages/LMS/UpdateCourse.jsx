import React, { useContext, useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import FormSelect from "../../forms/FormSelect";
import FileSelect from "../../forms/FileSelect";
import FormInput from "../../forms/FormInput";
import AddIcon from "@mui/icons-material/Add";
import StickyBar from "../../components/StickyBar";
import { LoadingButton } from "@mui/lab";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FormBox = styled(Box)(({ theme }) => ({
  padding: "20px 8px",
  borderRadius: "10px",
  margin: "10px 0px",
  borderRight: "10px",
  border: "1px solid lightGrey",
  backgroundColor: "whitesmoke",
}));

export default function UpdateCourse() {
  const { selectedSetting } = useContext(SettingContext);
  const [classData, setClassData] = useState([]);
  const [selectImg, setSelectImg] = useState([]);
  const [subject, setSubject] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const course = (location.state && location.state.courseData) || null;

  console.log(course, "mmmmmmmmm==============");

  const [inputlist, setInputList] = useState(
    course?.courseDetails?.overview || [{ point: "" }]
  );
  const [inputlistBenifits, setInputListBenifits] = useState(
    course?.courseDetails?.benefits || [{ point: "" }]
  );

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
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        description: values.description,
        classIds: values.class,
        subject: values.subject,
        title: values.title,
        isTrending: values.isTrending,

        courseDetails: {
          overview: inputlist,
          benefits: inputlistBenifits,
        },
      };
      const formData = new FormData();
      formData.append("bodyData", JSON.stringify(payload));
      formData.append("schoolId", selectedSetting._id);
      selectImg.forEach((file) => formData.append("thumbnailImage", file));

      const { data } = await put(
        PRIVATE_URLS.course.update + "/" + course._id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/sch/lms/courses");
    } catch (error) {
      console.log(error);
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
      setSelectImg(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setSelectImg(selectImg.filter((img) => img.name != fileName));
  };

  const entryFormik = useFormik({
    initialValues: {
      class: course ? course.class?.map((s) => s._id) : [],
      subject: "",
      title: course ? course.title : "",
      description: course ? course.description : "",
      isTrending: course?.isTrending || false,
      overview: course?.courseDetails.overview || [],
      benefits: course?.courseDetails.benefits || [],
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: entryFormik.values.class },
        },
      });
      setSubject(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClass();
  }, []);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSubject();
    }
  }, [entryFormik.values.class, selectedSetting]);

  const handleAddClick = () => {
    setInputList([...inputlist, { point: "" }]);
  };

  const handleAddClickBenifites = () => {
    setInputListBenifits([...inputlistBenifits, { point: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const overviewList = [...inputlist];

    let newList = overviewList.map((l, i) =>
      i === index ? { ...l, point: value } : { ...l }
    );
    setInputList(newList);
  };

  const handleInputChangeBenifits = (e, index) => {
    const { value } = e.target;
    const benifitsList = [...inputlistBenifits];
    let newList = benifitsList.map((l, i) =>
      i === index ? { ...l, point: value } : { ...l }
    );
    setInputListBenifits(newList);
  };

  const handleRemoveClick = (i) => {
    const list = [...inputlist];
    list.splice(i, 1);
    setInputList(list);
  };

  const handleRemoveClickBenifits = (i) => {
    const list = [...inputlistBenifits];
    list.splice(i, 1);
    setInputListBenifits(list);
  };

  return (
    <>
      <PageHeader title="Add Course" />
      <form onSubmit={entryFormik.handleSubmit}>
        <FormBox>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                multiple={true}
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                options={classData}
              />
            </Grid>
            {entryFormik.values.class.length <= 1 && (
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="subject"
                  formik={entryFormik}
                  label="Select Subject"
                  options={subject}
                />
              </Grid>
            )}

            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="title"
                formik={entryFormik}
                label="Enter Course Name"
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FileSelect
                multi={false}
                name="thumbnailImage"
                label="Select Thumbnail Image"
                onChange={(e) => handleChangeFiles(e)}
                customOnChange={true}
                selectedFiles={selectImg}
                onRemove={(fileName) => handleRemoveFile(fileName)}
              />
            </Grid>
          </Grid>
        </FormBox>
        <FormBox>
          <Grid container spacing={2}>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="description"
                formik={entryFormik}
                label="Enter  Description"
              />
            </Grid>
          </Grid>
        </FormBox>
        <FormBox>
          <Grid container spacing={2}>
            <Grid xs={12} md={12} lg={12} item>
              {inputlist.map((data, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    gap: "5px",
                  }}
                >
                  <KeyboardDoubleArrowRightIcon
                    fontSize="small"
                    sx={{ color: "#1b3779", mt: 1 }}
                  />

                  <TextField
                    size="small"
                    placeholder="Enter Overview"
                    label="Enter Overview"
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: "5px",
                      mt: 1,
                    }}
                    value={data.point || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="overview"
                    inputProps={{
                      maxLength: 200,
                    }}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <Tooltip title="Delete">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => handleRemoveClick(i)}
                      color="error"
                    />
                  </Tooltip>
                </Box>
              ))}
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleAddClick}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormBox>
        <FormBox>
          <Grid container spacing={2}>
            <Grid xs={12} md={12} lg={12} item>
              {inputlistBenifits.map((data, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <KeyboardDoubleArrowRightIcon
                    fontSize="small"
                    sx={{ color: "#1b3779", mt: 1 }}
                  />
                  <TextField
                    size="small"
                    placeholder="Enter What You Will Learn"
                    label="Enter What You Will Learn"
                    variant="outlined"
                    sx={{ mb: "5px", mt: 1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    name="benefits"
                    value={data.point || ""}
                    inputProps={{
                      maxLength: 200,
                    }}
                    onChange={(e) => handleInputChangeBenifits(e, i)}
                  />
                  <Tooltip title="Delete">
                    <DeleteIcon
                      fontSize="small"
                      color="error"
                      onClick={() => handleRemoveClickBenifits(i)}
                    />
                  </Tooltip>
                </Box>
              ))}
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleAddClickBenifites}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormBox>

        <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "60px" }}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={entryFormik.values.isTrending} />}
              name="isTrending"
              onChange={(e) => {
                entryFormik.setFieldValue("isTrending", e.target.checked);
              }}
              label="This course is trending?"
            />
          </FormGroup>
        </Grid>

        <StickyBar
          content={
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "5px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate(-1)}
                color="error"
                size="small"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={entryFormik.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          }
        />
      </form>
    </>
  );
}
