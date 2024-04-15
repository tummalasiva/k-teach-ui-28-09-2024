import React, { useState } from "react";
import { examGradeTableKeys } from "../../data/tableKeys/examGradeData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function ExamGrade() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Exam Grade" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="exam grades"
        bodyData={data}
        tableKeys={examGradeTableKeys}
      />
    </>
  );
}
