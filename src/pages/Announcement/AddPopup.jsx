import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { popupSplashNewsTableKeys } from "../../data/tableKeys/popupSplashNewsData";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import SettingContext from "../../context/SettingsContext";
import FileSelect from "../../forms/FileSelect";

const Content_Type_Options = [
  { label: "Link", value: "Link" },
  { label: "Text", value: "Text" },
  { label: "Image", value: "Image" },
  { label: "Document", value: "Document" },
];

export default function AddPopup() {
  const { selectedSetting } = useContext(SettingContext);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectImg, setSelectImg] = useState([]);
  const [selectDocument, setSelectdocument] = useState([]);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.splashNews.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      const popupvalues = data.result.filter(
        (newitem) => newitem.type === "Popup"
      );

      setData(popupvalues);

      console.log(data.result, "result");
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
  const AddHorizontalSplashNews = () => {
    setOpen(true);
  };
  const handleCreateOrUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("link", values.link);
      formData.append("text", values.text);
      formData.append("type", "Popup");
      formData.append("contentType", values.contentType);
      formData.append("schoolId", selectedSetting._id);
      selectImg.forEach((file) => formData.append("image", file));
      selectDocument.forEach((file) => formData.append("document", file));

      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.splashNews.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.splashNews.create, formData, {
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
      contentType: dataToEdit?.contentType || "",
      text: dataToEdit?.text || "",
      link: dataToEdit?.link || "",
      document: dataToEdit?.document || "",
      image: dataToEdit?.image || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    console.log(data);
    setDataToEdit(data);
    setOpen(true);
  };

  const handleDelete = async (data) => {
    try {
      const res = await del(PRIVATE_URLS.splashNews.delete + "/" + data._id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (data) => {
    try {
      const res = await put(PRIVATE_URLS.splashNews.toggle + "/" + data._id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setSelectImg(selectImg.filter((img) => img.name != fileName));
    setSelectdocument(selectDocument.filter((doc) => doc.name != fileName));
  };

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    let documentList = [];

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
        documentList.push(file);
      }
      setSelectImg(fileList);
      setSelectdocument(documentList);
    } else {
      console.log("No files selected");
    }
  };
  return (
    <>
      <CustomTable
        actions={["edit", "delete", "switch"]}
        bodyDataModal="Popup Splash News"
        bodyData={data}
        tableKeys={popupSplashNewsTableKeys}
        adding={loading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
        onToggleSwitch={handleToggle}
        toggleStatus="enabled"
      />
      <AddForm
        title="Add Vertical Splash News"
        onAddClick={AddHorizontalSplashNews}
      />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit
            ? "Update Vertical Splash News"
            : "Add Vertical Splash News"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}
      >
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="title" label="Title" />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="contentType"
              label="Content Type"
              required={true}
              options={Content_Type_Options}
            />
          </Grid>
          {entryFormik.values.contentType === "Link" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="link"
                label="Link"
                required={true}
              />
            </Grid>
          )}

          {entryFormik.values.contentType === "Text" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormInput
                formik={entryFormik}
                name="text"
                label="Text"
                required={true}
              />
            </Grid>
          )}

          {entryFormik.values.contentType === "Image" && (
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
          )}

          {entryFormik.values.contentType === "Document" && (
            <Grid xs={12} sm={6} md={6} item>
              <FileSelect
                multi={false}
                name="document"
                onChange={(e) => handleChangeFiles(e)}
                customOnChange={true}
                selectedFiles={selectDocument}
                onRemove={(fileName) => handleRemoveFile(fileName)}
              />
            </Grid>
          )}
        </Grid>
      </FormModal>
    </>
  );
}
