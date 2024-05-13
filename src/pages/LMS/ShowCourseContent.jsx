import React from "react";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
//Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";

export default function ShowCourseContent() {
  const entryFormik = useFormik({
    initialValues: {
      contents: "",
    },
    onSubmit: console.log("jj"),
  });
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
              // options={[]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {/* <UploadCourseTable
              updateList={updateList}
              courseId={course.courseId}
              chapter={chapter}
              courseName={courseName}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
