/** @format */

import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";

import { studentReceiptsTableKeys } from "../../data/tableKeys/studentReceiptsData";
import PageHeader from "../../components/PageHeader";

export default function Receipts() {
  const [data, setData] = useState([]);
  return (
    <>
      <CustomTable
        actions={["download"]}
        tableKeys={studentReceiptsTableKeys}
        bodyDataModal="receipts"
        bodyData={data}
      />
    </>
  );
}
