import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { studentMemberTableKeys } from "../../data/tableKeys/studentMember";
import { studentNonMemberTableKeys } from "../../data/tableKeys/studentNonMember";

export default function StudentLibraryMember() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
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
          tableKeys={studentMemberTableKeys}
          bodyData={data}
          bodyDataModal="student"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          tableKeys={studentNonMemberTableKeys}
          bodyData={data}
          bodyDataModal="student"
        />
      </TabPanel>
    </>
  );
}
