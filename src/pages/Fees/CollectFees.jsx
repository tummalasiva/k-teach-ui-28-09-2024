/** @format */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { get, post } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import CustomInput from "../../forms/CustomInput";
import QuickFeeConcessionModal from "./QuickFeeConcessionModal";
import QuickFeeCollectModal from "./QuickFeeCollectModal";
import { downloadFile } from "../../utils";
import { toast } from "react-toastify";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";

const showInfo = (data) => {
  let result = [];

  for (let dep of data.dependencies) {
    if (["class"].includes(dep)) {
      let newItem = `[${data.class?.name}]-Class`;
      result.push(newItem);
    } else if (["classOld"].includes(dep)) {
      let newItem = `[${data.class?.name}]-Class-Old`;
      result.push(newItem);
    } else if (["classNew"].includes(dep)) {
      let newItem = `[${data.class?.name}]-Class-New`;
      result.push(newItem);
    } else if (["hostel"].includes(dep)) {
      let newItem = `[${data.hostel?.name}]-Hostel`;
      result.push(newItem);
    } else if (["transport"].includes(dep)) {
      let newItem = `[${data?.route?.vehicle?.number}]+[${data?.route?.title}]-Transport-[${data?.stop?.name}]-Stop-[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    } else if (["pickType"].includes(dep)) {
      let newItem = `[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    }
  }

  return result.join(" | ");
};

const ExtraFeeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "10px",
  columnGap: "10px",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "whitesmoke",
  borderRadius: "5px",
  marginTop: "80px",
}));

