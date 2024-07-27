/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import DownloadIcon from "@mui/icons-material/Download";
import FormInput from "../../forms/FormInput";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { downloadFile } from "../../utils";
import { LoadingButton } from "@mui/lab";
import CheckPermission from "../../components/Authentication/CheckPermission";

const MuiTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
}));

export default function BulkAdmission() {
  const { selectedSetting } = useContext(SettingContext);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [file, setFile] = useState(null);

  //get academic year
  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
      setAcademicYearList(
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

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  const downloadBulkAdmissionSheet = async () => {
    try {
      const { data } = await get(
        PRIVATE_URLS.student.getBulkStudentAdmitSheet,
        { responseType: "blob", params: { schoolId: selectedSetting._id } }
      );
      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        data,
        "Bulk Admission Sheet"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadSheet = async () => {
    try {
      const formData = new FormData();
      formData.append("classId", entryFormik.values.class);
      formData.append("sectionId", entryFormik.values.section);
      formData.append("academicYearId", entryFormik.values.academicYear);
      formData.append("schoolId", selectedSetting._id);
      formData.append("file", file);

      const { data } = await put(
        PRIVATE_URLS.student.bulkStudentAdmit,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Bulk Admission" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              options={academicYearList}
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

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            md={6}
            lg={3}
            item>
            <Button size="large" component="label">
              <input
                visibility="hidden"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Button>
          </Grid>

          <CheckPermission module="Bulk Admission" permission="view">
            <Grid xs={12} md={12} lg={12} item>
              <LoadingButton
                onClick={downloadBulkAdmissionSheet}
                endIcon={<DownloadIcon />}
                size="small"
                variant="contained">
                Get Sample
              </LoadingButton>
            </Grid>
          </CheckPermission>

          <Grid xs={12} md={12} lg={12} item>
            <MuiTypography component="ul">
              <MuiTypography component="li">
                School role type configured with
                <span style={{ color: "red" }}> manual</span>, please mention
                role number in column.
              </MuiTypography>
              <MuiTypography component="li">
                School admission_no configured with auto{" "}
                <span style={{ color: "red" }}> auto _ascending_no, </span>
                admission_no column will be ignored.
              </MuiTypography>
            </MuiTypography>
          </Grid>
          <CheckPermission module="Bulk Admission" permission="add">
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="flex-end">
              <LoadingButton
                onClick={uploadSheet}
                size="small"
                variant="contained">
                Submit
              </LoadingButton>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>
      <Box
        sx={{
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "rgba(32,33,32,1)" : "#FFF9C4",
        }}>
        <Typography sx={{ fontSize: "22px" }} fontWeight="bold">
          Instruction:
        </Typography>
        <MuiTypography component="ol">
          <MuiTypography component="li">
            At first select the (School), Class and Section
          </MuiTypography>
          <MuiTypography component="li">Generate CSV file.</MuiTypography>
          <MuiTypography component="li">
            Open the downloaded CSV file and enter student information with
            unique username.
          </MuiTypography>
          <MuiTypography component="li">
            Save the edited CSV file.
          </MuiTypography>
          <MuiTypography component="li">
            Upload again CSV file you just edited and submit.
          </MuiTypography>
        </MuiTypography>
      </Box>
    </>
  );
}
