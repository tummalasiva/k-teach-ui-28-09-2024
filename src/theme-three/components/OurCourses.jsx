/** @format */

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import image2 from "../assets/images/course-1.jpg";
import image3 from "../assets/images/course-2.jpg";
import EastIcon from "@mui/icons-material/East";

const OurCourses = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          py: 7,
        }}>
        <Typography
          sx={{ color: "#5d50c6", fontSize: "40px", fontWeight: 600 }}>
          Our{" "}
          <span style={{ color: "#fda638", fontSize: "40px", fontWeight: 600 }}>
            Courses
          </span>
        </Typography>
        <Typography sx={{ mb: 3, mt: 3 }}>
          Currently we are offering the below Courses
        </Typography>
      </Box>
      <Box px={{ xs: 2, md: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={6}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Grid item xs={12} sm={6} lg={6}>
                <img src={image2} height={200} width="100%" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  background: "#fafafa ",
                  height: "200px",
                  width: "100%",
                  p: 3,
                }}>
                <Typography
                  sx={{
                    color: "#1eaaf1",
                    fontWeight: 500,
                    fontSize: "24px",
                  }}>
                  Pre Primary
                </Typography>
                <Typography sx={{ color: "#fda638", mt: 1, mb: 1 }}>
                  Class time:
                  <span style={{ color: "black" }}> 9:00am - 3:30pm</span>{" "}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  <EastIcon sx={{ fontSize: "14px", mr: 2 }} />
                  Nursery
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  <EastIcon sx={{ fontSize: "14px", mr: 2 }} />
                  Lkg
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  <EastIcon sx={{ fontSize: "14px", mr: 2 }} />
                  Ukg
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Grid item xs={12} sm={6} lg={6}>
                <img src={image3} height={200} width="100%" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  background: "#fafafa ",
                  height: "200px",
                  width: "100%",
                  p: 3,
                }}>
                <Typography
                  sx={{
                    color: "#1eaaf1",
                    fontWeight: 500,
                    fontSize: "24px",
                  }}>
                  Primary
                </Typography>
                <Typography sx={{ color: "#fda638", mt: 1, mb: 1 }}>
                  Class time:
                  <span style={{ color: "black" }}> 9:00am - 3:30pm</span>{" "}
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  <EastIcon sx={{ fontSize: "14px", mr: 2 }} />
                  1st Std
                </Typography>
                <Typography sx={{ color: "gray" }}>
                  <EastIcon sx={{ fontSize: "14px", mr: 2 }} />
                  2nd Std
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OurCourses;
