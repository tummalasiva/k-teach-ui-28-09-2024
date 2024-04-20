import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { manageInstituteTableKeys } from "../data/tableKeys/manageInstituteData";

export default function ManageInstitute() {
  const [data, setData] = useState();
  return (
    <>
      <PageHeader title="Manage Institute" />
      <CustomTable
        actions={["edit", "switch"]}
        bodyDataModal="manage institute"
        bodyData={data}
        tableKeys={manageInstituteTableKeys}
      />
    </>
  );
}
