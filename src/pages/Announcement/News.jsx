import React, { useState } from "react";
import { newsTableKeys } from "../../data/tableKeys/newsData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function News() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="News" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="News"
        bodyData={data}
        tableKeys={newsTableKeys}
      />
    </>
  );
}
