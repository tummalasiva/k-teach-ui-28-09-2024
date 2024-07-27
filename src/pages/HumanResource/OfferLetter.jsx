/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import { offerLetterTableKeys } from "../../data/tableKeys/offerLetterData";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Button, Grid, Paper } from "@mui/material";
import FormDatePicker from "../../forms/FormDatePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import LetterViewModal from "../../forms/LetterViewModal";
import { useReactToPrint } from "react-to-print";

export default function OfferLetter() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [modalData, setModalData] = useState({
    open: false,
    containt: "",
  });

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.offerLetter.list, {
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
  }, [selectedSetting._id]);

  const handleCreateOrUpdate = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.offerLetter.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.offerLetter.create, payload);
        getData();
      }
      resetForm();
      setSelectValue(0);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      joiningDate: dataToEdit?.joiningDate
        ? dayjs(dataToEdit?.joiningDate).format("YYYY/MM/DD")
        : null,
      offerLetter:
        dataToEdit?.offerLetter ||
        ` <strong>Congratulations! You've Been Selected for the Role of [Job Title]</strong>
          <p>[Company Name]</p>
          <p>[Address eg. Excellent English Medium Primary & High School Ittangihal road, Vijaypur, Karnataka 586103]</p>
          <p>[City, State, ZIP Code]</p>
          <p>Date: [DD, MM, YY]</p>
          <strong>Dear [Candidate's Full Name],</strong>
          <p>We are thrilled to offer you the position of [Job Title] at [Company Name]. After careful consideration, we believe your skills, experience, and vision make you the perfect fit for our team.</p>
          <strong>Position Details:</strong>
            <p><strong>- Job Title:</strong> [Job Title]</p>
            <p><strong>- Department:</strong> [Department]</p>
            <p><strong>- Supervisor:</strong> [Supervisor/Manager Name]</p>
            <p><strong>- Start Date:</strong> [Start Date]</p>
            <p><strong>- Compensation:</strong> [Salary or Compensation Details]</p>
        <strong>Work Hours:</strong>
        <p>[Regular work hours, any flexible schedule options, etc.]</p>
        <p>We believe that [Company Name] is a place where you can grow and thrive. Your role as [Job Title] will be pivotal in driving our company's success and we look forward to the innovative contributions you will bring to our team.</p>
        <p>Please indicate your acceptance of this offer by signing and returning a copy of this letter by <strong>[Acceptance Deadline]</strong>. Should you have any questions or need further clarification, feel free to reach out to <strong>[HR Contact Name]</strong> at <strong>[HR Contact Email]</strong> or <strong>[HR Contact Phone Number]</strong>.</p>
        <p>We eagerly await your positive response and look forward to welcoming you to the [Company Name] family.</p>
        <p>Warm Regards,</p>
        <p>[HR, Manager Name]</p>
        <p>[Contact Information]</p>
        <br/>
        <p style="text-align:"center;">&copy; [Year] [Company Name]. All rights reserved.</p>
      `,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (value === 1) {
      entryFormik.resetForm();
      setDataToEdit(null);
    }
  }, [value]);

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const handleEditClick = (data) => {
    // console.log(data);
    setDataToEdit(data);
    setSelectValue(2);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.offerLetter.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      containt: data.offerLetter,
    });
  };

  const handleClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <PageHeader title="Offer Letter" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={
          dataToEdit && value === 2
            ? ["Offer letter list", "Add offer letter", "Edit offer letter"]
            : ["Offer letter list", "Add offer Letter"]
        }
      />

      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["view", "edit", "delete"]}
          module="Offer Letter"
          tableKeys={offerLetterTableKeys}
          bodyDataModal="offer letter"
          bodyData={data}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
          onViewClick={handleClickOpenView}
        />
        <LetterViewModal
          title={"Offer Letter"}
          open={modalData.open}
          content={modalData.containt}
          onClose={handleClose}
          onPrintClick={handlePrint}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <form onSubmit={entryFormik.handleSubmit}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Employee Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Joining Date"
                name="joiningDate"
                required={true}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <ReactQuill
                theme="snow"
                value={entryFormik.values.offerLetter}
                required
                onChange={(value) =>
                  entryFormik.setFieldValue("offerLetter", value)
                }
                style={{
                  height: "220px",
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              item
              mt={6}
              gap={1}
              display="flex"
              justifyContent="flex-end">
              <Button
                size="small"
                onClick={() => setSelectValue(0)}
                color="error"
                variant="contained">
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                size="small"
                type="submit"
                variant="contained">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
      <TabPanel index={2} value={value}>
        <form onSubmit={entryFormik.handleSubmit}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="name"
                formik={entryFormik}
                label="Employee Name"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker
                formik={entryFormik}
                label="Joining Date"
                name="joiningDate"
                required={true}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <ReactQuill
                theme="snow"
                required
                value={entryFormik.values.offerLetter}
                onChange={(value) =>
                  entryFormik.setFieldValue("offerLetter", value)
                }
                style={{
                  height: "220px",
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              item
              mt={6}
              gap={1}
              display="flex"
              justifyContent="flex-end">
              <Button
                size="small"
                onClick={() => setSelectValue(0)}
                color="error"
                variant="contained">
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                size="small"
                type="submit"
                variant="contained">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </>
  );
}
