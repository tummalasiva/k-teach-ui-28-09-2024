import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageInstituteTableKeys } from "../../data/tableKeys/manageInstituteData";
import AddForm from "../../forms/AddForm";
import { useNavigate } from "react-router-dom";

export default function ManageInstitute() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const AddInstitute = (e) => {
    navigate("/sch/manage-institute/add-institute");
  };
  return (
    <>
      <PageHeader title="Manage Institute" />
      <CustomTable
        actions={["edit", "switch"]}
        bodyDataModal="manage institute"
        bodyData={data}
        tableKeys={manageInstituteTableKeys}
      />
      <AddForm title="Add Institute" onAddClick={AddInstitute} />
    </>
  );
}
