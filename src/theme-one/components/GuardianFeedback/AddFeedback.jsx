import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  TextareaAutosize,
  Dialog,
  styled,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMediaQuery } from "@mui/material";

import FeedbackIcon from "@mui/icons-material/Feedback";
import { useTheme } from "@mui/material/styles";
import themeData from "../../../data/themeData";
import { post } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";

const MuiBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "fixed",
  right: -165,
  width: 185,
  zIndex: 11111,
  display: "flex",
  alignItems: "center",
  top: "35%",

  [theme.breakpoints.down("sm")]: {
    top: "40%",
  },
  [theme.breakpoints.down("xs")]: {
    top: "45%",
  },
  justifyContent: "center",
  columnGap: 2,
  backgroundColor: themeData.darkPalette.secondary.main,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  padding: "8px",

  transition: "right 0.3s ease-in-out",
  ":hover": {
    right: 0,
  },
}));

const style = {
  position: "absolute",
  top: "45%",
  right: "10px",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 5,
};

export default function AddFeedback() {
  const { selectedSetting } = useContext(SettingContext);
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [submitting, setSubmitting] = useState(false);

  console.log(selectedSetting, "selectedSetting");

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    className: "",
    feedback: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery("(min-width:600px)");
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { data } = await post(PRIVATE_URLS.guardianFeedback.create, {
        ...formData,
        schoolId: selectedSetting._id,
      });
      setSubmitting(false);
      setOpen(false);
      setFormData({
        parentName: "",
        studentName: "",
        className: "",
        feedback: "",
      });
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };
  return (
    <>
      <MuiBox
        sx={{ justifyContent: !isHovered ? "flex-start" : "center" }}
        component="div"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
      >
        <FeedbackIcon sx={{ color: "white" }} />{" "}
        {isHovered ? (
          <Typography
            sx={{
              color: "white",
            }}
          >
            Guardian Feedback
          </Typography>
        ) : null}
      </MuiBox>
      {lgScreen ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Grid item xs={12} sm={12} lg={12}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
                  >
                    Add Feedback
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextField
                      variant="outlined"
                      label="Enter your name"
                      size="small"
                      required
                      value={formData.parentName}
                      onChange={handleOnchange}
                      sx={{ mb: 2 }}
                      name="parentName"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextField
                      variant="outlined"
                      label="Enter student name"
                      size="small"
                      required
                      sx={{ mb: 2 }}
                      value={formData.studentName}
                      onChange={handleOnchange}
                      name="studentName"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextField
                      variant="outlined"
                      label="Enter class"
                      size="small"
                      required
                      sx={{ mb: 2 }}
                      value={formData.className}
                      onChange={handleOnchange}
                      name="className"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextareaAutosize
                      aria-label="maximum height"
                      placeholder="Type Feedback..."
                      required
                      maxRows={4}
                      value={formData.feedback}
                      onChange={handleOnchange}
                      maxLength={300}
                      name="feedback"
                      style={{
                        // maxHeight: 80,
                        padding: 10,
                        // overflow: "auto",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                  columnGap: 2,
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setOpen(false)}
                  color="error"
                >
                  Cancel
                </Button>
                <Button size="small" variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          fullScreen={fullScreen}
        >
          <Box sx={{ padding: 2 }}>
            <form>
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Grid item xs={12} sm={12} lg={12}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
                  >
                    Add Feedback
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextField
                      variant="outlined"
                      label="Enter your name"
                      size="small"
                      required
                      value={formData.parentName}
                      onChange={handleOnchange}
                      sx={{ mb: 2 }}
                      name="parentName"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextField
                      variant="outlined"
                      label="Enter student name"
                      size="small"
                      required
                      sx={{ mb: 2 }}
                      value={formData.studentName}
                      onChange={handleOnchange}
                      name="studentName"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextField
                      variant="outlined"
                      label="Enter class"
                      size="small"
                      required
                      sx={{ mb: 2 }}
                      value={formData.className}
                      onChange={handleOnchange}
                      name="className"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <FormControl required fullWidth>
                    <TextareaAutosize
                      aria-label="maximum height"
                      placeholder="Type Feedback..."
                      required
                      maxRows={4}
                      value={formData.feedback}
                      onChange={handleOnchange}
                      maxLength={300}
                      name="feedback"
                      fullWidth
                      style={{
                        // maxHeight: 80,
                        padding: 10,
                        // overflow: "auto",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                  columnGap: 2,
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setOpen(false)}
                  color="error"
                >
                  Cancel
                </Button>
                <Button size="small" variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Dialog>
      )}
    </>
  );
}
