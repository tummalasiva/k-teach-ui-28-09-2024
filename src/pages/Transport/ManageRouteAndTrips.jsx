/** @format */

import React, { useContext, useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageRouteTableKeys } from "../../data/tableKeys/manageRouteData";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import SettingContext from "../../context/SettingsContext";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { Box, Button, Grid, IconButton, styled } from "@mui/material";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";

import FormSelect from "../../forms/FormSelect";
import CustomInput from "../../forms/CustomInput";
import RouteAndTripViewDialog from "./RouteAndTripViewDialog";

const FormBox = styled(Box)(({ theme }) => ({
  padding: "20px 8px",
  borderRadius: "10px",
  margin: "10px 0px",
  borderRight: "10px",
  border: "1px solid lightGrey",
  position: "relative",
  backgroundColor: theme.palette.mode === "dark" ? "" : "whitesmoke",
}));

export default function ManageRouteAndTrips() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatingStop, setUpdatingStop] = useState(false);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    action: () => {},
  });

  // get rout
  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.route.list);
      // console.log(data, "herere");
      setData(
        data.result.map((v) => ({
          ...v,
          stopName: v.stops?.map((s) => s.name),
          vehicleForRoute: v.vehicle?.number,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get vehicle
  const getVehicles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vehicle.list);
      setVehicles(
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

  const AddRouteTrips = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    getData();
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
          PRIVATE_URLS.route.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.route.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      vehicle: dataToEdit?.vehicle._id || "",
      routeStart: dataToEdit?.routeStart || "",
      routeEnd: dataToEdit?.routeEnd || "",
      pickStart: dataToEdit?.pickStart || "",
      pickEnd: dataToEdit?.pickEnd || "",
      dropStart: dataToEdit?.dropStart || "",
      dropEnd: dataToEdit?.dropEnd || "",
      stops: dataToEdit?.stops || [
        {
          id: 1,
          name: "",
          stopKM: "",
          pickTime: "",
          pickEndTime: "",
          dropTime: "",
          dropEndTime: "",
        },
      ],
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const addStop = () => {
    let initialStopsData = [...entryFormik.values.stops];
    entryFormik.setFieldValue("stops", [
      ...entryFormik.values.stops,
      {
        id: initialStopsData.length + 1,
        name: "",
        stopKM: "",
        pickTime: "",
        pickEndTime: "",
        dropTime: "",
        dropEndTime: "",
      },
    ]);
  };

  const updateStop = async (stopId) => {
    console.log(stopId, "stopId");
    let stopData = entryFormik.values.stops.find((stop) => stop._id === stopId);
    console.log(stopData, "stopData");

    try {
      setUpdatingStop(true);
      const { data } = await put(
        PRIVATE_URLS.route.updateStop + "/" + stopId,
        stopData
      );
      setUpdatingStop(false);
    } catch (error) {
      console.log(error);
      setUpdatingStop(false);
    }
  };

  const removeStop = (index) => {
    let initialBedsData = [...entryFormik.values.stops];
    initialBedsData.splice(index, 1);
    entryFormik.setFieldValue("stops", initialBedsData);
  };

  const deleteRoute = async (id) => {
    try {
      const { data } = await del(PRIVATE_URLS.route.delete + "/" + id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    console.log(data, "eee");
    setOpen(true);
    setDataToEdit(data);
  };

  useEffect(() => {
    getVehicles();
    getData();
  }, []);

  const handleCustomInputChange = (event, stop) => {
    entryFormik.setFieldValue(
      "stops",
      entryFormik.values.stops.map((b) =>
        b.id === stop.id ? { ...b, [event.target.name]: event.target.value } : b
      )
    );
  };

  const handleClickOpenView = (data) => {
    // console.log(data, "vvvvvb");
    setModalData({
      ...modalData,
      open: true,
      tableData: data,
      schoolName: selectedSetting.name,
    });
    getData();
  };

  const onClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <PageHeader title="Manage Route & Trips" />

      {/* show data table ============== */}
      <CustomTable
        actions={["edit", "view", "delete"]}
        tableKeys={manageRouteTableKeys}
        bodyDataModal="route"
        bodyData={data}
        onViewClick={handleClickOpenView}
        onEditClick={handleEdit}
        onDeleteClick={deleteRoute}
      />

      {/* Add icon ============= */}
      <AddForm title="Add Route & Trips" onAddClick={AddRouteTrips} />

      {/* Add/Update dialog ============= */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Route & Trips" : "Add Route & Trips"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Title"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="vehicle"
              label="Vehicle"
              required={true}
              options={vehicles}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="routeStart"
              label="Route Start"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="routeEnd"
              label="Route End"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="pickStart"
              required={true}
              label="Pick Start"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="pickEnd"
              required={true}
              label="Pick End"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="dropStart"
              required={true}
              label="Drop Start"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="dropEnd"
              required={true}
              label="Drop End"
            />
          </Grid>
        </Grid>
        {entryFormik.values.stops.map(
          (stop, index) => (
            console.log(stop, "gg"),
            (
              <FormBox key={index}>
                <IconButton
                  color="error"
                  sx={{ position: "absolute", right: 0, top: 0 }}
                  onClick={() => removeStop(index)}>
                  <CloseIcon />
                </IconButton>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={12} md={6} item>
                    <CustomInput
                      value={stop?.name}
                      name="name"
                      label="Name"
                      required={true}
                      onChange={(e) => handleCustomInputChange(e, stop)}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} md={6} item>
                    <CustomInput
                      value={stop?.stopKM}
                      name="stopKM"
                      label="Stop KM"
                      onChange={(e) => handleCustomInputChange(e, stop)}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} md={6} item>
                    <CustomInput
                      value={stop?.pickTime}
                      name="pickTime"
                      type="time"
                      label="Pick Time"
                      onChange={(e) => handleCustomInputChange(e, stop)}
                      required={true}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} md={6} item>
                    <CustomInput
                      value={stop?.pickEndTime}
                      type="time"
                      name="pickEndTime"
                      label="Pick End Time"
                      onChange={(e) => handleCustomInputChange(e, stop)}
                      required={true}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} md={6} item>
                    <CustomInput
                      value={stop?.dropTime}
                      type="time"
                      name="dropTime"
                      label="Drop Time"
                      onChange={(e) => handleCustomInputChange(e, stop)}
                      required={true}
                    />
                  </Grid>

                  <Grid xs={12} sm={12} md={6} item>
                    <CustomInput
                      value={stop?.dropEndTime}
                      type="time"
                      name="dropEndTime"
                      label="Drop End Time"
                      onChange={(e) => handleCustomInputChange(e, stop)}
                      required={true}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} item>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => updateStop(stop._id)}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </FormBox>
            )
          )
        )}

        <Button variant="contained" size="small" onClick={addStop}>
          Add
        </Button>

        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>

      {/* Route and trip view ============= */}
      <RouteAndTripViewDialog
        title="Trasport Route Information"
        onClose={onClose}
        open={modalData.open}
        tableData={modalData.tableData}
        schoolName={modalData.schoolName}
      />
    </>
  );
}
