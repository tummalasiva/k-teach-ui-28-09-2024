/** @format */

import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { studentNoticeTableKeys } from "../../data/tableKeys/studentNoticeData";
import PageHeader from "../../components/PageHeader";

export default function Notice() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Notice" />
      <CustomTable
        actions={[]}
        tableKeys={studentNoticeTableKeys}
        bodyDataModal="notice"
        bodyData={data}
      />
    </>
  );
}
