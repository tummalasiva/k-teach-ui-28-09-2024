/** @format */

import React, { useState } from "react";
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

export default function BookViewModal({
  title = "",
  onClose = () => {},
  open = true,
  tableData,
  schoolName,
}) {
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
                Book Title
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.title}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Book ID
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.id}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Author
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.author}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Language
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.language}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Quantity
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.quantity}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Price
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.price}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Alamira No
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.almiraNo}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Created
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {dayjs(tableData?.createdAt).format("DD-MM-YYYY")}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </ViewModel>
    </>
  );
}
