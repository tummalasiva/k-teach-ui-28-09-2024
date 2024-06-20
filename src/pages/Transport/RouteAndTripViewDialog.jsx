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

export default function RouteAndTripViewDialog({
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
              {schoolName || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Route Title
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.title || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Route Start
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.routeStart || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Route End
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.routeEnd || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Vehicle For Route{" "}
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData?.vehicle?.number || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow isDarkMode={isDarkMode}>
            <StyledTableCell
              align="left"
              sx={{ fontWeight: "bold" }}
              isDarkMode={isDarkMode}>
              Stops
            </StyledTableCell>
            <StyledTableCell align="left" width={100} isDarkMode={isDarkMode}>
              {tableData.stops?.map((s, index) => (
                <Table key={index} aria-label="stop details">
                  <TableBody>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold" }}
                        isDarkMode={isDarkMode}>
                        Stop Name
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
                        Stop KM
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.stopKM || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold", width: "200px" }}
                        isDarkMode={isDarkMode}>
                        Pick Start Time
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.pickTime || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold", width: "200px" }}
                        isDarkMode={isDarkMode}>
                        Pick End Time
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.pickEndTime || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold", width: "200px" }}
                        isDarkMode={isDarkMode}>
                        Drop Start Time
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.dropTime || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow isDarkMode={isDarkMode}>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: "bold", width: "200px" }}
                        isDarkMode={isDarkMode}>
                        Drop End Time
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width={100}
                        isDarkMode={isDarkMode}>
                        {s?.dropEndTime || "NA"}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
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
              {tableData?.note || "NA"}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </ViewModel>
  );
}
