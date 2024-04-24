import React, { useContext } from "react";
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
} from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import CircularWaves from "../animated-button/CircularWaves";
// icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const slideIn = keyframes`
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
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

const AnimationBox = styled(Box)(({ theme }) => ({
  fontSize: "50px",
  color: "#fff",
  fontWeight: 600,
  marginTop: "3%",

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

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            selectedSetting.bannerImages &&
            selectedSetting.bannerImages.length > 0
              ? `url(${selectedSetting.bannerImages[0]})`
              : "url(/boy.png)",
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
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: "0 0", sm: "0 20px", md: "0 30px" },
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                textAlign: { xs: "start", md: "left" },
                maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "80%" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingTop: (theme) => theme.spacing(14),
                }}
              >
                <Box sx={{ borderLeft: "solid #ff4500" }}>
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
                    <Typography sx={{ color: "#fff" }}>
                      FUEL YOUR FUTURE
                    </Typography>
                  </MovingText>
                </Box>
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
                  <Typography variant="h5">More Than 50+ Faculties </Typography>
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
                  <Typography variant="h5">To Knowledge With Us.</Typography>
                </MovingText>
              </AnimationBox>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: { sm: "20px" },
                }}
              >
                <img
                  src="pencill.png"
                  width="100"
                  height="90"
                  className="rotate"
                  style={{ position: "absolute", top: "220px " }}
                />
              </Box>
              {/* <IconBox>
              <img
                src="science.png"
                width="100"
                height="90"
                style={{
                  position: "absolute",
                  right: "100px",
                  top: "300px ",
                }}
                className={css.rotate}
              />
              <img
                src="magnifying.png"
                width="100"
                height="90"
                style={{
                  position: "absolute",
                  right: "50px",
                  top: "550px ",
                }}
                className={css.rotate}
              />
            </IconBox> */}
              <IconBox>
                <img
                  src="globe-pencil.png"
                  width="100"
                  height="90"
                  style={{
                    position: "absolute",
                    right: "30px",
                    top: "380px ",
                  }}
                  className="rotate"
                />
                <img
                  src="magnifying.png"
                  width="100"
                  height="90"
                  style={{
                    position: "absolute",
                    right: "70px",
                    top: "550px ",
                  }}
                  className="rotate"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="science.png"
                    width="100"
                    height="90"
                    style={{
                      position: "absolute",
                      marginLeft: "2px",
                      top: "180px ",
                    }}
                    className="rotate"
                  />
                  <img
                    src="light-bulb.png"
                    width="100"
                    height="90"
                    style={{
                      position: "absolute",
                      marginLeft: "2px",
                      top: "600px ",
                    }}
                    className="rotate"
                  />
                </Box>
              </IconBox>
            </Box>

            <GridContainer
              container
              spacing={2}
              sx={{
                paddingTop: { xs: "50px", sm: "50px", md: "30px", lg: "80px" },
              }}
            >
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <Button
                  variant="contained"
                  //   onClick={handleNavigate}
                  sx={{
                    bgcolor: "#1779f7",
                    border: "solid #1779f7",
                    "&:hover": {
                      bgcolor: "transparent",
                      border: "solid #ff4500",
                    },
                  }}
                >
                  <Typography>GET ADMISSION</Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sm={4} md={3}>
                <Box component="div">
                  <Box
                    sx={{ zIndex: 10, position: "relative" }}
                    // onClick={handleOpen}
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
              </Grid>
            </GridContainer>
          </Container>
        </Box>
      </Box>
    </>
  );
}
