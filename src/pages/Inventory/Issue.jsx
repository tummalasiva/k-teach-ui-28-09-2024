/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { issueDetailTableKeys } from "../../data/tableKeys/issueDetailData";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

const status = [
  { label: "Returned", value: "Returned" },
  { label: "Pending", value: "Pending" },
  { label: "Issued", value: "Issued" },
  { label: "Deleted", value: "Deleted" },
];

export default function Issue() {
  const { settings, selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectSchool, setSelectSchool] = useState(
    settings.map((s) => ({ label: s.name, value: s._id }))
  );

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  // get items
  const getItems = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.item.list);
      // console.log(data, "haha");
      setItems(
        data.result.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      item: "",
      quantity: "",
      issueStatus: "",
      fromType: "",
      school: "",
      toType: "",
      employeeName: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getItems();
  }, [selectedSetting._id]);

  const handleClose = () => {
    setValue(0);
    getItems();
    setDataToEdit(null);
  };

  return (
    <>
      <PageHeader title="Issue Details" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["List of Issue", "Issue"]}
      />
      <TabPanel index={0} value={value}>
        <Button size="small" variant="contained" sx={{ my: 2 }}>
          PDF
        </Button>
        <Button size="small" variant="contained" sx={{ ml: 2, my: 2 }}>
          Excel
        </Button>
        <CustomTable
          actions={["edit"]}
          bodyDataModal="Issue"
          bodyData={data}
          tableKeys={issueDetailTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="item"
                formik={entryFormik}
                label="Select Item"
                options={items}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="quantity"
                formik={entryFormik}
                label="Quantity"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Select Issue Status"
                options={status}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="fromType"
                formik={entryFormik}
                label="Select From Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="school"
                formik={entryFormik}
                label="Select School"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="toType"
                formik={entryFormik}
                label="Select To Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="employeeName"
                formik={entryFormik}
                label="Select Employee Name"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note"
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={handleClose}>
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Issue
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
