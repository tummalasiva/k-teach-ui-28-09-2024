/** @format */

import React, { useContext, useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { vehicleTableKeys } from "../../data/tableKeys/vehicleData";
import FormModal from "../../forms/FormModal";
import AddForm from "../../forms/AddForm";
import { Grid } from "@mui/material";
import SettingContext from "../../context/SettingsContext";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import { get, post, put, del } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import FormDatePicker from "../../forms/FormDatePicker";
import VehicleViewDialog from "./VehicleViewDialog";

export default function Vehicle() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    schoolName: "",
    action: () => {},
  });

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vehicle.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(
        data.result.map((v) => ({
          ...v,
          driverName: v?.driver?.basicInfo?.name,
          id: v._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const AddVehicle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    getData();
  };

  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: { schoolId: selectedSetting._id },
      });
      setEmployees(
        data.result
          ?.filter((e) =>
            e.role.name.toLowerCase().match(new RegExp(`Driver`, "i"))
          )
          .map((d) => ({ label: d.basicInfo.name, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
    getData();
  }, [selectedSetting]);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.vehicle.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.vehicle.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      number: dataToEdit?.number || "",
      model: dataToEdit?.model || "",
      driver: dataToEdit?.driver?._id || "",
      licenseNumber: dataToEdit?.licenseNumber || "",
      driverContactNumber: dataToEdit?.driverContactNumber || "",
      trackingId: dataToEdit?.trackingId || "",
      insuranceName: dataToEdit?.insuranceName || "",
      insuranceId: dataToEdit?.insuranceId || "",
      totalSeats: dataToEdit?.totalSeats || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    setOpen(true);
    setDataToEdit(data);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await del(PRIVATE_URLS.vehicle.delete + "/" + id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      tableData: data,
      schoolName: selectedSetting?.name,
    });
  };

  const onClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <PageHeader title="Vehicle" />

      <CustomTable
        actions={["view", "edit", "delete"]}
        tableKeys={vehicleTableKeys}
        bodyDataModal="vehicle"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
        onViewClick={handleClickOpenView}
      />

      {/* add icon vehicle ==== */}
      <AddForm title="Add Vehicle" onAddClick={AddVehicle} />

      {/* Add/Update vehicle ==== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Vehicle" : "Add Vehicle"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="number"
              label="Number"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="driver"
              label="Driver"
              options={employees}
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="model" label="Model" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="licenseNumber"
              label="License Number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="driverContactNumber"
              label="Driver Contact Number"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="trackingId"
              label="Tracking Id"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="insuranceName"
              label="Insurance Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="insuranceId"
              label="Insurance Id"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="totalSeats"
              label="Total Seats"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>

      {/* view vehicle ========== */}
      <VehicleViewDialog
        title="Vehicle Information"
        open={modalData?.open}
        tableData={modalData?.tableData}
        schoolName={modalData?.schoolName}
        onClose={onClose}
      />
    </>
  );
}
