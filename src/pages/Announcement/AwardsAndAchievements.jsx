/** @format */

import React, { useContext, useEffect, useState } from "react";
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
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put, del } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";
import dayjs from "dayjs";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function AwardsAndAchievements() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.awards.list, {
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
  }, [selectedSetting]);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddAwardsAchievement = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
    formData.append("location", values.location);
    formData.append("hostedBy", values.hostedBy);
    formData.append("headlines", values.headlines);
    formData.append("note", values.note);
    formData.append("isPublic", values.isPublic);
    selectImg.forEach((file) => formData.append("file", file));
    formData.append("schoolId", selectedSetting._id);
    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.awards.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.awards.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        resetForm();
        getData();
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      date: dataToEdit?.date
        ? dayjs(dataToEdit.date).format("YYYY/MM/DD")
        : null,

      location: dataToEdit?.location || "",
      hostedBy: dataToEdit?.hostedBy || "",
      headlines: dataToEdit?.headlines || "",

      note: dataToEdit?.note || "",

      isPublic: dataToEdit?.isPublic || false,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setSelectImg(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    console.log(fileName, "gii");
    setSelectImg(selectImg.filter((img) => img.name != fileName));
  };

  const handleEditClick = (data) => {
    console.log(data);
    setDataToEdit(data);

    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.awards.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(dataToEdit, "dataToEdittttt");
  return (
    <>
      <PageHeader title="Award And Achievements" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Award and Achievements"
        bodyData={data}
        tableKeys={awardAchievementTableKeys}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
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
            ? "Update Awards & Achievement"
            : "Add Awards & Achievement"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
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
            <FileSelect
              multi={false}
              name="image"
              label="Select Image"
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectImg}
              onRemove={(fileName) => handleRemoveFile(fileName)}
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

          <Grid
            xs={12}
            sm={12}
            md={12}
            item
            display="flex"
            justifyContent="center">
            {dataToEdit && dataToEdit.image && (
              <>
                <img
                  src={dataToEdit.image}
                  alt="image"
                  style={{ maxWidth: "100px", marginTop: "10px" }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
