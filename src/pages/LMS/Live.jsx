import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import FilterListIcon from "@mui/icons-material/FilterList";

import CustomTable from "../../components/Tables/CustomTable";
import { liveDataTableKeys } from "../../data/tableKeys/liveData";
import { Box, FormControl, MenuItem, Select, styled } from "@mui/material";

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
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const handleFilter = (e) => {
    setSelectedCourse(e.target.value);
  };
  return (
    <>
      <PageHeader title="Live" />

      <FilterBox>
        <FormControl size="small" sx={{ m: 1, minWidth: 250 }}>
          <Label id="demo-simple-select-label">
            <FilterListIcon fontSize="small" /> Filter Meeting
          </Label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder="Select Course"
            value={selectedCourse}
            onChange={handleFilter}
          >
            <MenuItem value="All"> All </MenuItem>
            <MenuItem value="OneONoneCall">One-On-One Call </MenuItem>
            <MenuItem value="GroupCall">Group Call </MenuItem>
            <MenuItem value="LiveStreaming">Live Stream </MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <CustomTable
        actions={["edit"]}
        tableKeys={liveDataTableKeys}
        bodyDataModal="live"
        bodyData={data}
      />
    </>
  );
}
