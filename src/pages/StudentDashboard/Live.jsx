/** @format */

import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { studentLiveTableKeys } from "../../data/tableKeys/studentLiveData";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, FormControl, MenuItem, Select, styled } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

const Label = styled("label")(() => ({
  fontWeight: 650,
  fontSize: "15px",
  color: "#424242",
  paddingLeft: "10px",
}));

const FilterBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
  marginBottom: 1,
}));

export default function Live() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [selectedPartcipatType, setSelectedParticipatType] = useState("All");

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.meeting.listStudent, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(data?.result);

      console.log(data.result, "44444444444");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [selectedSetting]);

  return (
    <>
      <FilterBox>
        <FormControl size="small" sx={{ m: 1, minWidth: 250 }}>
          <Label id="demo-simple-select-label">
            <FilterListIcon fontSize="small" /> Filter Meeting
          </Label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder="Select Course"
            value={selectedPartcipatType}>
            <MenuItem value="All"> All </MenuItem>
            <MenuItem value="OneONoneCall">One-On-One Call </MenuItem>
            <MenuItem value="GroupCall">Group Call </MenuItem>
            <MenuItem value="LiveStreaming">Live Streaming</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>
      <CustomTable
        actions={[]}
        tableKeys={studentLiveTableKeys}
        bodyDataModal="live session"
        bodyData={data}
      />
    </>
  );
}
