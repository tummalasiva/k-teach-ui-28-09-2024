/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import AddForm from "../../forms/AddForm";
import FormSelect from "../../forms/FormSelect";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import FormModal from "../../forms/FormModal";
import moment from "moment";
import FormDatePicker from "../../forms/FormDatePicker";
import FormInput from "../../forms/FormInput";
import { Delete, Search } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../forms/DeleteModal";

const TableData = styled(TableCell)(() => ({
  textAlign: "center",
  color: "#ffff",
  fontWeight: 600,
}));

const TableBodydata = styled(TableCell)(() => ({
  textAlign: "center",
}));
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
const getDateWithTime = (dateTimeString = "27/09/2024 14:30") => {
  const dateTimeComponents = dateTimeString.split(" ");

  // Extract date components
  const dateComponents = dateTimeComponents[0].split("/");
  const yearExtracted = parseInt(dateComponents[2], 10);
  const monthExtracted = parseInt(dateComponents[1], 10) - 1; // Months are zero-based
  const dayExtracted = parseInt(dateComponents[0], 10);

  // Extract time components
  const timeComponents = dateTimeComponents[1].split(":");
  const hoursExtracted = parseInt(timeComponents[0], 10);
  const minutesExtracted = parseInt(timeComponents[1], 10);

  // Create a new Date object using the extracted components
  return new Date(
    yearExtracted,
    monthExtracted,
    dayExtracted,
    hoursExtracted,
    minutesExtracted
  );
};

const getStatus = (startDate, startTime, expiryDate, expiryTime) => {
  let currentDate = Date.now();
  let startDataTimestring = `${moment(startDate).format(
    "DD/MM/YYYY"
  )} ${startTime}}`;
  let expiryDateTimeString = `${moment(expiryDate).format(
    "DD/MM/YYYY"
  )} ${expiryTime}`;
  let currentDateTimeString = `${moment(currentDate).format(
    "DD/MM/YYYY"
  )} ${moment(currentDate).format("LT")}`;

  let meetingDate = getDateWithTime(startDataTimestring);
  let meetingExpiryDate = getDateWithTime(expiryDateTimeString);
  let currentDateAndTime = getDateWithTime(currentDateTimeString);

  if (meetingDate > currentDateAndTime) {
    return "Upcoming";
  } else if (
    meetingDate < currentDateAndTime &&
    meetingExpiryDate > currentDateAndTime
  ) {
    return "Available";
  } else {
    return "Expired";
  }
};

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
  { label: "One-On-One Call", value: "OneONoneCall" },
  { label: "Group Call", value: "GroupCall" },
  { label: "Live Streaming", value: "LiveStreaming" },
];

