import React, { useContext, useState } from "react";
import MovingText from "react-moving-text";
import {
  Box,
  Container,
  Button,
  Typography,
  styled,
  Grid,
  Modal,
  keyframes,
  css,
  IconButton,
} from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import CircularWaves from "../animated-button/CircularWaves";
// icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import themeData from "../../../data/themeData";
import { Cancel } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(359deg);
}
`;

const RotateImg = css`
  animation: ${Rotate} 100s infinite linear;
`;

const RotatePencile = css`
  animation: ${Rotate} 80s infinite linear;
`;

const RotateMegnify = css`
  animation: ${Rotate} 150s infinite linear;
`;

const RotateScience = css`
  animation: ${Rotate} 70s infinite linear;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PencileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
}));

const AnimatedImage = styled("img")(({ theme }) => ({
  objectFit: "contain",
  ...RotateImg,
}));

const AnimatedPencile = styled("img")(({ theme }) => ({
  objectFit: "contain",
  ...RotatePencile,
}));

const AnimatedMegnify = styled("img")(({ theme }) => ({
  objectFit: "contain",
  ...RotateMegnify,
}));

const AnimatedScience = styled("img")(({ theme }) => ({
  objectFit: "contain",
  ...RotateScience,
}));

const VideoPlayButton = styled(Box)(({ theme }) => ({
  color: "white",
  position: "relative",
  borderRadius: "50%",
  background: themeData.lightPalette.secondary.main,
  height: "50px",
  width: "50px",
  display: "flex",
  zIndex: 20,
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    background: themeData.lightPalette.primary.main,
  },
}));

const RippleVideoButton = styled(Box)(({ theme }) => ({
  position: "relative",
  color: "white",
  // borderRadius: "50%",
  // background: themeData.lightPalette.secondary.main,
  // height: "60px",
  // width: "60px",
  // display: "flex",
  zIndex: 10,
  // alignItems: "center",
  // justifyContent: "center",
  // "&:hover": {
  //   background: themeData.lightPalette.primary.main,
  // },

  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: "2px solid #009edc",
    borderRadius: "50%",
    boxSizing: "border-box",
    animation: `${rippleAnimation} 2s 1s ease-in infinite`,
  },

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: "2px solid #009edc",
    borderRadius: "50%",
    boxSizing: "border-box",
    animation: `${rippleAnimation} 2s ease-in infinite`,
  },
}));

const MuiMainBox = styled(Box)(({ theme }) => ({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  border: "solid grey 0.1px",
  objectFit: "contain",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "flex-start",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.down("xs")]: {
    justifyContent: "center",
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 50,
  color: "#fff",
  marginTop: 5,
}));

const AnimationBox = styled(Box)(({ theme }) => ({
  marginTop: "40px",
  letterSpacing: "0.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "50px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "25px",
  },
  [theme.breakpoints.between(200, 390)]: {
    fontSize: "30px",
  },
}));

