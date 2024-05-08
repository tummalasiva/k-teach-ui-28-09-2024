import React, { useContext, useEffect, useState } from "react";
import { holidayTableKeys } from "../../data/tableKeys/holidayData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormDatePicker from "../../forms/FormDatePicker";
import { post, put, get, del } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function Holiday() {
  const { selectedSetting } = useContext(SettingContext);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.holiday.list, {
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

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddHoliday = () => {
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
          PRIVATE_URLS.holiday.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.holiday.create, payload);
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
      fromDate: dataToEdit?.fromDate || null,
      toDate: dataToEdit?.toDate || null,
      note: dataToEdit?.note || "",
      isPublic: dataToEdit?.isPublic || "",
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
      const res = await del(PRIVATE_URLS.holiday.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <PageHeader title="Holiday" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Holiday"
        bodyData={data}
        tableKeys={holidayTableKeys}
        adding={loading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      <AddForm title="Add Holiday" onAddClick={AddHoliday} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Holiday" : "Add Holiday"}
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
              name="fromDate"
              formik={entryFormik}
              label="From Date"
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FormDatePicker
              required={true}
              name="toDate"
              formik={entryFormik}
              label="To Date"
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
          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
