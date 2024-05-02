import React, { useEffect, useState } from "react";
import { designationTableKeys } from "../../data/tableKeys/designation";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormInput from "../../forms/FormInput";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";

export default function ManageDesignation() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.designation.list);
      setData(data.result);
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

  const AddDesigationHandel = () => {
    setOpen(true);
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.designation.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.designation.create, payload);
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
      orderSequence: dataToEdit?.orderSequence || data.length + 1,
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

  return (
    <>
      <PageHeader title="Designation" />
      <CustomTable
        actions={["edit"]}
        tableKeys={designationTableKeys}
        bodyDataModal="designation"
        bodyData={data}
        onEditClick={handleEditClick}
      />
      {/* ====== Add form fab button =======*/}
      <AddForm title="Add Desigation" onAddClick={AddDesigationHandel} />
      {/* ================================== */}

      {/* ==== add department ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Desigation"
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Add"}
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="name"
              label="Desigation"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              disabled={dataToEdit ? false : true}
              type="number"
              formik={entryFormik}
              name="orderSequence"
              label="Order Sequence"
              required={true}
            />
          </Grid>
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
    </>
  );
}
