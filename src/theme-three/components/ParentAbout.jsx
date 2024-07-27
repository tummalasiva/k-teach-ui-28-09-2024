/** @format */

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Carousel, { WithStore } from "react-spring-3d-carousel";
import avatar from "../assets/images/avatar.jpg";
import { config } from "react-spring";
import { useMediaQuery } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";

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

const CardStyles = styled(Card)(({ theme }) => ({
  display: "flex",
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
  [theme.breakpoints.between(279, 281)]: {
    width: 200,
  },
}));

const FaqStyle = styled(FaQuoteLeft)(({ theme }) => ({
  fontSize: "130px",
  position: "absolute",
  top: "9%",
  left: "30%",
  color: "#5d50c6",
  opacity: 0.1,
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
  [theme.breakpoints.between(279, 281)]: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
}));

const slides = [
  {
    key: 1,
    content: (
      <CardStyles elevation={0}>
        <Box sx={{ display: { xs: "none", md: "block" }, mt: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={avatar}
            alt="Loading..."
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flex: "1 0 auto",
              fontFamily: "Work Sans , Arial, sans-serif",
            }}>
            <FaqStyle />

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              fontSize="18px"
              lineHeight={1.6}
              fontWeight="500">
              We have been impressed with the level of individual attention our
              child has received at this school. The teachers and staff truly
              care about each student and work hard to ensure they are getting
              the support they need to succeed.{" "}
            </Typography>
            <Typography
              variant="body1"
              mt={2}
              mb={1}
              sx={{
                fontFamily: "Work Sans , Arial, sans-serif",
              }}>
              Sangeetha
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#1eaaf1",
                fontFamily: "Work Sans , Arial, sans-serif",
              }}>
              Mother
            </Typography>
          </CardContent>
        </Box>
      </CardStyles>
    ),
  },
  {
    key: 2,
    content: (
      <CardStyles elevation={0}>
        <Box sx={{ display: { xs: "none", md: "block" }, mt: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={avatar}
            alt="Loading..."
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", fontFamily: "Work Sans" }}>
            <FaqStyle />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              fontSize="18px"
              lineHeight={1.6}
              fontWeight="500">
              We are so grateful to have found this school for our children. The
              teachers are passionate and dedicated, and they have created a
              warm and welcoming environment that fosters learning and growth
            </Typography>
            <Typography
              variant="body1"
              mt={2}
              mb={1}
              sx={{
                fontFamily: "Work Sans",
              }}>
              Ramesh kumar
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#1eaaf1", fontFamily: "Work Sans" }}>
              Father
            </Typography>
          </CardContent>
        </Box>
      </CardStyles>
    ),
  },
  {
    key: 3,
    content: (
      <CardStyles elevation={0}>
        <Box sx={{ display: { xs: "none", md: "block" }, mt: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={avatar}
            alt="Loading..."
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* icons---- */}
          <FaqStyle />
          {/* ---------- */}
          <CardContent sx={{ flex: "1 0 auto", fontFamily: "Work Sans" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              fontSize="18px"
              lineHeight={1.6}
              fontWeight="500">
              The communication and partnership between the school and parents
              is outstanding. We feel well-informed and involved in our child's
              education, and we appreciate the frequent updates and
              opportunities to meet with teachers and staff.
            </Typography>
            <Typography
              variant="body1"
              mt={2}
              mb={1}
              sx={{
                fontFamily: "Work Sans",
              }}>
              Keerthana
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#1eaaf1", fontFamily: "Work Sans" }}>
              Mother
            </Typography>
          </CardContent>
        </Box>
      </CardStyles>
    ),
  },
];

export default function ParentAbout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = useMediaQuery("(max-width:1000px)");

  const numSlidesToShow = window.innerWidth < 768 ? 1 : 3;

  const slidesToShow = isMobile ? 1 : 1;

  const onChangeSlide = useCallback((newSlide) => {
    setCurrentSlide(newSlide);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (currentSlide === 0) {
        setCurrentSlide(1);
      } else if (currentSlide === 1) {
        setCurrentSlide(2);
      } else if (currentSlide === 2) {
        setCurrentSlide(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: 7,
          // mb: 2,
        }}>
        <Typography
          sx={{ color: "#5d50c6", fontSize: "40px", fontWeight: 600 }}>
          What Parents{" "}
          <span style={{ color: "#fda638", fontSize: "40px", fontWeight: 600 }}>
            Say About Us
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          // background: "red",
          height: "70vh",
          width: "80%",
          margin: "auto",
          py: 3,
        }}>
        <Carousel
          slides={slides}
          showNavigation={false}
          autoPlay={true}
          goToSlide={currentSlide}
          animationConfig={config.default}
          slidesToShow={numSlidesToShow}
        />
        <DotsContainer style={{ textAlign: "center" }}>
          {slides.map((slide, index) => (
            <Dot
              key={slide.key}
              onClick={() => onChangeSlide(index)}
              style={{
                backgroundColor:
                  index === currentSlide ? "#1eaaf1" : "rgba(0, 0, 0, 0.2)",
              }}
            />
          ))}
        </DotsContainer>
      </Box>
    </>
  );
}
