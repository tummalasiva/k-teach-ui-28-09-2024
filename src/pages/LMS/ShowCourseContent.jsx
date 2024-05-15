import React, { useState } from "react";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
//Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import CourseContentTable from "./CourseContentTable";
import VideoDialog from "./CourseDialogs/VideoDialog";

export default function ShowCourseContent() {
  const [openVideo,setOpenVideo] = useState(false)

  const handleOpenVideo = () => {
    if (entryFormik.values.contents==="video") {
      setOpenVideo(true)
    }
  };
  
  const Contents = [
    {
      id: 1,
      label: "Video",
      value: "video",
      onClick: handleOpenVideo,
    },
    {
      id: 2,
      label: "Quiz",
      value: "quiz",
      // onClick: handleOpenQuiz,
    },
    {
      id: 3,
      label: "Flashcard",
      value: "flashcard",
      // onClick: handleOpenMaterial,
    },
    {
      id: 4,
      label: "Material",
      value: "material",
      // onClick: handleOpenMaterial,
    },
    {
      id: 5,
      label: "Code Practice",
      value: "codepractice",
      // onClick: handleOpenCode,
    },
  ];

  const entryFormik = useFormik({
    initialValues: {
      contents: "",
    },
    onSubmit: console.log("jj"),
  });

  console.log(entryFormik.values.contents,"entryFormik");

  return (
    <>
      <Box
        sx={{
          border: "1px solid lightgray",
          borderRadius: "5px",
          px: 1,
          mb: 3,
          backgroundColor: "aliceblue",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            }}
          >
            <Typography
              width="100%"
              variant="h6"
              component="div"
              fontWeight={600}
              fontSize={16}
              display="flex"
              alignItems="center"
            >
              <Tooltip title="Delete Chapter">
                <IconButton
                  //   onClick={handleClickOpen}
                  size="small"
                  color="error"
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Update Chapter"
                style={{
                  color: "#1b3779",
                }}
              >
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              Chapter: hell
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
            <CourseContentTable />
          </Grid>
        </Grid>
      </Box>
      {/* <VideoDialog open={entryFormik.values.contents==="video"} setOpenVideo={setOpenVideo}/> */}
    </>
  );
}
