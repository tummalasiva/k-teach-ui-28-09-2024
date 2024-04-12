import React, { useState } from "react";
// custome components
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { userRoleTableKeys } from "../../data/tableKeys/userRoleData";

export default function UserRole() {
  const [data, setData] = useState([]);

  return (
    <>
      <PageHeader title="User Role" />
      <CustomTable
        actions={["edit"]}
        bodyDataModal="user role"
        bodyData={data}
        tableKeys={userRoleTableKeys}
      />
    </>
  );
}
