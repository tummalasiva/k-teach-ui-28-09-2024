import React, { useState } from "react";
import { holidayTableKeys } from "../../data/tableKeys/holidayData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function Holiday() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Holiday" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Holiday"
        bodyData={data}
        tableKeys={holidayTableKeys}
      />
    </>
  );
}
