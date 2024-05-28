/** @format */

import React, { useContext, useEffect, useState } from "react";
import { libraryBookTableKeys } from "../../data/tableKeys/libraryBooksData";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import { Button, Grid, Paper, Stack } from "@mui/material";
import FormInput from "../../forms/FormInput";

import FormModal from "../../forms/FormModal";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import AddForm from "../../forms/AddForm";
import FileSelect from "../../forms/FileSelect";
import BookViewModal from "./BookViewModal";

export default function Books() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState([]);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    schoolName: "",
    action: () => {},
  });

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.book.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);

      console.log(data.result, "llllllllll");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  const AddBooks = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();
    formData.append("schoolId", selectedSetting._id);
    formData.append("title", values.title);
    formData.append("id", values.id);
    formData.append("department", values.department);
    formData.append("cellNumber", values.cellNumber);
    formData.append("isbnNo", values.isbnNo);
    formData.append("edison", values.edison);
    formData.append("author", values.author);
    formData.append("language", values.language);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("almiraNo", values.almiraNo);
    selectImg.forEach((file) => formData.append("bookCover", file));

    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.book.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.book.create, formData, {
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
      id: dataToEdit?.id || "",
      department: dataToEdit?.department || "",
      cellNumber: dataToEdit?.cellNumber || "",
      isbnNo: dataToEdit?.isbnNo || "",
      edison: dataToEdit?.edison || "",
      author: dataToEdit?.author || "",
      language: dataToEdit?.language || "",
      price: dataToEdit?.price || "",
      quantity: dataToEdit?.quantity || "",
      almiraNo: dataToEdit?.almiraNo || "",
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
    setSelectImg(selectImg.filter((img) => img.name != fileName));
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.book.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      tableData: data,
      schoolName: selectedSetting?.name,
    });
  };

  const onClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <PageHeader title="Student Library" />

      <Paper sx={{ padding: 2, mb: 1 }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          <Button size="small" variant="contained">
            Download
          </Button>

          <Button size="small" variant="contained">
            Count By title
          </Button>

          <Button size="small" variant="contained">
            Stock Verification
          </Button>

          <Button size="small" variant="contained">
            Bulk Upload
          </Button>
        </Stack>
      </Paper>

      <CustomTable
        actions={["edit", "delete", "view"]}
        tableKeys={libraryBookTableKeys}
        bodyDataModal="book"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
        onViewClick={handleClickOpenView}
      />

      <AddForm title="Add Books" onAddClick={AddBooks} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Books" : "Add Books"}
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
              name="id"
              label="Book Id"
              required={true}
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
          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              name="cellNumber"
              label="Cell Number"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="isbnNo" label="ISBN No" />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput formik={entryFormik} name="edison" label="Edison" />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="author" label="Author" />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput formik={entryFormik} name="language" label="Language" />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="price" label="Price" />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput
              formik={entryFormik}
              name="quantity"
              required={true}
              label="Quantity"
            />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FormInput formik={entryFormik} name="almiraNo" label="Almira No" />
          </Grid>

          <Grid xs={12} sm={12} md={6} item>
            <FileSelect
              name="bookCover"
              label="Select Book"
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectImg}
              onRemove={(fileName) => handleRemoveFile(fileName)}
            />
          </Grid>
        </Grid>
      </FormModal>

      <BookViewModal
        title="Book Information"
        open={modalData?.open}
        tableData={modalData?.tableData}
        schoolName={modalData?.schoolName}
        onClose={onClose}
      />
    </>
  );
}
