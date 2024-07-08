/** @format */

import {
  Box,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Grid,
  FormControl,
  Typography,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import SettingContext from "../../context/SettingsContext";

import { useContext, useEffect } from "react";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import dayjs from "dayjs";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import { LoadingButton } from "@mui/lab";
import Lottie from "react-lottie";
import animationData from "../../../src/assets/Lottie/FormSubmission.json";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post } from "../../services/apiMethods";
import CountDownTimer from "./CountDownTimer";
const Questions = styled(Grid)(({ theme }) => ({
  height: "100%",
  minHeight: "480px",
  backgroundColor: "whitesmoke",
  border: "1px solid whitesmoke",
  padding: "10px",
  borderRadius: "5px",
  marginTop: "16px",
  overflow: "auto",
}));

const QuestionBox = styled(Box)(({}) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "5px",
}));

const Heading = styled(Typography)(({}) => ({
  fontWeight: "bold",
  fontSize: "18px",
  textDecoration: "underline",
  marginBottom: "10px",
}));

const SubHeading = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "flex-start",
  marginLeft: "10px",
  flexDirection: "column",
}));

const Showquestions = ({
  list,
  onDisableSubmission = () => {},
  urls,
  enquiryId,
  onSubmission = () => {},
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(
    list.examConducted || false
  );
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const [modifiedList, setModifiedList] = useState(
    list.exam.quiz.map((q) => ({ ...q, selectedAnswer: "" }))
  );

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNext = () => {
    if (currentQuestion < modifiedList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittingQuiz(true);
    try {
      const { data, status } = await post(
        urls.preExamSchedules.submitExam + list._id,
        {
          submission: modifiedList,
          enquiryId: enquiryId,
        }
      );
      setSubmittingQuiz(true);
      setExamSubmitted(true);

      setOpenDialog(false);
      onSubmission();
    } catch (error) {
      console.log(error);
    }
    setSubmittingQuiz(true);
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionChange = (e, optionId) => {
    let newList = modifiedList.map((q, i) =>
      i == currentQuestion ? { ...q, selectedAnswer: optionId } : q
    );
    setModifiedList(newList);
  };

  const isLastQuestion = currentQuestion === modifiedList.length - 1;

  if (examSubmitted) return <Box>Exam Submitted</Box>;

  return (
    <>
      <Container maxWidth="lg">
        <Box margin={2}>
          {" "}
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              {" "}
              <Typography fontWeight="bold" fontSize={22}>
                {" "}
                {list.exam.examName}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}>
          <Questions item xs={8} sm={8} md={8} lg={8}>
            <Typography
              sx={{
                fontWeight: (theme) => theme.typography.fontWeightMedium,
                fontSize: "15px",
                marginBottom: "40px",
                color: "#1f1d1d",
              }}>
              <span style={{ fontWeight: "bold" }}>{currentQuestion + 1}</span>.
              {modifiedList[currentQuestion].question}
            </Typography>
            <Grid container marginTop={1}>
              {modifiedList[currentQuestion].options.map((option, k) => (
                <Grid item xs={6} sm={6} md={6} lg={6} key={k}>
                  <FormControl component="fieldset" mb={1}>
                    <RadioGroup
                      value={modifiedList[currentQuestion].selectedAnswer}
                      onChange={(e) => handleOptionChange(e, option._id)}>
                      <FormControlLabel
                        value={option._id}
                        control={<Radio size="small" />}
                        label={option.value}
                        style={{ paddingBottom: "5px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Questions>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Paper
              elevation={1}
              sx={{
                height: "100%",
                minHeight: "480px",

                padding: "2px",
              }}>
              <CountDownTimer
                disableSubmission={onDisableSubmission}
                endTime={list.endTime}
              />
              <Typography fontWeight="bold" sx={{ margin: 1 }}>
                Questions:
              </Typography>

              <QuestionBox>
                {modifiedList.map((question, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    onClick={() => setCurrentQuestion(index)}
                    sx={{
                      backgroundColor: modifiedList[index].selectedAnswer
                        ? "green"
                        : "default",
                      "&:hover": {
                        backgroundColor: modifiedList[index]
                          ? "green"
                          : "default",
                        color: modifiedList[index] ? "white" : "default",
                      },
                      color: modifiedList[index].selectedAnswer
                        ? "white"
                        : "default",
                    }}>
                    {index + 1}
                  </Button>
                ))}
              </QuestionBox>
            </Paper>
          </Grid>
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          sx={{ borderRadius: "50px" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box>
              <Typography variant="h6" sx={{ padding: "10px" }}>
                {" "}
                {"Confirm Submission"}
              </Typography>
              <DialogContentText sx={{ padding: "0px 10px" }}>
                Are you sure you want to submit this exam?
              </DialogContentText>
              <Divider
                orientation="horizontal"
                sx={{
                  backgroundColor: "black",
                  marginTop: "20px",
                  borderRadius: "5px",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 30px",
                margin: 0,
              }}>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: "40px",
                  backgroundColor: "black",
                }}
              />
              <LoadingButton
                loading={submittingQuiz}
                onClick={handleSubmit}
                color="primary">
                Yes
              </LoadingButton>
            </Box>
          </Box>
        </Dialog>
      </Container>
      <Divider
        sx={{
          backgroundColor: "gray",
          margin: 2,
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          marginBottom: "1px",
        }}>
        {modifiedList.length > 1 &&
          modifiedList.indexOf(modifiedList[currentQuestion]) > 0 && (
            <Button
              // startIcon={}
              onClick={handlePrevious}
              variant="outlined"
              color="info">
              Previous
            </Button>
          )}
        {modifiedList.length > 1 &&
          modifiedList.indexOf(modifiedList[currentQuestion]) <
            modifiedList.length - 1 && (
            <Button onClick={handleNext} variant="outlined" color="info">
              Next
            </Button>
          )}
        {isLastQuestion && (
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenDialog}>
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};

const ExamQuestion = () => {
  const { id } = useParams();
  const { selectedSetting } = useContext(SettingContext);

  const [list, setList] = useState(null);
  const [instructionViewed, setInstructionViewed] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [startingExam, setStartingExam] = useState(false);
  const [gettingExamDetails, setGettingExamDetails] = useState(true);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getExamDetails = async () => {
      try {
        const { data } = await get(
          `${PRIVATE_URLS.preadmissionExamSchedule.getExamDetails}/${id}`
        );
        setList(data.result);
      } catch (error) {
        console.log(error);
      }
      setGettingExamDetails(false);
    };
    getExamDetails();
  }, []);

  const disableSubmission = () => setList(null);

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  //   const handleExam = async () => {
  //     try {
  //       setStartingExam(true);
  //       const data = await get(
  //         PRIVATE_URLS.preAdmission.checkValidityOfAdmitCardId + enquiryId,
  //         {
  //           params: {
  //             examScheduleId: id,
  //           },
  //         }
  //       );
  //       setStartingExam(false);
  //       return setInstructionViewed(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setStartingExam(false);
  //   };

  const startDate = new Date(list?.dateOfExam);
  const startTimeParts = list?.startTime?.split(":");
  if (startTimeParts && startTimeParts.length === 2) {
    const [startHour, startMinute] = startTimeParts.map(Number);
    startDate.setHours(startHour, startMinute, 0, 0);
  }
  const endDate = new Date(list?.dateOfExam);
  const endTimeParts = list?.endTime?.split(":");
  if (endTimeParts && endTimeParts.length === 2) {
    const [endHour, endMinute] = endTimeParts.map(Number);
    endDate.setHours(endHour, endMinute, 0, 0);
  }
  const durationInMinutes = (endDate - startDate) / (1000 * 60);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  if (!list && !gettingExamDetails)
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}>
          <Box
            sx={{
              width: "300px",
              height: "300px",
              backgroundColor: "#fff",
            }}>
            <Lottie options={defaultOptions} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Thank You!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center", mt: 2 }}>
          Your exam has been submitted successfully.
        </Grid>
      </Grid>
    );

  return (
    <>
      {instructionViewed ? (
        <Showquestions
          onSubmission={disableSubmission}
          enquiryId={enquiryId}
          urls={PRIVATE_URLS}
          selectedSetting={selectedSetting}
          onDisableSubmission={disableSubmission}
          list={list}
        />
      ) : (
        <Container>
          <Box
            sx={{
              backgroundColor: "#42a5f5",
              padding: "8px",
              marginTop: 2,

              borderBottom: "10px solid #0d47a1",
            }}>
            <Typography
              sx={{ fontSize: "20px", color: "white", fontWeight: "bold" }}>
              Instructions
            </Typography>
          </Box>

          <Container maxWidth="md">
            <Box>
              <Typography
                color="error"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: 3,
                }}>
                Please read the instructions before starting the exam.
              </Typography>

              <Heading>Exam Details:</Heading>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <SubHeading>
                  <Typography sx={{ fontWeight: 600 }}>
                    Academic Year :{" "}
                    <span
                      style={{
                        color: "#42a5f5",
                        fontSize: "16px",
                      }}>
                      {list?.academicYear?.academicYearFrom}-
                      {list?.academicYear?.academicYearTo}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Class :{" "}
                    <span
                      style={{
                        color: "#42a5f5",
                        fontSize: "16px",
                      }}>
                      {list?.class?.className}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Exam Name :{" "}
                    <span
                      style={{
                        color: "#42a5f5",
                        fontSize: "16px",
                      }}>
                      {list?.exam?.examName}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Date :{" "}
                    <span
                      style={{
                        color: "#42a5f5",
                        fontSize: "16px",
                      }}>
                      {dayjs(list?.dateOfExam).format("DD-MM-YYYY")}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Time :{" "}
                    <span
                      style={{
                        color: "#42a5f5",
                        fontSize: "16px",
                      }}>
                      {list?.startTime} - {list?.endTime}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Duration :{" "}
                    <span
                      style={{
                        color: "#42a5f5",
                        fontSize: "16px",
                      }}>
                      {hours}h : {minutes}min
                    </span>
                  </Typography>
                </SubHeading>
              </Box>

              <Heading sx={{ marginTop: 1 }}> General Instructions:</Heading>
              <Box sx={{ margin: 1 }}>
                {list?.exam?.additionalInstructions?.map((data, i) => (
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      color: "#333",
                    }}
                    key={i}>
                    {i + 1}.{data.point}
                  </Typography>
                ))}
              </Box>

              <FormControlLabel
                required
                control={
                  <Checkbox
                    checked={checkboxChecked}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I have read and understand the instruction of this exam."
              />
            </Box>
          </Container>

          <Divider
            sx={{
              backgroundColor: "gray",
              margin: "10px 20px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "5px 0px 2px 0px",
              columnGap: "15px",
            }}>
            <TextField
              required
              label="Admit Card Id"
              size="small"
              type="text"
              value={enquiryId}
              placeholder="Enter Admit Card Id"
              onChange={(e) => setEnquiryId(e.target.value)}
            />
            <LoadingButton
              loading={startingExam}
              color="success"
              variant="contained"
              disabled={!checkboxChecked || !enquiryId}
              //   onClick={handleExam}
              size="small">
              Start Exam
            </LoadingButton>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ExamQuestion;
