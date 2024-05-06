import React, { useContext, useEffect, useState } from "react";
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
import SettingContext from "../context/SettingsContext";
import { PRIVATE_URLS } from "../services/urlConstants";
import { get, post, put } from "../services/apiMethods";

export default function Gallery() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.gallery.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      console.log(data, "gallery list");
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.gallery.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.gallery.create, payload);
        getData();
        console.log(data, "gallery podt");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      note: dataToEdit?.note || "",
      isPublic: dataToEdit?.isPublic || "",
      date: dayjs(new Date()),
      images: "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: false,
  });

  const handleClose = () => {
    // setSelectValue(0);
    setDataToEdit(null);
  };

  useEffect(() => {
    getData();
  }, []);

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
          actions={["edit", "delete"]}
          bodyDataModal="Gallery"
          bodyData={data}
          tableKeys={galleryListTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}
          >
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                required={true}
                name="title"
                formik={entryFormik}
                label="Gallery Title"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormDatePicker formik={entryFormik} label="Date" name="date" />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="isPublic"
                formik={entryFormik}
                label="Public Web"
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="images"
                formik={entryFormik}
                label="Select Image"
                type="file"
                inputProps={{
                  accept: "image/*",
                }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <FormInput name="note" formik={entryFormik} label="Note" />
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
              <Button
                size="small"
                type="submit"
                variant="contained"
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}
