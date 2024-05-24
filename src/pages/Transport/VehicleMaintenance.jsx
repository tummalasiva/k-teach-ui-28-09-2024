/** @format */

import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import Firm from "../../components/Transport/Firm";
import Fuel from "../../components/Transport/Fuel";
import Repair from "../../components/Transport/Repair";
import VehicleTire from "../../components/Transport/VehicleTire";
import Greecing from "../../components/Transport/Greecing";

export default function VehicleMaintenance() {
  const [value, setSelectValue] = useState(0);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  return (
    <>
      <PageHeader title="Vehicle Maintenance:" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={[
          "Firm",
          "Vehicle Fuel",
          "Repair Maintenance",
          "New Tyre/Resole",
          "Greecing",
        ]}
      />
      <TabPanel index={0} value={value}>
        <Firm />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Fuel />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Repair />
      </TabPanel>
      <TabPanel index={3} value={value}>
        <VehicleTire />
      </TabPanel>
      <TabPanel index={4} value={value}>
        <Greecing />
      </TabPanel>
    </>
  );
}
