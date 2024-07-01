/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Typography, css, keyframes, styled } from "@mui/material";
import themeData from "../../../../data/themeData";
import NewsDetails from "./NewsDetails";
import image from "../../../assets/images/school-white.avif";
import Dots from "../../../data/Dots";
import { get } from "../../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../../services/urlConstants";
import SettingContext from "../../../../context/SettingsContext";

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(1000%);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const animatedPause = css`
  animation-play-state: paused;
`;

const MuiBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  justifyContent: "center",
  position: "relative",
  backgroundColor: "red",
  ...animatedPause,
}));

const scrollAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const AnimatedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  animation: `${scrollAnimation} 8s linear infinite`,
  "&:hover": {
    animationPlayState: "paused",
  },
}));

// const AnimatedBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: " column-reverse",
//   animation: "scroll 8s linear infinite",
// }));

const MuiCard = styled(Card)(({ theme }) => ({
  display: "flex",
  height: 300,
  flexDirection: "column",
  alignItems: "center",
  marginTop: "40px",
  boxShadow: "6px 5px 25px rgba(0,0,0,0.08)",
  borderRadius: "12px",
}));

const TypographyMain = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  width: "max-content",
  fontWeight: 700,
  color: themeData.darkPalette.primary.main,
  textShadow: "10px 8px 8px #969c96",
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },

  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    margin: 0,
    padding: "0",
  },
  [theme.breakpoints.down(600)]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down(500)]: {
    fontSize: "15px",
  },
}));

const AnnounceNews = [
  {
    title: "Taja Khabar aaj ke naye jivan",
    date: "12-23-12",
    image: "../../../assets/images/school-white.avif",
    shortNews: "Koi nahi janta aaj ke jamane ke logo ka soch",
    news: " React Hook React.useEffect has a missing dependency: 'SIDE_MENU_DATA'. Either include it or remove the dependency array",
  },
];

export default function NewsAndNotice() {
  const { selectedSetting } = useContext(SettingContext);
  const [notics, setNotices] = useState([]);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.news.listPublic, {
        params: { schoolId: selectedSetting._id },
      });

      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getNotics = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.notice.listPublic);
      setNotices(data.result);
      // console.log(data.result, "ggggfgffgffff");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getNotics();
  }, [selectedSetting]);

  return (
    <>
      <Box mx={7}>
        <MuiCard>
          <TypographyMain sx={{ mt: 3, textAlign: "center" }} variant="h3">
            NEWS & NOTICE
            <Dots />
          </TypographyMain>
          <MuiBox>
            {data.length ? (
              <AnimatedBox>
                {data.map((elem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <NewsDetails elem={elem} notics={notics} />
                    </React.Fragment>
                  );
                })}
              </AnimatedBox>
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  // fontWeight: "bold",
                  textAlign: "center",
                  color: "lightgrey",
                }}>
                No news and events are available at this time!
              </Typography>
            )}
            {/* </ScrollContent> */}
            {/* </ContainerWithScroll> */}
          </MuiBox>
        </MuiCard>
      </Box>
    </>
  );
}
