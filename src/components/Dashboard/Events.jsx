/** @format */

import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Collapsible from "react-collapsible";

import dayjs from "dayjs";
import "../Styles/Dashboard.css";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import themeData from "../../data/themeData";

const ScrollContainer = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  margin: "18px",
  transform: "translateY(0%)",
  animation: "scroll 15s linear infinite",
  animationPlayState: "running",

  "&:hover": {
    animationPlayState: "paused",
  },

  "@keyframes scroll": {
    from: {
      transform: "translateY(50%)",
    },
    to: {
      transform: "translateY(-100%)",
    },
  },
}));

const DashboardScorlText = styled(Card)(({ theme }) => ({
  textAlign: "center",
  margin: "10px 0px",

  height: "100%",
}));

const NoDataFound = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  margin: "5px",
  padding: "5px",
  fontWeight: 700,
}));

const DashboardNewsConent = styled(Box)(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  height: "auto",
  width: "95%",
  marginLeft: "1rem",
  marginRight: "2rem",
  paddingBottom: "5px",
  position: "relative",
}));

const BoldTrigger = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "18px",
  borderLeft: "7px solid #ffeb3b",
  paddingLeft: theme.spacing(1),
}));

const NoticeItem = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  "&:hover": {
    color: themeData.darkPalette.primary.main,
    cursor: "pointer",
  },
}));

export default function Events() {
  const { selectedSetting } = useContext(SettingContext);
  const [notice, setNotice] = useState([]);
  const [holidays, setHolidays] = useState([]);
  // console.log(notice?.length, "resss");

  const getNotice = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.notice.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setNotice(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getHolidays = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.holiday.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setHolidays(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotice();
    getHolidays();
  }, [selectedSetting._id]);

  return (
    <>
      <Paper
        sx={{
          padding: 2,
          mt: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.5)"
              : "whitesmoke",
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
        </Grid>
      </Paper>
    </>
  );
}
