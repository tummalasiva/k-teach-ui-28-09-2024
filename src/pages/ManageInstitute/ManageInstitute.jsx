import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageInstituteTableKeys } from "../../data/tableKeys/manageInstituteData";
import AddForm from "../../forms/AddForm";
import { useNavigate } from "react-router-dom";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function ManageInstitute() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const handleAddClick = (e) => {
    navigate("/sch/manage-institute/add-institute");
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.school.list);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageHeader title="Manage Institute" />
      <CustomTable
        actions={["edit", "switch"]}
        bodyDataModal="manage institute"
        bodyData={data}
        tableKeys={manageInstituteTableKeys}
        toggleStatus="active"
        // onToggleSwitch={handleToggleSwitch}
      />
      <AddForm title="Add Institute" onAddClick={handleAddClick} />
    </>
  );
}
