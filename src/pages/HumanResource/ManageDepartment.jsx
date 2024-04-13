import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import { departmentTableKeys } from "../../data/tableKeys/departmentData";

export default function ManageDepartment() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Department" />
      <CustomTable
        actions={["edit"]}
        tableKeys={departmentTableKeys}
        bodyDataModal="department"
        bodyData={data}
      />
    </>
  );
}
