import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { coursesDataTableKeys } from "../../data/tableKeys/lmsCoursesData";
import CustomTable from "../../components/Tables/CustomTable";
import { useNavigate } from "react-router-dom";
import AddForm from "../../forms/AddForm";

export default function Courses() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/sch/lms/add-courses");
  };

  return (
    <>
      <PageHeader title="Courses" />

      <CustomTable
        actions={["edit"]}
        tableKeys={coursesDataTableKeys}
        bodyDataModal="course"
        bodyData={data}
      />

      <AddForm onAddClick={handleSubmit} />
    </>
  );
}
