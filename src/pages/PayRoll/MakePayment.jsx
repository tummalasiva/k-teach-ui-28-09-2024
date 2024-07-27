/** @format */

import React, { useContext, useEffect } from "react";
import { paymentHistoryTableKeys } from "../../data/tableKeys/paymentHistoryData";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { downloadFile } from "../../utils";
import { LoadingButton } from "@mui/lab";
import CheckPermission from "../../components/Authentication/CheckPermission";

export default function MakePayment() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [downloadingDeductions, setDownloadingDeductions] = useState(false);
  const [deductions, setDeductions] = useState([]);

  const getDeductions = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.salaryGrade.list, {
        params: { schoolId: selectedSetting._id },
      });
      let deductionList = [];
      for (let sg of data.result) {
        let deductions = sg.deduction.map((d) => ({
          ...d,
          label: d.name,
          value: d.name,
        }));
        deductionList = [...deductionList, ...deductions];
      }

      setDeductions(deductionList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeductions();
  }, [selectedSetting]);

  const handleProcessPayment = async (values) => {
    setProcessingPayment(true);
    try {
      const selectedMonth = dayjs(values.month).format("MMMM");

      const { data } = await get(PRIVATE_URLS.paymentHistory.downloadPdf, {
        params: {
          month: selectedMonth,
          year: values.year,
          schoolId: selectedSetting._id,
        },
        responseType: "blob",
      });

      downloadFile("application/pdf", data, `Salary_Slip_${selectedMonth}`);

      getPaymentHistory();
    } catch (error) {
      console.log(error);
    }
    setProcessingPayment(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      month: new Date(),
      year: new Date(),
    },
    onSubmit: handleProcessPayment,
  });

  const handleDownloadDeductions = async (values) => {
    const month = values.date;
    const deduction = values.type;

    setDownloadingDeductions(true);
    try {
      const selectedMonth = dayjs(values.month).format("MMMM");
      const { data } = await get(
        PRIVATE_URLS.paymentHistory.downloadDeductionPdf,
        {
          params: {
            month: selectedMonth,
            deduction,
            schoolId: selectedSetting._id,
          },
          responseType: "blob",
        }
      );

      downloadFile("application/pdf", data, `Deductions-${selectedMonth}`);
    } catch (error) {
      console.log(error);
    }
    setDownloadingDeductions(false);
  };

  const formik = useFormik({
    initialValues: {
      type: new Date(),
      date: new Date(),
    },
    onSubmit: handleDownloadDeductions,
  });

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  const getPaymentHistory = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.paymentHistory.list, {
        params: { schoolId: selectedSetting._id },
      });
      setPaymentHistory(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (value === 1) {
      getPaymentHistory();
    }
  }, [value]);

  const handleDownloadPaymentHistory = (data) => {
    window.open(data.data);
  };

  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Salary Sheet", "History", "Salary Deduction"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Month"
                name="month"
                openTo="month"
                inputFormat="MMM"
                views={["month"]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Year"
                name="year"
                openTo="year"
                inputFormat="YYYY"
                views={["year"]}
              />
            </Grid>
            <CheckPermission module="Make Payment" permission="view">
              <Grid item xs={12} md={6} lg={3} style={{ alignSelf: "center" }}>
                <LoadingButton
                  loading={processingPayment}
                  onClick={entryFormik.handleSubmit}
                  size="small"
                  variant="contained">
                  Process
                </LoadingButton>
              </Grid>
            </CheckPermission>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={["download"]}
          module="Make Payment"
          tableKeys={paymentHistoryTableKeys}
          bodyData={paymentHistory}
          bodyDataModal="history"
          onDownloadClick={handleDownloadPaymentHistory}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="type"
                formik={formik}
                label="Select Deduction Type"
                options={deductions}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker
                formik={formik}
                label="Date"
                openTo="month"
                inputFormat="MMM/YYYY"
                views={["month", "year"]}
                name="date"
              />
            </Grid>
            <CheckPermission module="Make Payment" permission="view">
              <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
                <LoadingButton
                  onClick={formik.handleSubmit}
                  loading={downloadingDeductions}
                  size="small"
                  variant="contained">
                  Find
                </LoadingButton>
              </Grid>
            </CheckPermission>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
