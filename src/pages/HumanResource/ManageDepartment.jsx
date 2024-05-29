/** @format */

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import { departmentTableKeys } from "../../data/tableKeys/departmentData";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import AddForm from "../../forms/AddForm";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function ManageDepartment() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.department.list);
      setData(data.result);

      // console.log(data.result, "result");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
      };
      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.department.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.department.create, payload);
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
      name: dataToEdit?.name ? dataToEdit?.name : "",
      orderSequence: dataToEdit?.orderSequence
        ? dataToEdit?.orderSequence
        : data.length + 1,
      note: dataToEdit?.note || "",
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
      const res = await del(PRIVATE_URLS.department.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Department" />
      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={departmentTableKeys}
        bodyDataModal="department"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />
      {/* ====== Fab button component =======*/}
      <AddForm title="Add Department" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add department ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Department"
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Add"}
        adding={loading}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="name"
              label="Department"
              required={true}
            />
          </Grid>
          {/* {dataToEdit && ( */}
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              type="number"
              formik={entryFormik}
              name="orderSequence"
              label="Order Sequence"
              required={true}
            />
          </Grid>
          {/* )} */}
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="note"
              label="Drop a note"
            />
          </Grid>
        </Grid>
      </FormModal>
      {/* =========================== */}
    </>
  );
}
