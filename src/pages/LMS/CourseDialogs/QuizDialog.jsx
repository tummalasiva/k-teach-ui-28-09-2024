/** @format */

import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  TextField,
  styled,
} from "@mui/material";
import FormInput from "../../../forms/FormInput";
import FormModal from "../../../forms/FormModal";
import { useFormik } from "formik";

const InputLabels = styled(InputLabel)(() => ({
  fontSize: "12px",
  fontWeight: 580,
  color: "#616161",
  paddingLeft: "10px",
}));

const Boxes = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function QuizDialog({ title, open, Formik, setOpenQuiz }) {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
    },
  ]);

  const entryFormik = useFormik({
    initialValues: {
      title: "",
      contentHours: "",
      description: "",
      question: "",
      option: "",
    },
    onSubmit: console.log("q"),
  });

  const handleClose = () => {
    setOpenQuiz(false);
    setDataToEdit(null);
  };

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? `Update ${title}` : `Add ${title}`}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Title 0/80*"
              type="text"
              required={true}
              inputProps={{ maxLength: 80 }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="contentHours"
              label="Content Hours"
              required={true}
              type="number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
          {quizData?.map((quiz, i) => (
            <Grid
              container
              rowSpacing={2}
              key={i}
              sx={{
                margin: "20px",
                backgroundColor: "#F0F8FF",
                borderRadius: "5px",
                padding: "0 15px 20px 15px",
                border: "1px solid lightgrey",
              }}>
              <Grid item xs={12} md={12}>
                <InputLabels>
                  {i + 1}.
                  {quiz.question
                    ? "Update Your Question!"
                    : "Write your question"}
                </InputLabels>
                <TextField
                  fullWidth
                  size="small"
                  name="question"
                  value={quiz.question}
                  placeholder="Type here..."
                  //   onChange={(e) => handleQuestionChange(e, i)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {i > 0 ? (
                          <IconButton
                            color="error"
                            size="small"
                            // onClick={() => removeQuiz(i)}
                          >
                            {/* <DeleteIcon fontSize="small" color="error" /> */}
                          </IconButton>
                        ) : null}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container rowGap={2} columnSpacing={2}>
                  {quiz.options.map((o, i) => (
                    <Grid key={i} item xs={12} md={6}>
                      <Boxes>
                        <Radio
                          size="small"
                          {...label}
                          color="default"
                          checked={
                            quiz.correctOption && quiz.correctOption === o
                          }
                          //   onChange={(e) => handleSetCorrectOption(o, i)}
                          value={o}
                          type="radio"
                        />
                        <InputLabels>Option {i + 1}</InputLabels>
                      </Boxes>
                      <TextField
                        fullWidth
                        size="small"
                        name={`option${i + 1}`}
                        value={o}
                        // onChange={(e) => handleOptionChange(e, i, i)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </FormModal>
    </>
  );
}
