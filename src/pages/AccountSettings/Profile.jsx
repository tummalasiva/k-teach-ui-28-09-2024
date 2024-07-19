/** @format */

import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  tableCellClasses,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import themeData from "../../data/themeData";
// icons
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import FormTable from "./FormTable";
import ProfileUpdate from "./ProfileUpdate";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

export default function Profile() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  // const [dataToEdit, setDataToEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  // console.log(selectedSetting, "selectedSetting");
  // console.log(employee, "employee");

  const getEmployees = async () => {
    const user = window.localStorage.getItem("current_ecs_user");
    setEmployee(JSON.parse(user));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  if (!employee) {
    return null;
  }

  return (
    <>
      <PageHeader title="Profile" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Profile", "Update Profile"]}
      />
      <TabPanel index={0} value={value}>
        {/* {employee && ( */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}>
          <FormTable employee={employee} />
        </Box>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <ProfileUpdate
          employee={employee}
          setSelectValue={setSelectValue}
          getEmployees={getEmployees}
        />
      </TabPanel>
    </>
  );
}
