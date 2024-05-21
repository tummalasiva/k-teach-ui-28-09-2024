/** @format */

import React, { useContext, useState } from "react";

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
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const AddRouteTrips = () => {
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
      vehicle: dataToEdit?.vehicle || "",
      routeStart: dataToEdit?.routeStart || "",
      routeEnd: dataToEdit?.routeEnd || "",
      pickStart: dataToEdit?.pickStart || "",
      pickEnd: dataToEdit?.pickEnd || "",
      dropStart: dataToEdit?.dropStart || "",
      dropEnd: dataToEdit?.dropEnd || "",
      stops: dataToEdit?.stops || [],
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  const addStop = () => {
    const initialStopData = [...entryFormik.values.stops];
    const newStopData = {
      _id: initialStopData.length + 1,

      name: "",
      stopKM: "",
      pickTime: "",
      pickEndTime: "",
      dropTime: "",
      dropEndTime: "",
    };
    entryFormik.setFieldValue("stops", [...initialStopData, newStopData]);
  };

  return (
    <>
      <PageHeader title="Manage Route & Trips" />

      <AddForm title="Add Route & Trips" onAddClick={AddRouteTrips} />

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
              label="Pick Start"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="pickEnd"
              label="Pick End"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="dropStart"
              label="Drop Start"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              type="time"
              name="dropEnd"
              label="Drop End"
            />
          </Grid>
        </Grid>
        {entryFormik.values.stops.map((stop, index) => (
          <FormBox key={index}>
            <IconButton
              color="error"
              sx={{ position: "absolute", right: 0, top: 0 }}>
              <CloseIcon />
            </IconButton>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  name="name"
                  label="Name"
                  required={true}
                />
              </Grid>

              <Grid xs={12} sm={12} md={6} item>
                <FormInput formik={entryFormik} name="stopKM" label="Stop KM" />
              </Grid>

              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  type="time"
                  name="pickTime"
                  label="Pick Time"
                />
              </Grid>

              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  type="time"
                  name="pickEndTime"
                  label="Pick End Time"
                />
              </Grid>

              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  type="time"
                  name="dropTime"
                  label="Drop Time"
                />
              </Grid>

              <Grid xs={12} sm={12} md={6} item>
                <FormInput
                  formik={entryFormik}
                  type="time"
                  name="dropEndTime"
                  label="Drop End Time"
                />
              </Grid>
            </Grid>
          </FormBox>
        ))}

        <Button variant="contained" size="small" onClick={addStop}>
          Add
        </Button>

        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
      <CustomTable
        actions={["edit"]}
        tableKeys={manageRouteTableKeys}
        bodyDataModal="route"
        bodyData={data}
      />
    </>
  );
}
