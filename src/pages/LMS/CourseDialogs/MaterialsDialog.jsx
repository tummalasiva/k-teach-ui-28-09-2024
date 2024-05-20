/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";
import FileSelect from "../../../forms/FileSelect";
import SettingContext from "../../../context/SettingsContext";
import { toast } from "react-toastify";
import { post, put } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";

export default function MaterialsDialog({
  chapter,
  courseId,
  title,
  open,
  setOpenMaterial,
  onUpdate = () => {},
  setDataToEdit = () => {},
  dataToEdit,
}) {
  const { selectedSetting } = useContext(SettingContext);
  // const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectFile, setSelectFile] = useState([]);

  // // create || update actions
  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();

    const material = {
      type: "Material",
      orderSequence: chapter.contents ? chapter.contents.length + 1 : 1,
      title: values.material,
      chapterId: chapter._id,
      contentHours: values.contentHours,
    };

    formData.append("material", JSON.stringify(material));
    selectFile.forEach((file) => formData.append("file", file));
    formData.append("schoolId", selectedSetting._id);

    try {
      if (dataToEdit) {
        setLoading(true);

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
        // console.log(data, "post");
      }
      handleClose();
      onUpdate();
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
      title: dataToEdit?.title || "",
      contentHours: dataToEdit?.contentHours || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setOpenMaterial(false);
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
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Material Name"
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
          <Grid xs={12} sm={6} md={6} item>
            <FileSelect
              name={`file`}
              required={true}
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectFile}
              label="Upload Flashcard Image"
              // multi={false}
              accept="image/*"
            />
          </Grid>
          {/* <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="image"
              label="Upload Material"
              type="file"
            />
          </Grid> */}
        </Grid>
      </FormModal>
    </>
  );
}
