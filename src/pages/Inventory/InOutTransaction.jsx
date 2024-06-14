/** @format */

import { Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { TransactionTableKeys } from "../../data/tableKeys/transactionData";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import PageHeader from "../../components/PageHeader";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { LoadingButton } from "@mui/lab";
import FileSelect from "../../forms/FileSelect";

const paymenyModes = [
  { label: "Cash", value: "Cash" },
  { label: "Upi", value: "Upi" },
  { label: "Netbanking", value: "Netbanking" },
  { label: "Cheque", value: "Cheque" },
  { label: "Card", value: "Card" },
  { label: "Others", value: "Others" },
  { label: "Null", value: "Null" },
];

const types = [
  { label: "In", value: "In" },
  { label: "Out", value: "Out" },
];

const purposes = [
  { label: "Inhouse", value: "Inhouse" },
  { label: "Damage", value: "Damage" },
  { label: "Purchase", value: "Purchase" },
  { label: "Sell", value: "Sell" },
  { label: "Return", value: "Return" },
  { label: "InventoryUpdate", value: "InventoryUpdate" },
];

const fromTypes = [
  { label: "Vendor", value: "Vendor" },
  { label: "School", value: "School" },
];

const status = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function InOutTransaction() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectInvoice, setSelectInvoice] = useState([]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vendor.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      console.log(data.result, "firm");
      // setData(
      //   data.result.map((data) => ({
      //     ...data,
      //     departmentName: data?.department?.name,
      //   }))
      // );
    } catch (error) {
      console.log(error);
    }
  };

  // get items
  const getItems = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.item.list);
      // console.log(data, "haha");
      setItems(
        data.result.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get employee
  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      console.log(data, "haha");
      setEmployees(
        data.result.map((emp) => ({
          label: emp?.basicInfo?.name,
          value: emp._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get section
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      item: "",
      pricePerItem: "",
      quantity: "",
      trasactionMode: "",
      type: "",
      purpose: "",
      fromType: "",
      status: "",
      vender: "",
      section: "",
      studentName: "",
      school: "",
      note: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getData();
    getItems();
    getEmployees();
    getSections();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.section) {
      getStudents();
    }
  }, [entryFormik.values.section, selectedSetting._id]);

  const handleClose = () => {
    setValue(0);
    getData();
    setDataToEdit(null);
  };

  const handleChangeFiles = (e, type) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      if (type === "photo") {
        setSelectInvoice(fileList);
      }
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setSelectInvoice(selectInvoice.filter((img) => img.name != fileName));
  };

  return (
    <>
      <PageHeader title="Transaction" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Transaction List", "Make Transaction", "Edit Transaction"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit"]}
          bodyDataModal="Transaction"
          bodyData={data}
          tableKeys={TransactionTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mb: 1, fontWeight: "bold" }}>
                Item Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="item"
                formik={entryFormik}
                label="Item"
                options={items}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="pricePerItem"
                formik={entryFormik}
                label="Price Per Item"
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="quantity"
                formik={entryFormik}
                label="Quantity"
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}>
                Transaction Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="trasactionMode"
                formik={entryFormik}
                label="Mode of Payment"
                options={paymenyModes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="type"
                formik={entryFormik}
                label="Type"
                options={types}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="purpose"
                formik={entryFormik}
                label="Purpose"
                options={purposes}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}>
                Transaction Between
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="fromType"
                formik={entryFormik}
                label="From Type"
                options={fromTypes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Transaction Status"
                options={status}
              />
            </Grid>
            {entryFormik.values.fromType === "Vendor" && (
              <>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="vender"
                    formik={entryFormik}
                    label="Venders"
                    // options={}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="section"
                    formik={entryFormik}
                    label="Section"
                    options={sections}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="studentName"
                    formik={entryFormik}
                    label="Student Name"
                    options={students}
                  />
                </Grid>
              </>
            )}

            {entryFormik.values.fromType === "School" && (
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="school"
                  formik={entryFormik}
                  label="School"
                  options={employees}
                />
              </Grid>
            )}

            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note"
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <FileSelect
                name="invoice"
                label="Select Invoice"
                onChange={(e) => handleChangeFiles(e, "invoice")}
                customOnChange={true}
                selectedFiles={selectInvoice}
                onRemove={(fileName) => handleRemoveFile(fileName)}
                accept="image/*,.pdf"
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
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
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", mb: 1, fontWeight: "bold" }}>
                Item Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="item"
                formik={entryFormik}
                label="Item"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="price"
                formik={entryFormik}
                label="Price per Item"
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormInput
                required={true}
                name="quantity"
                formik={entryFormik}
                label="Quantity"
              />
            </Grid>

            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}>
                Transaction Details
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="mode"
                formik={entryFormik}
                label="Mode of Payment"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="type"
                formik={entryFormik}
                label="Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="purpose"
                formik={entryFormik}
                label="Purpose"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="start"
                sx={{ fontSize: "15px", fontWeight: "bold" }}>
                Transaction Between
              </Typography>
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="fromType"
                formik={entryFormik}
                label="From Type"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Transaction Status"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="vender"
                formik={entryFormik}
                label="Venders"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="section"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="studentName"
                formik={entryFormik}
                label="Student Name"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="school"
                formik={entryFormik}
                label="School"
                // options={}
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note"
              />
            </Grid>
            <Grid xs={12} md={6} lg={12} item>
              <Button size="small" variant="outlined" sx={{ my: 2 }}>
                Upload Invoice
              </Button>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
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
