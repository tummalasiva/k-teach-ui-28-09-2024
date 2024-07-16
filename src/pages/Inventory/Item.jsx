/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { itemTableKeys } from "../../data/tableKeys/itemData";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import { downloadFile } from "../../utils";

export default function Item() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [PdfLoading, setPdfLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.item.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(
        data.result.map((data) => ({
          ...data,
          departmentName: data?.department?.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartments = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.department.list);
      setDepartments(
        data.result.map((s) => ({
          label: s.name,
          value: s._id,
        }))
      );
      entryFormik.setFieldValue("department", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.item.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.item.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      department: dataToEdit?.department || "",
      brand: dataToEdit?.brand || "",
      itemId: dataToEdit?.itemId || "",
      description: dataToEdit?.description || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    getDepartments();
    getData();
  }, []);

  const handleClose = () => {
    setValue(0);
    getData();
    setDataToEdit(null);
  };

  const handleEditClick = (data) => {
    setDataToEdit({ ...data, department: data.department._id });
    setValue(1);
  };

  // pfd download
  const handlePdfDownload = async (e) => {
    setPdfLoading(true);

    try {
      const response = await get(PRIVATE_URLS.item.downloadPdf, {
        responseType: "blob",
        params: {
          schoolId: selectedSetting._id,
        },
      });
      const uri = URL.createObjectURL(response.data);
      window.open(uri, "_blank");
    } catch (error) {
      console.log(error);
    }
    setPdfLoading(false);
  };

  // excel download
  const handleExcelDownload = async (e) => {
    setExcelLoading(true);

    try {
      const getExcel = await get(PRIVATE_URLS.item.downloadExcel, {
        params: {
          schoolId: selectedSetting._id,
        },
        responseType: "blob",
      });

      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        getExcel.data,
        "Inventory_Items"
      );
    } catch (error) {
      console.error(error);
    }
    setExcelLoading(false);
  };

  useEffect(() => {
    if (value === 0) {
      entryFormik.resetForm();
      setDataToEdit(null);
    }
  }, [value]);

  return (
    <>
      <PageHeader title="Item" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={[
          "Item List",
          dataToEdit && value != 0 ? "Edit Item" : "Add Item",
        ]}
      />
      <TabPanel index={0} value={value}>
        <LoadingButton
          type="submit"
          size="small"
          variant="contained"
          sx={{ my: 2 }}
          loading={PdfLoading}
          onClick={handlePdfDownload}>
          PDF
        </LoadingButton>
        <LoadingButton
          type="submit"
          size="small"
          variant="contained"
          sx={{ ml: 2, my: 2 }}
          loading={excelLoading}
          onClick={handleExcelDownload}>
          Excel
        </LoadingButton>
        <CustomTable
          actions={["edit"]}
          bodyDataModal="Items"
          bodyData={data}
          tableKeys={itemTableKeys}
          onEditClick={handleEditClick}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Item name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="department"
                formik={entryFormik}
                label="Select Department"
                options={departments}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="brand"
                formik={entryFormik}
                label="Brand"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="itemId"
                formik={entryFormik}
                label="item Id"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={false}
                name="description"
                formik={entryFormik}
                label="Description"
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                variant="contained"
                loading={loading}
                sx={{ ml: 2 }}>
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Item name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="department"
                formik={entryFormik}
                label="Select Department"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="brand"
                formik={entryFormik}
                label="brand"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="id"
                formik={entryFormik}
                label="Item Id"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={false}
                name="note"
                formik={entryFormik}
                label="Description"
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item>
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
