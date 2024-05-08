import React, { useContext, useState } from "react";
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
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put, del } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";

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

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  const AddAwardsAchievement = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", values.date);
    formData.append("awardFor", values.awardFor);
    formData.append("location", values.location);
    formData.append("hostedBy", values.hostedBy);
    formData.append("headlines", values.headlines);
    formData.append("note", values.note);
    formData.append("awardFor", values.awardFor);
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
      } else {
        const { data } = await post(PRIVATE_URLS.awards.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
      date: dataToEdit?.dayjs(dataToEdit.date),

      awardFor: dataToEdit?.awardFor || "",
      location: dataToEdit?.location || "",
      hostedBy: dataToEdit?.hostedBy || "",
      headlines: dataToEdit?.headlines || "",

      note: dataToEdit?.note || "",
      image: dataToEdit?.image || "",
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
  return (
    <>
      <PageHeader title="Award And Achievements" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Award and Achievements"
        bodyData={data}
        tableKeys={awardAchievementTableKeys}
        adding={loading}
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
            <FileSelect
              multi={false}
              name="image"
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
        </Grid>
      </FormModal>
    </>
  );
}
