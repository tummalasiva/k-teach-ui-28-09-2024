/** @format */

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
}));

const Question = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "bold",
}));

const Option = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "bold",
}));

const InputLabels = styled(InputLabel)(() => ({
  fontSize: "12px",
  fontWeight: 580,
  color: "#616161",
  paddingLeft: "10px",
}));

const RadioButtons = styled(Radio)(() => ({
  marginTop: "-10px",
}));

export default function QuizQuestion({ quiz = {}, questionIndex }) {
  return (
    <Wrapper>
      <InputLabels
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        {questionIndex + 1}.{" "}
        {quiz.question ? "Update Your Question!" : "Write your question"}
      </InputLabels>

      <TextField
        fullWidth
        size="small"
        name="question"
        multiline
        value={quiz.question}
        placeholder="Type here..."
        // onChange={(e) => handleQuestionChange(e, questionIndex)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {questionIndex > 0 ? (
                <IconButton
                  color="error"
                  size="small"
                  //   onClick={() =>
                  //     handleRemoveQuestion(questionIndex)
                  //   }
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        }}
      />

      <Grid
        sx={{
          marginBottom: "10px",
          backgroundColor: (theme) => theme.palette.grey[100],
          borderRadius: "5px",
          padding: "0 15px 20px 15px",
          border: "1px solid lightgrey",
          marginTop: "10px",
        }}
        container
        rowGap={2}
        columnSpacing={2}>
        {quiz.options.map((o, i) => (
          <Grid key={i} item xs={12} md={6}>
            <Box
              sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                display: "flex",
              }}>
              <RadioButtons
                size="small"
                {...label}
                color="default"
                checked={quiz.correctOption && quiz.correctOption === o}
                // onChange={(e) =>
                //   handleSetCorrectOption(o, questionIndex)
                // }
                value={o}
                type="radio"
              />
              <InputLabels>Option {i + 1}</InputLabels>
            </Box>
            <TextField
              fullWidth
              size="small"
              name={`option${i + 1}`}
              value={o}
              //   onChange={(e) =>
              //     handleOptionChange(e, questionIndex, i)
              //   }
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}
