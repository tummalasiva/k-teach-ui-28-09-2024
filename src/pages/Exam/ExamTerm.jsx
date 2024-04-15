import React, { useState } from "react";
import { examTermTableKeys } from "../../data/tableKeys/examTermData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

export default function ExamTerm() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Exam Term" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="exam terms"
        bodyData={data}
        tableKeys={examTermTableKeys}
      />
    </>
  );
}
