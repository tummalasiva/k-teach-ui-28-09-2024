/** @format */

import React, { useContext } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
// icons
import { Close } from "@mui/icons-material";
import ThemeModeContext from "../../context/ThemeModeContext";

export default function ExamResultViewModel({
  title = "",
  open = false,
  tableData,
  onClose = () => {},
}) {
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}
          id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: isDarkMode ? "#fff" : "#000",
          }}>
          <Close />
        </IconButton>
        <DialogContent
          sx={{
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
              }}>
              <TableRow>
                <TableCell align="center">S.No</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Total Marks</TableCell>
                <TableCell align="center">Obtained Marks</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.subjects?.map((d, i) => (
                <TableRow>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{d?.subject?.name}</TableCell>
                  <TableCell align="center">{d?.totalMarks}</TableCell>
                  <TableCell align="center">{d?.obtainedMarks}</TableCell>
                  <TableCell align="center">{d?.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box mt={1}>
            <Typography variant="subtitle1">
              <b>Total Subject:</b> {tableData.subjects?.length}
            </Typography>
            <Typography variant="subtitle1">
              <b>Max Marks:</b> {tableData.totalMarks}
            </Typography>
            <Typography variant="subtitle1">
              <b>Obtained Marks:</b> {tableData.obtainedMarks}
            </Typography>
            <Typography variant="subtitle1">
              <b>Percentage: </b>
              {tableData.percentage ? tableData.percentage.toFixed(2) : "0.00"}%
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
