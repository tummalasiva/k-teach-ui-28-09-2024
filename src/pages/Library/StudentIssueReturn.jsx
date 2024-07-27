/** @format */

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { studentLibraryDueTableKeys } from "../../data/tableKeys/studentLibraryDueData";
import { studentLibraryHistoryTableKeys } from "../../data/tableKeys/studentLibraryHistoryData";
import { studentLibraryIssueTableKeys } from "../../data/tableKeys/studentlibraryIssueData";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import FormDatePicker from "../../forms/FormDatePicker";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import FormSelect from "../../forms/FormSelect";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useContext } from "react";
import SettingContext from "../../context/SettingsContext";
import { downloadFile } from "../../utils";
import dayjs from "dayjs";

const BookDetailed = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "whitesmoke",
  padding: "10px",
}));

const BookHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "black",
  fontSize: "15px",
}));

const Issued_To_Type_Option = [
  { label: "Student", value: "student" },
  { label: "Employee", value: "employee" },
];

const Type_Options = [
  { label: "Book", value: "book" },
  { label: "Periodical", value: "periodical" },
];

const CustomAction = ({ onUpdate = () => {}, data = {} }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const updateStatus = async () => {
    try {
      setLoading(true);
      await put(PRIVATE_URLS.bookIssue.submit + "/" + data._id);
      onUpdate();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const entryFormik = useFormik({
    initialValues: {},
    onSubmit: updateStatus,
  });

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="contained" onClick={handleClickOpen}>
          Return
        </Button>
      </Stack>

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={"Return Book"}
        onClose={handleClose}
        submitButtonTitle={"Submit"}
        adding={loading}>
        <Grid spacing={2} container>
          <Grid xs={12} sm={12} md={12} item>
            <Typography>
              Are you sure you want to change the issue status to return?
            </Typography>
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
};

export default function StudentIssueReturn() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [book, setBook] = useState([]);
  const [dueList, setDueList] = useState([]);
  const [history, setHistory] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const [periodical, setPeriodical] = useState([]);
  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.bookIssue.list, {
        params: { schoolId: selectedSetting._id },
      });

      const filteredIssueData = data.result
        .filter((s) => s.submissionDate == null)
        .map((s) => ({
          ...s,
          bookName: s.book,
          bookId: s.book,
          issuedName: s.issuedTo.basicInfo,
        }));

      const currentDate = new Date();
      const filtereDueData = data.result
        .filter(
          (s) =>
            s.dueDate &&
            new Date(s.dueDate) < currentDate &&
            s.submissionDate == null
        )
        .map((s) => ({
          ...s,
          bookName: s.book,
          bookId: s.book,
          issuedName: s.issuedTo.basicInfo,
        }));

      setData(filteredIssueData);
      setDueList(filtereDueData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  const getPeriodical = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.periodical.list);

      setPeriodical(
        data.result.map((s) => ({ ...s, label: s.title, value: s._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.book.list, {
        params: { schoolId: selectedSetting._id },
      });
      setBook(data.result.map((s) => ({ ...s, label: s.title, value: s._id })));
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

      const filteredData = data.result
        .filter((d) => d?.otherInfo?.libraryMember)
        .map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }));
      setStudents(filteredData);
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

      const filteredData = data.result
        .filter((d) => d?.libraryMember)
        .map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }));
      setEmployee(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooks();
    getPeriodical();
    getStudents();
    getEmployee();
  }, [selectedSetting]);

  const getList = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.bookIssue.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            fromDate: dayjs(values.fromDate).format("YYYY/MM/DD"),
            toDate: dayjs(values.toDate).format("YYYY/MM/DD"),
          },
        },
      });
      console.log(data.result, "issues");
      setHistory(
        data.result.map((s) => ({
          ...s,
          bookName: s.book,
          bookId: s.book,
          issuedName: s.issuedTo.basicInfo,
        }))
      );

      console.log(data.result, "histttttttttt");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fromDate: dayjs(new Date()),
      toDate: dayjs(new Date()),
    },
    onSubmit: getList,
  });

  const handleGetPrintPdf = async () => {
    try {
      const getIssuePdf = await get(PRIVATE_URLS.bookIssue.downloadPdf, {
        params: {
          schoolId: selectedSetting._id,
          fromDate: formik.values.fromDate,
          toDate: formik.values.toDate,
        },
      });

      downloadFile("application/pdf", getIssuePdf.data, "Issue_Details.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDownloadExcel = async () => {
    try {
      const getExcel = await get(PRIVATE_URLS.bookIssue.downloadExcel, {
        params: {
          schoolId: selectedSetting._id,
          fromDate: formik.values.fromDate,
          toDate: formik.values.toDate,
        },
        responseType: "blob",
      });

      downloadFile(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        getExcel.data,
        "Issue_Details.xlsx"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrUpdate = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        issueDate: dayjs(values.issueDate).format("YYYY/MM/DD"),
        dueDate: dayjs(values.dueDate).format("YYYY/MM/DD"),
        schoolId: selectedSetting._id,
      };

      setLoading(true);
      const { data } = await post(PRIVATE_URLS.bookIssue.create, payload);
      getData();
      resetForm();
      handleClose();
      getBooks();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      issueDate: null,
      book: "",
      quantity: 0,
      dueDate: null,
      type: "",
      issuedToType: "",
      issuedTo: "",
      type: "",
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
  };
  useEffect(() => {
    formik.handleSubmit();
  }, [selectedSetting]);
  return (
    <>
      <PageHeader title="Issue & Return" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Issue List", "Due List", "History List"]}
      />

      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ mt: 1, mb: 2 }}>
        Issue
      </Button>
      <TabPanel index={0} value={value}>
        <BookDetailed>
          <Box>
            {" "}
            <BookHeader>
              Total Books:{" "}
              {book.reduce((total, current) => total + current.leftInStock, 0)}
            </BookHeader>
            <BookHeader>Total Periodical: 0</BookHeader>
          </Box>

          <Box>
            {" "}
            <BookHeader>Issued: {data.length}</BookHeader>
            <BookHeader>Issued: 0</BookHeader>
          </Box>
          <Box>
            {" "}
            <BookHeader>Due: {dueList.length}</BookHeader>
            <BookHeader>Due:0</BookHeader>
          </Box>
        </BookDetailed>
        <CustomTable
          actions={["custom"]}
          tableKeys={studentLibraryIssueTableKeys}
          bodyData={data}
          bodyDataModal="issue list"
          CustomAction={CustomAction}
          onUpdate={getData}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={["custom"]}
          tableKeys={studentLibraryDueTableKeys}
          bodyData={dueList}
          bodyDataModal="due list"
          CustomAction={CustomAction}
          onUpdate={getData}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            {" "}
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
                <Button size="small" type="submit" variant="contained">
                  Find
                </Button>
              </Grid>
              <Grid xs={12} md={12} lg={12} item>
                <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
                  <Button
                    size="small"
                    onClick={handleGetPrintPdf}
                    variant="contained">
                    Download
                  </Button>
                  <Button
                    size="small"
                    onClick={handleGetDownloadExcel}
                    variant="contained">
                    Print
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <CustomTable
          actions={[]}
          bodyData={history}
          bodyDataModal="list"
          tableKeys={studentLibraryHistoryTableKeys}
        />
      </TabPanel>

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={"Add Issue"}
        onClose={handleClose}
        submitButtonTitle={"Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              required={true}
              name="type"
              formik={entryFormik}
              label="Select Type"
              options={Type_Options}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="book"
              label={entryFormik.values.type === "book" ? "Book" : "Periodical"}
              required={true}
              options={entryFormik.values.type === "book" ? book : periodical}
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
              label="Issued To Type"
              required={true}
              options={Issued_To_Type_Option}
            />
          </Grid>
          {entryFormik.values.issuedToType === "student" && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="issuedTo"
                label="Issued To"
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
                label="Issued To"
                required={true}
                options={employee}
              />
            </Grid>
          )}
        </Grid>
      </FormModal>
    </>
  );
}
