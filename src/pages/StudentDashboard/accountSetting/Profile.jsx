/** @format */
import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";
import PageHeader from "../../../components/PageHeader";

// icons
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TabList from "../../../components/Tabs/Tablist";
import TabPanel from "../../../components/Tabs/TabPanel";
import { get, post, put } from "../../../services/apiMethods";
import { PRIVATE_URLS } from "../../../services/urlConstants";
import SettingContext from "../../../context/SettingsContext";

import UpdateProfile from "./UpdateProfile";
import ViewTable from "./ViewTable";

export default function Profile() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  // const [dataToEdit, setDataToEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  return (
    <>
      <PageHeader title="Profile" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Profile", "Update Profile"]}
      />
      <TabPanel index={0} value={value}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}>
          <ViewTable student={student} />
        </Box>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <UpdateProfile setSelectValue={setSelectValue} />
      </TabPanel>
    </>
  );
}
