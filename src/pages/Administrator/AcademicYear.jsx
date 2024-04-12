import React, { useState } from "react";
// custome components
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicYearTableKeys } from "../../data/tableKeys/academicYearData";

export default function AcademicYear() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Academic Year" />
      <CustomTable
        actions={["edit"]}
        bodyDataModal="academic year"
        bodyData={data}
        tableKeys={academicYearTableKeys}
      />
    </>
  );
}
