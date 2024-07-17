/** @format */

import React, { Fragment, useContext } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";

// icons
import { Close } from "@mui/icons-material";
import ThemeModeContext from "../../context/ThemeModeContext";
import dayjs from "dayjs";

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
export default function ViewInstallments({
  open = true,
  title = "",
  tableData = [],
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
            <TableHead
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
              }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  S.No
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Due Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData?.map((tableElement, i) => (
                <Fragment key={i}>
                  <TableRow>
                    <StyledTableCell align="center">{i + 1}</StyledTableCell>
                    <StyledTableCell align="center">
                      {tableElement.amount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {dayjs(tableElement.dueDate).format("DD/MM/YYYY")}
                    </StyledTableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}
