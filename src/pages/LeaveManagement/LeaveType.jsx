import React, { useState } from "react";
import { leaveTypeTableKeys } from "../../data/tableKeys/leaveTypeData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function LeaveType() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Leave Type" />

      <CustomTable
        actions={["edit"]}
        tableKeys={leaveTypeTableKeys}
        bodyDataModal="leave type"
        bodyData={data}
      />
    </>
  );
}
