/** @format */

import React, { useEffect, useState, useContext } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { studentMemberTableKeys } from "../../data/tableKeys/studentMember";
import { studentNonMemberTableKeys } from "../../data/tableKeys/studentNonMember";
import { del, get, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Add, Remove as RemoveIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import FormModal from "../../forms/FormModal";

const StudentMemberAction = ({
  onUpdate = () => {},
  data = {},
  actionType,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const updateStatus = async () => {
    try {
      setLoading(true);
      if (actionType === "add") {
        await put(PRIVATE_URLS.student.updateLibraryMember + "/" + data._id);
      } else {
        await del(PRIVATE_URLS.student.removeLibraryMember + "/" + data._id);
      }
      onUpdate();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const entryFormik = useFormik({
    initialValues: {},
    onSubmit: updateStatus,
  });

  const actionTitle = actionType === "add" ? "Add Member" : "Remove Member";
  const actionDescription =
    actionType === "add"
      ? "Do you want to add this student to the library member list?"
      : "Do you want to remove this student from the library member list?";

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="contained"
          startIcon={actionType === "add" ? <Add /> : <RemoveIcon />}
          onClick={handleClickOpen}>
          Member
        </Button>
      </Stack>

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={actionTitle}
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}>
        <Grid spacing={2} container>
          <Grid xs={12} sm={12} md={12} item>
            <Typography>{actionDescription}</Typography>
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
};

export default function StudentLibraryMember() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [students, setStudents] = useState([]);
  const [nonMember, setNonMember] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      const filteredData = data.result
        .filter((d) => d?.otherInfo?.libraryMember)
        .map((d) => ({
          ...d,
          studentName: d.basicInfo,
          className: d.academicInfo.class,
          sectionName: d.academicInfo.section,
          rollNo: d.academicInfo,
        }));

      const filteredNonMemberData = data.result
        .filter((d) => !d?.otherInfo?.libraryMember)
        .map((d) => ({
          ...d,
          studentName: d.basicInfo,
          className: d.academicInfo.class,
          sectionName: d.academicInfo.section,
          rollNo: d.academicInfo,
        }));

      setStudents(filteredData);
      setNonMember(filteredNonMemberData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, [selectedSetting]);

  return (
    <>
      <PageHeader title="Student Library Member" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Student Member List", "Student Non Member List"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["custom"]}
          tableKeys={studentMemberTableKeys}
          bodyData={students}
          bodyDataModal="student"
          CustomAction={(props) => (
            <StudentMemberAction {...props} actionType="remove" />
          )}
          onUpdate={getStudents}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={["custom"]}
          tableKeys={studentNonMemberTableKeys}
          bodyData={nonMember}
          bodyDataModal="student"
          CustomAction={(props) => (
            <StudentMemberAction {...props} actionType="add" />
          )}
          onUpdate={getStudents}
        />
      </TabPanel>
    </>
  );
}
