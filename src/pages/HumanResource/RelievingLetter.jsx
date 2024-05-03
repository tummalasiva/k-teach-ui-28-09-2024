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
    action: () => {},
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
  }, []);

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
      name: "",
      joiningDate: dayjs(new Date()),
      relievingLetter: `<p>Webpruce Company</p>
      <p>Rajajingar, Banglore, Karnataka</p>
      <p>From: Excellent English Medium Primary & High School Ittangihal road, Vijaypur, Karnataka 586103</p>
      <p>Contact: +91 876xxxxxxxxx</p>
      <p>E Mail: ajxxxxx@gmail.com</p>
      <p>Date: DD, MM, YY	</p>
      <br/>
      <p>Dear Ashish,</p>
      <br/>
      <p>This is in continuation to our meeting, I am delighted to offer you the position of Project Head at xxx organization. In this role, you would be reporting to the Senior Delivery Head and would be responsible for delivering global projects for high end clients.</p>
      <br/>
      <p>The terms of employment have been attached with this offer letter. We hope you will enjoy your role and make significant contributions to the success of the business. Your employment will commence on DD, MM, YY. You will be based at Bangalore location but may be required to work at other locations as well, as reasonably determined by the needs of the business.</p>
      <br/>
      <p>Regards</p>
      <p>HR, Manager</p>
      `,
    },
    onSubmit: handleCreateOrUpdate,
  });
  useEffect(() => {
    if (dataToEdit) {
      entryFormik.setValues({
        name: dataToEdit?.name,
        joiningDate: dayjs(dataToEdit?.joiningDate),
        relievingLetter: dataToEdit?.relievingLetter,
      });
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (value === 1) {
      entryFormik.resetForm();
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
      //  action: () => handleGetDownloadSheet(data._id),
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
              justifyContent="flex-end"
            >
              <Button
                size="small"
                onClick={() => setSelectValue(0)}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                size="small"
                type="submit"
                variant="contained"
              >
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
              justifyContent="flex-end"
            >
              <Button
                size="small"
                onClick={() => setSelectValue(0)}
                color="error"
                variant="contained"
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                size="small"
                type="submit"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </>
  );
}
