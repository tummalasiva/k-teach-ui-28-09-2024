/** @format */

import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper, Stack } from "@mui/material";
import { transportAddMemberTableKeys } from "../../data/tableKeys/transportAddMemberData";
import { transportMemberTableKeys } from "../../data/tableKeys/transportMemberData";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { Add, SettingsSharp } from "@mui/icons-material";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";

const Pick_Type = [
  { label: "Pick", value: "pick" },
  { label: "Drop", value: "drop" },
  { label: "Both", value: "both" },
];

const CustomActionAdd = ({ onUpdate = () => {}, data = {} }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(data, "ccccccccccc");

  const addMember = async () => {
    try {
      setLoading(true);
      await put(PRIVATE_URLS.vehicle.addMember + "/" + data._id);
      onUpdate();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      name: data?.basicInfo?.name || "",
      route: "",
      stop: "",
      type: "",
    },
    onSubmit: addMember,
  });

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          startIcon={<Add />}
          variant="contained"
          onClick={handleClickOpen}>
          Member
        </Button>
      </Stack>

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={"Add Member"}
        onClose={handleClose}
        submitButtonTitle={"Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="route"
              label="Route"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="stop"
              label="Stop"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormSelect
              name="type"
              formik={entryFormik}
              label="Pick Type"
              options={Pick_Type}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
};

export default function TransportMember() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [transportMember, setTransportMember] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);

      setAcademicYear(
        data.result.map((d) => ({
          ...d,
          label: `${d.from}-${d.to}`,
          value: d._id,
        }))
      );
      formik1.setFieldValue("academicYear", data.result[0]?._id);
      formik2.setFieldValue("academicYear", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      formik1.setFieldValue("class", data.result[0]?._id);
      formik2.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: formik2.values.class,
          },
        },
      });

      const section = data.result.map((s) => ({
        label: s.name,
        value: s._id,
      }));

      const sectionAllOption = [{ label: "All", value: "all" }, ...section];
      setSections(sectionAllOption);
      formik1.setFieldValue("section", "all");
      formik2.setFieldValue("section", "all");
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async (values) => {
    try {
      if (values.section === "all") {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              academicYear: values.academicYear,
              "academicInfo.class": values.class,
            },
          },
        });
        setData(data.result.filter((s) => !s?.otherInfo?.transportMember));

        setTransportMember(
          data.result.filter((s) => s?.otherInfo?.transportMember)
        );

        console.log(data.result, "kkkkkkkkk1111");
      } else {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              academicYear: values.academicYear,
              "academicInfo.class": values.class,
              "academicInfo.section": values.section,
            },
          },
        });
        setData(data.result.filter((s) => !s?.otherInfo?.transportMember));
        setTransportMember(
          data.result.filter((s) => s?.otherInfo?.transportMember)
        );
        console.log(data.result, "kkkkkkkkk2222");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik1 = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: getList,
  });
  const formik2 = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: getList,
    enableReinitialize: true,
  });
  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  useEffect(() => {
    if (formik2.values.class) {
      getSections();
    }
  }, [formik2.values.class]);

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);
  return (
    <>
      <PageHeader title="Transport Member" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Member List", "Add Member"]}
      />
      <TabPanel index={0} value={value}>
        <form onSubmit={formik1.handleSubmit}>
          {" "}
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="academicYear"
                  formik={formik1}
                  label="Select Academic Year"
                  options={academicYear}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="class"
                  formik={formik1}
                  label="Select Class"
                  options={classes}
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={formik1}
                  label="Select Section"
                  options={sections}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
                <Button size="small" type="submit" variant="contained">
                  Find
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
        <CustomTable
          actions={["edit", "delete", "custom"]}
          tableKeys={transportMemberTableKeys}
          bodyData={transportMember}
          bodyDataModal="transport member"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <form onSubmit={formik2.handleSubmit}>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="academicYear"
                  formik={formik2}
                  label="Select Academic Year"
                  options={academicYear}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="class"
                  formik={formik2}
                  label="Select Class"
                  options={classes}
                />
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={formik2}
                  label="Select Section"
                  options={sections}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={3} sx={{ alignSelf: "center" }}>
                <Button size="small" type="submit" variant="contained">
                  Find
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
        <CustomTable
          actions={"custom"}
          tableKeys={transportAddMemberTableKeys}
          bodyData={data}
          bodyDataModal="transport member"
          CustomAction={CustomActionAdd}
          onUpdate={getList}
        />
      </TabPanel>
    </>
  );
}
