import React from "react";
import CountUp from "react-countup";
import { Grid, Typography, styled } from "@mui/material";

const MuiGrid = styled(Grid)(({ theme }) => ({
  margin: "0 auto",
  backgroundColor: "#00bda6",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "90%",
  borderRadius: "1rem",
  marginTop: "80px",
  marginBottom: "80px",
}));

const BoldTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "40px",
  fontWeight: 700,
}));

export default function CountUpTimer() {
  return (
    <>
      <MuiGrid
        container
        sx={{
          padding: { xs: "30px", sm: "80px", md: "80px", lg: "120px" },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{ borderLeft: "3px solid #50dbca", padding: "0px 15px", my: 2 }}
        >
          <BoldTypography variant="h2">
            <CountUp end={500} enableScrollSpy={true} />+
          </BoldTypography>

          <Typography style={{ color: "white", fontSize: "1.3rem" }}>
            Total Students
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{
            borderLeft: "3px solid #50dbca",
            padding: "0px 15px",
            my: 2,
          }}
        >
          <BoldTypography variant="h2">
            <CountUp end={40} enableScrollSpy={true} />+
          </BoldTypography>

          <Typography style={{ color: "white", fontSize: "1.3rem" }}>
            Total Teachers
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{ borderLeft: "3px solid #50dbca", padding: "0px 15px", my: 2 }}
        >
          <BoldTypography>
            <CountUp end={100} enableScrollSpy={true} />+
          </BoldTypography>

          <Typography style={{ color: "white", fontSize: "1.3rem" }}>
            Online Courses
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{ borderLeft: "3px solid #50dbca", padding: "0px 15px", my: 2 }}
        >
          <BoldTypography variant="h2">
            <CountUp end={5} enableScrollSpy={true} />
            k+
          </BoldTypography>

          <Typography style={{ color: "white", fontSize: "1.3rem" }}>
            People WorldWide
          </Typography>
        </Grid>
      </MuiGrid>
    </>
  );
}
