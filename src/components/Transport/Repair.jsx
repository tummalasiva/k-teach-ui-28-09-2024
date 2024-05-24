/** @format */

import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../Tables/CustomTable";
import { vehicleRepairTableKeys } from "../../data/tableKeys/vehicleRepairData";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import { del, get, post, put } from "../../services/apiMethods";
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

  const [vehicle, setVehicle] = useState([]);

  const [firm, setFirm] = useState([]);

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.maintenanceRepair.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            vehicle: values.vehicle,
            firm: values.firm,
            fromDate: values.fromDate,
            toDate: values.toDate,
          },
        },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

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

      console.log(payload, "kkkkkk");
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.maintenanceRepair.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.maintenanceRepair.create,
          payload
        );
      }

      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getFirm = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.firm.list, {
        params: { schoolId: selectedSetting._id },
      });

      setFirm(
        data.result.map((v) => ({
          ...v,
          label: v.name,
          value: v._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getVehicle = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vehicle.list, {
        params: { schoolId: selectedSetting._id },
      });
      setVehicle(
        data.result.map((v) => ({
          ...v,
          label: v.number,
          value: v._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVehicle();
    getFirm();
  }, []);

  const formik = useFormik({
    initialValues: {
      vehicle: "",
      firm: "",
      fromDate: null,
      toDate: null,
    },
    onSubmit: getData,
  });

  const entryFormik = useFormik({
    initialValues: {
      vehicle: formik.values.vehicle || "",
      firm: dataToEdit?.firm || "",

      particulars: dataToEdit?.particulars,
      amount: dataToEdit?.amount,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.maintenanceRepair.delete + "/" + id);
      formik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formik.values.vehicle && formik.values.firm) {
      formik.handleSubmit();
    }
  }, [formik.values.vehicle && formik.values.firm, selectedSetting]);
  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="vehicle"
                formik={formik}
                label="Select Vehicle"
                options={vehicle}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="firm"
                formik={formik}
                label="Select Firm"
                options={firm}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={formik}
                label="From Date"
                name="fromDate"
              />
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
        </form>
      </Paper>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
        sx={{ mt: 1, mb: 2 }}>
        Add
      </Button>
      <CustomTable
        actions={["edit", "delete"]}
        bodyData={data}
        tableKeys={vehicleRepairTableKeys}
        bodyDataModal="Repair Maintenance"
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
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
          <Grid xs={12} md={6} item>
            <FormSelect
              required={true}
              name="vehicle"
              formik={entryFormik}
              label="Select Vehicle"
              options={vehicle}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormSelect
              required={true}
              name="firm"
              formik={entryFormik}
              label="Select Firm"
              options={firm}
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
