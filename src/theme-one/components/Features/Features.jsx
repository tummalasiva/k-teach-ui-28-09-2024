import { Box, Container, Grid, Typography, styled } from "@mui/material";
import React from "react";
import dataList from "./dataList";
import icon1 from "../../../theme-one/assets/Images/icon01.png";
import icon2 from "../../../theme-one/assets/Images/icon02.png";
import icon3 from "../../../theme-one/assets/Images/icon03.png";
import icon4 from "../../../theme-one/assets/Images/icon04.png";

import { useNavigate } from "react-router-dom";

const Features = () => {
  const MainBox = styled(Box)(({ theme }) => ({
    display: "flex",
    color: "black",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  }));

  let navigate = useNavigate();
  const handleClick = (data) => {
    console.log("clicked");
    navigate(data);
  };

  let icons = [icon1, icon2, icon3, icon4];
  return (
    <Box
      sx={{
        backgroundColor: "#F1F4F6",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container>
        {dataList.map((d, i) => (
          <Grid key={i} item xs={12} lg={3} md={3}>
            <MainBox py={5} component="div" onClick={() => handleClick(d.path)}>
              <Box>
                <Box
                  mb={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    "&:hover": {
                      transform: "scale(1.2)",
                      transition: "all 0.3s ease",
                      behaviour: "smooth",
                    },
                  }}
                >
                  <img src={icons[i]} style={{ height: 85 }} alt="loading..." />
                </Box>
                <Typography
                  variant="h6"
                  fontSize={16}
                  sx={{
                    fontWeight: 600,
                    width: "200px",
                    textAlign: "center",
                  }}
                >
                  {d.title}
                </Typography>
              </Box>
            </MainBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
