/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelTableKeys } from "../../data/tableKeys/manageHostelData";
import AddForm from "../../forms/AddForm";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import FormModal from "../../forms/FormModal";
import { Grid } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import HostelViewDialog from "./HostelViewDialog";

const hostelType = [
  { label: "Boys", value: "Boys" },
  { label: "Girls", value: "Girls" },
  { label: "Combined", value: "Combined" },
];

export default function ManageHostel() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    action: () => {},
  });
  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.hostel.list);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getWarden = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      const employeeData = data.result.filter((e) => e.role.name === "WARDEN");
      setEmployees(
        employeeData.map((e) => ({
          ...e,
          label: e.basicInfo.name,
          value: e._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getWarden();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.hostel.update + "/" + dataToEdit._id,
          values
        );
      } else {
        const { data } = await post(PRIVATE_URLS.hostel.create, values);
      }
      setDataToEdit(null);
      handleClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      type: dataToEdit?.type || "",
      warden: dataToEdit?.warden?._id || "",
      address: dataToEdit?.address || "",
      contactNumber: dataToEdit?.contactNumber || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const handleEdit = (data) => {
    setOpen(true);
    setDataToEdit(data);
  };

  const deleteHostel = async (id) => {
    try {
      const { data } = await del(PRIVATE_URLS.hostel.delete + "/" + id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getData();
    setDataToEdit(null);
  };

  const handleClickOpenView = (data) => {
    console.log(data, "vvvvvb");
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
      <PageHeader title="Hostel" />

      <CustomTable
        actions={["edit", "delete", "view"]}
        tableKeys={manageHostelTableKeys}
        bodyDataModal="hostel"
        bodyData={data}
        onDeleteClick={deleteHostel}
        onEditClick={handleEdit}
        onViewClick={handleClickOpenView}
      />

      {/* feb model open ============== */}
      <AddForm title="Add Hostel" onAddClick={onAddClick} />

      {/* Add/update model ============== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Hostel" : "Add Hostel"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Hostel Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="contactNumber"
              label="Phone No."
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="type"
              label="Hostel Type"
              required={true}
              options={hostelType}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="warden"
              label="Select Warden"
              required={true}
              options={employees}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="address"
              label="Address"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>

      {/* Add/update model ============== */}
      <HostelViewDialog
        title="Hostel Information"
        open={modalData?.open}
        tableData={modalData?.tableData}
        schoolName={modalData?.schoolName}
        onClose={onClose}
      />
    </>
  );
}
