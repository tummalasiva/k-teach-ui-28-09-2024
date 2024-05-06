import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  tableCellClasses,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
// icons
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import themeData from "../../data/themeData";
import { Padding } from "@mui/icons-material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#44628561",
    // width: "100%",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: 200,
  padding: "13px 5px",
  border: "1px solid gray",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default function FormTable({ employee }) {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {employee?.photo ? (
        <img
          src={employee.photo}
          height={75}
          width={75}
          style={{ borderRadius: "50%", alignSelf: "center" }}
          alt="Employee Photo"
        />
      ) : (
        <Avatar sx={{ height: 75, width: 75 }} src="/broken-image.jpg" />
      )}

      <Table
        aria-label="customized table"
        sx={{
          width: 660,
          my: 2,
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
          },
          borderRadius: "5px",
        }}
      >
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.name || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              National Id
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.aadharNo || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Designation
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.designation.name || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Phone{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.contactNumber || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Present Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.presentAddress || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Permanent Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.permanentAddress || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Gender
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.gender || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Blood Group
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.bloodGroup.toUpperCase() || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Religion{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.religion || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Birth Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(employee.basicInfo.dob || "NA").format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.academicInfo.email || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Role
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.role.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Joining Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(employee.academicInfo.joiningDate || "NA").format(
                "DD-MM-YYYY"
              )}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Resume
            </StyledTableCell>
            <StyledTableCell align="center">
              {employee.academicInfo.resume ? (
                <IconButton color="primary">
                  <FileDownloadIcon
                    onClick={() =>
                      handleLinkClick(employee.academicInfo.resume)
                    }
                  />
                </IconButton>
              ) : (
                "NA"
              )}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>

      {/* ======== Mobile view table ============ */}
      <Table
        aria-label="customized table"
        sx={{
          width: "100%",
          mx: 2,
          my: 2,
          display: {
            xs: "visible",
            sm: "none",
            md: "none",
            lg: "none",
          },
        }}
      >
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              National Id
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.aadharNo || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Designation
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.designation.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Phone
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.contactNumber || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Present Address{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.presentAddress || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Permanent Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.permanentAddress || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Gender
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.gender || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Blood Group
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.bloodGroup.toUpperCase() || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Birth Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(employee.basicInfo.dob || "NA").format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Religion{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo.religion || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.academicInfo.email || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Role
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.role.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Joining Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(employee.academicInfo.joiningDate || "NA").format(
                "DD-MM-YYYY"
              )}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Resume
            </StyledTableCell>
            <StyledTableCell align="center">
              {employee.academicInfo.resume ? (
                <IconButton color="primary">
                  <FileDownloadIcon
                    onClick={() =>
                      handleLinkClick(employee.academicInfo.resume)
                    }
                  />
                </IconButton>
              ) : (
                "NA"
              )}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      {/* )} */}
    </>
  );
}
