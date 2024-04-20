import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  styled,
  TextField,
  TextareaAutosize,
  Paper,
  CardMedia,
  CardContent,
  Dialog,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCallback } from "react";
import Carousel from "react-spring-3d-carousel";
import avatar from "../../theme-one/assets/Images/avatar.jpg";
import { config } from "react-spring";
import { useMediaQuery } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useTheme } from "@mui/material/styles";
import themeData from "../../data/themeData";

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

const TextBox1 = styled(Box)(({ theme }) => ({
  marginTop: "5%",
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
}));

const Dot = styled(Paper)(({ theme, active }) => ({
  height: "15px",
  width: "15px",
  borderRadius: "50%",
  cursor: "pointer",
}));

const cardStyle = {
  display: "flex",
  width: "100%",
  maxWidth: 500,
  minWidth: 300,
};

const FeedbackItem = ({ feedback, parentName, studentName }) => {
  return (
    <Card elevation={0} sx={cardStyle}>
      <Box sx={{ display: { xs: "none", md: "block" }, mt: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 130 }}
          image={avatar}
          alt="Loading..."
        />
      </Box>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {studentName}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          fontSize="18px"
          lineHeight={1.6}
          fontWeight="500"
        >
          {feedback}
        </Typography>
        <Typography
          sx={{
            color: "#1eaaf1",
            fontFamily: "Work Sans , Arial, sans-serif",
          }}
          mt={3}
        >
          Guardian
        </Typography>
        <Typography variant="body1" mt={1} mb={1}>
          {parentName}
        </Typography>
      </CardContent>
    </Card>
  );
};

const GuardianFeedback = () => {
  const [open, setOpen] = React.useState(false);

  const [list, setList] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const modalWidth = isMobile ? "100%" : style.width;
  const slidesToShow = isMobile ? 1 : 3;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHovered, setIsHovered] = useState(false);

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    className: "",
    feedback: "",
    approved: false,
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  const onChangeSlide = useCallback((newSlide) => {
    setCurrentSlide(newSlide);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (list.length) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % list.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [list]);

  const lgScreen = useMediaQuery("(min-width:600px)");
  return (
    <>
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
                  color="warning"
                  // sx={{
                  //   color: "#ffff",
                  //   background: "#f86f03",
                  //   ":hover": { background: "#f86f03" },
                  // }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  sx={{
                    background: "#0E4BF1",
                    ":hover": { background: "#0E4BF5" },
                  }}
                >
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
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  sx={{
                    color: "#ffff",
                    background: "#f86f03",
                    ":hover": { background: "#f86f03" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  type="submit"
                  sx={{
                    color: "#ffff",
                    background: "#0E4BF1",
                    ":hover": { background: "#0E4BF1" },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Dialog>
      )}

      <TextBox1>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              color="black"
              sx={{ fontWeight: "bold", fontSize: "40px" }}
            >
              Guardian
            </Typography>
          </Box>
          &nbsp;&nbsp;
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: themeData.darkPalette.primary.main,
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              Feedback
            </Typography>
          </Box>
        </Box>
      </TextBox1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <Typography component="p">_____________</Typography>
        <FiberManualRecordIcon sx={{ fontSize: "8px", marginTop: "15px" }} />
        <FiberManualRecordIcon
          sx={{
            color: themeData.darkPalette.primary.main,
            fontSize: "10px",
            marginTop: "14px",
            marginLeft: "5px",
          }}
        />
        <FiberManualRecordIcon
          sx={{ fontSize: "8px", marginTop: "15px", marginLeft: "6px" }}
        />
        <Typography component="p">_____________</Typography>
      </Box>
      <Box
        component="div"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          position: "fixed",
          // top: "35%",
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
      {!list.length ? null : (
        <Box
          sx={{
            height: "50vh",
            width: "80%",
            margin: "auto",
          }}
        >
          <Carousel
            slides={list.map((data) => ({
              key: data._id,
              content:
                data.approved === true ? (
                  <FeedbackItem
                    studentName={data.studentName}
                    feedback={data.feedback}
                    parentName={data.parentName}
                  />
                ) : (
                  ""
                ),
            }))}
            showNavigation={false}
            autoPlay={true}
            goToSlide={currentSlide}
            animationConfig={config.default}
            slidesToShow={slidesToShow}
            offsetRadius={1}
          />
          <DotsContainer style={{ textAlign: "center" }}>
            {list.map(
              (slide, index) =>
                slide.approved && (
                  <Dot
                    key={slide.key}
                    onClick={() => onChangeSlide(index)}
                    style={{
                      backgroundColor:
                        index === currentSlide
                          ? "#1eaaf1"
                          : "rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )
            )}
          </DotsContainer>
        </Box>
      )}
    </>
  );
};

export default GuardianFeedback;
