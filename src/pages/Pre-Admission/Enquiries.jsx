/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { enquriesTableKeys } from "../../data/tableKeys/enquiries";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import { Box, ButtonGroup, styled } from "@mui/material";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { LoadingButton } from "@mui/lab";

const MuiBUtton = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "20px",
});

export default function Enquiries() {
  const { selectedSetting } = useContext(SettingContext);
  const [activeButton, setActiveButton] = useState("Pending");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = (status) => {
    setActiveButton(status);
  };

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
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

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  const getEnquiries = async (values) => {
    try {
      setLoading(true);
      const { data } = await get(PRIVATE_URLS.preadmissionEnqiry.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            "studentDetails.academicDetails.academicYear": values.academicYear,
            "studentDetails.academicDetails.class": values.class,
            fromDate: values.fromDate,
            toDate: values.toDate,
          },
        },
      });
      let tableData = data.result.map((d) => ({
        ...d,
        studentName: d.studentDetails?.basicDetails?.name,
        submittedOn: d.createdAt,
        class: d.studentDetails?.academicDetails?.class?.name,
      }));
      setData(tableData);
      setFilteredData(tableData.filter((d) => d.status === activeButton));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getEnquiries,
  });

  useEffect(() => {
    if (!activeButton) {
      return setFilteredData(data);
    }
    setFilteredData(data.filter((e) => e.status === activeButton));
  }, [activeButton]);

  return (
    <>
      <PageHeader title="Enquiries" />
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
              name="class"
              formik={entryFormik}
              label="Select Class"
              options={classes}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="From Date"
              name="fromDate"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker
              formik={entryFormik}
              label="To Date"
              name="toDate"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <LoadingButton
              loading={loading}
              onClick={entryFormik.handleSubmit}
              size="small"
              variant="contained">
              Find
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>

      <MuiBUtton>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {["Pending", "Approved", "Rejected"].map((v, i) => (
            <Button
              key={i}
              variant="outlined"
              onClick={() => {
                handleButtonClick(v);
              }}
              style={{
                backgroundColor: activeButton === v ? "#1b3779" : "",
                color: activeButton === v ? "white" : "black",
                textTransform: "capitalize",
              }}>
              {v}:{data.filter((item) => item.status === v).length}
            </Button>
          ))}
        </ButtonGroup>
      </MuiBUtton>

      <CustomTable
        actions={["edit"]}
        tableKeys={enquriesTableKeys}
        bodyDataModal="enquiries"
        bodyData={filteredData}
      />
    </>
  );
}
