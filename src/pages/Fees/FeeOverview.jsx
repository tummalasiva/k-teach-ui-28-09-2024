/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import FormDatePicker from "../../forms/FormDatePicker";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { feeOverviewPaymentTableKeys } from "../../data/tableKeys/feeOverviewPaymentData";
import { feeOverviewReceiptTableKeys } from "../../data/tableKeys/feeOverviewReceiptData";
import FormInput from "../../forms/FormInput";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { downloadFile } from "../../utils";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import CustomSelect from "../../forms/CustomSelect";
import CheckPermission from "../../components/Authentication/CheckPermission";
import { showInfo } from "./ReceiptBook";

const ALL_OPTION = {
  label: "All",
  value: "all",
};

const Category_Options = [
  {
    label: "Receipt No",
    value: "receiptNumber",
  },
  {
    label: "Amount",
    value: "amountPaid",
  },

  {
    label: "Payment Mode",
    value: "paymentMode",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Admission Number",
    value: "admissionNumber",
  },
];

const CustomAction = ({ data }) => {
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  const downloadStaffCopy = async (e) => {
    e.preventDefault();
    try {
      setDownloadingReceipt(true);
      const response = await get(
        PRIVATE_URLS.receipt.downloadReceiptStaff + "/" + data?._id,
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
    setDownloadingReceipt(false);
  };
  return (
    <LoadingButton
      loading={downloadingReceipt}
      size="small"
      variant="contained"
      onClick={downloadStaffCopy}>
      Staff Copy
    </LoadingButton>
  );
};

export default function FeeOverview() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [receipts, setReceips] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [feeMaps, setFeeMaps] = useState([]);
  const [collectedBy, setCollectedBy] = useState([]);
  const [category, setCategory] = useState("admissionNumber");
  const [searchValue, setSearchValue] = useState("");
  const [amountInDifferentModes, setAmountInDifferentModes] = useState(null);
  const [allReceipts, setAllReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [downloadingOverview, setDownloadingOverview] = useState(false);

  const getAmountInDifferentModes = async (values) => {
    try {
      let payload = {
        academicYearId: values.academicYear,
        cashierId: values.collected,
        receiptTitleId: values.feeReceipt,
        feeMapId: values.feeMap,
        fromDate: values.fromDate,
        toDate: values.toDate,
        sectionId: values.section,
        classId: values.class,
        schoolId: selectedSetting._id,
      };
      const { data } = await get(
        PRIVATE_URLS.receipt.getAmountCollectedWithDifferentModes,
        {
          params: payload,
        }
      );

      const { data: receipts } = await get(
        PRIVATE_URLS.receipt.getAllReceipts,
        {
          params: payload,
        }
      );

      setAllReceipts(
        receipts?.result?.map((r) => ({
          ...r,
          name: r.payeeDetails.name,
          class: r.payeeDetails.className,
          section: r.payeeDetails.sectionName,
          admissionNumber: r.payeeDetails.admissionNumber,
        }))
      );

      setFilteredReceipts(
        receipts?.result?.map((r) => ({
          ...r,
          name: r.payeeDetails.name,
          class: r.payeeDetails.className,
          section: r.payeeDetails.sectionName,
          admissionNumber: r.payeeDetails.admissionNumber,
        }))
      );
      setAmountInDifferentModes(data.result?.finalResult);
    } catch (error) {}
  };

  const downloadFeeOverview = async () => {
    try {
      const payload = {
        academicYearId: entryFormik.values.academicYear,
        cashierId: entryFormik.values.collected,
        receiptTitleId: entryFormik.values.feeReceipt,
        feeMapId: entryFormik.values.feeMap,
        fromDate: entryFormik.values.fromDate,
        toDate: entryFormik.values.toDate,
        sectionId: entryFormik.values.section,
        classId: entryFormik.values.class,
        schoolId: selectedSetting._id,
      };

      setDownloadingOverview(true);

      const response = await get(PRIVATE_URLS.receipt.downloadFeeOverView, {
        params: payload,
        validateStatus: (status) => status < 500,
        responseType: "blob",
      });

      if (response.status === 200) {
        downloadFile(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          response.data,
          "Fee_overview"
        );
      } else {
        const errorText = await new Response(response.data).text();
        toast.error(JSON.parse(errorText)?.message);
      }
    } catch (error) {
      console.log(error);
    }

    setDownloadingOverview(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      collected: "",
      feeReceipt: "",
      feeMap: "",
      class: "",
      section: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getAmountInDifferentModes,
  });

  useEffect(() => {
    setAmountInDifferentModes(null);
  }, [entryFormik.values]);

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCollected = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list, {
        params: {
          search: {
            $or: [
              { name: "ACCOUNTANT" },
              { name: "SUPER ADMIN" },
              { name: "ADMIN" },
            ],
          },
          schoolId: selectedSetting._id,
        },
      });

      let roleIds = data.result.map((r) => r._id);

      const employeeResponse = await get(PRIVATE_URLS.employee.list, {
        params: {
          search: {
            role: { $in: roleIds },
          },
          schoolId: selectedSetting._id,
        },
      });

      setCollectedBy(
        employeeResponse?.data?.result.map((e) => ({
          ...e,
          label: e.role?.name,
          value: e?._id,
        }))
      );
      entryFormik.setFieldValue(
        "collected",
        employeeResponse?.data?.result[0]?._id
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get receipts
  const getReceipts = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: { schoolId: selectedSetting._id },
      });

      setReceips(data.result.map((r) => ({ label: r.name, value: r._id })));
      entryFormik.setFieldValue("feeReceipt", data.result[0]?._id);
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

  //get sections
  const getSections = async () => {
    try {
      const filter = {};
      if (entryFormik.values.class !== "all") {
        filter["class"] = entryFormik.values.class;
      }
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: filter,
        },
      });
      entryFormik.setFieldValue("section", data.result[0]?._id);
      setSections(
        data.result.map((c) => ({
          ...c,
          label: `${c.class.name} - ${c.name}`,
          value: c._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get fee map list
  const getFeeMaps = async () => {
    const filter = {
      active: true,
    };
    if (entryFormik.values.class !== "all") {
      filter["class"] = entryFormik.values.class;
    }
    if (entryFormik.values.receiptName !== "all") {
      filter["receiptTitle"] = entryFormik.values.feeReceipt;
    }
    try {
      const { data } = await get(PRIVATE_URLS.feeMap.list, {
        params: {
          schoolId: selectedSetting._id,
          search: filter,
        },
      });
      console.log(data.result, "result fee maps");
      setFeeMaps(
        data?.result?.map((f) => ({ ...f, label: showInfo(f), value: f._id }))
      );
      entryFormik.setFieldValue("feeMap", data.result[0]?._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAcademicYear();
    getReceipts();
    getClasses();
    getCollected();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class, selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.feeReceipt) {
      getFeeMaps();
    }
  }, [
    entryFormik.values.class,
    entryFormik.values.feeReceipt,
    selectedSetting,
  ]);

  const filterData = () => {
    const filtered = allReceipts.filter((receipt) =>
      receipt[category]
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase())
    );

    setFilteredReceipts(filtered);
  };

  useEffect(() => {
    if (category && searchValue) {
      filterData();
    } else {
      setFilteredReceipts(allReceipts);
    }
  }, [category, searchValue]);

  return (
    <>
      <PageHeader title="Fee Overview" />
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
              name="collected"
              formik={entryFormik}
              label="Select Collected By"
              options={[ALL_OPTION, ...collectedBy]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeReceipt"
              formik={entryFormik}
              label="Select Fee Receipt"
              options={[ALL_OPTION, ...receipts]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              options={[ALL_OPTION, ...classes]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              options={[ALL_OPTION, ...sections]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeMap"
              formik={entryFormik}
              label="Select Fee Map"
              options={[ALL_OPTION, ...feeMaps]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              name="fromDate"
              label="From Date"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              name="toDate"
              label="To Date"
            />
          </Grid>
          <CheckPermission module="Fee Overview" permission="view">
            <Grid xs={12} md={6} lg={3} item>
              <Button onClick={entryFormik.handleSubmit} variant="contained">
                Find
              </Button>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: "rgb(27 55 121)" }}>
              <TableRow>
                <TableCell align="center">
                  <span className="class-table-header">Payment</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">Total</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">Cash</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">Cheque</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">DD</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">Chalan</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">NetBanking</span>
                </TableCell>
                <TableCell align="center">
                  <span className="class-table-header">Online</span>
                </TableCell>
              </TableRow>
            </TableHead>
            {!amountInDifferentModes ? (
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}>
                  <TableCell align="center" colSpan={8}>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      No data found
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}>
                  <TableCell align="center">
                    Amount
                    <CurrencyRupeeIcon size="small" fontSize="10px" />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {Object.values(amountInDifferentModes).reduce(
                      (t, c) => t + parseInt(c),
                      0
                    )}
                  </TableCell>

                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {amountInDifferentModes["Cash"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {amountInDifferentModes["Cheque"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {amountInDifferentModes["DD"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {amountInDifferentModes["Card"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {amountInDifferentModes["Netbanking"]}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}>
                    {amountInDifferentModes["Upi"]}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
      <Grid
        rowSpacing={1}
        columnSpacing={2}
        container
        sx={{ display: "flex", alignItems: "center", my: 1 }}>
        <Grid item xs={12} md={3}>
          <CustomSelect
            label="Search By"
            options={Category_Options}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            isSearch={false}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{ alignSelf: "center" }}>
          <TextField
            label="Search"
            size="small"
            sx={{ mt: 2 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <CustomTable
        actions={["custom"]}
        bodyDataModal="data"
        bodyData={filteredReceipts}
        tableKeys={feeOverviewReceiptTableKeys}
        CustomAction={CustomAction}
      />

      {allReceipts.length && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            padding: "10px",
            alignItems: "center",
          }}>
          <LoadingButton
            variant="contained"
            size="small"
            loading={downloadingOverview}
            onClick={downloadFeeOverview}>
            Download
          </LoadingButton>
        </Box>
      )}
    </>
  );
}
