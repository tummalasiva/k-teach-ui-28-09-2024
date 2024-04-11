import { Box, Card, Grid, Paper, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Collapsible from "react-collapsible";

import dayjs from "dayjs";
import "../Styles/Dashboard.css";

const ScrollContainer = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  margin: "18px",
  transform: "translateY(100%)",
  animation: "my-animation 15s linear infinite",
  animationPlayState: "running",

  "@keyframes my-animation": {
    from: {
      transform: "translateY(100%)",
    },
    to: {
      transform: "translateY(-100%)",
    },
  },
}));

const DashboardScorlText = styled(Card)(({ theme }) => ({
  height: "100%",
  textAlign: "center",
  margin: "10px 0px",
}));

const NoDataFound = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  margin: "5px",
  padding: "5px",
}));

const DashboardNewsConent = styled(Box)(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  height: "auto",
  width: "95%",
  marginLeft: "1rem",
  marginRight: "2rem",
  padding: "0px",
  minHeight: "100px",
  position: "relative",
  marginBottom: "10px",
}));

const NewsDateMonth = styled(Card)(({ theme }) => ({
  width: "100%",
  minWidth: "35%",
  maxWidth: "40%",
  marginTop: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const TitleDiscrption = styled(Box)(({ theme }) => ({
  marginLeft: "8px",
  wordWrap: "break-word",
  wordBreak: "break-all",
  marginTop: "15px",
}));

export default function Events() {
  const [notice, setNotice] = useState([
    { title: " 1", notice: "wertfygjhkl" },
    { title: " 2", notice: "sdfghjnm,." },
    { title: " 3", notice: "asdfghjnkm" },
  ]);
  const [holidays, setHolidays] = useState([
    { title: " 1", note: "ertyui" },
    { title: " 2", note: "rsetyghujkl;dfh rdtfgyhkj rdtfgy" },
    { title: " 3", note: "qwesrrfghjkm" },
  ]);
  return (
    <>
      <Paper sx={{ padding: 2, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Calendar
              tileClassName={({ date }) => {
                const today = new Date();
                if (date.toDateString() === today.toDateString()) {
                  return "blue-day";
                }
                return "";
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card sx={{ padding: "15px" }}>
              <Collapsible trigger={`Notices: (${notice.length})`}>
                <Box sx={{ maxHeight: "130px", overflow: "auto" }}>
                  <ScrollContainer>
                    {notice.map((data, index) => (
                      <>
                        <DashboardScorlText key={index}>
                          <DashboardNewsConent>
                            <NewsDateMonth
                              sx={{ backgroundColor: "rgb(211, 211, 211)" }}
                            >
                              <Box>
                                {dayjs(data.date).format("DD-MMM-YYYY")}
                              </Box>
                            </NewsDateMonth>
                            <TitleDiscrption>
                              <Box>
                                <Typography>{data.title}</Typography>
                              </Box>
                              <Box>{data.notice}</Box>
                            </TitleDiscrption>
                          </DashboardNewsConent>
                        </DashboardScorlText>
                      </>
                    ))}
                  </ScrollContainer>
                </Box>
              </Collapsible>

              {!notice.length && (
                <NoDataFound variant="h6">No data found</NoDataFound>
              )}
            </Card>

            <Card sx={{ padding: "15px", margin: "10px 0px" }}>
              <Collapsible trigger={`Holidays: (${holidays.length})`}>
                <Box sx={{ maxHeight: "140px", overflow: "auto" }}>
                  <ScrollContainer>
                    {holidays.map((data, index) => (
                      <>
                        <DashboardScorlText key={index}>
                          <DashboardNewsConent>
                            <NewsDateMonth
                              sx={{ backgroundColor: "rgb(211, 211, 211)" }}
                            >
                              <Box className="date">
                                {dayjs(data.fromDate).format("DD-MMM-YYYY")}
                              </Box>
                            </NewsDateMonth>
                            <TitleDiscrption>
                              <Box>
                                <Typography>{data.title}</Typography>
                              </Box>
                              <Box>{data.note}</Box>
                            </TitleDiscrption>
                          </DashboardNewsConent>
                        </DashboardScorlText>
                      </>
                    ))}
                  </ScrollContainer>
                </Box>
              </Collapsible>
              {!holidays.length && (
                <NoDataFound variant="h6">No data found</NoDataFound>
              )}
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
