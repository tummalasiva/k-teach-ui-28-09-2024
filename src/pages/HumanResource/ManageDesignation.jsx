import React, { useState } from "react";
import { designationTableKeys } from "../../data/TableData/designation";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function ManageDesignation() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Designation" />
      <CustomTable
        actions={["edit"]}
        tableKeys={designationTableKeys}
        bodyDataModal="designation"
        bodyData={data}
      />
    </>
  );
}
