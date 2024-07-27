/** @format */

import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import React, { useContext, useEffect, useRef, useState } from "react";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { experienceTableKeys } from "../../data/tableKeys/experienceLetterData";
import { Button, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import dayjs from "dayjs";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import { useReactToPrint } from "react-to-print";
import LetterViewModal from "../../forms/LetterViewModal";

export default function ExperienceLetter() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const [modalData, setModalData] = useState({
    open: false,
    containt: "",
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.experienceLetter.list, {
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
          PRIVATE_URLS.experienceLetter.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const data = await post(PRIVATE_URLS.experienceLetter.create, payload);
        getData();
      }

      setSelectValue(0);
      resetForm();
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
      experienceLetter:
        dataToEdit?.experienceLetter ||
        ` <strong>Experience Letter</strong>
          <p>Webpruce Company</p>
          <p>Date: 12, January 2024</p>
          <p>Place: Excellent English Medium Primary & High School Ittangihal road, Vijaypur, Karnataka 586103</p>
          <p>To Whom It May Concern,</p>
          <p>This is to certify that <strong>[Employee's Full Name]</strong> was employed with us as a <strong>[Job Title]</strong> in the <strong>[Department]</strong> department from <strong>[Start Date]</strong> to <strong>[End Date]</strong>.</p>
          <p>During their tenure with us, [Employee's Full Name] was responsible for:</p>
          <p>- Key Responsibility 1</p>
          <p>- Key Responsibility 2</p>
          <p>We found [Employee's Full Name] to be a dedicated and reliable employee who consistently showed a high level of professionalism. They are leaving us due to [reason for leaving, if appropriate], and we wish them all the best in their future endeavors.</p>
          <p>We highly recommend [Employee's Full Name] for any future employment opportunities and are confident that they will be an asset to any organization they join.</p>
          <p>If you require any further information, please do not hesitate to contact us.</p>
          <p>Warm Regards,</p>
          <p><strong>[Your Name]</strong></p>
          <p><strong>[Your Job Title]</strong></p>
          <p><strong>[Contact Information]</strong></p>
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
      const res = await del(PRIVATE_URLS.experienceLetter.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      containt: data.experienceLetter,
    });
  };

  const handleClose = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <>
      <PageHeader title="Experience Letter" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={
          dataToEdit && value === 2
            ? [
                "Experience letter list",
                "Add experience letter",
                "Edit experience letter",
              ]
            : ["Experience letter list", "Add experience Letter"]
        }
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["view", "edit", "delete"]}
          module="Experience Letter"
          tableKeys={experienceTableKeys}
          bodyDataModal="experience  letter"
          bodyData={data}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
          onViewClick={handleClickOpenView}
        />

        <LetterViewModal
          title={"Experience Letter"}
          open={modalData.open}
          content={modalData.containt}
          onClose={handleClose}
          onPrintClick={handlePrint}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <form onSubmit={entryFormik.handleSubmit}>
          {" "}
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                type="text"
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
                value={entryFormik.values.experienceLetter}
                onChange={(value) =>
                  entryFormik.setFieldValue("experienceLetter", value)
                }
                onBlur={entryFormik.handleBlur("experienceLetter")}
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
                size="small"
                loading={loading}
                variant="contained"
                type="submit">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>

      <TabPanel index={2} value={value}>
        <form onSubmit={entryFormik.handleSubmit}>
          {" "}
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                type="text"
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
                value={entryFormik.values.experienceLetter}
                onChange={(value) =>
                  entryFormik.setFieldValue("experienceLetter", value)
                }
                onBlur={entryFormik.handleBlur("experienceLetter")}
                style={{
                  height: "220px",
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              gap={1}
              item
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
                size="small"
                loading={loading}
                variant="contained"
                type="submit">
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </>
  );
}
