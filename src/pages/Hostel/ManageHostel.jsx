import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelTableKeys } from "../../data/tableKeys/manageHostelData";

export default function ManageHostel() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Hostel" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageHostelTableKeys}
        bodyDataModal="hostel"
        bodyData={data}
      />
    </>
  );
}
