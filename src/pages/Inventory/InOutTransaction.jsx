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
import { get, post, put } from "../../services/apiMethods";
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

const toTypes = [
  { label: "School", value: "School" },
  { label: "Vendor", value: "Vendor" },
  { label: "Student", value: "Student" },
  { label: "Employee", value: "Employee" },
];

export default function InOutTransaction() {
  const { settings, selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectInvoice, setSelectInvoice] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectSchool, setSelectSchool] = useState(
    settings.map((s) => ({ label: s.name, value: s._id }))
  );
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

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("class", data.result[0]._id);
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
          search: {
            class: entryFormik.values.class,
          },
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
      entryFormik.setFieldValue("studentName", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get vendors
  const getVendors = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.vendor.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      // console.log(data, "vendors");
      setVendors(
        data.result.map((d) => ({
          label: d.addedBy?.basicInfo?.name,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("vendor", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get roles
  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);
      setRoles(
        data.result.map((r) => ({
          label: r.name,
          value: r._id,
        }))
      );
      entryFormik.setFieldValue("role", data.result[0]._id);
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
          search: {
            role: entryFormik.values.role,
          },
        },
      });
      setEmployees(
        data.result.map((emp) => ({
          label: emp?.basicInfo?.name,
          value: emp._id,
        }))
      );
      entryFormik.setFieldValue("employee", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Add/Update action
  const handleCreateOrUpdate = async (values) => {
    console.log(values, "values");
    try {
      const payload = {
        ...values,
        from: values.fromType === "vendor" ? values.vendor : values.school,
        // toType: values.toType==="vendor" ? values.
        schoolId: selectedSetting._id,
      };
      setLoading(true);

      const formData = new FormData();
      formData.append("body", JSON.stringify(payload));
      selectInvoice.forEach((file) => formData.append("invoice", file));

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.vendor.update + "/" + dataToEdit._id,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        const { data } = await post(PRIVATE_URLS.vendor.create, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      item: dataToEdit?.item || "",
      pricePerItem: dataToEdit?.pricePerItem || "",
      quantity: dataToEdit?.quantity || "",
      trasactionMode: dataToEdit?.trasactionMode || "",
      type: dataToEdit?.type || "",
      purpose: dataToEdit?.purpose || "",
      fromType: dataToEdit?.fromType || "",
      status: dataToEdit?.status || "",
      toType: dataToEdit?.toType || "",
      vendor: dataToEdit?.vendor || "",
      section: dataToEdit?.section || "",
      class: dataToEdit?.class || "",
      employee: dataToEdit?.employee || "",
      role: dataToEdit?.role || "",
      studentName: dataToEdit?.studentName || "",
      school: dataToEdit?.school || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    getData();
    getItems();
    getVendors();
    getClasses();
    getRoles();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    if (entryFormik.values.section) {
      getStudents();
    }
  }, [entryFormik.values.section, selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.role) {
      getEmployees();
    }
  }, [entryFormik.values.role]);

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
      if (type === "invoice") {
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
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}>
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
                name="toType"
                formik={entryFormik}
                label="To Type"
                options={toTypes}
              />
            </Grid>
            {/* <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="status"
                formik={entryFormik}
                label="Transaction Status"
                options={status}
              />
            </Grid> */}
            {(entryFormik.values.fromType === "Vendor" ||
              entryFormik.values.toType === "Vendor") && (
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="vendor"
                  formik={entryFormik}
                  label="Vendors"
                  options={vendors}
                />
              </Grid>
            )}
            {entryFormik.values.toType === "Student" && (
              <>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="class"
                    formik={entryFormik}
                    label="Select Class"
                    options={classes}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="section"
                    formik={entryFormik}
                    label="Select Section"
                    options={sections}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="studentName"
                    formik={entryFormik}
                    label="Select Student Name"
                    options={students}
                  />
                </Grid>
              </>
            )}

            {(entryFormik.values.fromType === "School" ||
              entryFormik.values.toType === "School") && (
              <Grid xs={12} md={6} lg={4} item>
                <FormSelect
                  required={true}
                  name="school"
                  formik={entryFormik}
                  label="Select School"
                  options={selectSchool}
                />
              </Grid>
            )}
            {entryFormik.values.toType === "Employee" && (
              <>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="role"
                    formik={entryFormik}
                    label="Select Role"
                    options={roles}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <FormSelect
                    required={true}
                    name="employee"
                    formik={entryFormik}
                    label="Select Employees"
                    options={employees}
                  />
                </Grid>
              </>
            )}

            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Note"
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
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
