/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { LoadingButton } from "@mui/lab";

const showInfo = (data) => {
  let result = [];

  for (let dep of data.dependencies) {
    if (dep === "class") {
      let newItem = `[${data.class?.className}]-Class`;
      result.push(newItem);
    } else if (dep === "room") {
      let newItem = `[${data.room?.hostel.name}]+[${data.room?.totalSeats} Beds]+[${data.room?.type?.name}]-Room`;
      result.push(newItem);
    } else if (dep == "route") {
      let newItem = `[${data.route.vehicleNumber.vehicleNumber}]+[${data.route.transportRouteTitle}]+[${data.route.routeStart}-${data.route.routeEnd}]`;
      result.push(newItem);
    } else if (dep == "pickType") {
      let newItem = `[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    }
  }

  return result.join(" | ");
};

export default function CollectFees() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);

  const [receiptTitles, setReceiptTitles] = useState([]);
  const [feeMaps, setFeeMaps] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectStudent, setSelectStudent] = useState([]);
  const [feeDetails, setFeeDetails] = useState(null);
  const [paymentData, setPaymentData] = useState({});
  const [totalAmountToBePaid, setTotalAmountToBePaid] = useState(0);
  const [selectedPastDueIds, setSelectedPastDueIds] = useState([]);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);

  // get student fee Details
  const handleSubmitFind = async (values) => {
    setFetchingStudents(true);

    try {
      const { data: feeReceipt, status } = await get(
        PRIVATE_URLS.receipt.getFeeDetails,
        {
          params: {
            feeMapId: entryFormik.values.feeMap,
            studentId: selectStudent._id,
            receiptTitleId: entryFormik.values.receiptName,
            installmentId:
              entryFormik.values.installmentId ||
              feeMaps.filter((f) => f._id == entryFormik.values.feeMap)[0]
                ?.installments[0]._id,
          },
        }
      );
      setFeeDetails(feeReceipt.result);
      setItemDetails(
        feeReceipt.result.feeMapCategories.map((d) => ({
          name: d.name,
          amount: Number(d.amount),
          description: d.description,
        }))
      );
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
      installmentId: "",
    },
    onSubmit: handleSubmitFind,
    enableReinitialize: true,
  });

  const getAllReceiptTitles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: {
          search: { active: true },
        },
      });
      setReceiptTitles(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue(
        "receiptName",
        data.result[0] ? data.result[0]._id : ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReceiptTitles();
  }, [selectedSetting._id]);

  const getAllFeeMaps = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.feeMap.list, {
        params: { search: { active: true }, schoolId: selectedSetting._id },
      });
      setFeeMaps(
        data.result.map((d) => ({ ...d, name: showInfo(d), value: d._id }))
      );
      entryFormik.setFieldValue(
        "feeMap",
        data.result[0] ? data.result[0]._id : ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (entryFormik.values.receiptName) {
      getAllFeeMaps();
    }
  }, [entryFormik.values.receiptName, selectedSetting._id]);

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
      if (entryFormik.values.feeMap) {
        let feeMap = feeMaps.filter(
          (f) => f._id == entryFormik.values.feeMap
        )[0];
        if (feeMap.dependencies.includes("class")) {
          return entryFormik.setFieldValue("class", feeMap.class?._id);
        }
      }
      entryFormik.setFieldValue(
        "class",
        data.result[0] ? data.result[0]._id : ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get all classes
  useEffect(() => {
    getClasses();
  }, [selectedSetting._id, entryFormik.values.feeMap]);

  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: { search: { class: entryFormik.values.class } },
      });
      setSections(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
      entryFormik.setFieldValue(
        "section",
        data.result[0] ? data.result[0]._id : ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  // get all students
  const getAllStudents = async () => {
    try {
      let feeMap = feeMaps.filter((f) => f._id == entryFormik.values.feeMap)[0];
      let dependencies = feeMap.dependencies;
      let filter = {};
      if (dependencies.includes("class")) {
        filter["academicInfo.class"] = entryFormik.values.class;
      }
      if (dependencies.includes("room")) {
        filter["hostelInfo.room"] = feeMap.room._id;
      }
      if (dependencies.includes("route")) {
        filter["transportInfo.route"] = feeMap.route._id;
      }
      if (dependencies.includes("pickType")) {
        filter["transportInfo.pickType"] = feeMap.pickType;
      }
      if (entryFormik.values.section) {
        filter["academicInfo.section"] = entryFormik.values.section;
      }

      const { data: students } = await get(PRIVATE_URLS.student.list, {
        params: {
          search: filter,
        },
        schoolId: selectedSetting._id,
      });
      setSelectStudent(null);
      setStudents(
        students.result.map((s) => ({
          ...s,
          label: s.basicInfo.name,
          value: s._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      entryFormik.values.feeMap &&
      entryFormik.values.class &&
      entryFormik.values.section
    ) {
      getAllStudents();
    } else {
      setStudents([]);
      setSelectStudent(null);
    }
  }, [entryFormik.values.section, entryFormik.values.feeMap]);

  const handleStudentSelect = (e, val) => {
    setSelectStudent(val);
    setItemDetails([]);
    setFeeDetails(null);
    setPaymentData({});
  };

  useEffect(() => {
    if (entryFormik.values.installmentId) {
      entryFormik.handleSubmit();
    }
  }, [entryFormik.values.installmentId]);

  return (
    <>
      <PageHeader title="Collect Fees" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              // options={}
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
    </>
  );
}
