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
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

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
    label: "Flashcard",
    value: "flashcard",
  },
  {
    id: 4,
    label: "Material",
    value: "material",
  },
  {
    id: 5,
    label: "Code Practice",
    value: "codepractice",
  },
];

export default function ShowCourseContent({ chapter, course, courseId }) {
  const { selectedSetting } = useContext(SettingContext);
  const [openVideo, setOpenVideo] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openFlashcard, setOpenFlashcard] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openCodepractice, setOpenCodepractice] = useState(false);

  console.log(course, courseId, "cour");

  const entryFormik = useFormik({
    initialValues: {
      contents: "",
    },
    onSubmit: console.log("jj"),
  });

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
  }, [entryFormik.values.contents]);

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
              <Tooltip title="Delete Chapter">
                <IconButton
                  //   onClick={handleClickOpen}
                  size="small"
                  color="error">
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Update Chapter"
                style={{
                  color: "#1b3779",
                }}>
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              Chapter: {chapter?.title}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={2}>
            <FormSelect
              required={true}
              name="contents"
              formik={entryFormik}
              label="Add Content"
              options={Contents}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CourseContentTable chapter={chapter} courseId={course.courseId} />
          </Grid>
        </Grid>
      </Box>
      {/* open video model ============= */}
      <VideoDialog
        title="Video for Course"
        open={openVideo}
        courseId={courseId}
        Formik={entryFormik}
        setOpenVideo={setOpenVideo}
        chapter={chapter}
      />

      {/* open quiz model ============== */}
      <QuizDialog
        title="Quiz"
        open={openQuiz}
        courseId={courseId}
        Formik={entryFormik}
        setOpenQuiz={setOpenQuiz}
        chapter={chapter}
      />

      {/* open flashcard model ========== */}
      <FlashcardDialog
        title="Flashcard"
        open={openFlashcard}
        Formik={entryFormik}
        setOpenFlashcard={setOpenFlashcard}
      />

      {/* open material model =========== */}
      <MaterialsDialog
        title="Material"
        open={openMaterial}
        Formik={entryFormik}
        setOpenMaterial={setOpenMaterial}
      />

      {/* open CodePractice model =========== */}
      <CodePracticeDialog
        title="Code Practice"
        open={openCodepractice}
        Formik={entryFormik}
        setOpenCodepractice={setOpenCodepractice}
      />
    </>
  );
}
