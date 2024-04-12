import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { overviewTableKeys } from "../../data/TableData/overviewData";
import { employeeTableKeys } from "../../data/TableData/employeeData";
import { inactiveTableKeys } from "../../data/TableData/inactiveEmployee";

export default function Employee() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Overview", "EmployeeList", "Inactive Emploee List"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable tableKeys={overviewTableKeys} bodyData={data} />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable tableKeys={employeeTableKeys} bodyData={data} />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <CustomTable actions={["edit"]} tableKeys={inactiveTableKeys} />
      </TabPanel>
    </>
  );
}
