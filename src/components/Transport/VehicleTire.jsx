/** @format */

import React, { useContext, useEffect, useState } from "react";

import CustomTable from "../Tables/CustomTable";
import { vehicleTireTableKeys } from "../../data/tableKeys/vehicleTireData";
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
import dayjs from "dayjs";
import AddForm from "../../forms/AddForm";
import CheckPermission from "../Authentication/CheckPermission";

export default function VehicleTire() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState([]);
  const [firm, setFirm] = useState([]);

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.maintenanceTyre.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            vehicle: values.vehicle,
            firm: values.firm,
            fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
          },
        },
      });
      setData(data.result.map((s) => ({ ...s, firmName: s.firm })));
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
      formik.setFieldValue("firm", data.result[0]?._id);
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
      formik.setFieldValue("vehicle", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVehicle();
    getFirm();
  }, [selectedSetting]);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        date: dayjs(values.date).format("YYYY/MM/DD"),
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.maintenanceTyre.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.maintenanceTyre.create,
          payload
        );
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
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getData,
  });

  const entryFormik = useFormik({
    initialValues: {
      vehicle: dataToEdit?.vehicle._id || "",
      firm: dataToEdit?.firm._id || "",
      kmReading: dataToEdit?.kmReading || "",
      kmRun: dataToEdit?.kmRun || "",
      tyre: dataToEdit?.tyre || "",
      date: dataToEdit?.date || null,
      amount: dataToEdit?.amount || "",
      rate: dataToEdit?.rate || "",
      tyreNo: dataToEdit?.tyreNo || "",
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
      const res = await del(PRIVATE_URLS.maintenanceTyre.delete + "/" + id);
      formik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formik.values.vehicle && formik.values.firm) {
      formik.handleSubmit();
    }
  }, [formik.values.vehicle, formik.values.firm, selectedSetting]);
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
              <CheckPermission module="Vehicle Maintenance" permission="view">
                <Button size="small" type="submit" variant="contained">
                  Find
                </Button>
              </CheckPermission>
              <CheckPermission module="Vehicle Maintenance" permission="view">
                <Button size="small" variant="contained">
                  Print
                </Button>
              </CheckPermission>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* ==== Add form vehicle log ==== */}
      <AddForm
        title="Add Tyre/Resole"
        module="Vehicle Maintenance"
        onAddClick={handleClickOpen}
      />

      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={vehicleTireTableKeys}
        bodyData={data}
        module="Vehicle Maintenance"
        bodyDataModal="tyre/resole"
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/* ==== Add/update modal ==== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit ? "Update Vehicle Tyre/Resole" : "Add  Vehicle Tyre/Resole"
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
              name="kmReading"
              label="Km Reading"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="kmRun"
              label="Km Run"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="tyre"
              label="Tyre"
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

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="rate"
              label="Rate"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="tyreNo"
              label="Tyre No"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
