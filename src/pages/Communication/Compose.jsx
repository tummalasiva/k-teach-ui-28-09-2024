/** @format */

import React from "react";
import PageHeader from "../../components/PageHeader";
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  linearProgressClasses,
  MenuItem,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Switch,
  Button,
  Checkbox,
  ListItemText,
  Autocomplete,
  InputBase,
  Popper,
} from "@mui/material";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 800 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: theme.palette.mode === "light" ? "#f42323" : "#308fe8",
  },
}));

export default function Compose() {
  return (
    <>
      <PageHeader title="Compose" />
      <Card sx={{ mt: 3 }}>
        <div
          style={{
            paddingLeft: "1rem",
            display: "flex",
            gap: "5px",
          }}>
          <div>
            Total SMS : <span style={{ fontWeight: "bold" }}>79875</span>
          </div>
          <div>
            Consumed SMS : <span style={{ fontWeight: "bold" }}>{79875}</span>
          </div>
          <div>
            Balance SMS : <span style={{ fontWeight: "bold" }}>00099999</span>
          </div>
        </div>
        <div
          style={{
            padding: "1rem",
          }}>
          <BorderLinearProgress
            variant="determinate"
            value={((79875 - 887) * 100) / 79875}
          />
        </div>
      </Card>
    </>
  );
}
