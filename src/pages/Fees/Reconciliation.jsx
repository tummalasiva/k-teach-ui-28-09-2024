import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { reconciliationTableKeys } from "../../data/tableKeys/reconciliationData";

export default function Reconciliation() {
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
