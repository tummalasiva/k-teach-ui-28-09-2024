/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import CustomTable from "../../components/Tables/CustomTable";
import { balanceFeeReportTableKeys } from "../../data/tableKeys/balanceFeeReportData";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import { downloadFile } from "../../utils";
import { toast } from "react-toastify";
import CheckPermission from "../../components/Authentication/CheckPermission";
import { showInfo } from "./ReceiptBook";

export default function BalanceFeeReport() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [receipts, setReceips] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [feeMaps, setFeeMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingExcel, setDownloadingExcel] = useState(false);

  // get balance fee reports
  const handleSubmitFind = async (values) => {
    console.log(values, "values");
    setLoading(true);

    try {
      const { data: feeReport, status } = await get(
        PRIVATE_URLS.receipt.getBalanceFeeReport,
        {
          params: {
            classId: values.class,
            sectionId: values.section,
            feeMapId: values.feeMap,
            academicYearId: values.academicYear,
            schoolId: selectedSetting._id,
          },
        }
      );

      setData(feeReport.result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      receiptName: "",
      feeMap: "",
      class: "",
      section: "",
    },
    onSubmit: handleSubmitFind,
    enableReinitialize: true,
  });

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

  // get receipts
  const getReceipts = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: {
          search: { active: true },
          schoolId: selectedSetting._id,
        },
      });

      setReceips(data.result.map((r) => ({ label: r.name, value: r._id })));
      entryFormik.setFieldValue("receiptName", data.result[0]?._id);
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
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      entryFormik.setFieldValue("section", data.result[0]?._id);
      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get fee map list
  const getFeeMaps = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.feeMap.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            active: true,
            class: entryFormik.values.class,
            receiptTitle: entryFormik.values.receiptName,
          },
        },
      });
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
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    if (entryFormik.values.receiptName && entryFormik.values.class) {
      getFeeMaps();
    }
  }, [
    entryFormik.values.receiptName,
    entryFormik.values.class,
    selectedSetting._id,
  ]);

  useEffect(() => {
    setData([]);
  }, [entryFormik.values.feeMap, selectedSetting._id]);

  // Download excel file

  const downloadBalanceReport = async () => {
    setDownloadingExcel(true);
    const values = entryFormik.values;
    try {
      const response = await get(
        PRIVATE_URLS.receipt.downloadBalanceFeeReport,
        {
          params: {
            classId: values.class,
            sectionId: values.section,
            feeMapId: values.feeMap,
            academicYearId: values.academicYear,
            schoolId: selectedSetting._id,
          },
          validateStatus: (status) => status < 500,
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        downloadFile(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          response.data,
          "Balance_Report.xlsx"
        );
      } else {
        const errorText = await new Response(response.data).text();
        toast.error(JSON.parse(errorText)?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDownloadingExcel(false);
  };

  return (
    <>
      <PageHeader title="Balance Fee Report" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              name="receiptName"
              formik={entryFormik}
              label="Select Receipt Name"
              options={receipts}
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
          <CheckPermission module="Balance Fee" permission="view">
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item>
              <LoadingButton
                size="small"
                variant="contained"
                loading={loading}
                onClick={entryFormik.handleSubmit}>
                Find
              </LoadingButton>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="Balance Fee Report"
        bodyData={data}
        tableKeys={balanceFeeReportTableKeys}
      />
      <CheckPermission module="Balance Fee" permission="view">
        {data.length > 0 && (
          <>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <LoadingButton
                loading={downloadingExcel}
                onClick={downloadBalanceReport}
                size="small"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}>
                DOWNLOAD
              </LoadingButton>
            </Box>
          </>
        )}
      </CheckPermission>
    </>
  );
}
