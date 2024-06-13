/** @format */

import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
} from "@mui/material";
import SettingContext from "../../context/SettingsContext";

const MuiTableCel = styled(TableCell)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  color: "black",
  padding: "10px",
}));

export default function Routine() {
  const [routines, setRoutines] = useState([]);
  const { selectedSetting } = useContext(SettingContext);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "15px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="routine table">
        <TableHead>
          <TableRow>
            <MuiTableCel align="center">Day</MuiTableCel>
            <MuiTableCel align="center">Routine</MuiTableCel>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <MuiTableCel align="center">Monday</MuiTableCel>
            <MuiTableCel align="center">
              <Box component="span" sx={{ p: 1.5, border: "1px solid grey" }}>
                12:00-12:20
              </Box>
            </MuiTableCel>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
