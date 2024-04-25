import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Container,
  styled,
  IconButton,
  Paper,
} from "@mui/material";
import { BsPhoneFill } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import themeData from "../../../../data/themeData";

const Header = styled(Typography)(({}) => ({
  fontWeight: "bold",
  fontFamily: "serif",
  fontSize: "1.5rem",
  margin: "0px 0px 50px",
  textAlign: "center",
}));

const Title = styled(Typography)(({}) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  color: themeData.darkPalette.primary.main,
  margin: "22px 0px 8px",
  fontFamily: "serif",
}));

const Titl2 = styled(Typography)(({}) => ({
  color: "black",
  fontFamily: "sans-serif",
  fontSize: "1rem",
  margin: "0px 0px 10px",
}));

const MuiBox = styled(Box)(({}) => ({
  border: "1px solid #ffff",
  borderShadow: "10px 20px #fff",
  marginBottom: "3rem",
  textAlign: "center",
  paddingBottom: "20px",
}));

const MuiMainBox = styled(Box)(({}) => ({
  background: "#fff",
  borderRadius: "8px",
}));

let data = [
  {
    id: 1,
    icon: (
      <BsPhoneFill
        style={{ color: themeData.darkPalette.primary.main, fontSize: "25px" }}
      />
    ),
    title1: "CALL US",
    title2: `Phone:8988899900`,
  },
  {
    id: 2,

    icon: (
      <MdMail
        style={{ color: themeData.darkPalette.primary.main, fontSize: "25px" }}
      />
    ),

    title1: "EMAIL",

    title2: `abc@gamil.com`,
  },

  {
    id: 3,

    icon: (
      <ImLocation
        style={{ color: themeData.darkPalette.primary.main, fontSize: "25px" }}
      />
    ),

    title1: "ADDRESS",

    title2: "Belagavi",
  },
];
export default function ContactUs() {
  return (
    <>
      <MuiMainBox sx={{ mx: 4 }}>
        <Container sx={{ mt: 4 }}>
          <Header pt={2}>FIND OUR ADDRESS</Header>

          <Grid container spacing={2}>
            {data.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <Grid item xs={12} md={4} sm={4} lg={4} textAlign="center">
                    <IconButton>{item.icon}</IconButton>
                    <Title>{item.title1}</Title>
                    <Titl2>{item.title2}</Titl2>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Header>FIND OUR LOCATION</Header>
          </Box>

          <MuiBox>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.43319155182!2d77.55235837528166!3d13.008063114077418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bbc051f1ab%3A0x5b567d40d77191c6!2sWebspruce!5e0!3m2!1sen!2sin!4v1694703840631!5m2!1sen!2sin%22"
              width="80%"
              height="350"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
          </MuiBox>
        </Container>
      </MuiMainBox>
    </>
  );
}
