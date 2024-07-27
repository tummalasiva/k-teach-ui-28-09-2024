/** @format */

import React, { useContext, useEffect, useState } from "react";
import { vehicleFirmTableKeys } from "../../data/tableKeys/vehcleFirmData";
import CustomTable from "../Tables/CustomTable";
import { Button, Grid } from "@mui/material";
import FormInput from "../../forms/FormInput";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import FormModal from "../../forms/FormModal";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import { Add } from "@mui/icons-material";
import AddForm from "../../forms/AddForm";

export default function Firm() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.firm.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

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
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.firm.create, payload);
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

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.firm.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* ==== Add icon ============= */}
      <AddForm
        title="Add Firm"
        module="Vehicle Maintenance"
        onAddClick={handleClickOpen}
      />

      {/* == Table === */}
      <CustomTable
        actions={["edit", "delete"]}
        module="Vehicle Maintenance"
        bodyDataModal="firm"
        tableKeys={vehicleFirmTableKeys}
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/*==== Add/Update Firm ==== */}
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
            <FormInput formik={entryFormik} name="zipCode" label="Zip Code" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
