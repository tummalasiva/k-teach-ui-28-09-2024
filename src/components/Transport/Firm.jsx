/** @format */

import React, { useContext, useState } from "react";
import { vehicleFirmTableKeys } from "../../data/tableKeys/vehcleFirmData";
import CustomTable from "../Tables/CustomTable";
import { Button, Grid } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import { post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import FormModal from "../../forms/FormModal";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import { Add } from "@mui/icons-material";

export default function Firm() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.firm.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.firm.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      contactNumber: dataToEdit?.contactNumber || "",
      email: dataToEdit?.email || "",
      GSTNumber: dataToEdit?.GSTNumber || "",
      website: dataToEdit?.website || "",
      address: dataToEdit?.address || "",
      city: dataToEdit?.city || "",
      state: dataToEdit?.state || "",
      zipCode: dataToEdit?.zipCode || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
        sx={{ mt: 1, mb: 2 }}>
        Add
      </Button>
      <CustomTable
        tableKeys={vehicleFirmTableKeys}
        bodyData={data}
        bodyDataModal="firm"
        actions={["edit"]}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Firm" : "Add Firm"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="contactNumber"
              label="Contact Number"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="email" label="Email" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="GSTNumber"
              label="GST Number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="website" label="Website" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="address" label="Address" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="city" label="City" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="state" label="State" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="zipCode" label="Zipcode" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
