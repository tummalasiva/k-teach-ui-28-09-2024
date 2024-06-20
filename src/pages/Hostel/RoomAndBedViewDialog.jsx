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
  width: "300px",
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

export default function RoomAndBedViewDialog({
  title = "",
  onClose = () => {},
  open = true,
  tableData,
  schoolName,
}) {
  const { isDarkMode } = useContext(ThemeModeContext);

  console.log(tableData, "tableData");

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
                Room No
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
                Seat Total
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.totalBeds}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow isDarkMode={isDarkMode}>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold" }}
                isDarkMode={isDarkMode}>
                Bed
              </StyledTableCell>
              <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
                {tableData?.beds?.map((s) => (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      my: 1,
                    }}
                    key={s.name}>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold" }}
                        isDarkMode={isDarkMode}>
                        Bed Name
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.name || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold" }}
                        isDarkMode={isDarkMode}>
                        Bed Position
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.position || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: 600, width: "200px" }}
                        isDarkMode={isDarkMode}>
                        Bed Allocated
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.allocated ? "Yes" : "No"}
                      </StyledTableCell>
                    </StyledTableRow>
                  </Box>
                ))}
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
