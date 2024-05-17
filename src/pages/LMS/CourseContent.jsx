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
  const [selectedCourseId, setSelectedCourseId] = useState([]);

  // const Select_Options = [
  //   { label: "Select Course", value: "" },
  //   ...selectedCourseId,
  // ];

  const [openChapter, setOpenChaper] = useState(false);

  const getCourse = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.course.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      setSelectedCourseId(
        data.result.map((c) => ({ ...c, label: c.title, value: c._id }))
      );
      // entryFormik.setFieldValue("courseId", data.result[0]._id);
      // console.log(data.result, "mmmmmmbbbbbbnnnnnn");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const entryFormik = useFormik({
    initialValues: {
      courseId: selectedCourseId || "",
    },
    onSubmit: console.log("k"),
  });

  useEffect(() => {
    getCourse();
  }, []);

  console.log(entryFormik.values.courseId, "uuuid", selectedCourseId);

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
              options={selectedCourseId}
            />
          </Box>

          <Button
            variant="contained"
            size="medium"
            disabled={!selectedCourseId}
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
            onClick={() => setOpenChaper(true)}>
            Chapter
          </Button>
        </Grid>
      </OuterGrid>
      <Divider />

      {/* show all models components == */}
      <ShowCourseContent />

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
