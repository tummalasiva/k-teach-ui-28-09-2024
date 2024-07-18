/** @format */

import React, { useContext, useState } from "react";
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
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { useEffect } from "react";
import FileSelect from "../../forms/FileSelect";
import dayjs from "dayjs";

const Is_Public = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function News() {
  const { selectedSetting } = useContext(SettingContext);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.news.list, {
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
  const AddNews = () => {
    setOpen(true);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("schoolId", selectedSetting._id);
      formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
      formData.append("news", values.news);
      formData.append("shortNews", values.shortNews);
      formData.append("isPublic", values.isPublic);
      selectImg.forEach((file) => formData.append("file", file));

      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.news.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.news.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

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

      date: dataToEdit?.date || null,

      date: dataToEdit?.date
        ? dayjs(dataToEdit.date).format("YYYY/MM/DD")
        : null,
      news: dataToEdit?.news || "",
      shortNews: dataToEdit?.shortNews || "",
      isPublic: dataToEdit?.isPublic || false,
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
      const res = await del(PRIVATE_URLS.news.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFile = (fileName, index) => {
    console.log(fileName, "gii");
    setSelectImg(selectImg.filter((img) => img.name != fileName));
  };

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
  return (
    <>
      <PageHeader title="News" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="News"
        bodyData={data}
        tableKeys={newsTableKeys}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      <AddForm title="Add News" onAddClick={AddNews} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update News" : "Add News"}
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
              label="View On Web"
              options={Is_Public}
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FileSelect
              multi={false}
              name="image"
              label="Select Image"
              onChange={(e) => handleChangeFiles(e)}
              previousFile={dataToEdit?.image}
              customOnChange={true}
              selectedFiles={selectImg}
              onRemove={(fileName) => handleRemoveFile(fileName)}
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
