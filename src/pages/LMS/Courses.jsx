import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { coursesDataTableKeys } from "../../data/tableKeys/lmsCoursesData";
import CustomTable from "../../components/Tables/CustomTable";

export default function Courses() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Courses" />

      <CustomTable
        actions={["edit"]}
        tableKeys={coursesDataTableKeys}
        bodyDataModal="course"
        bodyData={data}
      />
    </>
  );
}