export default function Live() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [filterMeeting, setFilterMeeting] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectClasses, setSelectClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedPartcipatType, setSelectedParticipatType] = useState("All");

  const getData = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.meeting.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(data.result);
      setFilterMeeting(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const AddMeeting = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
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
            class: entryFormik.values.classId,
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
            "academicInfo.class": entryFormik.values.classId,
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
          search: {
            role: { $in: entryFormik.values.roles },
          },
        },
      });

      console.log(data, "jjjjjjjjjjjjj");

      setEmployee(
        data.result.map((s) => ({
          ...s,
          label: s.basicInfo.name,
          value: s._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);

      setRoles(data.result.map((s) => ({ ...s, label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
    getRoles();
  }, [selectedSetting]);

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  useEffect(() => {
    getData();
    getDateWithTime();
  }, []);

  // create || update actions
  const handleCreateOrUpdate = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        participants:
          entryFormik.values.participantType === "Single"
            ? [entryFormik.values.participants]
            : entryFormik.values.participants,

        employeeParticipants: employee.filter(
          (e) =>
            entryFormik.values.roles.includes(e.role) &&
            entryFormik.values.employeeParticipants.includes(e._id)
        ),
        studentParticipants: students.filter(
          (s) =>
            entryFormik.values.classId.includes(s?.academicInfo?.class?._id) &&
            entryFormik.values.section.includes(
              s?.academicInfo?.section?._id
            ) &&
            entryFormik.values.studentParticipants.includes(s?._id)
        ),
      };

      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.meeting.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.meeting.create, payload);
      }

      getData();
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      classId: dataToEdit?.classId || [],
      expiryDate: dataToEdit?.expiryDate || "",
      expiryTime: dataToEdit?.expiryTime || "",
      startDate: dataToEdit?.startDate || "",
      startTime: dataToEdit?.startTime || "",
      createdBy: dataToEdit?.createdBy || "",
      meetingType: dataToEdit?.meetingType || "",
      participantType: dataToEdit?.participantType || "",
      userTypes: dataToEdit?.userTypes || [],
      participants: [],
      roles: [],
      section: [],
      employeeParticipants: [],
      studentParticipants: [],
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (entryFormik.values.roles) {
      getEmployee();
    }
  }, [entryFormik.values.roles, selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.classId) {
      getSections();
    }
  }, [entryFormik.values.classId, selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.classId && entryFormik.values.section) {
      getStudents();
    }
  }, [entryFormik.values.classId, entryFormik.values.section, selectedSetting]);

  const handleUpdateModelOpen = (id) => {
    setDataToEdit(id);
    let meetingData = data.filter((m) => m._id == id)[0];
    if (meetingData.userTypes.includes("employee")) {
      let roles = [];
      for (let emp of meetingData.employeeParticipants) {
        if (roles.filter((r) => r == emp.role).length < 1) {
          roles.push(emp.role);
        }
      }

      entryFormik.setFieldValue("roles", roles);
      entryFormik.setFieldValue(
        "employeeParticipants",
        meetingData.employeeParticipants.map((p) => p._id)
      );
    }

    if (meetingData.userTypes.includes("student")) {
      let classes = [];
      let sections = [];
      for (let stupar of meetingData.studentParticipants) {
        if (sections.filter((s) => s == stupar.academicInfo.class).length < 1) {
          sections.push(stupar.academicInfo.section);
        }
        if (classes.filter((c) => c == stupar.academicInfo.class).length < 1) {
          classes.push(stupar.academicInfo.class);
        }
      }

      entryFormik.setFieldValue("classId", classes);
      entryFormik.setFieldValue("section", sections);
      entryFormik.setFieldValue(
        "studentParticipants",
        meetingData.studentParticipants.map((p) => p._id)
      );
    }

    if (meetingData.participantType === "Class Students") {
      entryFormik.setFieldValue(
        "classId",
        meetingData.classId.map((c) => c._id)
      );
    }

    entryFormik.setFieldValue("meetingType", meetingData.meetingType);
    entryFormik.setFieldValue("expiryDate", meetingData.expiryDate);
    entryFormik.setFieldValue("startTime", meetingData.startTime);
    entryFormik.setFieldValue("expiryTime", meetingData.expiryTime);
    entryFormik.setFieldValue("participantType", meetingData.participantType);
    entryFormik.setFieldValue("userTypes", meetingData.userTypes);

    setOpen(true);
  };

  useEffect(() => {
    if (selectedPartcipatType) {
      if (selectedPartcipatType === "All") {
        setFilterMeeting(data);
      } else {
        setFilterMeeting(
          data.filter((c) => c.meetingType === selectedPartcipatType)
        );
      }
    }
  }, [selectedPartcipatType]);
  const handleFilter = (e) => {
    setSelectedParticipatType(e.target.value);
  };

  const handleJoinClick = (id) => {
    const getMeetingId = data.find((item) => item._id === id);
    console.log(getMeetingId);
    if (getMeetingId) {
      const meetingType = getMeetingId.meetingType;
      navigate(`/sch/lms/room/${getMeetingId.roomId}`, {
        state: { meetingType: meetingType },
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.meeting.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

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
            value={selectedPartcipatType}
            onChange={handleFilter}>
            <MenuItem value="All"> All </MenuItem>
            <MenuItem value="OneONoneCall">One-On-One Call </MenuItem>
            <MenuItem value="GroupCall">Group Call </MenuItem>
            <MenuItem value="LiveStreaming">Live Streaming</MenuItem>
          </Select>
        </FormControl>
      </FilterBox>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}>
            <TableRow>
              <TableData>S.No</TableData>
              <TableData>Meeting Date</TableData>
              <TableData>Meeting Type</TableData>
              <TableData>Status</TableData>
              <TableData>Start Meeting</TableData>
              <TableData>Action</TableData>
            </TableRow>
          </TableHead>{" "}
          <TableBody>
            {(filterMeeting ? filterMeeting : data).map((listData, i) => (
              <TableRow>
                <TableBodydata>{i + 1}</TableBodydata>

                <TableBodydata>
                  {dayjs(listData.startDate).format("DD-MM-YYYY")}, Time:{" "}
                  {listData.startTime}
                </TableBodydata>
                <TableBodydata>{listData.meetingType}</TableBodydata>
                <TableBodydata>
                  <Box
                    sx={{
                      py: 1,
                      objectFit: "contain",
                      borderRadius: "5px",
                      background:
                        getStatus(
                          listData.startDate,
                          listData.startTime,
                          listData.expiryDate,
                          listData.expiryTime
                        ) === "Expired"
                          ? "#85848430"
                          : "#8281e74d",
                    }}>
                    {getStatus(
                      listData.startDate,
                      listData.startTime,
                      listData.expiryDate,
                      listData.expiryTime
                    )}
                  </Box>
                </TableBodydata>
                <TableBodydata>
                  <Button
                    disabled={
                      getStatus(
                        listData.startDate,
                        listData.startTime,
                        listData.expiryDate,
                        listData.expiryTime
                      ) === "Expired"
                    }
                    onClick={() => handleJoinClick(listData._id)}
                    variant="contained"
                    size="small">
                    Join
                  </Button>
                </TableBodydata>

                <TableBodydata>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateModelOpen(listData._id)}>
                      <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => setDeleteModal(listData._id)}>
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>

                  <DeleteModal
                    deleteModal={deleteModal}
                    handleDelete={handleDelete}
                    id={listData._id}
                    setDeleteModal={setDeleteModal}
                  />
                </TableBodydata>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!data.length && (
          <Box align="center" colSpan={12} py={2}>
            <Typography variant="h6" align="center">
              Live sessions Not found!
            </Typography>
          </Box>
        )}
        {!filterMeeting.length === 0 && (
          <Box align="center" colSpan={12} py={2}>
            <Typography variant="h6" align="center">
              Live sessions Not found!
            </Typography>
          </Box>
        )}
      </TableContainer>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Meeting" : "Add Meeting"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
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

          {(entryFormik.values.participantType === "Single" ||
            entryFormik.values.participantType === "Selected") && (
            <>
              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  multiple={true}
                  formik={entryFormik}
                  name="userTypes"
                  label="User Type"
                  options={User_Type}
                />
              </Grid>
            </>
          )}

          {entryFormik.values.userTypes.includes("student") && (
            <>
              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="classId"
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
                  name="studentParticipants"
                  multiple={
                    entryFormik.values.participantType !== "Single"
                      ? true
                      : false
                  }
                  label="Select Student"
                  options={students}
                />
              </Grid>
            </>
          )}

          {entryFormik.values.userTypes.includes("employee") && (
            <>
              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="roles"
                  label="Select Role"
                  options={roles}
                />
              </Grid>

              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="employeeParticipants"
                  label="Select Employee"
                  options={employee}
                />
              </Grid>
            </>
          )}

          {entryFormik.values.participantType === "Class Students" && (
            <>
              <Grid xs={12} sm={6} md={6} item>
                <FormSelect
                  formik={entryFormik}
                  name="classId"
                  multiple={
                    entryFormik.values.participantType === "Class Students"
                      ? true
                      : false
                  }
                  label="Select Class"
                  options={selectClasses}
                />
              </Grid>
            </>
          )}

          <Grid xs={12} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              label="Enter Start  Date"
              name="startDate"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormInput
              formik={entryFormik}
              label="Enter Start Time"
              type="time"
              name="startTime"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              label="Enter Expiry Date"
              name="expiryDate"
              required={true}
            />
          </Grid>

          <Grid xs={12} md={6} item>
            <FormInput
              formik={entryFormik}
              label="Enter Expiry Time"
              type="time"
              name="expiryTime"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>

      <AddForm title="Add Meeting" onAddClick={AddMeeting} />
    </>
  );
}
