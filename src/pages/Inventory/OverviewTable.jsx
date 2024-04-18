import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    width: "100%",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid gray",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function OverviewTable() {
  return (
    <>
      <TableContainer
        sx={{
          display: "grid",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="div"
          textAlign="start"
          sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
        >
          Overview
        </Typography>
        {/* ========= Desktop view =============== */}
        <Table
          aria-label="customized table"
          className="profile-table"
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "inline-block",
              lg: "inline-block",
            },
          }}
        >
          <TableBody>
            <StyledTableRow>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Purchase
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Issue
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Return
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Inhouse
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Damage
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Sell
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Inventory Quantity
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {0} Qty
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{ fontWeight: "bold", width: 300 }}
              >
                Total Inventory Amount
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>

        {/* ======== Tablet view table ============ */}
        <Table
          aria-label="customized table"
          className="profile-table"
          sx={{
            display: {
              xs: "none",
              sm: "inline-block",
              md: "none",
              lg: "none",
            },
          }}
        >
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Purchase
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Issue
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Return
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Inhouse
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Damage
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Sell
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Inventory Quantity
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {0}
                Qty
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Inventory Amount
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>

        {/* ======== Mobile view table ============ */}
        <Table
          aria-label="customized table"
          className="profile-table"
          sx={{
            display: {
              xs: "inline-block",
              sm: "none",
              md: "none",
              lg: "none",
            },
          }}
        >
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Purchase
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Issue
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Return
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Inhouse
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Damage
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Sell
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Inventory Quantity
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                {0}
                {"  "}Qty
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                Total Inventory Amount
              </StyledTableCell>
              <StyledTableCell align="left" width={100}>
                <CurrencyRupeeIcon fontSize="small" />
                {0}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
