/** @format */

import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";

import { studentAssignmentTableKeys } from "../../data/tableKeys/studentAssignmentData";
import PageHeader from "../../components/PageHeader";

export default function Assignment() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Assignment" />
      <CustomTable
        actions={["download"]}
        tableKeys={studentAssignmentTableKeys}
        bodyDataModal="assignment"
        bodyData={data}
      />
    </>
  );
}
