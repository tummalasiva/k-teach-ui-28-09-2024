import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";

import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { experienceTableKeys } from "../../data/tableKeys/experienceLetterData";

export default function ExperienceLetter() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Experience letter list", "Add Experience Letter"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit"]}
          tableKeys={experienceTableKeys}
          bodyDataModal="experience  letter"
          bodyData={data}
        />
      </TabPanel>
      <TabPanel index={1} value={value}></TabPanel>
    </>
  );
}
