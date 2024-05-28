/** @format */

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { studentLibraryDueTableKeys } from "../../data/tableKeys/studentLibraryDueData";
import { studentLibraryHistoryTableKeys } from "../../data/tableKeys/studentLibraryHistoryData";
import { studentLibraryIssueTableKeys } from "../../data/tableKeys/studentlibraryIssueData";
import { Button, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Add } from "@mui/icons-material";
import FormDatePicker from "../../forms/FormDatePicker";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import FormSelect from "../../forms/FormSelect";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import SettingContext from "../../context/SettingsContext";

const BookDetailed = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
}));

const Submitted_Option = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const Issued_To_Type_Option = [
  { label: "Student", value: "student" },
  { label: "Employee", value: "employee" },
];

export default function StudentIssueReturn() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [book, setBook] = useState([]);

  const getBooks = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.book.list, {
        params: { schoolId: selectedSetting._id },
      });
      setBook(data.result.map((s) => ({ ...s, label: s.title, value: s._id })));

      console.log(data.result, "llllllllll");
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
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

  const getEmployee = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setEmployee(
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
  useEffect(() => {
    getBooks();
    getStudents();
    getEmployee();
  }, [selectedSetting]);

  const formik = useFormik({
    initialValues: {
      fromDate: null,
      toDate: null,
    },
    onSubmit: console.log("nnnn"),
  });

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };

      console.log(payload, "000000000000000");
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.bookIssue.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.bookIssue.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      issueDate: dataToEdit?.issueDate || null,
      book: dataToEdit?.book || "",
      quantity: dataToEdit?.quantity || 0,
      dueDate: dataToEdit?.dueDate || null,
      issuedToType: dataToEdit?.issuedToType || "",
      issuedTo: dataToEdit?.issuedTo || "",
      submitted: dataToEdit?.submitted || "",
      submissionDate: dataToEdit?.submissionDate || null,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };
  return (
    <>
      <PageHeader title="Student Issue & Return" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Issue List", "Due List", "History List"]}
      />

      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
        sx={{ mt: 1, mb: 2 }}>
        Add Issue
      </Button>
      <TabPanel index={0} value={value}>
        <BookDetailed sx={{ padding: 1 }}>
          <Typography variant="h6" fontWeight="bold" fontSize={16}>
            Total Books: 1
          </Typography>
          <Typography variant="h6" fontWeight="bold" fontSize={16}>
            Issued: 1
          </Typography>
          <Typography variant="h6" fontSize={16} fontWeight="bold">
            Due: 1
          </Typography>
        </BookDetailed>
        <CustomTable
          actions={[]}
          tableKeys={studentLibraryIssueTableKeys}
          bodyData={data}
          bodyDataModal="student"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={[]}
          tableKeys={studentLibraryDueTableKeys}
          bodyData={data}
          bodyDataModal="student"
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker
                formik={formik}
                label="From Date"
                name="fromDate"
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormDatePicker formik={formik} label="To Date" name="toDate" />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={3}
              sx={{ alignSelf: "center", mt: 1 }}
              item>
              <Button size="small" variant="contained">
                Find
              </Button>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
                <Button size="small" variant="contained">
                  Download
                </Button>
                <Button size="small" variant="contained">
                  Print
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <CustomTable actions={[]} tableKeys={studentLibraryHistoryTableKeys} />
      </TabPanel>

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Issue" : "Add Issue"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="book"
              label="Book"
              required={true}
              options={book}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="issueDate"
              label="Issue Date"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="quantity"
              label="Quantity"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="dueDate"
              label="Due Date"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="issuedToType"
              label="issuedToType"
              required={true}
              options={Issued_To_Type_Option}
            />
          </Grid>
          {entryFormik.values.issuedToType === "student" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="issuedTo"
                label="issuedTo"
                required={true}
                options={students}
              />
            </Grid>
          )}

          {entryFormik.values.issuedToType === "employee" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="issuedTo"
                label="issuedTo"
                required={true}
                options={employee}
              />
            </Grid>
          )}

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="submitted"
              label="Submitted"
              required={true}
              options={Submitted_Option}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="submissionDate"
              label="Submission Date"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
