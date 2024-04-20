import React, { useState } from "react";
import { noticeTableKeys } from "../../data/tableKeys/noticeData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function Notice() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Notice" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Notice"
        bodyData={data}
        tableKeys={noticeTableKeys}
      />
    </>
  );
}
