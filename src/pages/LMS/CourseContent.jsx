import React, { useState } from "react";
import Select from "react-select";
import { Box, Button, Divider, Grid, styled } from "@mui/material";
import PageHeader from "../../components/PageHeader";
// icons
import AddIcon from "@mui/icons-material/Add";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import ShowCourseContent from "./ShowCourseContent";

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
  const [selectedCourse, setSelectedCourse] = useState([]);
  const handleChange = (e) => {
    setSelectedCourse(e.target.value);

    console.log(selectedCourse, "hhhahh");
  };

  const entryFormik = useFormik({
    initialValues: {
      courseId: "",
    },
    onSubmit: console.log("k"),
  });

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
          alignItems="center"
        >
          <Box sx={{ width: 260 }}>
            {/* <Select
              name="title"
              type="text"
              options={[]}
              menuPortalTarget={document.body}
              value={selectedCourse}
              // onChange={handleChange}
              styles={{
                container: (provided, state) => ({
                  ...provided,
                  marginBottom: "2px",
                }),
                menu: (provided, state) => ({
                  ...provided,
                  zIndex: 1000,
                }),

                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "5px",
                }),
              }}
            /> */}
            <FormSelect
              required={true}
              name="courseId"
              formik={entryFormik}
              label="Select Course To Add Content"
              // options={[]}
            />
          </Box>

          <Button
            variant="contained"
            size="medium"
            disabled={!selectedCourse}
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
          >
            Chapter
          </Button>
        </Grid>
      </OuterGrid>

      <Divider />

      <ShowCourseContent />
    </>
  );
}
