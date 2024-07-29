/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageInstituteTableKeys } from "../../data/tableKeys/manageInstituteData";
import AddForm from "../../forms/AddForm";
import { useNavigate } from "react-router-dom";
import { get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

export default function ManageInstitute() {
  const [data, setData] = useState();
  const { setSettings, settings } = useContext(SettingContext);
  const navigate = useNavigate();
  const handleAddClick = (e) => {
    navigate("/sch/manage-institute/add-institute");
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.school.list);
      setSettings(data.result.filter((s) => s.active));
      setData(data.result); // updating the settings state with the fetched data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleToggleSwitch = async (school) => {
    try {
      const { data } = await put(
        PRIVATE_URLS.school.toggleActiveStatus + "/" + school._id
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    navigate(`/sch/manage-institute/edit-institute/${data._id}`);
  };
  return (
    <>
      <PageHeader title="Manage Institute" />
      <CustomTable
        actions={["edit", "switch"]}
        module="Institute"
        bodyDataModal="manage institute"
        bodyData={data}
        tableKeys={manageInstituteTableKeys}
        toggleStatus="active"
        onToggleSwitch={handleToggleSwitch}
        onEditClick={handleEdit}
      />
      {!settings.length ? (
        <AddForm
          module="Institute"
          title="Add Institute"
          onAddClick={handleAddClick}
        />
      ) : null}
    </>
  );
}
