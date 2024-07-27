/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper, Stack } from "@mui/material";
import { periodicalTableKeys } from "../../data/tableKeys/periodicalData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import FileSelect from "../../forms/FileSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";
import CheckPermission from "../../components/Authentication/CheckPermission";

export default function Periodical() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [selectImg, setSelectImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.periodical.list);
      console.log(data, "perr");
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("type", values.type);
    formData.append("department", values.department);
    formData.append("issueNumber", values.issueNumber);
    formData.append("volumeNumber", values.volumeNumber);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("entryDate", dayjs(values.entryDate).format("YYYY-MM-DD"));
    selectImg.forEach((file) => formData.append("bookCover", file));
    formData.append("schoolId", selectedSetting._id);

    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.periodical.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(PRIVATE_URLS.periodical.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    getData();
  };

  // open add model
  const AddFormHandel = () => {
    setOpen(true);
  };

  const handleChangeFiles = (e) => {
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

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      type: dataToEdit?.type || "",
      department: dataToEdit?.department || "",
      issueNumber: dataToEdit?.issueNumber || "",
      volumeNumber: dataToEdit?.volumeNumber || "",
      quantity: dataToEdit?.quantity || "",
      price: dataToEdit?.price || "",
      entryDate: dataToEdit?.entryDate || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    // console.log(data, "fff");
    setOpen(true);
    getData();
    setDataToEdit(data);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.periodical.delete + "/" + id);
      getData();
      entryFormik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetDownloadSheet = () => {
    console.log("ggg");
  };

  // const handleGetDownloadSheet = async (e) => {
  //   setDownloadLoader(true);
  //   e.preventDefault();
  //   try {
  //     // const response = await get(
  //     //   `/${selectedSetting._id}/periodical/downloadexcel`,
  //     //   {
  //     //     responseType: "blob",
  //     //   }
  //     // );

  //     const downloadUrl = URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.setAttribute("download", `periodical-stock.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setDownloadLoader(false);
  // };

  return (
    <>
      <PageHeader title="Periodical List" />
      <Paper sx={{ padding: 2, mb: 1 }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          <CheckPermission module="Periodical" permission="view">
            <Button
              size="small"
              variant="contained"
              onClick={handleGetDownloadSheet}>
              Download
            </Button>
          </CheckPermission>
          <CheckPermission module="Periodical" permission="view">
            <Button size="small" variant="contained">
              Count By title
            </Button>
          </CheckPermission>
          <CheckPermission module="Periodical" permission="add">
            <Button size="small" variant="contained">
              Bulk Upload
            </Button>
          </CheckPermission>
        </Stack>
      </Paper>
      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={periodicalTableKeys}
        bodyDataModal="periodical list"
        module="Periodical"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />
      {/* ====== Fab button component =======*/}
      <AddForm
        title="Add Periodical List"
        module="Periodical"
        onAddClick={AddFormHandel}
      />

      {/* ==== Add/Update Periodical List ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Periodical List"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Periodical Title"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              required={true}
              formik={entryFormik}
              name="type"
              label="Select Type"
              options={[
                { label: "Journal", value: "journal" },
                { label: "Magazine", value: "magazine" },
                { label: "Newspaper", value: "newspaper" },
              ]}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="department"
              label="Department"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="issueNumber"
              label="Issue Number"
              type="number"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="volumeNumber"
              label="Volume Number"
              type="number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              required={true}
              formik={entryFormik}
              name="quantity"
              label="Quantity"
              type="number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="price"
              label="price"
              type="number"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              required={true}
              formik={entryFormik}
              name="entryDate"
              label="Select Entry Date"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FileSelect
              name={`bookCover`}
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectImg}
              previousFile={dataToEdit?.bookCover}
              label="Select Book Cover"
              // onRemove={(fileName) => handleRemoveFile(fileName)}
              accept="image/*"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
