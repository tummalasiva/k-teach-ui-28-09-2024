/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import { feeMapCategoryTableKeys } from "../../data/tableKeys/feeMapCategoryData";
import { Add } from "@mui/icons-material";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

export default function FeeMapCategory() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [receipts, setReceips] = useState([]);

  // get Receipt list
  const getReceipts = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: { schoolId: selectedSetting._id },
      });

      setReceips(data.result.map((r) => ({ label: r.name, value: r._id })));
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      receiptName: "",
      feeMap: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getReceipts();
  }, []);
  return (
    <>
      <PageHeader title="Fee Map Category" />
      <Grid
        rowSpacing={1}
        columnSpacing={2}
        container
        sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
            name="feeMap"
            formik={entryFormik}
            label="Select Fee Maps"
            // options={""}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <Button variant="contained" startIcon={<Add />}>
            Add Fee Category
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Fee Map Category"
        bodyData={data}
        tableKeys={feeMapCategoryTableKeys}
        feeMapTableKeys
      />
    </>
  );
}
