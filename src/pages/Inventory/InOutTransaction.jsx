import { Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { TransactionTableKeys } from "../../data/tableKeys/transactionData";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";

export default function InOutTransaction() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      item: "",
      price: "",
      quantity: "",
      mode: "",
      gst: "",
      dealerName: "",
      dealerContact: "",
      TransactionWebsite: "",
      address: "",
      city: "",
      zipCode: "",
      bankName: "",
      accountNo: "",
      branchName: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Transaction" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Transaction List", "Make Transaction", "Edit Transaction"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit"]}
          bodyDataModal="Transaction"
          bodyData={data}
          tableKeys={TransactionTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mb: 1, fontWeight: "bold" }}
              >
                Item Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="item"
                formik={entryFormik}
                label="Item"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="price"
                formik={entryFormik}
                label="Price per Item"
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="quantity"
                formik={entryFormik}
                label="Quantity"
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Transaction Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="mode"
                formik={entryFormik}
                label="Mode of Payment"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="type"
                formik={entryFormik}
                label="Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="purpose"
                formik={entryFormik}
                label="Purpose"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Transaction Between
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="fromType"
                formik={entryFormik}
                label="From Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Transaction Status"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="vender"
                formik={entryFormik}
                label="Venders"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="section"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="studentName"
                formik={entryFormik}
                label="Student Name"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="school"
                formik={entryFormik}
                label="School"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note"
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <Button size="small" variant="outlined" sx={{ my: 2 }}>
                Upload Invoice
              </Button>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Done
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mb: 1, fontWeight: "bold" }}
              >
                Item Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="item"
                formik={entryFormik}
                label="Item"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="price"
                formik={entryFormik}
                label="Price per Item"
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="quantity"
                formik={entryFormik}
                label="Quantity"
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Transaction Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="mode"
                formik={entryFormik}
                label="Mode of Payment"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="type"
                formik={entryFormik}
                label="Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="purpose"
                formik={entryFormik}
                label="Purpose"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Transaction Between
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="fromType"
                formik={entryFormik}
                label="From Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Transaction Status"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="vender"
                formik={entryFormik}
                label="Venders"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="section"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="studentName"
                formik={entryFormik}
                label="Student Name"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="school"
                formik={entryFormik}
                label="School"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note"
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <Button size="small" variant="outlined" sx={{ my: 2 }}>
                Upload Invoice
              </Button>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
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
