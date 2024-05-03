import React, { useState } from "react";
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

export default function Profile() {
  const [value, setSelectValue] = useState(0);

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
        {/* {employee && ( */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <FormTable />
        </Box>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <ProfileUpdate />
      </TabPanel>
    </>
  );
}
