/** @format */

import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { studentNewsTableKeys } from "../../data/tableKeys/studentNewsData";
import PageHeader from "../../components/PageHeader";

export default function News() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="News" />
      <CustomTable
        actions={[]}
        tableKeys={studentNewsTableKeys}
        bodyDataModal="news"
        bodyData={data}
      />
    </>
  );
}
