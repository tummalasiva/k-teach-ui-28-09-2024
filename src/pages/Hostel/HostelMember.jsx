/** @format */

import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { hostelMemberTableKeys } from "../../data/tableKeys/hostelMemberData";
import { hostelNNonMemberTableKeys } from "../../data/tableKeys/hostelNonMember";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { Button, Grid, Paper, Stack } from "@mui/material";
import { del, get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { Add } from "@mui/icons-material";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";

const CustomActionAdd = ({ onUpdate = () => {}, data = {} }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { selectedSetting } = useContext(SettingContext);
  const [hostel, setHostel] = useState([]);
  const [room, setRoom] = useState([]);

  const getHostel = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.hostel.list);

      setHostel(
        data.result.map((s) => ({ ...s, label: s.name, value: s._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRoom = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.room.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            hostel: entryFormik.values.hostel,
          },
        },
      });

      setRoom(
        data.result.map((s) => ({
          ...s,
          label: String(s.number),
          value: s._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHostel();
  }, [selectedSetting]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMember = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        hostel: values.hostel,
        room: values.room,
        bed: values.bed,
      };
      setLoading(true);
      await put(
        PRIVATE_URLS.student.updateHostelMember + "/" + data._id,
        payload
      );
      onUpdate();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      name: data?.basicInfo?.name || "",
      hostel: "",
      room: "",
      bed: "",
    },
    onSubmit: addMember,
  });
  useEffect(() => {
    if (entryFormik.values.hostel) {
      getRoom();
    }
  }, [entryFormik.values.hostel, selectedSetting]);

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
              name="hostel"
              label="Hostel"
              required={true}
              options={hostel}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="room"
              label="Room No"
              required={true}
              options={room}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="bed"
              label="Beds"
              required={true}
              options={
                room
                  .find((r) => r._id === entryFormik.values.room)
                  ?.beds.map((bed) => ({
                    label: bed.name,
                    value: bed._id,
                  })) || []
              }
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
};

export default function HostelMember() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);

  const [hostelMember, setHostelMember] = useState([]);
  const [nonHostelMember, setNonHostelMember] = useState([]);

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("class", data.result[0]?._id);
      formik.setFieldValue("class", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get academic year
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
      entryFormik.setFieldValue("academicYear", data.result[0]._id);
      formik.setFieldValue("academicYear", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get section
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: formik.values.class || entryFormik.values.class,
          },
        },
      });

      const section = data.result.map((s) => ({
        label: s.name,
        value: s._id,
      }));

      const sectionAllOption = [{ label: "All", value: "all" }, ...section];
      setSections(sectionAllOption);
      entryFormik.setFieldValue("section", "all");
      formik.setFieldValue("section", "all");
    } catch (error) {
      console.log(error);
    }
  };

  const getDataMemberList = async (values) => {
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

        console.log(data.result, "=================");

        const filteredDataMember = data.result
          .filter((s) => s?.otherInfo?.hostelMember)
          .map((s) => ({
            ...s,
            studentName: s.basicInfo,
            admission: s.academicInfo,
          }));

        const filteredDataNonMember = data.result
          .filter((s) => !s?.otherInfo?.hostelMember)
          .map((s) => ({
            ...s,
            studentName: s.basicInfo,
            admission: s.academicInfo,
          }));

        setHostelMember(filteredDataMember);

        setNonHostelMember(filteredDataNonMember);
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

        const filteredDataMember = data.result
          .filter((s) => s?.otherInfo?.hostelMember)
          .map((s) => ({
            ...s,
            studentName: s.basicInfo,
            admission: s.academicInfo,
          }));

        const filteredDataNonMember = data.result
          .filter((s) => !s?.otherInfo?.hostelMember)
          .map((s) => ({
            ...s,
            studentName: s.basicInfo,
            admission: s.academicInfo,
          }));

        setHostelMember(filteredDataMember);

        setNonHostelMember(filteredDataNonMember);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: getDataMemberList,
    enableReinitialize: true,
  });

  const formik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
    },
    onSubmit: getDataMemberList,
    enableReinitialize: true,
  });

  useEffect(() => {
    getAcademicYear();
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class || formik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class, formik.values.class, selectedSetting]);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.student.removeHostelMember + "/" + id);
      entryFormik.handleSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Hostel Member" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Member List", "Non Member List"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={entryFormik.handleSubmit}>
            {" "}
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="academicYear"
                  formik={entryFormik}
                  label="Select Academic Year"
                  options={academicYear}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="class"
                  formik={entryFormik}
                  label="Select Class"
                  options={classes}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={entryFormik}
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
          </form>
        </Paper>
        <CustomTable
          actions={["delete"]}
          onDeleteClick={handleDelete}
          tableKeys={hostelMemberTableKeys}
          bodyData={hostelMember}
          bodyDataModal="hostel member"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid rowSpacing={1} columnSpacing={2} container>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="academicYear"
                  formik={formik}
                  label="Select Academic Year"
                  options={academicYear}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="class"
                  formik={formik}
                  label="Select Class"
                  options={classes}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={formik}
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
          </form>
        </Paper>
        <CustomTable
          actions={"custom"}
          tableKeys={hostelNNonMemberTableKeys}
          bodyData={nonHostelMember}
          bodyDataModal="hostel member"
          CustomAction={CustomActionAdd}
          onUpdate={formik.handleSubmit}
        />
      </TabPanel>
    </>
  );
}
