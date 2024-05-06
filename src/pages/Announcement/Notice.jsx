import React, { useEffect, useState } from "react";
import { noticeTableKeys } from "../../data/tableKeys/noticeData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import { Grid } from "@mui/material";

import FormDatePicker from "../../forms/FormDatePicker";
import { useFormik } from "formik";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function Notice() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);
      const roles = data.result.map((r) => ({
        label: r.name,
        value: r._id,
      }));

      const rolesAllOption = [{ label: "All", value: "all" }, ...roles];
      setRolesData(rolesAllOption);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddNotice = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      date: dataToEdit?.dayjs(dataToEdit.date),
      noticeFor: dataToEdit?.noticeFor || "",
      notice: dataToEdit?.notice || "",
      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Notice" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Notice"
        bodyData={data}
        tableKeys={noticeTableKeys}
      />
      <AddForm title="Add Notice" onAddClick={AddNotice} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Notice" : "Add Notice"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}
      >
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Title"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormDatePicker
              required={true}
              name="date"
              formik={entryFormik}
              label="Date"
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              name="noticeFor"
              formik={entryFormik}
              label="Notice For"
              options={rolesData}
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="notice"
              label="Notice"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              name="isPublic"
              formik={entryFormik}
              label="Is Public"
              options={Is_Public}
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
