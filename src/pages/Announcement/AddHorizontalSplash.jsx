/** @format */

import React, { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { useState } from "react";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import CustomTable from "../../components/Tables/CustomTable";
import { horizontalSplashNewsTableKeys } from "../../data/tableKeys/horizontalSplashNewsData";

export default function AddHorizontalSplash() {
  const { selectedSetting } = useContext(SettingContext);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.splashNews.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      const horizontalvalues = data.result.filter(
        (newitem) => newitem.type !== "Popup"
      );
      setData(horizontalvalues);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [selectedSetting]);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddHorizontalSplashNews = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      getData();

      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.splashNews.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.splashNews.create, payload);
        resetForm();
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
      title: dataToEdit?.title || "",
      text: dataToEdit?.text || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    console.log(data);
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.splashNews.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (data) => {
    try {
      const res = await put(PRIVATE_URLS.splashNews.toggle + "/" + data._id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <CustomTable
        actions={["edit", "delete", "switch"]}
        module="Splash News"
        bodyDataModal="Horizontal Splash News"
        bodyData={data}
        tableKeys={horizontalSplashNewsTableKeys}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
        onToggleSwitch={handleToggle}
        toggleStatus="enabled"
      />

      <AddForm
        title="Add Horizontal Splash News"
        module="Splash News"
        onAddClick={AddHorizontalSplashNews}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit
            ? "Update Horizontal Splash News"
            : "Add Horizontal Splash News"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="title" label="Title" />
          </Grid>

          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="text" label="Text" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
