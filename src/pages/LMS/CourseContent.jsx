/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, Grid, styled } from "@mui/material";
import PageHeader from "../../components/PageHeader";
// icons
import AddIcon from "@mui/icons-material/Add";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import ShowCourseContent from "./ShowCourseContent";
import AddChapterDialog from "./CourseDialogs/AddChapterDialog";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

const Label = styled("label")(() => ({
  fontWeight: 650,
  fontSize: "15px",
  color: "#424242",
}));

const OuterGrid = styled(Grid)(() => ({
  padding: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function CourseContent() {
  const { selectedSetting } = useContext(SettingContext);
  const [courses, setCourses] = useState([]);
  const [openChapter, setOpenChaper] = useState(false);
  const [courseDetails, setCourseDetails] = useState({ chapters: [] });

  console.log(courses, "courses");
  // console.log(courseDetails, "courseDetails");
  // get course list
  const getCourse = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.course.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setCourses(
        data.result.map((c) => ({ ...c, label: c.title, value: c._id }))
      );
      entryFormik.setFieldValue("courseId", data?.result[0]?._id);
    } catch (error) {
      console.error(error);
    }
  };

  // get content details
  const getDetails = async (values) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.courseContent.getDetailsTeachers + "/" + values.courseId,
        {
          params: {
            schoolId: selectedSetting._id,
          },
        }
      );
      setCourseDetails(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      courseId: "",
    },
    onSubmit: getDetails,
    enableReinitialize: true,
  });

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    if (courses.length) {
      entryFormik.handleSubmit();
    }
  }, [courses, entryFormik.values.courseId]);

  console.log(entryFormik.values.courseId, "id");
  return (
    <>
      <PageHeader title="Course Content" />

      <OuterGrid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          my={2}
          gap={2}
          display="flex"
          alignItems="center">
          <Box sx={{ width: 260 }}>
            <FormSelect
              required={true}
              name="courseId"
              formik={entryFormik}
              label="Select Course To Add Content"
              options={courses}
            />
          </Box>

          <Button
            variant="contained"
            size="medium"
            disabled={!courses.length}
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
            multi={false}
            onClick={() => setOpenChaper(true)}>
            Chapter
          </Button>
        </Grid>
      </OuterGrid>
      <Divider />

      {/* show all models components == */}
      {courseDetails.chapters?.map((chapter, i) => (
        <ShowCourseContent
          key={i}
          chapter={chapter}
          courseId={entryFormik.values.courseId}
          course={courseDetails}
          getDetails={getDetails}
        />
      ))}

      {/* open chapter model ========== */}
      <AddChapterDialog
        title="Chapter for Course"
        open={openChapter}
        setOpenChaper={setOpenChaper}
        courseId={entryFormik.values.courseId}
      />
    </>
  );
}
