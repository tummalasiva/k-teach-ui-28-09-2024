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
import ThemeModeContext from "../../context/ThemeModeContext";

const StyledTableRow = styled(TableRow)(({ theme, isDarkMode }) => ({
  width: "200px",

  "&:nth-of-type(odd)": {
    backgroundColor: isDarkMode ? "transparent" : "#F0F8FF",
    color: isDarkMode ? "#fff" : "#000",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme, isDarkMode }) => ({
  width: "200px",
  border: "1px solid gray",

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: isDarkMode ? "transparent" : "blue",
    color: isDarkMode ? "#fff" : "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function VehicleViewDialog({
  title = "",
  onClose = () => {},
  open = true,
  tableData,
  schoolName,
}) {
  const { isDarkMode } = useContext(ThemeModeContext);
  return (
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
              Vehicle Number
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.number}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Vehicle Model
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.model}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Driver
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.driverName}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Vehicle License
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.licenseNumber}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Driver Contact Number
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.driverContactNumber}
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
  );
}
