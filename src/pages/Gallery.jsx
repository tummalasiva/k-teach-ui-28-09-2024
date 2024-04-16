import React, { useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import { galleryListTableKeys } from "../data/tableKeys/galleryListData";
import PageHeader from "../components/PageHeader";
import TabList from "../components/Tabs/Tablist";
import CustomTable from "../components/Tables/CustomTable";
import FormDatePicker from "../forms/FormDatePicker";
import FormSelect from "../forms/FormSelect";
import TabPanel from "../components/Tabs/TabPanel";
import FormInput from "../forms/FormInput";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: "",
      web: "",
      note: "",
      image: "",
      date: dayjs(new Date()),
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Gallery" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Gallery List", "Add Gallery"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={[]}
          bodyDataModal="Gallery"
          bodyData={data}
          tableKeys={galleryListTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="title"
                formik={entryFormik}
                label="Select Gallery Title"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker formik={entryFormik} label="Date" name="date" />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="web"
                formik={entryFormik}
                label="Web View"
                options={[
                  { label: "yes", value: "yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="image"
                formik={entryFormik}
                label="Select Image"
                type="file"
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput
                required={true}
                name="note"
                formik={entryFormik}
                label="Type note here..."
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={3}
              style={{ alignSelf: "center", marginTop: "10px" }}
              item
            >
              <Button size="small" color="error" variant="contained">
                Cancel
              </Button>
              <Button size="small" variant="contained" sx={{ ml: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
