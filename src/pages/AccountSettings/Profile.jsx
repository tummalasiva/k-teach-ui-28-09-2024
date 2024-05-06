import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  tableCellClasses,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import themeData from "../../data/themeData";
// icons
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import FormTable from "./FormTable";
import ProfileUpdate from "./ProfileUpdate";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

export default function Profile() {
  const { selectedSetting } = useContext(SettingContext);
  const [value, setSelectValue] = useState(0);
  // const [dataToEdit, setDataToEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  console.log(selectedSetting, "selectedSetting");
  console.log(employee, "employee");

  const getEmployees = async () => {
    const user = window.localStorage.getItem("current_ecs_user");
    setEmployee(JSON.parse(user));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        schoolId: selectedSetting._id,
        basicInfo: {
          name: values.name,
          designation: values.designation,
          gender: values.gender,
          bloodGroup: values.bloodGroup,
          religion: values.religion,
          dob: values.dob,
          presentAddress: values.presentAddress,
          permanentAddress: values.permanentAddress,
          aadharNo: values.aadharNo,
        },
        academicInfo: {
          email: values.email,
          joiningDate: values.joiningDate,
          resume: values.resume,
        },
        otherInfo: {
          facebookUrl: values?.facebookUrl,
          twitterUrl: values?.twitterUrl,
          linkedinUrl: values?.linkedinUrl,
          googlePlusUrl: values?.googlePlusUrl,
          youtubeUrl: values?.youtubeUrl,
          instagramUrl: values?.instagramUrl,
          pinterestUrl: values?.pinterestUrl,
        },
        username: values.username,
        photo: values.photo,
        contactNumber: values.contactNumber,
      };
      setLoading(true);
      if (employee) {
        const { data } = await put(
          PRIVATE_URLS.employee.update + "/" + employee._id,
          payload
        );
        getEmployees();
      } else {
        const { data } = await post(PRIVATE_URLS.employee.create, payload);
        console.log(data, "gg");
        getEmployees();
      }
      // handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (!employee) {
    return null;
  }

  return (
    <>
      <PageHeader title="Profile" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Profile", "Update Profile"]}
      />
      <TabPanel index={0} value={value}>
        {/* {employee && ( */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <FormTable employee={employee} />
        </Box>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <ProfileUpdate
          handleCreateOrUpdate={handleCreateOrUpdate}
          employee={employee}
          setSelectValue={setSelectValue}
        />
      </TabPanel>
    </>
  );
}
