import { Box, Button, Grid, Typography, styled } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SettingContext from "../../context/SettingsContext";
import themeData from "../../data/themeData";

const Para = styled(Typography)(({ theme }) => ({
  fontFamily: "sans-serif",
  color: "white",
}));

const MainBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://shtheme.com/demosd/eduvisionwp/wp-content/themes/eduvision/images/index06/3.jpg)",
  backgroundRepeat: "no-repeat",
  width: "100%",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
}));

const MuiHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  fontWeight: "bold",
  color: "white",
  fontFamily: "sans-serif",
}));

const QuickLook = () => {
  const { selectedSetting } = useContext(SettingContext);
  return (
    <MainBox
      sx={{
        padding: { xs: "0px", sm: "0px", md: "10px 10px", lg: "60px 25px" },
      }}
    >
      <Grid container>
        <Grid
          sx={{
            padding: { xs: "0", sm: "0", md: "0 0", lg: "0 50px" },
            order: { xs: 2, sm: 2, md: 1 },
          }}
          item
          xs={12}
          md={6}
          lg={8}
        >
          <MuiHeading
            sx={{
              fontSize: { xs: "30px", sm: "30px", md: "35px", lg: "2.5rem" },
              textAlign: { xs: "center", sm: "center", md: "left" },
              ml: { lg: 4, md: 2, sm: 0, xs: 0 },
              marginTop: { lg: "2rem", md: "16px", sm: "15px", xs: "15px" },
            }}
          >
            A QUICK LOOK AT
            <span style={{ color: themeData.darkPalette.secondary.main }}>
              {" "}
              {selectedSetting.schoolName}
            </span>
          </MuiHeading>

          <Para
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "1.1rem" },
              textAlign: { xs: "center", sm: "center", md: "left" },
              padding: { xs: "1rem", sm: "1rem", md: "1rem", lg: "2rem" },
            }}
          >
            {selectedSetting.schoolName} School is a prestigious educational
            institution dedicated to nurturing young minds and empowering them
            to reach their full potential. Established in 1998, our school has
            garnered a reputation for academic excellence, holistic development,
            and a supportive learning environment. We take pride in our team of
            experienced educators, state-of-the-art facilities, and a
            comprehensive curriculum designed to prepare students for success in
            the dynamic world of tomorrow.
          </Para>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "flex-start" },
              paddingLeft: { sx: "0", sm: "0", md: "20px", lg: "30px" },
              marginBottom: "20px",
            }}
          >
            <Link to="/contact-us">
              <Button
                sx={{
                  background: themeData.darkPalette.secondary.main,
                  "&:hover": {
                    backgroundColor: themeData.darkPalette.secondary.main,
                  },
                }}
                variant="contained"
              >
                Contact Us
              </Button>{" "}
            </Link>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
            paddingTop: { md: "20px", xs: "20px" },
            order: { xs: 1, sm: 1, md: 2 },
          }}
        >
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYThhcGVmeWY4MnFqZGtjOXlraWp2a2d5cjd1OG9kYnAzNDRlbnBhayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VZUhn04QSs0AmsHRic/giphy.gif"
            alt="image1"
            height={300}
            width={300}
            style={{ borderRadius: "5px" }}
          />
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default QuickLook;
