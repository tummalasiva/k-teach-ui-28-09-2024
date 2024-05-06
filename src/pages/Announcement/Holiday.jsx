import React, { useState } from "react";
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

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function Holiday() {
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      };
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      fromDate: dataToEdit?.dayjs(dataToEdit.fromDate),
      toDate: dataToEdit?.dayjs(dataToEdit.toDate),
      note: dataToEdit?.note || "",
      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <PageHeader title="Holiday" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Holiday"
        bodyData={data}
        tableKeys={holidayTableKeys}
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
