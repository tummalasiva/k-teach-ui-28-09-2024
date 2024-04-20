import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { salaryGradeTableKeys } from "../../data/tableKeys/salaryGradeData";

export default function SalaryGrade() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Salary Grade" />

      <CustomTable
        actions={["edit"]}
        tableKeys={salaryGradeTableKeys}
        bodyDataModal="salary grade"
        bodyData={data}
      />
    </>
  );
}
