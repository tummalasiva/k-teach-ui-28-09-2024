import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { reconciliationTableKeys } from "../../data/tableKeys/reconciliationData";
import CustomTable from "../../components/Tables/CustomTable";

export default function ReceiptBook() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Fee Reconciliation" />
      <CustomTable
        actions={[]}
        bodyDataModal="Fee Reconciliation"
        bodyData={data}
        tableKeys={reconciliationTableKeys}
      />
    </>
  );
}
