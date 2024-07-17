/** @format */

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip,
  IconButton,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import FormDatePicker from "../../forms/FormDatePicker";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SimCardDownloadRoundedIcon from "@mui/icons-material/SimCardDownloadRounded";
import { RefreshRounded } from "@mui/icons-material";
import dayjs from "dayjs";

const Type_Options = [
  {
    label: "Manual",
    value: "manual",
  },
  {
    label: "Automatic",
    value: "automatic",
  },
];

export default function Report() {
  const [report, setReport] = useState([
    {
      smsSubject: "Pre-Admission",
      smsType: "Manual",
      message:
        "Dear John,Thank you for your admission at webspruce. Our staff will help you for all admission related process.",
    },
    {
      smsSubject: "Pre-Admission",
      smsType: "Manual",
      message:
        "Dear John,Thank you for your admission at webspruce. Our staff will help you for all admission related process.",
    },
    {
      smsSubject: "Pre-Admission",
      smsType: "Manual",
      message:
        "Dear John,Thank you for your admission at webspruce. Our staff will help you for all admission related process.",
    },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter pagination==========
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // ==============

  const getList = async (values) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      type: "",
      fromDate: null,
      toDate: null,
    },
    onSubmit: getList,
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Report" />
      <Grid container spacing={2}>
        <Grid xs={12} md={3} item>
          <FormSelect
            required={true}
            name="type"
            formik={entryFormik}
            label="Type"
            options={Type_Options}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <FormDatePicker
            formik={entryFormik}
            label="From Date"
            name="fromDate"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <FormDatePicker formik={entryFormik} label="To Date" name="toDate" />
        </Grid>
        <Grid item xs={12} md={3} lg={3} display="flex" alignSelf="center">
          <Button size="small" type="submit" variant="contained">
            Find
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                S.No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Subject
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Message
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Total SMS
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Time/Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report &&
              report
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.smsSubject}</TableCell>
                    <TableCell align="center">{row.smsType}</TableCell>
                    <TableCell align="center">
                      {row.message.substring(0, 50) + "..."}
                    </TableCell>
                    <TableCell align="center">
                      <Typography>Total:50</Typography>
                      <Typography>Awaiting:30</Typography>
                      <Typography>Delivered:20</Typography>{" "}
                      <Typography>Rejected/Failed:0 </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(row.sentTime).format("DD-MM-YYYY hh:mm A")}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}>
                        <Box>
                          {" "}
                          <Tooltip title="Refresh">
                            <IconButton>
                              <RefreshRounded color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Report">
                            <IconButton>
                              <SimCardDownloadRoundedIcon color="secondary" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box>
                          {" "}
                          <Tooltip title="Resend">
                            <IconButton>
                              <ReplyRoundedIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Forward">
                            <IconButton>
                              <RedoRoundedIcon color="success" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {!report.length && (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", margin: "5px", padding: "5px" }}>
            No data found
          </Typography>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={report.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
