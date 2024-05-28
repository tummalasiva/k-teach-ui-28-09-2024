/** @format */

import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { employeeLeaveManageTableKeys } from "../../data/tableKeys/employeeLeaveManageData";
import { employeeLeaveTableKeys } from "../../data/tableKeys/employeeLeaveListData";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
} from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormModal from "../../forms/FormModal";
import { post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import AddForm from "../../forms/AddForm";
import FileSelect from "../../forms/FileSelect";
import { useContext } from "react";
import FormInput from "../../forms/FormInput";
import FormDatePicker from "../../forms/FormDatePicker";
import CustomSelect from "../../forms/CustomSelect";

const LeaveData = styled(Paper)(({ theme }) => ({
  height: "80px",
  padding: "20px",
  textAlign: "center",
}));

const DataContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
}));

const Leave_Options = [
  { label: "FullDay", value: "fullday" },
  { label: "First half", value: "firstHalf" },
  { label: "Second half", value: "secondHalf" },
];

export default function EmployeeLeave() {
  const [value, setSelectValue] = useState(0);
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectImg, setSelectImg] = useState([]);
  const [totalDays, settotalDays] = useState(0);

  const [range, setRange] = useState([]);
  const [leaveType, setLeaveType] = useState([
    { name: "sick", total: "89" },
    { name: "common", total: "100" },
  ]);

  const AddLeave = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();
    formData.append("schoolId", selectedSetting._id);
    formData.append("leaveType", values.leaveType);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("subject", values.subject);

    selectImg.forEach((file) => formData.append("file", file));

    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.books.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.books.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      leaveType: dataToEdit?.leaveType || "",
      startDate: dataToEdit?.startDate || "",
      endDate: dataToEdit?.endDate || "",
      subject: dataToEdit?.subject || "",
      description: dataToEdit?.description || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setSelectImg(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setSelectImg(selectImg.filter((img) => img.name != fileName));
  };

  const handleTabChange = (e, newValue) => setSelectValue(newValue);

  let handleNumberOfDay = (e, v) => {
    const { name, value } = e.target;

    const indexOfV = range.indexOf(v);
    let updatedList = range.map((item, index) =>
      index == indexOfV ? { ...item, value: value } : item
    );
    setRange(updatedList);
  };

  useEffect(() => {
    let number = 0;
    for (let item of range) {
      if (item.value) {
        if (item.value === "fullday") {
          number += 1;
        } else {
          number += 0.5;
        }
      }
    }
    settotalDays(number);
  }, [range]);

  useEffect(() => {
    if (entryFormik.values.endDate && entryFormik.values.startDate) {
      const start = new Date(entryFormik.values.startDate);
      const end = new Date(entryFormik.values.endDate);
      if (start <= end) {
        const currentDate = new Date(start);
        let list = [];
        while (currentDate <= end) {
          let newItem = {
            value: "",
            date: new Date(currentDate).toLocaleDateString(),
          };
          list.push(newItem);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setRange(list);
      }
    }
  }, [entryFormik.values.endDate, entryFormik.values.startDate]);

  return (
    <>
      <PageHeader title="Employee Leave" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Leave List", "Leave Manage"]}
      />
      <TabPanel index={0} value={value}>
        <DataContainer container spacing={2}>
          <Grid item xs={4} md={4} lg={2}>
            <LeaveData>
              <Typography fontSize="15px" color="#196838">
                Total taken :89
              </Typography>
            </LeaveData>
          </Grid>
          {leaveType.map((data) => (
            <Grid item xs={4} md={4} lg={2}>
              <LeaveData>
                <Typography fontSize="15px">
                  {data.name}:{data.total}
                </Typography>
                <Typography fontSize="15px">Total taken :0</Typography>
              </LeaveData>
            </Grid>
          ))}
        </DataContainer>

        <CustomTable
          tableKeys={employeeLeaveTableKeys}
          bodyData={data}
          bodyDataModal="leave"
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CustomTable
          tableKeys={employeeLeaveManageTableKeys}
          bodyData={data}
          bodyDataModal="leave"
        />
      </TabPanel>

      <AddForm title="Add Leave" onAddClick={AddLeave} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Leave" : "Add Leave"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="leaveType"
              label="Leave Type"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="startDate"
              label="Start Date"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="endDate"
              label="End Date"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FormInput formik={entryFormik} name="subject" label="Subject" />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <FileSelect
              name="image"
              label="Select File"
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={selectImg}
              onRemove={(fileName) => handleRemoveFile(fileName)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              margin: "15px 0px",
            }}>
            <Typography>Number of days : {totalDays}</Typography>
          </Grid>
          {!entryFormik.values.endDate ? (
            <></>
          ) : (
            <Grid item xs={12} md={12} lg={12}>
              <Typography required>Information :</Typography>
              {!entryFormik.values.endDate ? (
                <></>
              ) : (
                <Box
                  style={{
                    height: "100px",
                    overflow: "scroll",
                  }}>
                  {range.map((date, index) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      key={index}>
                      <Typography>{date.date}</Typography>

                      <CustomSelect
                        name="totalDays"
                        value={date.value}
                        onChange={(e) => handleNumberOfDay(e, date)}
                        options={Leave_Options}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </FormModal>
    </>
  );
}
