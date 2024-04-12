import React, { useState } from "react";
// custome components
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { rolePermissionTableKeys } from "../../data/tableKeys/rolePermissionData";

export default function RolePermission() {
  const [data, setData] = useState([]);

  return (
    <>
      <PageHeader title="Role Permission" />
      <CustomTable
        actions={["edit"]}
        bodyDataModal="role permission"
        bodyData={data}
        tableKeys={rolePermissionTableKeys}
      />
    </>
  );
}
