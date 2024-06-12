/** @format */

import {
  Box,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useContext, useEffect, useState } from "react";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { useTheme } from "@mui/material";
import QuizQuestion from "./QuizQuestion";

export default function AddOrUpdateExamModal({
  open = false,
  onClose = () => {},
  dataToUpdate = null,
}) {
  const theme = useTheme();
  const { selectedSetting } = useContext(SettingContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [addForm, setAddForm] = useState({});

  const [quizData, setQuizData] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
    },
  ]);

  const getData = async () => {
    try {
      const [academicYearData, classData] = await Promise.all([
        get(PRIVATE_URLS.academicYear.list),
        get(PRIVATE_URLS.class.list, {
          params: { schoolId: selectedSetting._id },
        }),
      ]);

      setAcademicYears(academicYearData.data?.result);
      setClasses(classData.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  const handleOnChangeForm = (e) => {
    const { name, value } = e.target;
    setAddForm({
      ...addForm,
      [name]: value,
    });
  };

  const handleAddQuizs = () => {
    setQuizData([
      ...quizData,
      {
        question: "",
        options: ["", "", "", ""],
        correctOption: "",
      },
    ]);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      aria-labelledby="responsive-dialog-title">
      <Box component="form" sx={{ padding: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              textAlign="center"
              fontSize="20px"
              fontWeight="bold">
              {dataToUpdate ? "Update Exam" : "Add Exam"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <FormControl size="small" fullWidth required>
              <InputLabel>Academic Year</InputLabel>
              <Select
                labelId="demo-simpless-select-filled-label"
                id="demo-simple-select-filled-l"
                varient="outlined"
                label="academic year"
                name="academicYear"
                value={addForm.academicYear || ""}
                onChange={handleOnChangeForm}>
                {academicYears &&
                  academicYears.map((row, index) => (
                    <MenuItem
                      key={row._id}
                      value={row._id}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      {row.from} - {row.to}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl size="small" fullWidth required>
              <InputLabel>Class</InputLabel>
              <Select
                variant="outlined"
                label="class"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="schoolClass"
                value={addForm.schoolClass || ""}
                onChange={handleOnChangeForm}>
                {classes &&
                  classes.map((row, index) => (
                    <MenuItem
                      key={row._id}
                      value={row._id}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      {row.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ mt: 0.2 }}>
            <TextField
              variant="outlined"
              fullWidth
              required
              size="small"
              label="Exam name"
              name="examName"
              id="filled-required"
              value={addForm.examName || ""}
              onChange={handleOnChangeForm}
            />
          </Grid>
        </Grid>

        <Typography sx={{ textAlign: "left", fontWeight: "bold", mt: 4 }}>
          Add Questions:
        </Typography>

        {quizData?.map((q, questionIndex) => (
          <QuizQuestion
            quiz={q}
            questionIndex={questionIndex}
            key={questionIndex}
          />
        ))}

        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: 1,
                marginBottom: "15px",
              }}>
              <Button
                size="small"
                variant="contained"
                onClick={handleAddQuizs}
                startIcon={<AddIcon />}>
                ADD
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Additional Instruction:
          </Typography>
          {additionalInstructions.map((instruction, index) => (
            <Grid container key={index} sx={{ mt: 1 }}>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  value={instruction}
                  onChange={(e) => handleAdditionalInstructionChange(e, index)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteInstruction(index)}>
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            
            </Grid>
          ))}
          <Button
            size="small"
            sx={{ mt: 2 }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddInstruction}>
            Add
          </Button>
        </Box> */}

        {/* <Grid container spacing={2} sx={{ mt: 1.5 }}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "2px",
              }}>
              <Typography sx={{ fontSize: "16px" }}>
                Negative Marking:{" "}
              </Typography>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      fontSize="small"
                      checked={negativeMarking}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <Typography style={{ fontSize: "15px" }}>Yes</Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      fontSize="small"
                      checked={!negativeMarking}
                      onChange={(event) =>
                        setNegativeMarking(!event.target.checked)
                      }
                    />
                  }
                  label={
                    <Typography style={{ fontSize: "15px" }}>No</Typography>
                  }
                />
              </Box>
            </Box>
          </Grid>
          {negativeMarking === true ? (
            <Grid item xs={12} md={12} lg={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                required
                label="Negative Marks Per Question"
                type="number"
                name="negativeMark"
                value={markForm.negativeMark}
                onChange={hanleMarkChange}
                InputLabelProps={{ style: { fontSize: 12 } }}
              />
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12} md={12} lg={4}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              required
              label="Marks Per Question"
              type="number"
              name="mark"
              value={markForm.mark}
              onChange={hanleMarkChange}
              InputLabelProps={{ style: { fontSize: 12 } }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Pass percentage (%)"
              size="small"
              required
              type="number"
              name="passingMark"
              value={markForm.passingMark}
              onChange={hanleMarkChange}
              InputLabelProps={{ style: { fontSize: 12 } }}
            />
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "3%",
              mt: 3,
            }}>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton
              loading={submiload}
              variant="contained"
              type="submit"
              size="small"
              sx={{
                background: "#1b3779",
                "&:hover": {
                  background: "#1b3779",
                },
              }}>
              Submit
            </LoadingButton>
          </Box>
        </Grid> */}
      </Box>
    </Dialog>
  );
}
