/** @format */

import { Box, Paper } from "@mui/material";
import React, { useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingContext from "../context/SettingsContext";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  marginBottom: "20px",
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.primary.light,
}));

export default function PageHeader({ title = "", showTextField = true }) {
  return (
    <Wrapper>
      <Typography
        component="h1"
        sx={{
          fontWeight: "bold",
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        }}>
        {title}
      </Typography>
    </Wrapper>
  );
}
