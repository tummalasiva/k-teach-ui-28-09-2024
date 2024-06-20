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

// icons
import { Close } from "@mui/icons-material";
import ThemeModeContext from "../../context/ThemeModeContext";

const StyledTableRow = styled(TableRow)(({ theme, isDarkMode }) => ({
  width: "200px",
  color: isDarkMode ? "#fff" : "#000",
  "&:nth-of-type(odd)": {
    backgroundColor: isDarkMode ? "transparent" : "#F0F8FF",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme, isDarkMode }) => ({
  width: "200px",
  border: "1px solid gray",
  color: isDarkMode ? "#fff" : "#000",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: isDarkMode ? "transparent" : "blue",
    color: isDarkMode ? "#fff" : "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function VisitorInfoViewModel({
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
                  School Name
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.school?.name}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Name
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.name}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Phone
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.phone}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Coming From
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.comingForm}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  User Type
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.toMeetUserType?.name}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  To Meet
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.toMeetUserName}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Reason To Meet
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.reasonToMeet?.charAt(0).toUpperCase() +
                    tableData?.reasonToMeet?.slice(1)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Check In
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.checkIn}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Check Out
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.checkOut}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow isDarkMode={isDarkMode}>
                <StyledTableCell
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  isDarkMode={isDarkMode}>
                  Note
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  width={100}
                  isDarkMode={isDarkMode}>
                  {tableData?.note}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}
