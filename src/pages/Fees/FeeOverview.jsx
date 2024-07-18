/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Button, Grid, Paper } from "@mui/material";
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
    } else if (dep === "hostel") {
      let newItem = `[${data.hostel?.name}]-Hostel`;
      result.push(newItem);
    } else if (dep == "transport") {
      let newItem = `[${data.route.vehicle.number}]+[${data.route.title}]-Transport-[${data.stop.name}]-Stop-[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    } else if (dep == "pickType") {
      let newItem = `[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    }
  }

  return result.join(" | ");
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
    onSubmit: console.log("nnnn"),
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

  const getCollected = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list, {
        params: {
          search: {
            $or: [
              { roleName: "ACCOUNTANT" },
              { roleName: "SUPER ADMIN" },
              { roleName: "ADMIN" },
            ],
          },
          schoolId: selectedSetting._id,
        },
      });

      // console.log(data.result, "role");

      entryFormik.setFieldValue("collected", data.result[0]?._id);

      const employeeResponse = await get(PRIVATE_URLS.employee.list, {
        params: {
          search: {
            role: entryFormik.values.collected,
          },
          schoolId: selectedSetting._id,
        },
      });
      // console.log(employeeResponse.data, "mep");

      setCollectedBy(
        employeeResponse?.data?.result.map((e) => ({
          ...e,
          label: e.role?.name,
          value: e?._id,
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
              options={collectedBy}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="feeReceipt"
              formik={entryFormik}
              label="Select Fee Receipt"
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
          <Grid xs={12} md={6} lg={3} item>
            <Button variant="contained">Find</Button>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={[]}
        bodyDataModal="data"
        bodyData={data}
        tableKeys={feeOverviewPaymentTableKeys}
      />
      <Grid
        rowSpacing={1}
        columnSpacing={2}
        container
        sx={{ display: "flex", alignItems: "center", my: 1 }}>
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="addmisionNo"
            formik={entryFormik}
            label="Select Addmision No"
            // options={""}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <FormInput formik={entryFormik} name="search" label="Search..." />
        </Grid>
      </Grid>
      <CustomTable
        actions={[]}
        bodyDataModal="data"
        bodyData={data}
        tableKeys={feeOverviewReceiptTableKeys}
      />
    </>
  );
}
