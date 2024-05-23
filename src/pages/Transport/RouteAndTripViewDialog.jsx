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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "200px",
  "&:nth-of-type(odd)": {
    backgroundColor: "#F0F8FF",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: "300px",
  border: "1px solid gray",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function RouteAndTripViewDialog({
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
                {schoolName || "NA"}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Route Title
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.title || "NA"}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Route Start
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.routeStart || "NA"}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Route End
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.routeEnd || "NA"}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Vehicle For Route{" "}
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.vehicle?.number || "NA"}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Stops
              </StyledTableCell>
              {tableData.stops?.map((s) => (
                <StyledTableCell align="left" width={100}>
                  <StyledTableRow>
                    <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                      Stop Name
                    </StyledTableCell>
                    <StyledTableCell align="left" width={100}>
                      {s?.name || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                      Stop KM
                    </StyledTableCell>
                    <StyledTableCell align="left" width={100}>
                      {s?.stopKM || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 600, width: "200px" }}>
                      Pick Start Time
                    </StyledTableCell>
                    <StyledTableCell align="left" width={100}>
                      {s?.pickTime || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 600, width: "200px" }}>
                      Pick End Time
                    </StyledTableCell>
                    <StyledTableCell align="left" width={100}>
                      {s?.pickEndTime || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 600, width: "200px" }}>
                      Drop Start Time
                    </StyledTableCell>
                    <StyledTableCell align="left" width={100}>
                      {s?.dropTime || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 600, width: "200px" }}>
                      Drop End Time
                    </StyledTableCell>
                    <StyledTableCell align="left" width={100}>
                      {s?.dropEndTime || "NA"}
                    </StyledTableCell>
                  </StyledTableRow>
                </StyledTableCell>
              ))}
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
      </ViewModel>
    </>
  );
}
