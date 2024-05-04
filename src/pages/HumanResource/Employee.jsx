import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { overviewTableKeys } from "../../data/tableKeys/overviewData";
import { employeeTableKeys } from "../../data/tableKeys/employeeData";
import { inactiveTableKeys } from "../../data/tableKeys/inactiveEmployee";
import AddForm from "../../forms/AddForm";
import { useNavigate } from "react-router-dom";
import { get, del, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

export default function Employee() {
  const { selectedSetting } = useContext(SettingContext);
  const navigation = useNavigate();
  const [value, setSelectValue] = useState(0);
  const [activeData, setActiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const handleTabChange = (e, newValue) => setSelectValue(newValue);
  const AddEmployeeHandle = (e) => {
    navigation("/sch/human-resource/add-employee");
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      console.log(data.result);
      const activeData = data.result.filter((item) => item.active);
      const inactiveData = data.result.filter((item) => !item.active);

      const activeDatas = activeData.map((item) => ({
        name: item.basicInfo?.name,
        designation: item.basicInfo.designation.name,
        active: item.active,
        empId: item.basicInfo.empId,
        department: item.academicInfo.department.name,
      }));

      const inactiveDatas = inactiveData.map((item) => ({
        name: item.basicInfo?.name,
        designation: item.basicInfo.designation.name,
        active: item.active,
        empId: item.basicInfo.empId,
        department: item.academicInfo.department.name,
      }));
      setActiveData(activeDatas);
      setInactiveData(inactiveDatas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.employee.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <PageHeader title="Employee" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Overview", "Employee List", "Inactive Employee List"]}
      />
      <TabPanel index={0} value={value}>
        <CustomTable
          tableKeys={overviewTableKeys}
          // bodyData={data}
          bodyDataModal="employee"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          actions={["edit", "delete"]}
          tableKeys={employeeTableKeys}
          bodyData={activeData}
          bodyDataModal="employee"
          onDeleteClick={handleDelete}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <CustomTable
          actions={["edit", "delete"]}
          tableKeys={inactiveTableKeys}
          bodyDataModal="employee"
          bodyData={InactiveData}
          onDeleteClick={handleDelete}
        />
      </TabPanel>

      {/* == Fab button component =========== */}
      <AddForm title="Add Employee" onAddClick={AddEmployeeHandle} />
    </>
  );
}
