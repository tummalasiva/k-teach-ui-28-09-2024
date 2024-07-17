/** @format */

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
import { Add, Delete, Edit, ListAlt, Print, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";

export default function Employee() {
  const { selectedSetting } = useContext(SettingContext);
  const navigate = useNavigate();
  const [value, setSelectValue] = useState(0);
  const [activeData, setActiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [search, setSearch] = useState("");
  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  const AddEmployeeHandle = (e) => {
    navigate("/sch/human-resource/add-employee");
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      // console.log(data.result, "employyeee");
      setAllEmployee(data.result);

      const activeData = data.result
        .filter((item) => item.active)
        .map((s) => ({
          ...s,
          department: s.academicInfo.department,
          designation: s.basicInfo.designation,
        }));

      const inactiveData = data.result
        .filter((item) => !item.active)
        .map((s) => ({
          ...s,
          department: s.academicInfo.department,
          designation: s.basicInfo.designation,
        }));

      setActiveData(activeData);
      setInactiveData(inactiveData);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataDepartment = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.department.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      const overviewData = data.result.map((department) => {
        const maleCount =
          allEmployee.filter(
            (emp) =>
              emp.basicInfo.gender === "male" &&
              emp.active === true &&
              emp.academicInfo.department._id === department._id
          ).length || 0;
        const femaleCount =
          allEmployee.filter(
            (emp) =>
              emp.basicInfo.gender === "female" &&
              emp.active === true &&
              emp.academicInfo.department._id === department._id
          ).length || 0;
        const totalCount = maleCount + femaleCount;
        return {
          ...department,
          male: maleCount,
          female: femaleCount,
          total: totalCount,
        };
      });

      setOverviewData(overviewData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDepartment();
  }, [allEmployee, selectedSetting._id]);

  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.employee.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handeleClickEdit = (data) => {
    navigate(`/sch/human-resource/edit-employee/${data._id}`);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value.trim());
    if (value.trim() !== "") {
      activeData.length > 0 &&
        setSearchFilter(
          activeData.filter((ele) =>
            ele.basicInfo.name
              .toLowerCase()
              .includes(value.toLowerCase().trim())
          )
        );
    } else {
      setSearchFilter([]);
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
          actions={""}
          tableKeys={overviewTableKeys}
          bodyData={overviewData}
          bodyDataModal="employee"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            margin: "15px 0",
          }}>
          <TextField
            sx={{ ml: 1 }}
            size="small"
            value={search}
            onChange={handleSearch}
            placeholder="Search here..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" type="submit">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Tooltip title="Print">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excel Sheet Download">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <ListAlt />
            </IconButton>
          </Tooltip>
        </Box>
        <CustomTable
          actions={["edit", "delete"]}
          tableKeys={employeeTableKeys}
          bodyData={search ? searchFilter : activeData}
          bodyDataModal="employee"
          onDeleteClick={handleDelete}
          onEditClick={handeleClickEdit}
        />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            margin: "15px 0",
          }}>
          <TextField
            sx={{ ml: 1 }}
            size="small"
            value={search}
            onChange={handleSearch}
            placeholder="Search here..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" type="submit">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Tooltip title="Print">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Print />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excel Sheet Download">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <ListAlt />
            </IconButton>
          </Tooltip>
        </Box>
        <CustomTable
          actions={["edit", "delete"]}
          tableKeys={inactiveTableKeys}
          bodyDataModal="employee"
          bodyData={search ? searchFilter : InactiveData}
          onDeleteClick={handleDelete}
          onEditClick={handeleClickEdit}
        />
      </TabPanel>

      {/* == Fab button component =========== */}
      <AddForm title="Add Employee" onAddClick={AddEmployeeHandle} />
    </>
  );
}
