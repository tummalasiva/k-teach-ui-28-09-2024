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
  const [feeParticular, setFeeParticulars] = useState([]);
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
            studentId: selectedStudent._id,
            receiptTitleId: entryFormik.values.receiptName,
            installmentId:
              entryFormik.values.installmentId ||
              feeMaps.filter((f) => f._id == entryFormik.values.feeMap)[0]
                ?.installments[0]._id,
          },
        }
      );

      console.log(feeReceipt.result, "fee details");

      // setFeeDetails(feeReceipt.result);
      // setItemDetails(
      //   feeReceipt.result.feeMapCategories.map((d) => ({
      //     name: d.name,
      //     amount: Number(d.amount),
      //     description: d.description,
      //   }))
      // );
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
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: { search: { class: entryFormik.values.class } },
      });
      setSections(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
      entryFormik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  const getAllFeeMaps = async () => {
    try {
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
        data.result.map((d) => ({ ...d, label: showInfo(d), value: d._id }))
      );
      entryFormik.setFieldValue("feeMap", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (entryFormik.values.receiptName && entryFormik.values.class) {
      getAllFeeMaps();
    }
  }, [
    entryFormik.values.receiptName,
    entryFormik.values.class,
    selectedSetting._id,
  ]);

  // get all students
  const getAllStudents = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    entryFormik.setFieldValue("student", "");
    if (
      entryFormik.values.feeMap &&
      entryFormik.values.class &&
      entryFormik.values.section
    ) {
      getAllStudents();
    } else {
      setStudents([]);
      setSelectedStudent(null);
    }
  }, [entryFormik.values.feeMap]);

  const handleStudentSelect = (e, val) => {
    setSelectedStudent(val);
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
    </>
  );
}
