import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelRoomBedTableKeys } from "../../data/tableKeys/manageHostelRoomBedData";

export default function ManageRoomAndBed() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Hostel Room & Beds" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageHostelRoomBedTableKeys}
        bodyDataModal="room"
        bodyData={data}
      />
    </>
  );
}
