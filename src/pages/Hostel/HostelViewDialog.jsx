/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useContext } from "react";
import ViewModel from "../../forms/ViewModel";
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

export default function HostelViewDialog({
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
                Hostel Name
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.name}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Hostel Type{" "}
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.type}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Address
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.address}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Note
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.note}
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
                {tableData?.createdAt}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </ViewModel>
    </>
  );
}
