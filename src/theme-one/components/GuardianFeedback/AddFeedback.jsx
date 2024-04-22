import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  TextareaAutosize,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useMediaQuery } from "@mui/material";

import FeedbackIcon from "@mui/icons-material/Feedback";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "45%",
  right: "10px",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 5,
};

export default function AddFeedback() {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    className: "",
    feedback: "",
    approved: false,
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
  return (
    <>
      <Box
        component="div"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          position: "fixed",
          top: { xs: "45%", sm: "40%", md: "35%", lg: "35%" },
          right: -165,
          width: 205,
          zIndex: 11111,
          display: "flex",
          alignItems: "center",

          justifyContent: "center",
          columnGap: 2,
          backgroundColor: (theme) => theme.palette.primary.dark,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          padding: 1,

          transition: "right 0.3s ease-in-out",
          ":hover": {
            right: 0,
          },
        }}
      >
        <FeedbackIcon sx={{ color: "white" }} />{" "}
        <Typography
          sx={{
            color: "white",
          }}
        >
          Guardian Feedback
        </Typography>
      </Box>
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
                <Button size="small" variant="contained" type="submit">
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
                <Button size="small" variant="contained" type="submit">
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
