import React, { useContext, useEffect, useState } from "react";
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
import { post, put, get, del } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function Notice() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.notice.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.notice.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.notice.create, payload);
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
      title: dataToEdit ? dataToEdit.title : "",
      date: dataToEdit?.date || null,
      noticeFor: dataToEdit ? dataToEdit.noticeFor : "",
      notice: dataToEdit ? dataToEdit.notice : "",
      isPublic: dataToEdit ? dataToEdit.isPublic : false,
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
      const res = await del(PRIVATE_URLS.notice.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Notice" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Notice"
        bodyData={data}
        tableKeys={noticeTableKeys}
        adding={loading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
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
              type="text"
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
              type="text"
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
