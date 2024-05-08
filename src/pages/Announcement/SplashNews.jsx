import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";

import AddHorizontalSplash from "./AddHorizontalSplash";
import AddPopup from "./AddPopup";

export default function SplashNews() {
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <PageHeader title="Splash News" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Horizontal", "Popup"]}
      />
      <TabPanel index={0} value={value}>
        <AddHorizontalSplash />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <AddPopup />
      </TabPanel>
    </>
  );
}
