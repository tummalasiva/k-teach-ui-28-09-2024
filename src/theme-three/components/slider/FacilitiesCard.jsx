/** @format */

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import icon1 from "../../assets/images/Icons/icon-1.png";
import icon2 from "../../assets/images/Icons/icon2.png";
import icon3 from "../../assets/images/Icons/icon3.png";
import icon4 from "../../assets/images/Icons/icon4.png";

const FacilitiesCard = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{
            backgroundColor: "#1eaaf1",
            display: "flex",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              objectFit: "contain",
              width: "100%",
              height: 300,
            }}>
            <Box
              sx={{
                height: 110,
                width: 110,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                top: "-16%",
                position: "absolute",
              }}
              title="green iguana">
              <img src={icon1} alt="Loading..." height={60} width={60} />
            </Box>

            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "80px",
              }}>
              Experienced Teachers
            </Typography>
            <Box
              sx={{
                color: "white",
                lineHeight: 1.8,
                p: 2,
                fontSize: "18px",
                textAlign: "center",
              }}>
              We have very well experienced teachers creating effective lesson
              plans and assessing student progress
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{
            background: "#8cc152",
            display: "flex",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              objectFit: "contain",
              width: "100%",
              height: 300,
            }}>
            <Box
              sx={{
                height: 110,
                width: 110,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                top: "-16%",
                // transform: "translate(-50%,-50%)",
                position: "absolute",
              }}
              // image={icon1}
              title="green iguana">
              <img src={icon2} alt="Loading..." height={60} width={60} />
            </Box>

            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "80px",
              }}>
              Books & Library
            </Typography>
            <Box
              sx={{
                color: "white",
                lineHeight: 1.8,
                p: 2,
                fontSize: "18px",
                textAlign: "center",
              }}>
              Books and libraries play a critical role in supporting student
              learning and fostering a love of reading
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{
            background: "#5d50c6",
            display: "flex",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              objectFit: "contain",
              width: "100%",
              height: 300,
            }}>
            <Box
              sx={{
                height: 110,
                width: 110,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                top: "-16%",
                // transform: "translate(-50%,-50%)",
                position: "absolute",
              }}
              // image={icon1}
              title="green iguana">
              <img src={icon3} alt="Loading..." height={60} width={60} />
            </Box>

            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "80px",
              }}>
              Special Education
            </Typography>
            <Box
              sx={{
                color: "white",
                lineHeight: 1.8,
                p: 2,
                fontSize: "18px",
                textAlign: "center",
              }}>
              We offer special education to weak students to ensure that every
              student has access to high-quality education
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{
            background: "#f1453d",
            display: "flex",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              objectFit: "contain",
              width: "100%",
              height: 300,
            }}>
            <Box
              sx={{
                height: 110,
                width: 110,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                top: "-16%",
                // transform: "translate(-50%,-50%)",
                position: "absolute",
              }}
              // image={icon1}
              title="green iguana">
              <img src={icon4} alt="Loading..." height={60} width={60} />
            </Box>

            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "80px",
              }}>
              Cultural Activities
            </Typography>
            <Box
              sx={{
                color: "white",
                lineHeight: 1.8,
                p: 2,
                fontSize: "18px",
                textAlign: "center",
              }}>
              Cultural activities in schools is an important way to enrich the
              educational experience and promote cultural understanding
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FacilitiesCard;
