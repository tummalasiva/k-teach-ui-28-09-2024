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

const FormBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: "lightgray",
  marginBottom: "20px",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  fontSize: "14px",
  padding: "5px 10px",
  borderBottom: "1px solid",
  borderBottomColor: "lightgray",
  fontWeight: "bold",
  color: "white",
  background: theme.palette.secondary.main,
}));

export default function AddCourse() {
  const { selectedSetting } = useContext(SettingContext);
  const [classData, setClassData] = useState([]);
  const [selectImg, setSelectImg] = useState([]);
  const [subject, setSubject] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputlistOverview, setInputListOverview] = useState(
    dataToEdit?.courseDetails.overview || [{ point: "" }]
  );
  const [inputlistBenefits, setInputListBenefits] = useState(
    dataToEdit?.courseDetails.benefits || [{ point: "" }]
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
          overview: inputlistOverview,
          benefits: inputlistBenefits,
        },
      };
      const formData = new FormData();
      formData.append("bodyData", JSON.stringify(payload));
      formData.append("schoolId", selectedSetting._id);
      selectImg.forEach((file) => formData.append("thumbnailImage", file));

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.course.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(PRIVATE_URLS.course.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(data, "mmmmmmmbbbbbbb");
      }
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
      class: [],
      subject: "",
      title: "",
      description: "",
      isTrending: false,
      overview: [],
      benefits: [],
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

  return (
    <>
      <PageHeader title="Add Course" />
      <form onSubmit={entryFormik.handleSubmit}>
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
          <Grid xs={12} md={12} lg={12} item>
            <FormInput
              required={true}
              name="description"
              formik={entryFormik}
              label="Enter  Description"
            />
          </Grid>
          <Grid xs={12} md={12} lg={12} item>
            {inputlistOverview.map((item, index) => (
              <Box key={index}>
                <FormInput
                  required={true}
                  name={`overview`}
                  formik={entryFormik}
                  label={`Enter Overview ${index + 1}`}
                />
              </Box>
            ))}
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                setInputListOverview([...inputlistOverview, { point: "" }]);
              }}
            >
              <AddIcon />
            </Button>
          </Grid>

          <Grid xs={12} md={12} lg={12} item>
            {inputlistBenefits.map((item, index) => (
              <Box key={index}>
                <FormInput
                  required={true}
                  name={`benefits`}
                  formik={entryFormik}
                  label={`Enter Benefits ${index + 1}`}
                />
              </Box>
            ))}
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                setInputListBenefits([...inputlistBenefits, { point: "" }]);
              }}
            >
              <AddIcon />
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={entryFormik.values.isTrending} />}
                name="isTrending"
                onChange={(e) => {
                  entryFormik.setFieldValue("isTrending", e.target.checked);
                }}
                label="This course is Trending?"
              />
            </FormGroup>
          </Grid>
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
              <Button variant="contained" color="error" size="small">
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
