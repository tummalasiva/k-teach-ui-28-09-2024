import React, { useState } from "react";
import { academicClassTableKeys } from "../../data/tableKeys/academicClassData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function Class() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Classes" />

      <CustomTable
        actions={["edit"]}
        tableKeys={academicClassTableKeys}
        bodyDataModal="class"
        bodyData={data}
      />
    </>
  );
}
