/** @format */

import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography, Container } from "@mui/material";
import { BsPhoneFill } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import SettingContext from "../../../../context/SettingsContext";

const ContactUs = () => {
  const { selectedSetting } = useContext(SettingContext);
  let data = [
    {
      id: 1,
      icon: <BsPhoneFill color="#F86F03" size="2rem" />,
      title1: "CALL US",
      title2: `Phone: ${selectedSetting?.phone}`,

      title3: "",
      title4: "",
    },

    {
      id: 2,

      icon: <MdMail color="#F86F03" size="2rem" />,

      title1: "EMAIL",

      title2: `${selectedSetting?.email}`,

      title3: "",

      title4: "",
    },

    {
      id: 3,

      icon: <ImLocation color="#F86F03" size="2rem" />,

      title1: "ADDRESS",

      title2: selectedSetting?.address,

      title3: "",

      title4: "",
    },
  ];
  return (
    <>
      <Container sx={{ marginTop: "10vh" }}>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "serif",
              fontSize: "1.5rem",
              margin: "0px 0px 50px",
              textAlign: "center",
            }}>
            FIND OUR ADDRESS
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {data.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Grid item xs={12} md={6} sm={6} lg={4}>
                  <Box sx={{ textAlign: "center" }}>
                    {item.icon}

                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#F86F03",
                        margin: "22px 0px 8px",
                        fontFamily: "serif",
                      }}>
                      {item.title1}
                    </Typography>

                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "sans-serif",
                        fontSize: "1rem",
                        margin: "0px 0px 10px",
                      }}>
                      {item.title2}
                    </Typography>

                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "sans-serif",
                        fontSize: "1rem",
                        margin: "0px 0px 10px",
                      }}>
                      {item.title3}
                    </Typography>

                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "sans-serif",
                        fontSize: "1rem",
                        margin: "0px 0px 30px",
                      }}>
                      {item.title4}
                    </Typography>
                  </Box>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "serif",
              fontSize: "1.5rem",
              margin: "0px 0px 50px",
              textAlign: "center",
            }}>
            FIND OUR LOCATION
          </Typography>
        </Box>

        <Box
          style={{
            border: "1px solid #ffff",
            borderShadow: "10px 20px #fff",
            marginBottom: "3rem",
            textAlign: "center",
          }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3891.743231289096!2d77.2549167!3d12.730166700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDQzJzQ4LjYiTiA3N8KwMTUnMTcuNyJF!5e0!3m2!1sen!2sin!4v1705985316943!5m2!1sen!2sin"
            width="80%"
            height="350"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          />
        </Box>
      </Container>
    </>
  );
};

export default ContactUs;
