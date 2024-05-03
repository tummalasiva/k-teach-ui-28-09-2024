import React, { useState } from "react";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: themeData.lightPalette.primary.main,
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

export default function FormTable() {
  const [employee, setEmployee] = useState([]);

  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {employee.empPhoto && employee.empPhoto.link ? (
        <img
          src={employee.empPhoto.link}
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
        className="profile-table"
        sx={{
          width: 500,
          my: 2,
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
          },
        }}
      >
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Name
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.empName
                ? employee.basicInfo.empName
                : "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              National Id
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.aadharNo
                ? employee.basicInfo.aadharNo
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Designation
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.designation
                ? employee.basicInfo.designation.designation
                : "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Phone{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.contactNumber ? employee.contactNumber : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Present Address{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.presentAddress
                ? employee.basicInfo.presentAddress
                : "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Permanent Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.permanentAddress
                ? employee.basicInfo.permanentAddress
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Gender
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.empGender
                ? employee.basicInfo.empGender
                : "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Blood Group
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.empBloodGroup
                ? employee.basicInfo.empBloodGroup.toUpperCase()
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Religion{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.Religion
                ? employee.basicInfo.Religion
                : "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Birth Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(
                employee.basicInfo && employee.basicInfo.dob
                  ? employee.basicInfo.dob
                  : "NA"
              ).format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.academicInfo && employee.academicInfo.email
                ? employee.academicInfo.email
                : "NA"}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Role
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.role && employee.role.roleName
                ? employee.role.roleName
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Joining Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(
                employee.academicInfo && employee.academicInfo.joiningDate
                  ? employee.academicInfo.joiningDate
                  : "NA"
              ).format("DD-MM-YYYY")}
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Resume
            </StyledTableCell>
            <StyledTableCell align="center">
              <IconButton color="primary">
                <FileDownloadIcon />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>

      {/* ======== Mobile view table ============ */}
      <Table
        aria-label="customized table"
        className="profile-table-mobile"
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
              {employee.basicInfo && employee.basicInfo.empName
                ? employee.basicInfo.empName
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              National Id
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.aadharNo
                ? employee.basicInfo.aadharNo
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Designation
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.designation
                ? employee.basicInfo.designation.designation
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Phone{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.contactNumber ? employee.contactNumber : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Present Address{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.presentAddress
                ? employee.basicInfo.presentAddress
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Permanent Address
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.permanentAddress
                ? employee.basicInfo.permanentAddress
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Gender
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.empGender
                ? employee.basicInfo.empGender
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Blood Group
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.empBloodGroup
                ? employee.basicInfo.empBloodGroup.toUpperCase()
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Birth Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(
                employee.basicInfo && employee.basicInfo.dob
                  ? employee.basicInfo.dob
                  : "NA"
              ).format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Religion{" "}
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.basicInfo && employee.basicInfo.Religion
                ? employee.basicInfo.Religion
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Email
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.academicInfo && employee.academicInfo.email
                ? employee.academicInfo.email
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Role
            </StyledTableCell>
            <StyledTableCell align="left">
              {employee.role && employee.role.roleName
                ? employee.role.roleName
                : "NA"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Joining Date
            </StyledTableCell>
            <StyledTableCell align="left">
              {dayjs(
                employee.academicInfo && employee.academicInfo.joiningDate
                  ? employee.academicInfo.joiningDate
                  : "NA"
              ).format("DD-MM-YYYY")}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
              Resume
            </StyledTableCell>
            <StyledTableCell align="center">
              {/* {employee.academicInfo.resume ? (
                  <IconButton color="primary">
                    <FileDownloadIcon
                      onClick={() =>
                        handleLinkClick(
                          employee.academicInfo && employee.academicInfo.resume
                            ? employee.academicInfo.resume.link
                            : "NA"
                        )
                      }
                    />
                  </IconButton>
                ) : (
                  "NA"
                )} */}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      {/* )} */}
    </>
  );
}
