import React, { useState } from "react";
import { holidayTableKeys } from "../../data/tableKeys/holidayData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { awardAchievementTableKeys } from "../../data/tableKeys/awardAchievementsData";

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

export default function AwardsAndAchievements() {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddAwardsAchievement = () => {
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

      awardFor: dataToEdit?.awardFor || "",
      location: dataToEdit?.location || "",
      hostedBy: dataToEdit?.hostedBy || "",
      headlines: dataToEdit?.headlines || "",

      shortAward: dataToEdit?.shortAward || "",
      note: dataToEdit?.note || "",
      image: dataToEdit?.image || "",
      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <PageHeader title="Award and Achievements" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Award and Achievements"
        bodyData={data}
        tableKeys={awardAchievementTableKeys}
      />

      <AddForm
        title="Add Awards & Achievement"
        onAddClick={AddAwardsAchievement}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit
            ? "Update Awards $ Achievement"
            : "Add Awards $ Achievement"
        }
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
              name="date"
              formik={entryFormik}
              label="Date"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="awardFor" label="Award For" />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="hostedBy"
              label="Hosted By"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="headlines"
              label="Headlines"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="Short Award"
              label="shortAward"
              required={true}
            />
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
