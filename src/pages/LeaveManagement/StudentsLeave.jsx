import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import { studentLeaveTableKeys } from "../../data/tableKeys/studentLeaveData";

export default function StudentsLeave() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Student Leave" />

      <CustomTable
        actions={["edit"]}
        tableKeys={studentLeaveTableKeys}
        bodyDataModal="student leave"
        bodyData={data}
      />
    </>
  );
}
