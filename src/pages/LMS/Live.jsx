import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import FilterListIcon from "@mui/icons-material/FilterList";

import CustomTable from "../../components/Tables/CustomTable";
import { liveDataTableKeys } from "../../data/tableKeys/liveData";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import AddForm from "../../forms/AddForm";

import FormSelect from "../../forms/FormSelect";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import FormModal from "../../forms/FormModal";

import FormDatePicker from "../../forms/FormDatePicker";
import FormInput from "../../forms/FormInput";

const Label = styled("label")(() => ({
  fontWeight: 650,
  fontSize: "15px",
  color: "#424242",
  paddingLeft: "10px",
}));

const FilterBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
  marginBottom: 1,
}));

const User_Type = [
  { label: "Student", value: "student" },
  { label: "Employee", value: "employee" },
];

const Participant_Type = [
  { label: "Single", value: "Single" },
  { label: "Class Students", value: "Class Students" },
  { label: "Selected", value: "Selected" },
];

const Meeting_Type = [
  { label: "OneONoneCall", value: "OneONoneCall" },
  { label: "GroupCall", value: "GroupCall" },
  { label: "LiveStreaming", value: "LiveStreaming" },
];

export default function Live() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [dataToEdit, setDataToEdit] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectClasses, setSelectClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [roles, setRoles] = useState([]);

  const [employee, setEmployee] = useState([]);
  const handleFilter = (e) => {
    setSelectedCourse(e.target.value);
  };

  const AddMeeting = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      setSelectClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });

      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: entryFormik.values.academicYear,
            "academicInfo.class": entryFormik.values.class,
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployee = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });

      console.log(data, "jjjjjjjjjjjjj");

      setEmployee(
        data.result.map((s) => ({ label: s.basicInfo.name, value: s._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);

      setRoles(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
    getSections();
    getStudents();
    getEmployee();
    getRoles();
  }, [selectedSetting]);
  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        participants:
          entryFormik.values.participantType === "Single"
            ? [entryFormik.values.participants]
            : entryFormik.values.participants,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.meeting.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.meeting.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      roomId: dataToEdit?.roomId || "",
      classId: dataToEdit?.classId || "",
      expiryDate: dataToEdit?.expiryDate || "",
      expiryTime: dataToEdit?.expiryTime || "",
      startDate: dataToEdit?.startDate || "",
      startTime: dataToEdit?.startTime || "",
      createdBy: dataToEdit?.createdBy || "",
      meetingType: dataToEdit?.meetingType || "",
      participantType: dataToEdit?.participantType || "",
      userTypes: dataToEdit?.userTypes || "",
      participants: [],
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  return (
    <>
      <PageHeader title="Live" />

      <FilterBox>
        <FormControl size="small" sx={{ m: 1, minWidth: 250 }}>
          <Label id="demo-simple-select-label">
            <FilterListIcon fontSize="small" /> Filter Meeting
          </Label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder="Select Course"
            value={selectedCourse}
            onChange={handleFilter}
          >
            <MenuItem value="All"> All </MenuItem>
            <MenuItem value="OneONoneCall">One-On-One Call </MenuItem>
            <MenuItem value="GroupCall">Group Call </MenuItem>
            <MenuItem value="LiveStreaming">Live Stream </MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <CustomTable
        actions={["edit"]}
        tableKeys={liveDataTableKeys}
        bodyDataModal="live"
        bodyData={data}
      />
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Class" : "Add Class"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}
      >
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="meetingType"
              label="Meeting Type"
              options={Meeting_Type}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="participantType"
              label="Participant Type"
              options={Participant_Type}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="userTypes"
              label="User Type"
              options={User_Type}
            />
          </Grid>

          {entryFormik.values.userTypes === "student" && (
            <>
              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="class"
                  label="Select Class"
                  options={classes}
                />
              </Grid>

              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="section"
                  label="Select Section"
                  options={sections}
                />
              </Grid>

              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="student"
                  label="Select Studennt"
                  options={students}
                />
              </Grid>
            </>
          )}

          {entryFormik.values.userTypes === "employee" && (
            <>
              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="role"
                  label="Select Role"
                  options={roles}
                />
              </Grid>

              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="employee"
                  label="Select Employee"
                  options={employee}
                />
              </Grid>
            </>
          )}

          {entryFormik.values.participantType === "Class Students" && (
            <FormSelect
              formik={entryFormik}
              name="class"
              label="Select Class"
              options={selectClasses}
            />
          )}

          <Grid xs={12} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              label="startDate"
              name="Enter Start Date"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormInput
              formik={entryFormik}
              label="startTime"
              type="time"
              name="Enter Start Time"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              label="expiryDate"
              name="Enter Expiry Date"
              required={true}
            />
          </Grid>

          <Grid xs={12} md={6} item>
            <FormInput
              formik={entryFormik}
              label="expiryTime"
              type="time"
              name="Enter Expiry Time"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>

      <AddForm title="Add Meeting" onAddClick={AddMeeting} />
    </>
  );
}
