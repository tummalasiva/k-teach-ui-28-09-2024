/** @format */

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { resultTableKeys } from "../../data/tableKeys/result";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import { Box, ButtonGroup, styled } from "@mui/material";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import CheckPermission from "../../components/Authentication/CheckPermission";

const MuiBUtton = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "20px",
});

export default function Result() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);

  const [classes, setClasses] = useState([]);
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

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Result" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
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

          <CheckPermission module="Result" permission="view">
            {" "}
            <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
              <Button size="small" variant="contained" type="submit">
                Find
              </Button>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>
      <MuiBUtton>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="contained">Pending:56</Button>
          <Button>Approved: 100</Button>

          <Button>Rejected:0</Button>
        </ButtonGroup>
      </MuiBUtton>

      <CustomTable
        actions={["edit"]}
        module="Result"
        tableKeys={resultTableKeys}
        bodyDataModal="result"
        bodyData={data}
      />
    </>
  );
}
