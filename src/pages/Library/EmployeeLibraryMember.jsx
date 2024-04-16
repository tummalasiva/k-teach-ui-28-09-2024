import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { employeeLibraryMemberTableKeys } from "../../data/tableKeys/employeeLibraryNonMemberData";
import { employeeLibraryNonMemberTableKeys } from "../../data/tableKeys/employeeLibraryMemberData";

export default function EmployeeLibraryMember() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
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
          tableKeys={employeeLibraryMemberTableKeys}
          bodyData={data}
          bodyDataModal="employee"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          tableKeys={employeeLibraryNonMemberTableKeys}
          bodyData={data}
          bodyDataModal="employee"
        />
      </TabPanel>
    </>
  );
}
