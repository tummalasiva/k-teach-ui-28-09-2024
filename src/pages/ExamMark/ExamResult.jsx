/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { examResultTableKeys } from "../../data/tableKeys/examResultData";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import ExamResultViewModel from "./ExamResultViewModel";

export default function ExamResult() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [section, setSection] = useState([]);
  const [exams, setExams] = useState([]);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);
  const [allDownloadLoading, setAllDownloadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openBulk, setOpenBulk] = useState(false);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    action: () => {},
  });

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSection(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
      entryFormik.setFieldValue("section", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getResult = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.studentMarks.getExamResult, {
        params: {
          schoolId: selectedSetting._id,
          classId: values.class,
          sectionId: values.section,
          examId: values.exam,
        },
      });
      setData(
        data.result.map((d) => ({
          ...d,
          name: d.student.basicInfo?.name,
          roleNumber: d.student.academicInfo?.rollNumber,
          image: d.student?.photo,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data, "bbb");

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
      exam: "",
    },
    onSubmit: getResult,
  });

  // get exam list
  const getExams = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });
      // console.log(data, "exam");
      setExams(data.result.map((e) => ({ label: e.title, value: e._id })));
      entryFormik.setFieldValue("exam", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClass();
    getExams();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  console.log(data, "bvd");

  const handleClickOpenView = (data) => {
    console.log(data, "vvvvvb");
    setModalData({
      ...modalData,
      open: true,
      tableData: data,
    });
  };

  const onCloseViewModel = (e) => {
    setModalData({ ...modalData, open: false });
  };

  const onClose = () => {
    setOpenBulk(false);
  };

  return (
    <>
      <PageHeader title="Exam Result" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
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
              options={section}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="exam"
              formik={entryFormik}
              label="Select Exam"
              options={exams}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
            <LoadingButton
              onClick={entryFormik.handleSubmit}
              size="small"
              variant="contained">
              Find
            </LoadingButton>
            <LoadingButton
              onClick={() => setOpenBulk(true)}
              size="small"
              variant="contained"
              sx={{ ml: 1 }}>
              Bulk Upload
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      <CustomTable
        actions={["view", "download"]}
        bodyDataModal="exam result"
        bodyData={data}
        tableKeys={examResultTableKeys}
        onViewClick={handleClickOpenView}
      />

      {/* view exam result ============= */}
      <ExamResultViewModel
        title="Exam Result Information"
        open={modalData?.open}
        tableData={modalData?.tableData || []}
        onClose={onCloseViewModel}
      />

      {/* Bulk upload model ============= */}
      {/* <Dialog
        open={openBulk}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 650,
          },
          component: "form",
        }}>
        <DialogTitle sx={{ fontWeight: 600 }}>Bulk Upload</DialogTitle>
        <Divider />
        <DialogContent>
          <LoadingButton
            size="small"
            loading={uploadLoader}
            variant="contained"
            type="submit">
            Upload
          </LoadingButton>
          <LoadingButton
            size="small"
            loading={downloadLoader}
            variant="contained"
            type="submit">
            Download
          </LoadingButton>
          <LoadingButton
            size="small"
            loading={allDownloadLoading}
            variant="contained"
            type="submit">
            Download All Student
          </LoadingButton>
          <LoadingButton
            size="small"
            loading={loading}
            variant="contained"
            type="submit">
            Submit
          </LoadingButton>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
