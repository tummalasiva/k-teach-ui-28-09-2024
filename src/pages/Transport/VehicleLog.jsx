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

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vehicleLog.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVehicle();
    getData();
  }, []);

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
  }, []);

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

      const formData = new FormData();

      formData.append("schoolId", selectedSetting._id);
      formData.append("route", values.route);
      formData.append("vehicle", values.vehicle);
      formData.append("date", values.date);
      formData.append("departureTime", values.departureTime);
      formData.append("readingAtDeparture", values.readingAtDeparture);
      departure.forEach((file) => formData.append("departureImage", file));

      console.log(formData, "nnnnnnnnbbbbbbbbb");

      formData.append("arrivalTime", values.arrivalTime);
      formData.append("readingAtArrival", values.readingAtArrival);
      formData.append("distance", values.distance);
      formData.append("reason", values.reason);
      arrival.forEach((file) => formData.append("arrivalImage", file));

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.vehicleLog.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.vehicleLog.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        getData();
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
      date: dataToEdit?.date || null,
      departureTime: dataToEdit?.departureTime || "",
      readingAtDeparture: dataToEdit?.readingAtDeparture || "",
      arrivalTime: dataToEdit?.arrivalTime || "",
      readingAtArrival: dataToEdit?.readingAtArrival || "",
      distance: dataToEdit?.distance || "",
      reason: dataToEdit?.reason || "",
      totalDistanceTravelled: dataToEdit?.totalDistanceTravelled || 0,
      spareUse: dataToEdit?.spareUse || "",
      tripCompleted: dataToEdit?.tripCompleted || false,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const formik = useFormik({
    initialValues: {
      vehicle: "",
      route: "",
      fromDate: null,
      toDate: null,
    },
    onSubmit: console.log("nnnn"),
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

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.vehicleLog.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Vehicle Log" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
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
            <FormDatePicker formik={formik} label="From Date" name="fromDate" />
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={3} item>
            <FormDatePicker formik={formik} label="To Date" name="toDate" />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <AddForm title="Add Vehicle Log" onAddClick={AddDepartmentHandel} />

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
            <FormInput formik={entryFormik} name="spareUse" label="Spare Use" />
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
                    multi={false}
                    name="arrivalImage"
                    label="Select File"
                    onChange={(e) => handleChangePhoto(e, "arrivalImage")}
                    customOnChange={true}
                    selectedFiles={arrival}
                    onRemove={(fileName) => handleRemoveFile(fileName)}
                    accept="image/*,.pdf"
                  />
                </Grid>
              </Grid>
            </FormBox>
          </>
        ) : null}
      </FormModal>
      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={vehicleLogTableKeys}
        bodyDataModal="vehicle log"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />
    </>
  );
}
