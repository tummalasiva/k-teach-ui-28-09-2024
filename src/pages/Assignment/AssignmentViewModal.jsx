/** @format */

import React, { useContext } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import themeData from "../../data/themeData";
import ThemeModeContext from "../../context/ThemeModeContext";

const StyledTableRow = styled(TableRow)(({ theme, isDarkMode }) => ({
  width: "200px",
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgb(81 81 81)" : "#F0F8FF",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme, isDarkMode }) => ({
  width: "200px",
  border: "1px solid gray",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: isDarkMode ? "transparent" : "blue",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function AssignmentViewModel({
  open = true,
  title = "",
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
          <Table aria-label="customized table">
            <TableBody>
              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Note
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.note || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}
