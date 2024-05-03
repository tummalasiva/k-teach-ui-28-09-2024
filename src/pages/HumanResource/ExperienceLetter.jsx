import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import React, { useContext, useEffect, useState } from "react";
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

export default function ExperienceLetter() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedSetting } = useContext(SettingContext);
  const [showTabs, setShowTabs] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.experienceLetter.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(data.result);

      console.log(data.result, "result");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreateOrUpdate = async (values) => {
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
      } else {
        const data = await post(PRIVATE_URLS.experienceLetter.create, payload);

        console.log(data, "llllllll");
      }
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
      experienceLetter: `<p>Webpruce Company</p>
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
    // enableReinitialize: true,
  });

  console.log(entryFormik.values, "formikkkk");
  const handleTabChange = (e, newValue) => setSelectValue(newValue);

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
  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={
          dataToEdit && value === 2
            ? [
                "Experience letter list",
                "Add Experience Letter",
                "Edit Experience Letter",
              ]
            : ["Experience letter list", "Add Experience Letter"]
        }
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit", "delete"]}
          tableKeys={experienceTableKeys}
          bodyDataModal="experience  letter"
          bodyData={data}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
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
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <ReactQuill
                theme="snow"
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
              display="flex"
              justifyContent="flex-end"
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                type="submit"
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>

      <TabPanel index={2} value={value}></TabPanel>
    </>
  );
}
