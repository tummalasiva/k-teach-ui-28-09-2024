/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { relievingLetterDataTableKeys } from "../../data/tableKeys/relievingLetterData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import dayjs from "dayjs";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import { Button, Grid } from "@mui/material";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import LetterViewModal from "../../forms/LetterViewModal";
import { useReactToPrint } from "react-to-print";

export default function RelievingLetter() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    open: false,
    containt: "",
  });
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.relievingLetter.list, {
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
          PRIVATE_URLS.relievingLetter.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.relievingLetter.create, payload);
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
      relievingLetter:
        dataToEdit?.relievingLetter ||
        `<strong>Relieving Letter</strong>
        <p>[Company Name]</p>
        <p>Excellent English Medium Primary & High School Ittangihal road, Vijaypur, Karnataka 586103</p>
        <p>Date: DD, MM, YY	</p>
        <p>Dear [Employee's Full Name],</p>
        <p>We hereby acknowledge receipt of your resignation letter dated <strong>[Resignation Date]</strong>, in which you requested to be relieved from your position as <strong>[Employee's Designation]</strong> at <strong>[Company Name]</strong>. We are pleased to provide you with your relieving letter.</p>
        <p>This is to inform you that you <strong>[Employee ID]</strong> will be relieved after careful consideration and necessary formalities.</p>
        <p>You have successfully completed your tenure at <strong>[Company Name]</strong> as <strong>[Job Title]</strong> from <strong>[Joining Date]</strong> to <strong>[Last Working Date]</strong>. We appreciate your dedicated service and commitment during your time with us.</p>
        <p>Sincerely,</p>
        <p>HR, Manager</p>
        <p>[Contact Information]</p>
        <br/>
        <p>&copy; [Year] [Company Name]. All rights reserved.</p>
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
    console.log(data);
    setDataToEdit(data);
    setSelectValue(2);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.relievingLetter.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      containt: data.relievingLetter,
    });
  };

  const handleClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <PageHeader title="Relieving letter" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={
          dataToEdit && value === 2
            ? [
                "Relieving letter list",
                "Add relieving letter",
                "Edit relieving letter",
              ]
            : ["Relieving letter list", "Add relieving letter"]
        }
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["view", "edit", "delete"]}
          module="Relieving Letter"
          tableKeys={relievingLetterDataTableKeys}
          bodyDataModal="relieving letter"
          bodyData={data}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
          onViewClick={handleClickOpenView}
        />
        <LetterViewModal
          title={"Relieving  Letter"}
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
                label="Date"
                name="joiningDate"
                required={true}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <ReactQuill
                theme="snow"
                required
                value={entryFormik.values.relievingLetter}
                onChange={(value) =>
                  entryFormik.setFieldValue("relievingLetter", value)
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
              gap={1}
              mt={6}
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
                label="Date"
                name="joiningDate"
                required={true}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <ReactQuill
                theme="snow"
                required
                value={entryFormik.values.relievingLetter}
                onChange={(value) =>
                  entryFormik.setFieldValue("relievingLetter", value)
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
