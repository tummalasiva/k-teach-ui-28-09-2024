import React, { useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { itemTableKeys } from "../../data/tableKeys/itemData";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";

export default function Item() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: "",
      department: "",
      brand: "",
      id: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Item" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Item List", "Add Item", "Edit Item"]}
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
          bodyDataModal="Items"
          bodyData={data}
          tableKeys={itemTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Item name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="department"
                formik={entryFormik}
                label="Select Department"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="brand"
                formik={entryFormik}
                label="Brand"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="id"
                formik={entryFormik}
                label="item Id"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={false}
                name="note"
                formik={entryFormik}
                label="Description"
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Item name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="department"
                formik={entryFormik}
                label="Select Department"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="brand"
                formik={entryFormik}
                label="brand"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="id"
                formik={entryFormik}
                label="Item Id"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={false}
                name="note"
                formik={entryFormik}
                label="Description"
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
