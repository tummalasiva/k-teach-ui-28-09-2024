/** @format */

import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const CountDownTimer = ({ endTime, disableSubmission = () => {} }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(now);
    const [hours, minutes] = endTime.split(":");
    end.setHours(parseInt(hours, 10));
    end.setMinutes(parseInt(minutes, 10));
    const difference = end - now;

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);
      const minutesLeft = Math.floor(totalSeconds / 60);
      const secondsLeft = totalSeconds % 60;
      return {
        minutes: minutesLeft,
        seconds: secondsLeft,
      };
    } else {
      return {
        minutes: 0,
        seconds: 0,
      };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  useEffect(() => {
    if (timeLeft.minutes === 0) {
      disableSubmission();
    }
  }, [timeLeft.minutes]);

  return (
    <Box sx={{ padding: "5px" }}>
      <Typography>
        <Typography
          component="span"
          sx={{
            fontWeight: "bold",
            color: "red",
            fontSize: "20px",
          }}>
          {timeLeft.minutes}
        </Typography>{" "}
        minutes left
      </Typography>
    </Box>
  );
};

export default CountDownTimer;
