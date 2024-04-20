import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelRoomTableKeys } from "../../data/tableKeys/manageHostelRoom";

export default function ManageRoomType() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Hostel Room Type" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageHostelRoomTableKeys}
        bodyDataModal="room"
        bodyData={data}
      />
    </>
  );
}
