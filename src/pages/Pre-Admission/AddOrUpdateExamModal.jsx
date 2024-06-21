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
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useContext, useEffect, useState } from "react";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { useTheme } from "@mui/material";
import QuizQuestion from "./QuizQuestion";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

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
  const [markForm, setMarkForm] = useState({});
  const [submiload, setSubmitload] = useState(false);
  const [quizData, setQuizData] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
    },
  ]);
  const [additionalInstructions, setAdditionalInstructions] = useState([""]);
  const [negativeMarking, setNegativeMarking] = useState(false);

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

  const handleAddInstruction = () => {
    setAdditionalInstructions([...additionalInstructions, ""]);
  };

  const handleAdditionalInstructionChange = (e, index) => {
    const updatedInstructions = [...additionalInstructions];
    updatedInstructions[index] = e.target.value;
    setAdditionalInstructions(updatedInstructions);
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...additionalInstructions];
    updatedInstructions.splice(index, 1);
    setAdditionalInstructions(updatedInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quiz = quizData.map((q, index) => {
        return {
          question: q.question,
          options: [
            { value: q.options[0] },
            { value: q.options[1] },
            { value: q.options[2] },
            { value: q.options[3] },
          ],

          correctOption: q.correctOption,
        };
      });
      if (quiz.filter((q) => !q.question || !q.options).length)
        return toast.error("Question cannot be empty");
      if (quiz.some((q) => q.options.some((option) => option.name === "")))
        return toast.error("Option cannot be empty");

      if (quiz.filter((q) => !q.correctOption).length)
        return toast.error("Please select a correct option");
      setSubmitload(true);
      let playload = {
        academicYear: addForm.academicYear,
        classId: addForm.schoolClass,
        examName: markForm.examName,
        passingPercentage: markForm.passingMark,
        quiz: quiz,
        negativeMarking: negativeMarking,
        negativeMarkingPerQuestion: markForm.negativeMark,
        marksPerQuestion: markForm.mark,
        additionalInstructions: additionalInstructions.map((add) => ({
          point: add,
        })),
      };
      const { data } = await post(
        PRIVATE_URLS.preadmissionEnqiry.create,
        playload
      );
      console.log(data, "fadadasa");
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
      // handleEditClose();
    }
    setSubmitload(false);
  };

  const handleClose = () => {
    // setEditId(null);
    // setOpen(false);
    setQuizData([
      {
        question: "",
        options: ["", "", "", ""],
        correctOption: "",
      },
    ]);
    setAddForm({});
    setMarkForm({});
    setNegativeMarking(false);
    setAdditionalInstructions([]);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby="responsive-dialog-title">
      <Box component="form" sx={{ padding: 2 }} onSubmit={handleSubmit}>
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

        <Box
          sx={{
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            mb: 2,
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}>
          <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
            Add Questions:
          </Typography>

          <Button
            size="small"
            variant="contained"
            onClick={handleAddQuizs}
            startIcon={<AddIcon />}>
            ADD
          </Button>
        </Box>

        {quizData?.map((q, questionIndex) => (
          <QuizQuestion
            quiz={q}
            questionIndex={questionIndex}
            key={questionIndex}
            quizData={quizData}
            setQuizData={setQuizData}
          />
        ))}

        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              mb: 2,
              border: "1px solid lightgray",
              borderRadius: "5px",
            }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Additional Instruction:
            </Typography>

            <Button
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddInstruction}>
              Add
            </Button>
          </Box>

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
        </Box>

        <Grid container spacing={2} sx={{ mt: 1.5 }}>
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
                      //   checked={negativeMarking}
                      //   onChange={handleCheckboxChange}
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
                      //   checked={!negativeMarking}
                      //   onChange={(event) =>
                      //     setNegativeMarking(!event.target.checked)
                      //   }
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
                // value={markForm.negativeMark}
                // onChange={hanleMarkChange}
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
              //   value={markForm.mark}
              //   onChange={hanleMarkChange}
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
              //   value={markForm.passingMark}
              //   onChange={hanleMarkChange}
              InputLabelProps={{ style: { fontSize: 12 } }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
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
              //   onClick={handl}
            >
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
        </Grid>
      </Box>
    </Dialog>
  );
}
