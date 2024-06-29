/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Box, Card, Typography, keyframes, styled } from "@mui/material";
import SettingContext from "../../../context/SettingsContext";
import { get } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import NewsAndNoticeDetails from "./NewsAndNoticeDetails";
import Header from "../Header";

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
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const NewsScroll = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  animation: `${scroll} 12s linear infinite`,

  "&:hover": {
    animationPlayState: "paused",
  },
}));

const NewsAndNotices = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);

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

  return (
    <>
      <Box pt={3}>
        <Header title1="News &" title2="Notice" />
      </Box>
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
    </>
  );
};

export default NewsAndNotices;
