/** @format */

import React, { useContext, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { Button, Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import { useFormik } from "formik";
import FormDatePicker from "../../forms/FormDatePicker";

export default function Feedback() {
  const { selectedSetting } = useContext(SettingContext);
  const [subject, seSubject] = useState([]);
  const getSubject = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.subject.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      seSubject(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubject();
  }, [selectedSetting]);
  const formik = useFormik({
    initialValues: {
      subjet: "",

      fromDate: null,
      toDate: null,
    },
    // onSubmit: getData,
  });
  return (
    <>
      {" "}
      <PageHeader title="Feedback" />
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="subject"
            formik={formik}
            label="Select Subject"
            options={subject}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={3} item>
          <FormDatePicker formik={formik} label="From Date" name="fromDate" />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={3} item>
          <FormDatePicker formik={formik} label="To Date" name="toDate" />
        </Grid>
        <Grid xs={12} md={6} lg={3} sx={{ alignSelf: "center" }} item>
          <Button size="small" variant="contained">
            Find
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
