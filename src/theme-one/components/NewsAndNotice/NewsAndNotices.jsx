/** @format */

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  css,
  keyframes,
  styled,
} from "@mui/material";
import themeData from "../../../data/themeData";

import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";
import NewsAndNoticeDetails from "./NewsAndNoticeDetails";
import Header from "../Header";
import NoticeDetails from "../Notice/NoticeDetails";

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
  // width: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  justifyContent: "center",
  position: "relative",
  // backgroundColor: "red",
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
  transition: "transform 0.3s ease",
  animation: `${scrollAnimation} 20s linear infinite`,
  "&:hover": {
    animationPlayState: "paused",
  },
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: "flex",
  height: 400,
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  background: "#33415c",
  // boxShadow: "6px 5px 25px rgba(0,0,0,0.08)",
  boxShadow: "none",
  borderRadius: "5px",
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

export default function NewsAndNotices() {
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
      const { data } = await get(PRIVATE_URLS.notice.listPublic, {
        params: { schoolId: selectedSetting._id },
      });
      setNotices(data.result);
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
      <Box sx={{ mx: 1 }}>
        <Box pt={3}>
          <Header title1="News &" title2="Notice" />{" "}
        </Box>

        <MuiCard>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ background: "#fff", width: "3px" }}
              />
            }
            spacing={2}
            sx={{ mx: 1 }}>
            <MuiBox>
              {data?.length ? (
                <AnimatedBox>
                  {data.map((news, index) => {
                    return (
                      <React.Fragment key={index}>
                        <NewsAndNoticeDetails key={index} news={news} />
                      </React.Fragment>
                    );
                  })}
                </AnimatedBox>
              ) : (
                <Typography
                  sx={{
                    fontSize: "18px",
                    textAlign: "center",
                    color: "lightgrey",
                  }}>
                  No news and events are available at this time!
                </Typography>
              )}
            </MuiBox>
            <MuiBox>
              {notics?.length ? (
                <AnimatedBox>
                  {notics.map((notice, index) => {
                    return (
                      <React.Fragment key={index}>
                        <NoticeDetails key={index} notice={notice} />
                      </React.Fragment>
                    );
                  })}
                </AnimatedBox>
              ) : (
                <Typography
                  sx={{
                    fontSize: "18px",
                    textAlign: "center",
                    color: "lightgrey",
                  }}>
                  No Notics are available at this time!
                </Typography>
              )}
            </MuiBox>
          </Stack>
        </MuiCard>
      </Box>
    </>
  );
}
