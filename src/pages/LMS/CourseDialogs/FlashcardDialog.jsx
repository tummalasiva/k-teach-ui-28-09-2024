/** @format */

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormSelect from "../../../forms/FormSelect";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";
import SettingContext from "../../../context/SettingsContext";
import { toast } from "react-toastify";
import { post, put } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import FileSelect from "../../../forms/FileSelect";

export default function FlashcardDialog({
  chapter,
  title,
  open,
  setOpenFlashcard,
  courseId,
  onUpdate = () => {},
  setDataToEdit = () => {},
  dataToEdit,
}) {
  const { selectedSetting } = useContext(SettingContext);
  // const [dataToEdit, setDataToEdit] = useState(null);
  const [selectFile, setSelectFile] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(dataToEdit, "dataToEdit");

  console.log(chapter, "flash ch");

  // // create || update actions
  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();

    const material = {
      type: "FlashCard",
      orderSequence: chapter.contents ? chapter.contents.length + 1 : 1,
      flashCard: {
        cardType: values.cardType,
        text: "Text",
      },
      title: values.title,
      description: values.description,
      chapterId: chapter?._id,
      contentHours: values.contentHours,
    };

    if (values.cardType === "Image" && !selectFile.length)
      return toast.error("Please select an Image file for Flash Card!");

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
      description: dataToEdit?.description || "",
      cardType: dataToEdit?.cardType || "",
      text: dataToEdit?.text || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setOpenFlashcard(false);
    setDataToEdit(null);
  };

  // console.log(entryFormik.values.cardType, "ggggggggg");

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
              label="Title 0/80*"
              type="text"
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
            <FormSelect
              formik={entryFormik}
              required={true}
              name="cardType"
              label="Select Card Type"
              options={[
                { label: "Flashcard Text", value: "Text" },
                { label: "Flashcard Image", value: "Image" },
              ]}
            />
          </Grid>
          {entryFormik.values.cardType === "Text" ? (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="text"
                label="Flashcard Text"
                required={entryFormik.values.cardType === "Text" ? true : false}
              />
            </Grid>
          ) : (
            <Grid xs={12} sm={6} md={6} item>
              <FileSelect
                name={`file`}
                required={
                  entryFormik.values.cardType === "Image" ? true : false
                }
                onChange={(e) => handleChangeFiles(e)}
                customOnChange={true}
                selectedFiles={selectFile}
                label="Upload Flashcard Image"
                // multi={false}
                accept="image/*"
              />
            </Grid>
          )}
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
