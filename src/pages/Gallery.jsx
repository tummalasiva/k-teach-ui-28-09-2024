import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import { galleryListTableKeys } from "../data/tableKeys/galleryListData";
import PageHeader from "../components/PageHeader";
import TabList from "../components/Tabs/Tablist";
import CustomTable from "../components/Tables/CustomTable";
import FormDatePicker from "../forms/FormDatePicker";
import FormSelect from "../forms/FormSelect";
import TabPanel from "../components/Tabs/TabPanel";
import FormInput from "../forms/FormInput";
import SettingContext from "../context/SettingsContext";
import { PRIVATE_URLS } from "../services/urlConstants";
import { get, post, put } from "../services/apiMethods";
import AddOrUpdateFiles from "../forms/AddOrUpdateFiles";
import FileSelect from "../forms/FileSelect";

export default function Gallery() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState([]);
  const [date, setDate] = useState(dataToEdit ? dayjs(dataToEdit.date) : null);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.gallery.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      // console.log(data, "gallery list");
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
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

  const handleRemoveFile = (fileName, index) => {
    // console.log(fileName, "gii");
    setSelectImg(selectImg.filter((img) => img.name != fileName));
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", values.date);
    formData.append("isPublic", values.isPublic ? true : false);
    formData.append("note", values.note);
    selectImg.forEach((file) => formData.append("file", file));
    formData.append("schoolId", selectedSetting._id);

    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.gallery.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(PRIVATE_URLS.gallery.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      note: dataToEdit?.note || "",
      isPublic: dataToEdit?.isPublic || false,
      date: dataToEdit?.date || null,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setSelectValue(0);
    setDataToEdit(null);
    setSelectImg([]);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEditClick = (data) => {
    // console.log(data, "fff");
    setDataToEdit(data);
    setSelectValue(1);
  };

  useEffect(() => {
    if (value === 0) {
      entryFormik.resetForm();
    }
  }, [value]);

  return (
    <>
      <PageHeader title="Gallery" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={[
          "Gallery List",
          `${dataToEdit && value != 0 ? "Edit Gallery" : "Add Gallery"}`,
        ]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="Gallery"
          bodyData={data}
          onEditClick={handleEditClick}
          tableKeys={galleryListTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}
          >
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="title"
                formik={entryFormik}
                label="Gallery Title"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker formik={entryFormik} label="Date" name="date" />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="isPublic"
                formik={entryFormik}
                label="Is Public Web"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FileSelect
                name={`images`}
                onChange={(e) => handleChangeFiles(e)}
                customOnChange={true}
                selectedFiles={selectImg}
                onRemove={(fileName) => handleRemoveFile(fileName)}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput name="note" formik={entryFormik} label="Note" />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button
                size="small"
                type="submit"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
