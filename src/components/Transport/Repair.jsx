/** @format */

import React, { useContext, useState } from "react";
import CustomTable from "../Tables/CustomTable";
import { vehicleRepairTableKeys } from "../../data/tableKeys/vehicleRepairData";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import { post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import { Add } from "@mui/icons-material";

export default function Repair() {
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
          PRIVATE_URLS.fuel.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.fuel.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      vehicle: "",
      firm: "",
      fromDate: "",
      toDate: "",
    },
    onSubmit: console.log("nnnn"),
  });

  const entryFormik = useFormik({
    initialValues: {
      vehicleNumber: formik.values.vehicle || "",
      firmName: dataToEdit?.firmName || "",
      date: dataToEdit?.date || "",
      particulars: dataToEdit?.particulars,
      amount: dataToEdit?.amount,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="vehicle"
              formik={formik}
              label="Select Vehicle"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="firm"
              formik={formik}
              label="Select Firm"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker formik={formik} label="From Date" name="fromDate" />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker formik={formik} label="To Date" name="toDate" />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
            alignSelf="center"
            gap={1}>
            <Button size="small" variant="contained">
              Find
            </Button>
            <Button size="small" variant="contained">
              Print
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
        sx={{ mt: 1, mb: 2 }}>
        Add
      </Button>
      <CustomTable
        actions={["edit"]}
        bodyData={data}
        tableKeys={vehicleRepairTableKeys}
        bodyDataModal="Repair Maintenance"
      />
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit ? "Update Repair Maintenance" : "Add Repair Maintenance"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="vehicleNumber"
              label="Vehicle Number"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="firmName"
              label="Firm Name"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="date"
              label="Date"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="particulars"
              label="Particulars"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="amount"
              label="Amount"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
