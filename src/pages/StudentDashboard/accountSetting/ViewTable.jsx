/** @format */

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
import { PRIVATE_URLS } from "../../../services/urlConstants";

import themeData from "../../../data/themeData";
import { Padding } from "@mui/icons-material";
import { get } from "../../../services/apiMethods";

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

export default function ViewTable({ student }) {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {student?.photo ? (
        <img
          src={student.photo}
          height={75}
          width={75}
          style={{ borderRadius: "50%", alignSelf: "center" }}
          alt="student Photo"
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
        }}>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.name || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Admission Number
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.academicInfo?.admissionNumber || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Admission Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.admissionDate || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Phone
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.contactNumber || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Present Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.presentAddress || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Permanent Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.permanentAddress || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Gender
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.gender || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Blood Group
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.bloodGroup?.toUpperCase() || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Religion{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.basicInfo?.religion || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Birth Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(student?.basicInfo?.dob || "NA").format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="left">
              {student?.academicInfo?.email || "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Class
            </StyledTableCell>
            <StyledTableCell align="left">NA</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Section
            </StyledTableCell>
            <StyledTableCell align="left">NA</StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Roll No.
            </StyledTableCell>
            <StyledTableCell align="left">NA</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>

      {/* ======== Mobile view table ============ */}
      {/* <Table
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
        }}>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Addmissionn Number
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.aadharNo || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Admission Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.designation.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Phone
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.contactNumber || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Present Address{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.presentAddress || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Permanent Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.permanentAddress || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Gender
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.gender || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Blood Group
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.bloodGroup.toUpperCase() || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Birth Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(student.basicInfo.dob || "NA").format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Religion{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.basicInfo.religion || "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.academicInfo.email || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Class
            </StyledTableCell>
            <StyledTableCell align="left">
              {student.role.name || "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Section
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(student.academicInfo.joiningDate || "NA").format(
                "DD-MM-YYYY"
              )}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Roll No.
            </StyledTableCell>
            <StyledTableCell align="center">
              {student.academicInfo.resume ? (
                <IconButton color="primary">
                  <FileDownloadIcon
                    onClick={() => handleLinkClick(student.academicInfo.resume)}
                  />
                </IconButton>
              ) : (
                "NA"
              )}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table> */}
      {/* )} */}
    </>
  );
}
