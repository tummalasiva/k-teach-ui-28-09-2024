/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import ViewModel from "../../forms/ViewModel";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "200px",
  "&:nth-of-type(odd)": {
    backgroundColor: "#F0F8FF",
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

export default function HostelViewDialog({
  title = "",
  onClose = () => {},
  open = true,
  tableData,
  schoolName,
}) {
  console.log(tableData, "tableData");

  return (
    <>
      <ViewModel title={title} onClose={onClose} open={open}>
        <Table aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                School Name
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {schoolName}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Hostel Name
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.name}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Hostel Type{" "}
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.type}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Address
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.address}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Note
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.note}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Created
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.createdAt}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </ViewModel>
    </>
  );
}