export default function CollectFees() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);
  const [receiptTitles, setReceiptTitles] = useState([]);
  const [feeMaps, setFeeMaps] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feeDetails, setFeeDetails] = useState(null);
  const [paymentData, setPaymentData] = useState({});
  const [totalAmountToBePaid, setTotalAmountToBePaid] = useState(0);
  const [selectedPastDueIds, setSelectedPastDueIds] = useState([]);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [installmentId, setInstallmentId] = useState("");

  const [penalty, setPenalty] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const [openConcessionModal, setOpenConcessionModal] = useState(false);
  const [concession, setConcession] = useState(null);
  const [note, setNote] = useState("");
  const [payingDate, setPayingDate] = useState(null);
  const [collectingFee, setCollectingFee] = useState(false);
  const [downloadingPreview, setDownloadingPreview] = useState(false);
  const [openCollectModal, setOpenCollectModal] = useState(false);

  const handleCloseCollectFeeModal = () => setOpenCollectModal(false);
  const handleOpenCollectFeeModal = () => setOpenCollectModal(true);

  const handleConcessionSubmit = (data) => {
    setConcession(data);
    setOpenConcessionModal(false);
  };

  const handleCloseConcessionModal = () => setOpenConcessionModal(false);
  const handleOpenConcessionModal = () => {
    if (concession) {
      setConcession(null);
    } else {
      setOpenConcessionModal(true);
    }
  };

  // get student fee Details
  const handleSubmitFind = async (values) => {
    setFetchingStudents(true);

    if (!values.feeMap || !values.student || !values.receiptName) {
      setFeeDetails(null);
      return setFetchingStudents(false);
    }

    try {
      const { data: feeReceipt, status } = await get(
        PRIVATE_URLS.receipt.getFeeDetails,
        {
          params: {
            feeMapId: values.feeMap,
            studentId: values.student,
            receiptTitleId: values.receiptName,
            installmentId:
              installmentId ||
              feeMaps.filter((f) => f._id == values.feeMap)[0]?.installments[0]
                ._id,
            schoolId: selectedSetting._id,
          },
        }
      );

      console.log(feeReceipt.result, "====");

      setFeeDetails(feeReceipt.result);
    } catch (error) {
      console.log(error);
    }
    setFetchingStudents(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      receiptName: "",
      feeMap: "",
      class: "",
      section: "",
      student: "",
    },
    onSubmit: handleSubmitFind,
    enableReinitialize: true,
  });

  const getAllReceiptTitles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: {
          search: { active: true },
          schoolId: selectedSetting._id,
        },
      });
      setReceiptTitles(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("receiptName", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReceiptTitles();
  }, [selectedSetting._id]);

  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list);
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get all classes
  useEffect(() => {
    getClasses();
  }, []);

  const getSections = async () => {
    try {
      if (!entryFormik.values.class) {
        entryFormik.setFieldValue("section", "");
        return setSections([]);
      }
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: { search: { class: entryFormik.values.class } },
      });
      setSections(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
      entryFormik.setFieldValue("section", data.result[0]?._id || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSections();
  }, [entryFormik.values.class]);

  const getAllFeeMaps = async () => {
    try {
      if (!entryFormik.values.class || !entryFormik.values.receiptName) {
        setFeeMaps([]);
        entryFormik.setFieldValue("feeMap", "");
        return;
      }
      const { data } = await get(PRIVATE_URLS.feeMap.list, {
        params: {
          search: {
            active: true,
            receiptTitle: entryFormik.values.receiptName,
            class: entryFormik.values.class,
          },
          schoolId: selectedSetting._id,
        },
      });

      setFeeMaps(
        data?.result?.map((d) => ({ ...d, label: showInfo(d), value: d._id }))
      );
      entryFormik.setFieldValue("feeMap", data?.result?.[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFeeMaps();
  }, [
    entryFormik.values.receiptName,
    entryFormik.values.class,
    selectedSetting,
  ]);

  // get all students
  const getAllStudents = async () => {
    if (
      !entryFormik.values.feeMap ||
      !entryFormik.values.class ||
      !entryFormik.values.section
    ) {
      setStudents([]);
      entryFormik.setFieldValue("student", "");
      return;
    }
    try {
      const filter = {
        feeMapId: entryFormik.values.feeMap,
        classId: entryFormik.values.class,
        sectionId: entryFormik.values.section,
      };

      const { data: students } = await get(
        PRIVATE_URLS.receipt.getStudentsList,
        {
          params: {
            search: filter,
            schoolId: selectedSetting._id,
          },
        }
      );

      setStudents(
        students.result.map((s) => ({
          ...s,
          label: `${s.basicInfo.name} | ${s.academicInfo.rollNumber} | ${s.fatherInfo.name}`,
          value: s._id,
        }))
      );

      entryFormik.setFieldValue("student", students.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, [
    entryFormik.values.feeMap,
    entryFormik.values.class,
    entryFormik.values.section,
  ]);

  useEffect(() => {
    setFeeDetails(null);
    setInstallmentId(
      feeMaps.find((f) => f._id === entryFormik.values.feeMap)?.installments[0]
        ?._id
    );
  }, [entryFormik.values.student, entryFormik.values.feeMap]);

  const handleChangeCollectingAmount = (e, itemDetail) => {
    let newCategories = feeDetails.feeMapCategories?.map((c) =>
      c._id === itemDetail._id ? { ...c, amountPaid: e.target.value } : c
    );

    setFeeDetails({ ...feeDetails, feeMapCategories: newCategories });
  };

  const payableAmount = useMemo(() => {
    let feeParticularAmount = feeDetails
      ? feeDetails.feeMapCategories?.reduce(
          (acc, c) => acc + parseFloat(c.amountPaid),
          0
        )
      : 0;

    let totalAmountBeingPaid =
      parseFloat(feeParticularAmount) +
      parseFloat(penalty || 0) +
      parseFloat(miscellaneous || 0);

    let concessionAmount = 0;
    if (concession) {
      if (concession.format === "Percentage") {
        concessionAmount =
          (Number(concession.concession) / 100) * Number(totalAmountBeingPaid);
      } else {
        concessionAmount = Number(concession.concession);
      }
    }
    return (
      parseFloat(feeParticularAmount) +
      parseFloat(penalty || 0) +
      parseFloat(miscellaneous || 0) -
      concessionAmount
    );
  }, [feeDetails, penalty, miscellaneous, concession]);

  const collectingAmount = useMemo(() => {
    return feeDetails
      ? feeDetails.feeMapCategories?.reduce(
          (acc, c) => acc + parseFloat(c.amountPaid),
          0
        )
      : 0;
  }, [feeDetails]);

  // Preview
  const handlePreviewButtonClick = async (paymentMode, paymentDetails) => {
    setDownloadingPreview(true);
    const data = {
      penalty: penalty || 0,
      miscellaneous: miscellaneous || 0,
      payingDate: payingDate ? dayjs(payingDate).format("DD/MM/YYYY") : null,
      note,
      receiptTitleId: entryFormik.values.receiptName,
      feeMapId: entryFormik.values.feeMap,
      studentId: entryFormik.values.student,
      paymentMode: paymentMode,
      feeParticulars: feeDetails?.feeMapCategories?.filter(
        (f) => f.amountPaid > 0
      ),
      installmentId,
      concessionDetails: concession
        ? {
            amount: concession.concession,
            referredBy: concession.refer,
            givenAs: concession.format,
          }
        : {},
      schoolId: selectedSetting._id,
    };

    switch (paymentMode) {
      case "Cash":
        data.cashDetails = {};
        break;
      case "Cheque":
        data.chequeDetails = {
          bankName: paymentDetails.bankName,
          branchName: paymentDetails.branchName,
          chequeNumber: paymentDetails.chequeNumber,
          chequeDate: paymentDetails.chequeDate,
        };
        break;
      case "DD":
        data.ddDetails = {
          bankName: paymentDetails.bankName,
          branchName: paymentDetails.branchName,
        };
        break;
      case "Upi":
        data.upiDetails = {
          upiApp: paymentDetails.upiApp,
          utrNo: paymentDetails.utrNo,
        };
        break;
      case "Card":
        data.cardDetails = {
          bankName: paymentDetails.bankName,
          cardType: paymentDetails.cardType,
        };
        break;
      case "Netbanking":
        data.netBankingDetails = {
          bankName: paymentDetails.bankName,
          refNumber: paymentDetails.refNumber,
          paidByName: paymentDetails.paidByName,
        };
        break;
      default:
        break;
    }

    try {
      const response = await post(PRIVATE_URLS.receipt.previewReceipt, data, {
        responseType: "blob",
        validateStatus: (status) => status < 500, // Accept any status code less than 500
      });

      if (response.status === 200) {
        downloadFile("application/pdf", response.data, "Receipt_preview");
      } else {
        const errorText = await new Response(response.data).text();
        toast.error(JSON.parse(errorText)?.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setDownloadingPreview(false);
    }
  };

  // collect

  const handleCollectFee = async (paymentMode, paymentDetails) => {
    setCollectingFee(true);
    const data = {
      penalty: penalty || 0,
      miscellaneous: miscellaneous || 0,
      payingDate: payingDate ? dayjs(payingDate).format("DD/MM/YYYY") : null,
      note,
      receiptTitleId: entryFormik.values.receiptName,
      feeMapId: entryFormik.values.feeMap,
      studentId: entryFormik.values.student,
      paymentMode: paymentMode,
      feeParticulars: feeDetails?.feeMapCategories?.filter(
        (f) => f.amountPaid > 0
      ),
      installmentId,
      concessionDetails: concession
        ? {
            amount: concession.concession,
            referredBy: concession.refer,
            givenAs: concession.format,
          }
        : {},
      schoolId: selectedSetting._id,
    };

    switch (paymentMode) {
      case "Cash":
        data.cashDetails = {};
        break;
      case "Cheque":
        data.chequeDetails = {
          bankName: paymentDetails.bankName,
          branchName: paymentDetails.branchName,
          chequeNumber: paymentDetails.chequeNumber,
          chequeDate: paymentDetails.chequeDate,
        };
        break;
      case "DD":
        data.ddDetails = {
          bankName: paymentDetails.bankName,
          branchName: paymentDetails.branchName,
        };
        break;
      case "Upi":
        data.upiDetails = {
          upiApp: paymentDetails.upiApp,
          utrNo: paymentDetails.utrNo,
        };
        break;
      case "Card":
        data.cardDetails = {
          bankName: paymentDetails.bankName,
          cardType: paymentDetails.cardType,
        };
        break;
      case "Netbanking":
        data.netBankingDetails = {
          bankName: paymentDetails.bankName,
          refNumber: paymentDetails.refNumber,
          paidByName: paymentDetails.paidByName,
        };
        break;
      default:
        break;
    }

    try {
      const response = await post(PRIVATE_URLS.receipt.collectFees, data, {
        responseType: "blob",
        validateStatus: (status) => status < 500, // Accept any status code less than 500
      });

      if (response.status === 200) {
        downloadFile("application/pdf", response.data, "Receipt_preview");
        handleCloseCollectFeeModal();
        entryFormik.handleSubmit();
        setConcession(null);
        setPenalty("");
        setMiscellaneous("");
      } else {
        const errorText = await new Response(response.data).text();
        toast.error(JSON.parse(errorText)?.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setCollectingFee(false);
    }
  };

  // download receipts
  const downloadReceipt = async (e, id) => {
    e.preventDefault();
    try {
      setDownloadingReceipt(id);
      const response = await get(
        PRIVATE_URLS.receipt.downloadReceipt + "/" + id,
        {
          validateStatus: (status) => status < 500,
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        downloadFile("application/pdf", response.data, "receipt");
      } else {
        const errorText = await new Response(response.data).text();
        toast.error(JSON.parse(errorText)?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDownloadingReceipt("");
  };

  return (
    <>
      <PageHeader title="Collect Fees" />

      {/* Filter selection */}
      <Paper sx={{ padding: 1, marginBottom: 2 }}>
        <Grid columnSpacing={1} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="receiptName"
              formik={entryFormik}
              label="Select Receipt Name"
              options={receiptTitles}
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
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              options={sections}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeMap"
              formik={entryFormik}
              label="Select Fee Map"
              options={feeMaps}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="student"
              formik={entryFormik}
              label="Select Students"
              options={students}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={3}
            style={{ alignSelf: "center", marginTop: "10px" }}
            item>
            <LoadingButton
              loading={fetchingStudents}
              onClick={entryFormik.handleSubmit}
              size="small"
              variant="contained">
              Find
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Student Info, installment info and due details */}
      {feeDetails ? (
        <Paper
          sx={{
            padding: 1,
            my: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.2)"
                : "whitesmoke",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Box>
              <FormControl size="small" sx={{ width: 300, mt: 1 }} required>
                <InputLabel id="demo-simple-select-filled-label">
                  Select Installment
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="installmentId"
                  label="Select Installment"
                  value={
                    installmentId || feeDetails?.feeMap?.installments[0]._id
                  }
                  required
                  onChange={(event) => {
                    setInstallmentId(event.target.value);
                    entryFormik.handleSubmit();
                  }}>
                  {feeDetails?.feeMap?.installments?.map((row, index) => (
                    <MenuItem
                      key={row._id}
                      value={row._id}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      {index + 1}-{row.amount}-
                      {feeDetails?.previousReceipts?.filter(
                        (r) => r.installmentPaid == row._id
                      )[0]
                        ? "Paid"
                        : "Not-Paid"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography
                sx={{
                  fontSize: "14px",
                  margin: "2px 0 0 0",
                  fontWeight: "bold",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "orange" : "red",
                }}>
                Due Date :{" "}
                {installmentId
                  ? dayjs(
                      feeDetails?.feeMap?.installments.filter(
                        (i) => i._id == installmentId
                      )[0]?.dueDate
                    )
                      .toDate()
                      .toLocaleDateString()
                  : null}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize="12px">
                <b>Past Due (All Other Academic Years) :</b> ₹{" "}
                <span>{feeDetails?.pastDues?.toFixed(2)}</span>
              </Typography>
              <Typography fontSize="12px">
                <b>Total Due (Current Academic Year) :</b> ₹{" "}
                <span>
                  {feeDetails?.totalDueForThisAcademicYear?.toFixed(2)}
                </span>
              </Typography>
              {installmentId && (
                <Typography fontSize="12px">
                  <b>Current Due (Current Academic Year) :</b> ₹{" "}
                  <span>{feeDetails?.currentDue?.toFixed(2)}</span>
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      ) : null}

      {/* Previous Receipts */}
      {!feeDetails?.previousReceipts?.length ? null : (
        <Paper sx={{ padding: "10px", margin: "10px 0" }}>
          <Typography fontSize="14px" mb={2}>
            <b>Previous Receipts:</b> PP - Partially Paid, PPD - Partial Payment
            Done, FP - Full Payment
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              columnGap: "5px",
            }}>
            {feeDetails.previousReceipts.map((p) => (
              <LoadingButton
                loading={downloadingReceipt === p._id}
                size="small"
                variant="outlined"
                disabled={downloadingReceipt ? true : false}
                key={p._id}
                onClick={(e) => downloadReceipt(e, p._id)}
                endIcon={<DownloadForOfflineSharpIcon />}>
                {dayjs(p.paidAt).format("DD/MM/YYYY")}-
                {p.partiallyPaid
                  ? p.partialPaymentCompleted
                    ? "PPD"
                    : "PP"
                  : "FP"}
              </LoadingButton>
            ))}
          </Box>
        </Paper>
      )}
      {/* Fee Particular details */}
      {!feeDetails ? null : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
              }}>
              <TableRow>
                <TableCell sx={{ color: "white" }} align="center">
                  #SL
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Fee Particular
                </TableCell>

                <TableCell sx={{ color: "white" }} align="center">
                  Due Amount
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Collecting Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeDetails?.feeMapCategories?.map((itemDetail, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <Typography>{itemDetail.name}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography fontWeight="bold">
                      ₹ {itemDetail.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <CustomInput
                      disabled={!itemDetail.amount}
                      type="number"
                      style={{ maxWidth: "150px", margin: "4px 0" }}
                      value={itemDetail.amountPaid || ""}
                      label="Amount"
                      onChange={(e) =>
                        handleChangeCollectingAmount(e, itemDetail)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "whitesmoke",
                }}>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography sx={{ fontWeight: "bold" }}>
                    ₹ {feeDetails?.currentDue?.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontWeight: "bold" }}>
                    ₹ {collectingAmount}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ExtraFeeContainer>
            <Stack direction="row" columnGap={2}>
              <CustomInput
                type="number"
                name="penalty"
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                label="Penalty/Fine"
                style={{ marginBottom: "15px" }}
              />
              <CustomInput
                type="number"
                name="miscellaneous"
                value={miscellaneous}
                onChange={(e) => setMiscellaneous(e.target.value)}
                label="Miscellaneous"
              />
            </Stack>
            <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
              <Stack direction="row" columnGap={2}>
                <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {concession
                    ? concession?.format === "Value"
                      ? `Concession : ₹${concession?.concession}`
                      : `Concession : ${concession?.concession}%`
                    : ""}
                </Typography>
                <Button
                  color="warning"
                  onClick={handleOpenConcessionModal}
                  variant="contained"
                  size="small">
                  {concession ? "remove concession" : "add concession"}
                </Button>
              </Stack>

              <Button
                onClick={handleOpenCollectFeeModal}
                variant="contained"
                size="small">
                collect fee
              </Button>
            </Box>
          </ExtraFeeContainer>
        </TableContainer>
      )}

      {/* Concession model */}
      <QuickFeeConcessionModal
        onSubmit={handleConcessionSubmit}
        open={openConcessionModal}
        onClose={handleCloseConcessionModal}
      />
      {/* payment details model */}
      <QuickFeeCollectModal
        collectingFee={collectingFee}
        downloadingPreview={downloadingPreview}
        onPreviewButtonClick={handlePreviewButtonClick}
        feeReceipt={feeDetails}
        onSubmit={handleCollectFee}
        open={openCollectModal}
        onClose={handleCloseCollectFeeModal}
        onUpdateNote={setNote}
        payingAmount={payableAmount}
        note={note}
        payingDate={payingDate}
        setPayingDate={setPayingDate}
      />
    </>
  );
}
