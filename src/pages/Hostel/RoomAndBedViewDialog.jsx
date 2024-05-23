/** @format */

import {
  Box,
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

export default function RoomAndBedViewDialog({
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
                Room No
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.number}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Seat Total
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.totalBeds}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Bed
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {tableData?.beds?.map((s) => (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      my: 1,
                    }}>
                    <StyledTableRow>
                      <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                        Bed Name
                      </StyledTableCell>
                      <StyledTableCell align="left" width={100}>
                        {s?.name || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                        Bed Position{" "}
                      </StyledTableCell>
                      <StyledTableCell align="left" width={100}>
                        {s?.position || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: 600, width: "200px" }}>
                        Bed Allocated
                      </StyledTableCell>
                      <StyledTableCell align="left" width={100}>
                        {s?.allocated ? "Yes" : "No"}
                      </StyledTableCell>
                    </StyledTableRow>
                  </Box>
                ))}
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
