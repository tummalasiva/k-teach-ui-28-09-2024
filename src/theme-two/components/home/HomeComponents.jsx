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
} from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import CircularWaves from "../animated-button/CircularWaves";
// icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import themeData from "../../../data/themeData";

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

const VideoPlayButton = styled(Box)(({ theme }) => ({
  color: "white",
  borderRadius: "50%",
  background: themeData.lightPalette.secondary.main,
  height: "60px",
  width: "60px",
  display: "flex",
  // zIndex: 30,
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
  justifyContent: "center",
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
  marginTop: "50px",
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
              // maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "80%" },
            }}
          >
            <Box sx={{ borderLeft: "solid #ff4500", mt: 13 }}>
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
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#fff",
                    border: `1px solid ${themeData.lightPalette.secondary.main}`,
                  },
                }}
              >
                GET ADMISSION
              </Button>
              {/* <Box
                // sx={{ zIndex: 10, position: "relative" }}
                // onClick={handleOpen}
              > */}
              {/* <Box sx={{ zIndex: 10, position: "relative" }}>
                  <CircularWaves />
                </Box> */}

              <RippleVideoButton>
                <VideoPlayButton>
                  <PlayArrowIcon />
                </VideoPlayButton>
              </RippleVideoButton>
              {/* </Box> */}

              <Modal
                // open={open}
                // onClose={handleClose}
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
                    // onClick={handleClose}
                  >
                    cancel
                    {/* <Cancel /> */}
                  </Button>
                </Box>
              </Modal>
            </Box>
          </Box>
          <PencileBox>
            <AnimatedImage
              src="pencile.png"
              width={100}
              height={100}
              style={{ position: "absolute", top: "220px " }}
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
                top: "380px ",
              }}
            />
            <AnimatedImage
              src="magnifying.png"
              width={100}
              height={100}
              style={{
                position: "absolute",
                right: "70px",
                top: "560px ",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AnimatedImage
                src="science.png"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  marginLeft: "2px",
                  top: "200px ",
                }}
              />
              <AnimatedImage
                src="light-bulb.png"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  marginLeft: "2px",
                  bottom: "-10px",
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
