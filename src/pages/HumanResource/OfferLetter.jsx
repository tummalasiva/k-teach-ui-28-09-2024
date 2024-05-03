import React, { useState } from "react";
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

export default function OfferLetter() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
      };
      setLoading(true);
      if (dataToEdit) {
        const data = await put(
          PRIVATE_URLS.offerLetter.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const data = await post(PRIVATE_URLS.offerLetter.create, payload);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: "",
      joiningDate: dayjs(new Date()),
      offerLetter: `<p>Webpruce Company</p>
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

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Offer letter list", "Add Offer Letter"]}
      />

      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit"]}
          tableKeys={offerLetterTableKeys}
          bodyDataModal="offer letter"
          bodyData={data}
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
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <ReactQuill
                theme="snow"
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
              display="flex"
              justifyContent="flex-end"
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
    </>
  );
}
