/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import { post, put } from "../../../services/apiMethods";
import { toast } from "react-toastify";
import FileSelect from "../../../forms/FileSelect";

export default function VideoDialog({
  open,
  setOpenVideo = () => {},
  title,
  courseId,
  chapter,
}) {
  const { selectedSetting } = useContext(SettingContext);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [selectFile, setSelectFile] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(selectFile, "selectFile");
  // // create || update actions
  const handleCreateOrUpdate = async (values) => {
    console.log(values, "values");

    const formData = new FormData();

    const payload = {
      type: "Video",
      orderSequence: chapter.contents ? chapter.contents.length + 1 : 1,
      title: values.name,
      description: "",
      chapterId: chapter?._id,
      contentHours: values.contentHours,
    };

    formData.append("material", JSON.stringify(payload));
    selectFile.forEach((video) => formData.append("file", video));
    formData.append("schoolId", selectedSetting._id);

    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.courseContent.updateContent + "/" + courseId,
          formData,
          { headerd: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.courseContent.addContentToChapter + "/" + courseId,
          formData,
          {
            headers: { "Content-type": "multipart/form-data" },
          }
        );
        console.log(data, "post");
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit ? dataToEdit.name : "",
      contentHours: dataToEdit ? dataToEdit.contentHours : "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

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

  const handleClose = () => {
    setOpenVideo(false);
    setDataToEdit(null);
  };

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? `Update ${title}` : `Add ${title}`}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid spacing={1} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Video Name 0/80*"
              required={true}
              inputProps={{ maxLength: 80 }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="contentHours"
              label="Content Hours"
              required={true}
              type="number"
            />
          </Grid>
          <Grid xs={12} md={12} lg={12} item>
            <FileSelect
              name={`file`}
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectFile}
              label="Upload Video"
              multi={false}
              accept="video/*"
            />
          </Grid>
          {selectFile.length
            ? selectFile?.map((v) => (
                <video
                  src={URL.createObjectURL(v)}
                  style={{
                    backgroundColor: "black",
                    margin: "20px 20px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                  controls
                  type="video/mp4"
                />
              ))
            : ""}
        </Grid>
      </FormModal>
    </>
  );
}
