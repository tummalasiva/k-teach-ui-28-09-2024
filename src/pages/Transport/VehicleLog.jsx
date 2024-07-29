/** @format */

import React, { useContext, useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { vehicleLogTableKeys } from "../../data/tableKeys/vehicleLogData";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, styled } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";

import FormInput from "../../forms/FormInput";
import SettingContext from "../../context/SettingsContext";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import FileSelect from "../../forms/FileSelect";
import { downloadFile } from "../../utils";
import dayjs from "dayjs";
import CheckPermission from "../../components/Authentication/CheckPermission";

const FormBox = styled(Box)(({ theme }) => ({
  padding: "20px 8px",
  borderRadius: "10px",
  margin: "10px 0px",
  borderRight: "10px",
  border: "1px solid lightGrey",

  backgroundColor: theme.palette.mode === "dark" ? "" : "whitesmoke",
}));

const Trip_Completed = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function VehicleLog() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departure, setDeparture] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [route, setRoute] = useState([]);

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.vehicleLog.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            vehicle: values.vehicle,
            route: values.route,
            fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
          },
        },
      });

      setData(
        data.result.map((s) => ({
          ...s,
          readingAtDepartureReading: s?.readingAtDeparture,
          readingAtArrival: s?.readingAtArrival,
        }))
      );

      console.log(data.result, "kkkkkkk");
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
  }, [selectedSetting]);

  const handleGetPrintPdf = async () => {
    try {
      const getLogPdf = await get(PRIVATE_URLS.vehicleLog.downloadPdf, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            vehicle: formik.values.vehicle,
            route: formik.values.route,

            fromDate: dayjs(formik.values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(formik.values.toDate).format("YYYY/MM/DD"),
          },
        },
      });

      downloadFile("application/pdf", getLogPdf.data, "vehiclelog.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  const getRoute = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.route.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            vehicle: formik.values.vehicle || entryFormik.values.vehicle,
          },
        },
      });
      setRoute(
        data.result.map((v) => ({
          ...v,
          label: v.title,
          value: v._id,
        }))
      );
      formik.setFieldValue("route", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      setLoading(true);

      const formDataDeparture = new FormData();
      const formDataArrival = new FormData();

      formDataDeparture.append("schoolId", selectedSetting._id);
      formDataDeparture.append("route", values.route);
      formDataDeparture.append("vehicle", values.vehicle);
      formDataDeparture.append("date", dayjs(values.date).format("YYYY-MM-DD"));

      formDataDeparture.append("departureTime", values.departureTime);
      formDataDeparture.append("readingAtDeparture", values.readingAtDeparture);
      formDataDeparture.append(
        "totalDistanceTravelled",
        values.totalDistanceTravelled
      );

      departure.forEach((file) =>
        formDataDeparture.append("departureImage", file)
      );

      formDataArrival.append("arrivalTime", values.arrivalTime);
      formDataArrival.append("readingAtArrival", values.readingAtArrival);
      formDataArrival.append(
        "spareUse",
        JSON.stringify({ distance: values.distance, reason: values.reason })
      );
      arrival.forEach((file) => formDataArrival.append("arrivalImage", file));

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.vehicleLog.update + "/" + dataToEdit._id,
          formDataArrival,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(
          PRIVATE_URLS.vehicleLog.create,
          formDataDeparture,
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

  const entryFormik = useFormik({
    initialValues: {
      route: dataToEdit?.route._id || "",
      vehicle: dataToEdit?.vehicle._id || "",

      departureTime: dataToEdit?.departureTime || "",
      readingAtDeparture: dataToEdit?.readingAtDeparture?.reading || "",
      arrivalTime: dataToEdit?.arrivalTime || "",
      readingAtArrival: dataToEdit?.readingAtArrival?.reading || "",
      distance: dataToEdit?.spareUse?.distance || "",
      date: dataToEdit?.date || null,
      reason: dataToEdit?.spareUse?.reason || "",
      totalDistanceTravelled: dataToEdit?.totalDistanceTravelled || 0,

      tripCompleted: dataToEdit?.tripCompleted || false,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const formik = useFormik({
    initialValues: {
      vehicle: "",
      route: "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getData,
  });

  const handleChangePhoto = (e, type) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      if (type === "departureImage") {
        setDeparture(fileList);
      } else {
        setArrival(fileList);
      }
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setDeparture(departure.filter((img) => img.name != fileName));
    setArrival(arrival.filter((img) => img.name != fileName));
  };

  useEffect(() => {
    if (formik.values.vehicle || entryFormik.values.vehicle) {
      getRoute();
    }
  }, [formik.values.vehicle, entryFormik.values.vehicle, selectedSetting]);

  useEffect(() => {
    if (formik.values.vehicle && formik.values.route) {
      formik.handleSubmit();
    }
  }, [formik.values.vehicle, formik.values.route, selectedSetting]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.vehicleLog.delete + "/" + id);
      formik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Vehicle Log" />
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
                name="route"
                formik={formik}
                label="Select Route"
                options={route}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
              <FormDatePicker
                formik={formik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={3} item>
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
              <CheckPermission module="Vehicle Log" permission="view">
                <Button size="small" type="submit" variant="contained">
                  Find
                </Button>
              </CheckPermission>
              <CheckPermission module="Vehicle Log" permission="view">
                <Button
                  size="small"
                  onClick={handleGetPrintPdf}
                  variant="contained">
                  Print
                </Button>
              </CheckPermission>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* ==== Table ==== */}
      <CustomTable
        actions={["edit", "delete"]}
        module="Vehicle Log"
        bodyDataModal="vehicle log"
        bodyData={data}
        tableKeys={vehicleLogTableKeys}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/* ==== Add form vehicle log ==== */}
      <AddForm
        title="Add Vehicle Log"
        module="Vehicle Log"
        onAddClick={AddDepartmentHandel}
      />

      {/* ==== Add form vehicle log ==== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Vehicle Log" : "Add Vehicle log"}
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
              name="route"
              label="Route"
              required={true}
              options={route}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker formik={entryFormik} name="date" label="Date" />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="departureTime"
              label="Departure Time"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              name="totalDistanceTravelled"
              label="Total Distance Travelled"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="tripCompleted"
              label="Trip Completed"
              options={Trip_Completed}
            />
          </Grid>
        </Grid>
        <FormBox>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6} item>
              <FormInput
                formik={entryFormik}
                name="readingAtDeparture"
                label="Reading At Departure"
              />
            </Grid>

            <Grid xs={12} md={6} lg={6} item>
              <FileSelect
                name="departureImage"
                label="Select File"
                onChange={(e) => handleChangePhoto(e, "departureImage")}
                customOnChange={true}
                previousFile={dataToEdit?.readingAtDeparture?.image}
                selectedFiles={departure}
                onRemove={(fileName) => handleRemoveFile(fileName)}
                accept="image/*,.pdf"
              />
            </Grid>
          </Grid>
        </FormBox>
        {dataToEdit ? (
          <>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  type="time"
                  name="arrivalTime"
                  label="Arrival Time"
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  name="distance"
                  label="Distance"
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                <FormInput formik={entryFormik} name="reason" label="Reason" />
              </Grid>
            </Grid>

            <FormBox>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={6} item>
                  <FormInput
                    formik={entryFormik}
                    name="readingAtArrival"
                    label="Reading At Arrivale"
                  />
                </Grid>

                <Grid xs={12} md={6} lg={6} item>
                  <FileSelect
                    name="arrivalImage"
                    label="Select File"
                    onChange={(e) => handleChangePhoto(e, "arrivalImage")}
                    customOnChange={true}
                    selectedFiles={arrival}
                    previousFile={dataToEdit?.readingAtArrival?.image}
                    onRemove={(fileName) => handleRemoveFile(fileName)}
                    accept="image/*,.pdf"
                  />
                </Grid>
              </Grid>
            </FormBox>
          </>
        ) : null}
      </FormModal>
    </>
  );
}
