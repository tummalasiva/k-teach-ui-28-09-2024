/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
//Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import CourseContentTable from "./CourseContentTable";
import VideoDialog from "./CourseDialogs/VideoDialog";
import QuizDialog from "./CourseDialogs/QuizDialog";
import FlashcardDialog from "./CourseDialogs/FlashcardDialog";
import MaterialsDialog from "./CourseDialogs/MaterialsDialog";
import CodePracticeDialog from "./CourseDialogs/CodePracticeDialog";
import { del, get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import AddChapterDialog from "./CourseDialogs/AddChapterDialog";
import DeleteModal from "../../forms/DeleteModal";
import ContentContext from "../../context/ContentContext";
import CourseContext from "../../context/CourseContext";
import CheckPermission from "../../components/Authentication/CheckPermission";

const Contents = [
  {
    id: 1,
    label: "Video",
    value: "video",
  },
  {
    id: 2,
    label: "Quiz",
    value: "quiz",
  },
  {
    id: 3,
    label: "FlashCard",
    value: "flashcard",
  },
  {
    id: 4,
    label: "Material",
    value: "material",
  },
  // {
  //   id: 5,
  //   label: "Code Practice",
  //   value: "codepractice",
  // },
];

export default function ShowCourseContent({ handleEditChapter = () => {} }) {
  const { selectedSetting } = useContext(SettingContext);
  const { chapter } = useContext(ContentContext);
  const { courseId, onUpdate, course } = useContext(CourseContext);

  const [dataToEdit, setDataToEdit] = useState(null);
  const [openVideo, setOpenVideo] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openFlashcard, setOpenFlashcard] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openCodepractice, setOpenCodepractice] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  // console.log(openDeleteModel, "openDeleteModel");

  const entryFormik = useFormik({
    initialValues: {
      contents: "",
    },
    onSubmit: console.log("jj"),
  });

  console.log(entryFormik.values, "entryFormik");

  useEffect(() => {
    if (entryFormik.values.contents === "video") {
      setOpenVideo(entryFormik.values.contents === "video");
    } else if (entryFormik.values.contents === "quiz") {
      setOpenQuiz(entryFormik.values.contents === "quiz");
    } else if (entryFormik.values.contents === "flashcard") {
      setOpenFlashcard(entryFormik.values.contents === "flashcard");
    } else if (entryFormik.values.contents === "material") {
      setOpenMaterial(entryFormik.values.contents === "material");
    } else {
      setOpenCodepractice(entryFormik.values.contents === "codepractice");
    }
  }, [entryFormik.values.contents, selectedSetting._id]);

  const handleEditClick = (data) => {
    // console.log(data, "upd");
    let type = Contents.find((c) => c.label === data?.type);
    // console.log(type, "oooo");
    entryFormik.setFieldValue("contents", type?.value);
    setDataToEdit(data);
  };

  const handelOpenDelModel = () => {
    setOpenDeleteModel(true);
  };

  const handleDeleteChapter = async (_id) => {
    let payload = {
      ..._id,
      chapterId: _id,
    };

    try {
      const { data } = await put(
        PRIVATE_URLS.courseContent.deleteChapter + "/" + courseId,
        payload
      );
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid lightgray",
          borderRadius: "5px",
          px: 1,
          mb: 3,
          backgroundColor: "aliceblue",
        }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}>
            <Typography
              width="100%"
              variant="h6"
              component="div"
              fontWeight={600}
              fontSize={16}
              display="flex"
              alignItems="center">
              <CheckPermission module="Courses Content" permission="delete">
                <Tooltip title="Delete Chapter">
                  <IconButton size="small" color="error">
                    <DeleteIcon
                      fontSize="small"
                      color="error"
                      onClick={handelOpenDelModel}
                    />
                  </IconButton>
                </Tooltip>
              </CheckPermission>
              <CheckPermission module="Courses Content" permission="update">
                <Tooltip
                  title="Update Chapter"
                  style={{
                    color: "#1b3779",
                  }}>
                  <IconButton size="small">
                    <EditIcon fontSize="small" onClick={handleEditChapter} />
                  </IconButton>
                </Tooltip>
              </CheckPermission>
              Chapter: {chapter?.title}
            </Typography>
          </Grid>
          <CheckPermission module="Courses Content" permission="add">
            <Grid item xs={6} sm={6} md={2}>
              <FormSelect
                required={true}
                name="contents"
                formik={entryFormik}
                label="Add Content"
                options={Contents}
              />
            </Grid>
          </CheckPermission>
          <Grid item xs={12} sm={12} md={12}>
            <CourseContentTable
              onEditClick={handleEditClick}
              handelOpenDelModel={handelOpenDelModel}
            />
          </Grid>
        </Grid>
      </Box>

      {/* delete model ======== */}
      <DeleteModal
        deleteModal={openDeleteModel}
        handleDelete={handleDeleteChapter}
        // id={chapter?._id}
        setDeleteModal={setOpenDeleteModel}
      />

      {/* open video model ============= */}
      <VideoDialog
        title="Video for Course"
        open={openVideo}
        courseId={courseId}
        Formik={entryFormik}
        setOpenVideo={setOpenVideo}
        chapter={chapter}
        onUpdate={onUpdate}
        setDataToEdit={setDataToEdit}
        dataToEdit={dataToEdit}
      />

      {/* open quiz model ============== */}
      <QuizDialog
        title="Quiz"
        open={openQuiz}
        courseId={courseId}
        Formik={entryFormik}
        setOpenQuiz={setOpenQuiz}
        chapter={chapter}
        onUpdate={onUpdate}
      />

      {/* open flashcard model ========== */}
      <FlashcardDialog
        title="Flashcard"
        open={openFlashcard}
        // chapter={chapter}
        // courseId={courseId}
        Formik={entryFormik}
        setOpenFlashcard={setOpenFlashcard}
        // onUpdate={onUpdate}
        setDataToEdit={setDataToEdit}
        dataToEdit={dataToEdit}
      />

      {/* open material model =========== */}
      <MaterialsDialog
        title="Material"
        open={openMaterial}
        Formik={entryFormik}
        // chapter={chapter}
        // courseId={courseId}
        setOpenMaterial={setOpenMaterial}
        // onUpdate={onUpdate}
        setDataToEdit={setDataToEdit}
        dataToEdit={dataToEdit}
      />

      {/* open CodePractice model =========== */}
      {/* <CodePracticeDialog
        title="Code Practice"
        open={openCodepractice}
        Formik={entryFormik}
        chapter={chapter}
        courseId={courseId}
        setOpenCodepractice={setOpenCodepractice}
      /> */}
    </>
  );
}
