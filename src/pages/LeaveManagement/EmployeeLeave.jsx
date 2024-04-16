import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { employeeLeaveManageTableKeys } from "../../data/tableKeys/employeeLeaveManageData";
import { employeeLeaveTableKeys } from "../../data/tableKeys/employeeLeaveListData";
import { Box, Grid, Paper, Typography, styled } from "@mui/material";

const LeaveData = styled(Paper)(({ theme }) => ({
  height: "80px",
  padding: "20px",
  textAlign: "center",
}));

const DataContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
}));

export default function EmployeeLeave() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const [leaveType, setLeaveType] = useState([
    { name: "sick", total: "89" },
    { name: "common", total: "100" },
  ]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  return (
    <>
      <PageHeader title="Employee Leave" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Leave List", "Leave Manage"]}
      />
      <TabPanel index={0} value={value}>
        <DataContainer container spacing={2}>
          <Grid item xs={4} md={4} lg={2}>
            <LeaveData>
              <Typography fontSize="15px" color="#196838">
                Total taken :89
              </Typography>
            </LeaveData>
          </Grid>
          {leaveType.map((data) => (
            <Grid item xs={4} md={4} lg={2}>
              <LeaveData>
                <Typography fontSize="15px">
                  {data.name}:{data.total}
                </Typography>
                <Typography fontSize="15px">Total taken :0</Typography>
              </LeaveData>
            </Grid>
          ))}
        </DataContainer>

        <CustomTable
          tableKeys={employeeLeaveTableKeys}
          bodyData={data}
          bodyDataModal="leave"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          tableKeys={employeeLeaveManageTableKeys}
          bodyData={data}
          bodyDataModal="leave"
        />
      </TabPanel>
    </>
  );
}
