/** @format */

import React from "react";
import {
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
import themeData from "../../data/themeData";

//

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "200px",
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgb(81 81 81)" : "#F0F8FF",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: "200px",
  border: "1px solid gray",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: "#000",
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
  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}>
          <Close />
        </IconButton>
        <DialogContent>
          <Table aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  School Name
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.school?.name || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.name || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Phone
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.phone || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Coming From
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.comingForm || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  User Type
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.toMeetUserType?.name || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  To Meet
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.toMeetUserName || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Reason To Meet
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.reasonToMeet?.charAt(0).toUpperCase() +
                    tableData?.reasonToMeet?.slice(1)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Check In
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.checkIn || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Check Out
                </StyledTableCell>
                <StyledTableCell align="left" width={100}>
                  {tableData?.checkOut || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
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
