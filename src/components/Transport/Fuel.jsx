/** @format */

import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../Tables/CustomTable";
import { vehicleFuelTableKeys } from "../../data/tableKeys/vehicleFuelData";
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
import FileSelect from "../../forms/FileSelect";
import dayjs from "dayjs";

export default function Fuel() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectReceipt, setSelectReceipt] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [firm, setFirm] = useState([]);

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.maintenanceFuel.list, {
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

      console.log(data.result, "firm");
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

  const handleCreateOrUpdate = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("schoolId", selectedSetting._id);
      formData.append("vehicle", values.vehicle);
      formData.append("firm", values.firm);
      formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
      formData.append("billNo", values.billNo);
      formData.append("fuelQuantity", values.fuelQuantity);
      formData.append("rate", values.rate);
      formData.append("amount", values.amount);
      formData.append("kiloMeter", values.kiloMeter);

      selectReceipt.forEach((file) => formData.append("file", file));

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.maintenanceFuel.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.maintenanceFuel.create,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
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

  const entryFormik = useFormik({
    initialValues: {
      vehicle: dataToEdit?.vehicle._id || "",
      firm: dataToEdit?.firm._id || "",
      date: dataToEdit?.date || "",
      billNo: dataToEdit?.billNo || "",
      fuelQuantity: dataToEdit?.fuelQuantity || "",
      rate: dataToEdit?.rate || "",
      amount: dataToEdit?.amount || "",
      kiloMeter: dataToEdit?.kiloMeter || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setSelectReceipt(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setSelectReceipt(selectReceipt.filter((img) => img.name != fileName));
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.maintenanceFuel.delete + "/" + id);
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

  const handleDownload = () => {
    const downloadUrl = dataToEdit?.receipt;
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

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
              <Button size="small" type="submit" variant="contained">
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
        tableKeys={vehicleFuelTableKeys}
        bodyData={data}
        bodyDataModal="fuel"
        actions={["edit", "delete"]}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Fuel" : "Add Fuel"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="vehicle"
              label="Vehicle"
              required={true}
              options={vehicle}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="firm"
              label="Firm"
              required={true}
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
              name="billNo"
              label="Bill No"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="fuelQuantity"
              label="Fuel Quantity"
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
              name="amount"
              label="Amount"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="kiloMeter"
              label="Kilo Meter"
              required={true}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FileSelect
              name="receipt"
              label="Select File"
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectReceipt}
              onRemove={(fileName) => handleRemoveFile(fileName)}
            />
          </Grid>

          {dataToEdit && dataToEdit?.receipt ? (
            <Grid xs={12} md={6} lg={6} item>
              <Button size="small" variant="contained" onClick={handleDownload}>
                Download File
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </FormModal>
    </>
  );
}
