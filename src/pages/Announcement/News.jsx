import React, { useState } from "react";
import { newsTableKeys } from "../../data/tableKeys/newsData";
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

export default function News() {
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddNews = () => {
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
      image: dataToEdit?.image || "",
      news: dataToEdit?.news || "",
      shortNews: dataToEdit?.shortNews || "",
      isPublic: dataToEdit?.isPublic || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <PageHeader title="News" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="News"
        bodyData={data}
        tableKeys={newsTableKeys}
      />

      <AddForm title="Add News" onAddClick={AddNews} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update News" : "Add News"}
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
              name="isPublic"
              formik={entryFormik}
              label="Is Public"
              options={Is_Public}
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="image"
              type="file"
              label="Image"
            />
          </Grid>

          <Grid xs={12} md={12} lg={12} item>
            <FormInput
              name="shortNews"
              formik={entryFormik}
              label="Short News"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              formik={entryFormik}
              name="news"
              label="News"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
