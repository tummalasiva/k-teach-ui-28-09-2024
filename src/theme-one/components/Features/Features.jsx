import { Box, Grid, Typography, styled } from "@mui/material";
import React from "react";
import featureList from "../data/featureList";
import icon1 from "../../../theme-one/assets/Images/icon01.png";
import icon2 from "../../../theme-one/assets/Images/icon02.png";
import icon3 from "../../../theme-one/assets/Images/icon03.png";
import icon4 from "../../../theme-one/assets/Images/icon04.png";

import { useNavigate } from "react-router-dom";
const Contenet = styled(Box)(({ theme }) => ({
  display: "flex",
  color: "black",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
}));
const MuiBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#F1F4F6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "20px",
  justifyContent: "center",
  "&:hover": {
    transform: "scale(1.2)",
    transition: "all 0.3s ease",
    behaviour: "smooth",
  },
}));

const Header = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  width: "200px",
  textAlign: "center",
}));

const Features = () => {
  let navigate = useNavigate();
  const handleClick = (data) => {
    console.log("clicked");
    navigate(data);
  };

  let icons = [icon1, icon2, icon3, icon4];
  return (
    <MuiBox>
      <Grid container>
        {featureList.map((d, i) => (
          <Grid key={i} item xs={12} lg={3} md={3}>
            <Contenet
              py={5}
              component="div"
              onClick={() => handleClick(d.path)}
            >
              <Box>
                <ImageBox>
                  <img src={icons[i]} style={{ height: 85 }} alt="loading..." />
                </ImageBox>
                <Header variant="h6" fontSize={16}>
                  {d.title}
                </Header>
              </Box>
            </Contenet>
          </Grid>
        ))}
      </Grid>
    </MuiBox>
  );
};

export default Features;
