/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import FormInput from "../../forms/FormInput";
import { VendorTableKeys } from "../../data/tableKeys/vendorData";
import FormSelect from "../../forms/FormSelect";
import { LoadingButton } from "@mui/lab";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";
import avatar from "../../assets/images/avatar.jpg";

const MuiBox = styled(Box)({
  background: "#ececec",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundPosition: "center",
  display: "flex",

  justifyContent: "center",
  alignItems: "center",
});

const BasicData = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "15px",
  padding: "15px 0px",
});

export default function Vendor() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState([]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vendor.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      console.log(data.result, "pppp");

      setData(
        data.result.map((data) => ({
          ...data,
          name: data?.basicInfo?.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Add/Update action
  const handleCreateOrUpdate = async (values) => {
    console.log(values, "values");
    try {
      const payload = {
        basicInfo: {
          name: values.name,
          category: values.category,
          phone: values.phone,
          email: values.email,
          gstNumber: values.gstNumber,
          dealerName: values.dealerName,
          dealerPhoneNumber: values.dealerPhoneNumber,
          website: values.website,
        },
        addressInfo: {
          address: values.address,
          state: values.state,
          city: values.city,
          zipCode: values.zipCode,
        },
        bankInfo: {
          bankName: values.bankName,
          accountNumber: values.accountNumber,
          ifscCode: values.ifscCode,
          branchName: values.branchName,
        },

        schoolId: selectedSetting._id,
      };
      setLoading(true);

      const formData = new FormData();
      formData.append("body", JSON.stringify(payload));
      logo.forEach((file) => formData.append("photo", file));

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.vendor.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(PRIVATE_URLS.vendor.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      category: dataToEdit?.basicInfo?.category || "",
      name: dataToEdit?.basicInfo?.name || "",
      phone: dataToEdit?.basicInfo?.phone || "",
      email: dataToEdit?.basicInfo?.email || "",
      gstNumber: dataToEdit?.basicInfo?.gstNumber || "",
      dealerName: dataToEdit?.basicInfo?.dealerName || "",
      dealerPhoneNumber: dataToEdit?.basicInfo?.dealerPhoneNumber || "",
      website: dataToEdit?.basicInfo?.website || "",
      address: dataToEdit?.addressInfo?.address || "",
      state: dataToEdit?.addressInfo?.state || "",
      city: dataToEdit?.addressInfo?.city || "",
      zipCode: dataToEdit?.addressInfo?.zipCode || "",
      bankName: dataToEdit?.bankInfo?.bankName || "",
      accountNumber: dataToEdit?.bankInfo?.accountNumber || "",
      ifscCode: dataToEdit?.bankInfo?.ifscCode || "",
      branchName: dataToEdit?.bankInfo?.branchName || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setValue(0);
    getData();
    setDataToEdit(null);
    setLogo([]);
  };

  const handleChangePhoto = (e, type) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      if (type === "photo") {
        setLogo(fileList);
      }
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setLogo(logo.filter((img) => img.name != fileName));
  };

  useEffect(() => {
    if (value === 0) {
      entryFormik.resetForm();
      setDataToEdit(null);
    }
  }, [value]);
  const handleEditClick = (data) => {
    setDataToEdit(data);
    setValue(1);
  };

  return (
    <>
      <PageHeader title="Vendor" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={[
          "Vendor List",
          dataToEdit && value != 0 ? "Edit Vendor" : "Add Vendor",
        ]}
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
          onEditClick={handleEditClick}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}>
            <Grid xs={12} md={12} lg={12}>
              <BasicData>
                <MuiBox>
                  <img
                    src={
                      logo.length > 0
                        ? URL.createObjectURL(logo[0])
                        : dataToEdit?.photo
                    }
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                    alt="logo"
                  />
                </MuiBox>

                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="center">
                  <Grid xs={12} md={6} lg={3} item>
                    {" "}
                    <FileSelect
                      name="photo"
                      multi={false}
                      label="Select Logo"
                      onChange={(e) => handleChangePhoto(e, "photo")}
                      previousFile={dataToEdit?.photo}
                      customOnChange={true}
                      selectedFiles={logo}
                      onRemove={(fileName) => handleRemoveFile(fileName)}
                      accept="image/jpeg, image/png"
                    />
                  </Grid>
                </Grid>
              </BasicData>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}>
                Basic Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
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
                name="phone"
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
                name="gstNumber"
                formik={entryFormik}
                label="GST Number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="dealerName"
                formik={entryFormik}
                label="Dealer Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="dealerPhoneNumber"
                formik={entryFormik}
                label="Dealer Phone No."
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="website"
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
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}>
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
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}>
                Bank Information
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="bankName"
                formik={entryFormik}
                label="Bank Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="accountNumber"
                formik={entryFormik}
                label="Account No"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="ifscCode"
                formik={entryFormik}
                label="IFSC Code"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
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
              item>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                variant="contained"
                loading={loading}
                sx={{ ml: 2 }}>
                Submit
              </LoadingButton>
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
                sx={{ fontSize: "15px", mt: 2, fontWeight: "bold" }}>
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
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}>
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
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}>
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
                sx={{ fontSize: "15px", mt: 1, fontWeight: "bold" }}>
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
              item>
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
