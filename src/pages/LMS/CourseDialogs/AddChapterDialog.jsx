/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";
import SettingContext from "../../../context/SettingsContext";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import { post, put } from "../../../services/apiMethods";
import { toast } from "react-toastify";
import FileSelect from "../../../forms/FileSelect";
import CourseContent from "../CourseContent";
import CourseContext from "../../../context/CourseContext";

export default function AddChapterDialog({
  title,
  open,
  setOpenChaper = () => {},
  setChapterData = () => {},
  // onUpdate = () => {},
  // courseId,
  chapterData,
}) {
  const { selectedSetting } = useContext(SettingContext);
  const { courseId, onUpdate } = useContext(CourseContext);
  const [selectFile, setSelectFile] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(chapterData, "gaua");

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      setLoading(true);
      if (chapterData) {
        const formData = new FormData();

        selectFile.forEach((file) => formData.append("file", file));
        formData.append("schoolId", selectedSetting._id);
        formData.append("chapterId", chapterData?._id);
        formData.append("title", values.title);

        const { data } = await put(
          PRIVATE_URLS.courseContent.updateChapterDetails + "/" + courseId,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        const formData = new FormData();
        const body = { title: values.title };
        formData.append("body", JSON.stringify(body));
        selectFile.forEach((file) => formData.append("file", file));
        formData.append("schoolId", selectedSetting._id);
        console.log(courseId, "courseId");
        const { data } = await post(
          PRIVATE_URLS.courseContent.create + "/" + courseId,
          formData,
          {
            headers: { "Content-type": "multipart/form-data" },
          }
        );
      }
      // entryFormik.handleSubmit();
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // file upload
  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setSelectFile(fileList);
    } else {
      toast.error("No files selected");
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      title: chapterData?.title || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setOpenChaper(false);
    setChapterData(null);
    entryFormik.resetForm();
    onUpdate();
  };

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={chapterData ? `Update ${title}` : `Add ${title}`}
        onClose={handleClose}
        submitButtonTitle={chapterData ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Chapter Name"
              required={true}
              inputProps={{ maxLength: 80 }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FileSelect
              name={`file`}
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectFile}
              label="Upload Material"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
