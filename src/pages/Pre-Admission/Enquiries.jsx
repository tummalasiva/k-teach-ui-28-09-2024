/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { enquriesTableKeys } from "../../data/tableKeys/enquiries";
import { useFormik } from "formik";
import {
  Button,
  DialogContent,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import { Box, ButtonGroup, styled } from "@mui/material";
import SettingContext from "../../context/SettingsContext";
import { get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { LoadingButton } from "@mui/lab";
import ViewModel from "../../forms/ViewModel";
import CheckPermission from "../../components/Authentication/CheckPermission";

const MuiBUtton = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "20px",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "200px",
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgb(81 81 81)" : "#F0F8FF",
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

const CustomActionComponent = ({ onUpdate = () => {}, data = {} }) => {
  const [loading, setLoading] = useState(false);
  const updateStatus = async (status) => {
    try {
      setLoading(true);
      await put(PRIVATE_URLS.preadmissionEnqiry.update + "/" + data._id, {
        status,
      });
      setLoading(false);
      onUpdate();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {/* <Stack direction="row" spacing={2}>
        {["Pending", "approved"].includes(data.status) && (
          <LoadingButton
            loading={loading}
            onClick={() => updateStatus("rejected")}
            disableElevation
            size="small"
            color="error"
            variant="contained">
            Reject
          </LoadingButton>
        )}
        {["Pending", "rejected"].includes(data.status) && (
          <LoadingButton
            loading={loading}
            onClick={() => updateStatus("approved")}
            disableElevation
            size="small"
            color="success"
            variant="contained">
            Approve
          </LoadingButton>
        )}
      </Stack> */}

      <Stack spacing={2} direction="row" justifyContent="center">
        {["Approved", "Pending"].includes(data.status) ? (
          <LoadingButton
            variant="contained"
            size="small"
            loading={loading == "Rejected"}
            onClick={() => updateStatus("Rejected")}
            color="error">
            Reject
          </LoadingButton>
        ) : null}

        {["Rejected", "Pending"].includes(data.status) ? (
          <LoadingButton
            size="small"
            variant="contained"
            loading={loading == "Approved"}
            onClick={() => updateStatus("Approved")}
            color="success">
            Approve
          </LoadingButton>
        ) : null}
      </Stack>
    </>
  );
};

export default function Enquiries() {
  const { selectedSetting } = useContext(SettingContext);
  const [activeButton, setActiveButton] = useState("Pending");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    open: false,
    contents: "",
    action: () => {},
  });

  const handleButtonClick = (status) => {
    setActiveButton(status);
  };

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  const getEnquiries = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(PRIVATE_URLS.preadmissionEnqiry.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            "studentDetails.academicDetails.academicYear": values.academicYear,
            "studentDetails.academicDetails.class": values.class,
            fromDate: values.fromDate,
            toDate: values.toDate,
          },
        },
      });
      let tableData = data.result.map((d) => ({
        ...d,
        studentName: d.studentDetails?.basicDetails?.name,
        submittedOn: d.createdAt,
        class: d.studentDetails?.academicDetails?.class?.name,
      }));
      setData(tableData);
      setFilteredData(tableData.filter((d) => d.status === activeButton));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getEnquiries,
  });

  useEffect(() => {
    if (!activeButton) {
      return setFilteredData(data);
    }
    setFilteredData(data.filter((e) => e.status === activeButton));
  }, [activeButton]);

  const handleClickOpenView = (data) => {
    // console.log(data, "vvvvvb");
    setModalData({
      ...modalData,
      open: true,
      contents: data,
    });
  };

  const onCloseViewModel = (e) => {
    setModalData({ ...modalData, open: false });
  };

  const handleDelete = async (_id) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.preadmissionEnqiry.delete + "/" + _id
      );
      getEnquiries();
      entryFormik.handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Enquiries" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              options={academicYear}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              options={classes}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="From Date"
              name="fromDate"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="To Date"
              name="toDate"
            />
          </Grid>
          <CheckPermission module="Pre Addmission Enquiry" permission="view">
            {" "}
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <LoadingButton
                loading={loading}
                size="small"
                variant="contained"
                type="submit">
                Find
              </LoadingButton>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>

      <MuiBUtton>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {["Pending", "Approved", "Rejected"].map((v, i) => (
            <Button
              key={i}
              variant="outlined"
              onClick={() => {
                handleButtonClick(v);
              }}
              style={{
                backgroundColor: activeButton === v ? "#1b3779" : "",
                color: activeButton === v ? "white" : "black",
                textTransform: "capitalize",
              }}>
              {v}:{data.filter((item) => item.status === v).length}
            </Button>
          ))}
        </ButtonGroup>
      </MuiBUtton>

      <CustomTable
        actions={["custom", "delete", "view"]}
        module="Pre Addmission Enquiry"
        tableKeys={enquriesTableKeys}
        bodyDataModal="enquiries"
        bodyData={filteredData}
        onUpdate={entryFormik.handleSubmit}
        CustomAction={CustomActionComponent}
        onViewClick={handleClickOpenView}
        onDeleteClick={handleDelete}
      />

      {/* ==== view enquery ===== */}
      <ViewModel
        title="Enquiry Details"
        open={modalData?.open}
        tableData={modalData?.contents}
        onClose={onCloseViewModel}>
        {/* ======== Desktop view table ============ */}
        <DialogContent
          dividers
          sx={{
            display: {
              xs: "none",
              sm: "block",
              md: "block",
              lg: "block",
            },
          }}>
          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Academic Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Class
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents.class || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Academic Year
                </StyledTableCell>
                <StyledTableCell align="left">
                  {`${modalData?.contents?.studentDetails?.academicDetails?.academicYear?.from} - ${modalData?.contents?.studentDetails?.academicDetails?.academicYear?.to}` ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Basic Information
          </Typography>

          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Student Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentName || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Date Of Birth
                </StyledTableCell>
                <StyledTableCell align="left">
                  {dayjs(
                    modalData?.contents?.studentDetails?.basicDetails?.dob ||
                      "NA"
                  ).format("DD-MM-YYYY")}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Gender
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails?.gender ||
                    "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Blood Group
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails?.bloodGroup?.toUpperCase() ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Religion
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails?.caste ||
                    "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Caste Income Certificate Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.casteIncomeCertificateNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Mother Tongue
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.motherTongue || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Birth Place
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.birthPlace || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Aadhar Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.aadharNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Contact Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.contactNumber || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Guardian Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.guardianName || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Guardian Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.guardianContactNumber || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Alternate Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.alternateNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Relation With Guardian
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.relationWithGuardian || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  National Id
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.nationalId || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Present Address
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.presentAddress || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Permanent Address
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.permanentAddress || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Previous School Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow width={200}>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Previous School Name
                </StyledTableCell>
                <StyledTableCell>
                  {modalData?.contents?.studentDetails?.previousSchoolDetails
                    ?.schoolName || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Previous Class
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.previousSchoolDetails
                    ?.class || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  TC Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.previousSchoolDetails
                    ?.tcNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Father Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails?.name ||
                    "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.contactNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Education
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.education || "NA"}
                </StyledTableCell>

                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Profession
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.profession || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Designation
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.designation || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Mother Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails?.name ||
                    "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.contactNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Education
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.education || "NA"}
                </StyledTableCell>

                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Profession
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.profession || "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Designation
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.designation || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Other Information:
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Health Condition
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails
                    ?.healthCondition || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Email
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails?.email ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Hostel Required
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails
                    ?.hostelRequired || "NA"}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Transport Required
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails
                    ?.transportRequired || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </DialogContent>

        {/* ======== Mobile view table ============ */}
        <DialogContent
          dividers
          sx={{
            display: {
              xs: "block",
              sm: "none",
              md: "none",
              lg: "none",
            },
          }}>
          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Academic Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Class
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents.class || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Academic Year
                </StyledTableCell>
                <StyledTableCell align="left">
                  {`${modalData?.contents?.studentDetails?.academicDetails?.academicYear?.from} - ${modalData?.contents?.studentDetails?.academicDetails?.academicYear?.to}` ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Basic Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Student Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentName || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Date Of Birth
                </StyledTableCell>
                <StyledTableCell align="left">
                  {dayjs(
                    modalData?.contents?.studentDetails?.basicDetails?.dob ||
                      "NA"
                  ).format("DD-MM-YYYY")}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Gender
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails?.gender ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Blood Group
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails?.bloodGroup?.toUpperCase() ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Religion
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails?.caste ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Caste Income Certificate Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.casteIncomeCertificateNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Mother Tongue
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.motherTongue || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Birth Place
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.birthPlace || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Aadhar Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.basicDetails
                    ?.aadharNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Contact Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.contactNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Guardian Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.guardianName || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Guardian Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.guardianContactNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Alternate Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.alternateNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Relation With Guardian
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.relationWithGuardian || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  National Id
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.nationalId || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Present Address
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.presentAddress || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Permanent Address
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.contactDetails
                    ?.permanentAddress || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Previous School Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow width={200}>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Previous School Name
                </StyledTableCell>
                <StyledTableCell>
                  {modalData?.contents?.studentDetails?.previousSchoolDetails
                    ?.schoolName || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Previous Class
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.previousSchoolDetails
                    ?.class || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  TC Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.previousSchoolDetails
                    ?.tcNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Father Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails?.name ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.contactNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Education
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.education || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Profession
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.profession || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Designation
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.fatherDetails
                    ?.designation || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Mother Information
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails?.name ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.contactNumber || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Education
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.education || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Profession
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.profession || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Designation
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.motherDetails
                    ?.designation || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="body" fontSize="16px" fontWeight={600}>
            Other Information:
          </Typography>
          <Table
            aria-label="customized table"
            className="profile-table"
            sx={{
              mb: 2,
            }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Health Condition
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails
                    ?.healthCondition || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Email
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails?.email ||
                    "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Hostel Required
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails
                    ?.hostelRequired || "NA"}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ fontWeight: "bold" }}>
                  Transport Required
                </StyledTableCell>
                <StyledTableCell align="left">
                  {modalData?.contents?.studentDetails?.otherDetails
                    ?.transportRequired || "NA"}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </ViewModel>
    </>
  );
}
