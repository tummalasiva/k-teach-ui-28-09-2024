import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { eventTableKeys } from "../data/tableKeys/eventData";

import { Grid } from "@mui/material";
import FormSelect from "../forms/FormSelect";
import FormInput from "../forms/FormInput";
import { useFormik } from "formik";
import AddForm from "../forms/AddForm";
import FormModal from "../forms/FormModal";
import FormDatePicker from "../forms/FormDatePicker";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const Event_Fors = [{ label: "All", value: "all" }];

export default function Event() {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddEvent = () => {
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
      eventFor: dataToEdit?.eventFor || "",
      location: dataToEdit?.location || "",

      shortEvent: dataToEdit?.shortEvent || "",
      hostedBy: dataToEdit?.hostedBy || "",
      note: dataToEdit?.note || "",
      image: dataToEdit?.image || "",
      video: dataToEdit?.video || "",
      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <PageHeader title="Events" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="events"
        bodyData={data}
        tableKeys={eventTableKeys}
      />

      <AddForm title="Add Event" onAddClick={AddEvent} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Event" : "Add Event"}
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

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="eventFor"
              label="Event For"
              required={true}
              options={Event_Fors}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="location"
              label="Location"
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

          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="hostedBy" label="Hosted By" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="video" label="Video " />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="image"
              label="Image"
              type="file"
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
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              formik={entryFormik}
              name="shortEvent"
              label="Short Event"
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
