import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import { offerLetterTableKeys } from "../../data/TableData/offerLetterData";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";

export default function OfferLetter() {
  const [value, setSelectValue] = useState(0);
  const [data, setData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Offer letter list", "Add Offer Letter"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          actions={["edit"]}
          tableKeys={offerLetterTableKeys}
          bodyDataModal="offer letter"
          bodyData={data}
        />
      </TabPanel>
      <TabPanel index={1} value={value}></TabPanel>
    </>
  );
}
