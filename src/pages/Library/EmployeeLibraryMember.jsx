/** @format */

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { employeeLibraryMemberTableKeys } from "../../data/tableKeys/employeeLibraryNonMemberData";
import { employeeLibraryNonMemberTableKeys } from "../../data/tableKeys/employeeLibraryMemberData";

import { del, get, put } from "../../services/apiMethods";
import { useContext } from "react";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import { Button, Grid, Stack, Typography } from "@mui/material";
import FormModal from "../../forms/FormModal";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";

const EmployeeMemberAction = ({
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
        await put(PRIVATE_URLS.employee.updateLibraryMember + "/" + data._id);
      } else {
        await del(PRIVATE_URLS.employee.removeLibraryMember + "/" + data._id);
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
      ? "Do you want to add this employee to the library member list?"
      : "Do you want to remove this employee from the library member list?";

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

export default function EmployeeLibraryMember() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [nonMember, setNonMember] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  const getEmployee = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      const filteredData = data.result
        .filter((d) => d?.libraryMember)
        .map((d) => ({
          ...d,
          empName: d.basicInfo,
        }));

      const filteredNonMemberData = data.result
        .filter((d) => !d?.libraryMember)
        .map((d) => ({
          ...d,
          empName: d.basicInfo,
        }));

      setEmployee(filteredData);
      setNonMember(filteredNonMemberData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, [selectedSetting]);

  return (
    <>
      <PageHeader title="Employee Library Member" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Employee Member List", "Employee Non Member List"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["custom"]}
          tableKeys={employeeLibraryMemberTableKeys}
          bodyData={employee}
          bodyDataModal="employee"
          CustomAction={(props) => (
            <EmployeeMemberAction {...props} actionType="remove" />
          )}
          onUpdate={getEmployee}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={["custom"]}
          tableKeys={employeeLibraryNonMemberTableKeys}
          bodyData={nonMember}
          bodyDataModal="employee"
          CustomAction={(props) => (
            <EmployeeMemberAction {...props} actionType="add" />
          )}
          onUpdate={getEmployee}
        />
      </TabPanel>
    </>
  );
}
