/** @format */

import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import ViewModel from "../../forms/ViewModel";
import dayjs from "dayjs";
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

export default function BookViewModal({
  title = "",
  onClose = () => {},
  open = true,
  tableData,
  schoolName,
}) {
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <>
      <ViewModel title={title} onClose={onClose} open={open}>
        <Table aria-label="customized table">
          <TableBody>
            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                School Name
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {schoolName}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Book Title
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.title}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Book ID
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.id}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Author
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.author}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Language
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.language}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Quantity
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.quantity}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Price
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.price}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Almira No
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.almiraNo}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Created
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {dayjs(tableData?.createdAt).format("DD-MM-YYYY")}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </ViewModel>
    </>
  );
}
