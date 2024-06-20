/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelRoomTableKeys } from "../../data/tableKeys/manageHostelRoom";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import AddForm from "../../forms/AddForm";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import SettingContext from "../../context/SettingsContext";

export default function ManageRoomType() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getRoomTypes = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.roomType.list);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomTypes();
  }, [selectedSetting]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.roomType.update + "/" + dataToEdit._id,
          values
        );

        // setDataToEdit(null);
      } else {
        const { data } = await post(PRIVATE_URLS.roomType.create, values);
      }
      setLoading(false);
      getRoomTypes();
      handleClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      specification: dataToEdit?.specification || "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const deleteRoomType = async (id) => {
    try {
      const { data } = await del(PRIVATE_URLS.roomType.delete + "/" + id);
      getRoomTypes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    console.log(data, "iiii");
    setOpen(true);
    setDataToEdit(data);
  };

  const onAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  return (
    <>
      <PageHeader title="Hostel Room Type" />

      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={manageHostelRoomTableKeys}
        bodyDataModal="room"
        bodyData={data}
        onDeleteClick={deleteRoomType}
        onEditClick={handleEdit}
      />

      {/* feb model open ============== */}
      <AddForm title="Add Room Type" onAddClick={onAddClick} />

      {/* Add/update model ============== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Room Type" : "Add Room Type"}
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
              name="specification"
              label="Specification"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
