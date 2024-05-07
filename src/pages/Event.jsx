import { useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { eventTableKeys } from "../data/tableKeys/eventData";
import AddForm from "../forms/AddForm";
import FormModal from "../forms/FormModal";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
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

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      eventFor: dataToEdit?.eventFor || "",
      location: dataToEdit?.location || "",
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
      image: dataToEdit?.image || "",
      isPublic: dataToEdit?.isPublic || "",
      video: dataToEdit?.video || "",
      shortEvent: dataToEdit?.shortEvent || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: console.log("hhh"),
    enableReinitialize: true,
  });

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  return (
    <>
      <PageHeader title="Events" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="events"
        bodyData={data}
        tableKeys={eventTableKeys}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Events" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit academicYear ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Events"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Event Title"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="eventFor"
              label="Select Event"
              required={true}
              // options={}
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
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="fromDate"
              label="From Date"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              required={true}
              formik={entryFormik}
              name="toDate"
              label="To Date"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="hostedBy" label="Hosted By" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              type="file"
              name="video"
              label="Select video"
              inputProps={{
                accept: "video/*",
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              required={true}
              formik={entryFormik}
              type="file"
              name="image"
              label="Select Image"
              inputProps={{
                accept: "image/*",
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="isPublic"
              label="Web View"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              required={true}
              formik={entryFormik}
              name="shortEvent"
              label="Short event"
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
