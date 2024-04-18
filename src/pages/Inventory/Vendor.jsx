import React, { useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import FormInput from "../../forms/FormInput";
import { VendorTableKeys } from "../../data/tableKeys/vendorData";
import FormSelect from "../../forms/FormSelect";

export default function Vendor() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      category: "",
      name: "",
      contactNumber: "",
      email: "",
      gst: "",
      dealerName: "",
      dealerContact: "",
      vendorWebsite: "",
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
      <PageHeader title="Vendor" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Vendor List", "Add Vendor", "Edit Vendor"]}
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
          bodyDataModal="Vendor"
          bodyData={data}
          tableKeys={VendorTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Logo:
              </Typography>
              <FormInput
                required={true}
                name="logo"
                formik={entryFormik}
                label="logo"
                type="file"
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Basic Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="category"
                formik={entryFormik}
                label="Category"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="contactNumber"
                formik={entryFormik}
                label="Phone no."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="email"
                formik={entryFormik}
                label="Email"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="gst"
                formik={entryFormik}
                label="GST Number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="dealerName"
                formik={entryFormik}
                label="Dealer Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="dealerContact"
                formik={entryFormik}
                label="Dealer Phone No."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="vendorWebsite"
                formik={entryFormik}
                label="Vendor Website"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Address Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="address"
                formik={entryFormik}
                label="Address"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="city"
                formik={entryFormik}
                label="City"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="state"
                formik={entryFormik}
                label="State"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="zipCode"
                formik={entryFormik}
                label="Zip Code"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Bank Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="bankName"
                formik={entryFormik}
                label="Bank Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="accountNo"
                formik={entryFormik}
                label="Account No"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="ifsc"
                formik={entryFormik}
                label="IFSC Code"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="branchName"
                formik={entryFormik}
                label="Branch Name"
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
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 2, fontWeight: "bold" }}
              >
                Logo:
              </Typography>
              <FormInput
                required={true}
                name="logo"
                formik={entryFormik}
                label="logo"
                type="file"
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Basic Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="category"
                formik={entryFormik}
                label="Category"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="contactNumber"
                formik={entryFormik}
                label="Phone no."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="email"
                formik={entryFormik}
                label="Email"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="gst"
                formik={entryFormik}
                label="GST Number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="dealerName"
                formik={entryFormik}
                label="Dealer Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="dealerContact"
                formik={entryFormik}
                label="Dealer Phone No."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="vendorWebsite"
                formik={entryFormik}
                label="Vendor Website"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Address Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="address"
                formik={entryFormik}
                label="Address"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="city"
                formik={entryFormik}
                label="City"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="state"
                formik={entryFormik}
                label="State"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="zipCode"
                formik={entryFormik}
                label="Zip Code"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}
              >
                Bank Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="bankName"
                formik={entryFormik}
                label="Bank Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="accountNo"
                formik={entryFormik}
                label="Account No"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="ifsc"
                formik={entryFormik}
                label="IFSC Code"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="branchName"
                formik={entryFormik}
                label="Branch Name"
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
