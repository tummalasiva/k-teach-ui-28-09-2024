import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import CustomTable from "../../components/Tables/CustomTable";
import { popupSplashNewsTableKeys } from "../../data/tableKeys/popupSplashNewsData";
import { horizontalSplashNewsTableKeys } from "../../data/tableKeys/horizontalSplashNewsData";
import AddHorizontalSplash from "./AddHorizontalSplash";
import AddPopup from "./AddPopup";

export default function SplashNews() {
  const [data, setData] = useState([]);
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
        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="Horizontal Splash News"
          bodyData={data}
          tableKeys={horizontalSplashNewsTableKeys}
        />

        <AddHorizontalSplash />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="Popup Splash News"
          bodyData={data}
          tableKeys={popupSplashNewsTableKeys}
        />
        <AddPopup />
      </TabPanel>
    </>
  );
}