export default function HomeComponents() {
  const { selectedSetting } = useContext(SettingContext);
  let [play, setPlay] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleVideo = () => {
    setPlay(!play);
  };

  return (
    <>
      <MuiMainBox
        sx={{
          backgroundImage:
            selectedSetting.bannerImages &&
            selectedSetting.bannerImages.length > 0
              ? `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${selectedSetting.bannerImages[0]})`
              : "linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(/boy.png)",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              textAlign: { xs: "start", md: "left" },
              width: "fit-content",
              padding: "80px 60px",
              // maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "80%" },
            }}
          >
            <Box
              sx={{
                borderLeft: `3px solid ${themeData.darkPalette.primary.main}`,
                padding: "8px",
                mt: 13,
              }}
            >
              <MovingText
                type="slideInFromLeft"
                duration="3000ms"
                delay="0.5s"
                direction="normal"
                timing="ease"
                iteration="1"
                fillMode="none"
                className="title"
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  FUEL YOUR FUTURE
                </Typography>
              </MovingText>
            </Box>
            <AnimationBox>
              <MovingText
                type="slideInFromRight"
                duration="3000ms"
                delay="0.5s"
                direction="normal"
                timing="ease"
                iteration="1"
                fillMode="none"
              >
                <Text variant="h5">More Than 50+ Faculties</Text>
              </MovingText>
              <MovingText
                type="slideInFromLeft"
                duration="3000ms"
                delay="0.5s"
                direction="normal"
                timing="ease"
                iteration="1"
                fillMode="none"
              >
                <Text variant="h5">To Knowledge With Us.</Text>
              </MovingText>
            </AnimationBox>

            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                mt: 6,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: themeData.darkPalette.secondary.main,
                  "&:hover": {
                    background: "transparent",
                    color: "#fff",
                    border: `1px solid ${themeData.lightPalette.secondary.main}`,
                  },
                }}
              >
                GET ADMISSION
              </Button>

              <Box onClick={handleOpen}>
                <Box
                  sx={{
                    zIndex: 10,
                    position: "relative",
                  }}
                >
                  <CircularWaves />
                </Box>
                <VideoPlayButton>
                  <PlayArrowIcon />
                </VideoPlayButton>
              </Box>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <iframe
                    style={{
                      position: "absolute",
                      width: "100%",
                      top: 0,
                      left: 0,
                      height: "100%",
                    }}
                    width=""
                    src="https://www.youtube.com/embed/ZCKYz6cgiRs"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <IconButton
                    variant="contained"
                    size="large"
                    color="error"
                    sx={{
                      position: "absolute",
                      right: -60,
                      top: 0,
                    }}
                    onClick={handleClose}
                  >
                    <CancelIcon fontSize="40px" color="error" />
                  </IconButton>
                </Box>
              </Modal>
            </Box>
          </Box>
          <PencileBox>
            <AnimatedPencile
              src="pencile.png"
              width={100}
              height={100}
              style={{ position: "absolute", top: "235px " }}
            />
          </PencileBox>
          <IconBox>
            <AnimatedImage
              src="globe.png"
              width={100}
              height={100}
              style={{
                position: "absolute",
                right: "30px",
                top: "390px ",
              }}
            />
            <AnimatedMegnify
              src="magnifying.png"
              width={100}
              height={100}
              style={{
                position: "absolute",
                right: "70px",
                top: "580px ",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AnimatedScience
                src="science.png"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  marginLeft: "2px",
                  top: "230px ",
                }}
              />
              <AnimatedImage
                src="light-bulb.png"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  marginLeft: "10px",
                  bottom: -10,
                }}
              />
            </Box>
          </IconBox>

          {/* <GridContainer
            container
            spacing={2}
            sx={{
              paddingTop: { xs: "50px", sm: "50px", md: "30px", lg: "80px" },
            }}
          >
            <Grid item xs={4} sm={4} md={3}>
              <Box component="div" onClick={handleVideo}>
                <Box
                  sx={{ zIndex: 10, position: "relative" }}
                  onClick={handleOpen}
                >
                  <Box sx={{ zIndex: 10, position: "relative" }}>
                    <CircularWaves />
                  </Box>

                  <Box
                    sx={{
                      zIndex: 30,
                      position: "relative",
                      color: "white",
                      borderRadius: "50%",
                      bgcolor: "orangered",
                      height: "50px",
                      width: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": { bgcolor: "#1779f7" },
                    }}
                  >
                    <PlayArrowIcon />
                  </Box>
                </Box>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <iframe
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: 0,
                        left: 0,
                        height: "100%",
                      }}
                      width=""
                      src="https://www.youtube.com/embed/ZCKYz6cgiRs"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                    <Button
                      variant="contained"
                      sx={{
                        zIndex: 10,
                        position: "absolute",
                        left: "103%",
                        top: "0%",
                        bgcolor: "#ff4500",
                        "&:hover": { bgcolor: "#1779f7" },
                      }}
                      onClick={handleClose}
                    >
                      <Cancel />
                    </Button>
                  </Box>
                </Modal>
              </Box>
            </Grid>
          </GridContainer> */}
        </Container>
      </MuiMainBox>
    </>
  );
}
