import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { notificationsTableKeys } from "../data/tableKeys/notificationsData";

export default function Notifications() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Notifications" />
      <CustomTable
        actions={[]}
        bodyDataModal="Notifications"
        bodyData={data}
        tableKeys={notificationsTableKeys}
      />
    </>
  );
}
