import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Box, Button, Divider, Grid, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";

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
  const [selectedCourse, setSelectedCourse] = useState("");
  const handleChange = (e) => {
    setSelectedCourse(e.target.value);
  };
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
          <Box sx={{ overflow: "hidden" }}>
            <Label htmlFor="">Select Course To Add Content</Label>

            <Select
              name="title"
              type="text"
              options={""}
              menuPortalTarget={document.body}
              value={selectedCourse}
              onChange={handleChange}
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
            />
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              size="medium"
              disabled={!selectedCourse}
              startIcon={<AddIcon />}
            >
              Chapter
            </Button>
          </Box>
        </Grid>
      </OuterGrid>

      <Divider />
    </>
  );
}
