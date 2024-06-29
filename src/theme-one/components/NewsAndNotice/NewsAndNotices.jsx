/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Grid, Typography, keyframes, styled } from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import NewsAndNoticeDetails from "./NewsAndNoticeDetails";
import Header from "../Header";
import NoticeDetails from "../Notice/NoticeDetails";

const NewsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "250px",
  overflowY: "auto",
  justifyContent: "center",
  position: "relative",
}));

const scroll = keyframes`
  0% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const NewsScroll = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  animation: `${scroll} 20s linear infinite`,

  "&:hover": {
    animationPlayState: "paused",
  },
}));

const NewsAndNotices = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);

  const [notice, setNotice] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      try {
        const { data } = await get(PRIVATE_URLS.news.list, {
          params: {
            schoolId: selectedSetting._id,
          },
        });
        setData(data.result);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllNews();
  }, [selectedSetting]);

  useEffect(() => {
    const getAllNotice = async () => {
      try {
        const { data } = await get(PRIVATE_URLS.notice.list, {
          params: {
            schoolId: selectedSetting._id,
          },
        });
        setNotice(data.result);

        console.log(data.result, "kkkkkkkklllllllppppppp");
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllNotice();
  }, [selectedSetting]);
  return (
    <>
      <Box pt={3}>
        <Header title1="News &" title2="Notice" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Card
            elevation={0}
            sx={{
              display: "flex",

              border: "2px solid #ffffff",
              boxShadow: "6px 5px 25px rgba(0,0,0,0.08)",
              borderRadius: "10px",

              margin: "30px",
            }}>
            <NewsContainer>
              {data.length ? (
                <NewsScroll>
                  {data.map((news, index) => (
                    <NewsAndNoticeDetails key={index} news={news} />
                  ))}
                </NewsScroll>
              ) : (
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    maxWidth: "900px",
                  }}>
                  No News/Events to show at the moment!
                </Typography>
              )}
            </NewsContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card
            elevation={0}
            sx={{
              display: "flex",

              border: "2px solid #ffffff",
              boxShadow: "6px 5px 25px rgba(0,0,0,0.08)",
              borderRadius: "10px",
              margin: "30px",
            }}>
            <NewsContainer>
              {notice.length ? (
                <NewsScroll>
                  {notice.map((notice, index) => (
                    <NoticeDetails key={index} notice={notice} />
                  ))}
                </NewsScroll>
              ) : (
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    maxWidth: "900px",
                  }}>
                  No News/Events to show at the moment!
                </Typography>
              )}
            </NewsContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default NewsAndNotices;
