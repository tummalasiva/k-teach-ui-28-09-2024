/** @format */

import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { studentInvoiceTableKeys } from "../../data/tableKeys/studentInvoiceData";
import PageHeader from "../../components/PageHeader";

export default function Invoice() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Invoice" />
      <CustomTable
        actions={["download"]}
        tableKeys={studentInvoiceTableKeys}
        bodyDataModal="invoice"
        bodyData={data}
      />
    </>
  );
}
