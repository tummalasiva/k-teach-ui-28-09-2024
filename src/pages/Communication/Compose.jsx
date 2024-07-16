/** @format */

import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  linearProgressClasses,
  MenuItem,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Switch,
  Button,
  Checkbox,
  ListItemText,
  Autocomplete,
  InputBase,
  Popper,
  InputAdornment,
  Typography,
} from "@mui/material";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { LoadingButton } from "@mui/lab";
import PageHeader from "../../components/PageHeader";
import FileSelect from "../../forms/FileSelect";
import { useLocation } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 800 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: theme.palette.mode === "light" ? "#f42323" : "#308fe8",
  },
}));
const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: `1px solid ${
    theme.palette.mode === "light" ? "#eaecef" : "#30363d"
  }`,
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${
      theme.palette.mode === "light" ? "#eaecef" : "#30363d"
    }`,
    fontSize: 14,
    "&:focus": {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === "light"
          ? "rgba(3, 102, 214, 0.3)"
          : "rgb(12, 45, 107)"
      }`,
      borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
    },
  },
}));

const Compose = () => {
  const { selectedSetting } = useContext(SettingContext);

  const { state } = useLocation();
  const [sendingMessage, setSendingMessage] = useState(false);
  const [roles, setRoles] = useState([]);
  const [receiverType, setReceiverType] = useState("");
  const [selectRoles, setSelectRoles] = useState([]);

  const [smsFrom, setSmsFrom] = useState({
    sms: state
      ? state.message
      : `Dear {{VAR}}, We would like to inform you {{VAR1}},{{VAR2}},{{VAR3}},{{VAR4}},{{VAR5}} Regards EXCELLENT SCHOOL VIJAYAPURA.`,
  });

  const [contacts, setContacts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classPopper, setClassPopper] = useState(false);
  const [sectionPopper, setSectionPopper] = useState(false);
  const [contactsPopper, setContactsPopper] = useState(false);
  const [students, setStudents] = useState([]);
  const [notifyChecked, setNotifyChecked] = useState(false);
  const [selectClass, setSelectClass] = useState("");
  const [selectSection, setSelectSection] = useState("");
  const [selectContacts, setSelectContacts] = useState("");
  const [selectedStudentCount, setSelectedStudentCount] = useState(0);
  const [selectEmployee, setSelectEmployee] = useState("");
  const [classAutoSelect, setClassAutoSelect] = useState([]);
  const [sectionAutoSelect, setSectionAutoSelect] = useState([]);
  const [contactsAutoSelect, setContactsAutoSelect] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  const [employeeListPopper, setEmployeeListPopper] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState(0);
  const [employeeAutoSelect, setEmployeeAutoSelect] = useState([]);

  const [balance, setBalance] = useState("");

  const handleEmployeeAuto = (event, val) => {
    const findAll = val.some((item) => item._id === "all");

    if (findAll) {
      if (employeeAutoSelect.length === employees.length) {
        setEmployeeAutoSelect([]);
        setSelectedEmployeeCount(0);
        setSelectEmployee("");
      } else {
        setEmployeeAutoSelect([...employees]);
        setSelectedEmployeeCount(employees.length);
        setSelectEmployee("All");
      }
    } else {
      const employeeNames = val.map((emp) => emp.basicInfo.name);
      const selectedEmployeeIds = val.map((emp) => emp._id);
      setEmployeeAutoSelect(val);
      setSelectedEmployeeCount(val.length);
      setSelectEmployee(employeeNames.join(", "));
    }
  };

  useEffect(() => {
    setSectionAutoSelect([]);
    setSelectSection("");
    setSelectContacts("");
    setContactsAutoSelect([]);
  }, [classAutoSelect, selectedSetting._id]);

  useEffect(() => {
    setSelectContacts("");
    setContactsAutoSelect([]);
  }, [sectionAutoSelect, selectedSetting._id]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const { data } = await get(PRIVATE_URLS.role.list);
        setRoles(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    getRoles();
  }, []);

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setSelectFile(fileList);
    } else {
      console.log("No files selected");
    }
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        const { data } = await get(PRIVATE_URLS.class.list, {
          params: {
            schoolId: selectedSetting._id,
          },
        });
        setClasses(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    getClasses();
  }, [selectedSetting._id]);

  const handleSelectRoleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRoles(typeof value === "string" ? value.split(",") : value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSmsFrom({ ...smsFrom, [name]: value });
  };

  const handleRoleChange = async (e) => {
    handleFormChange(e);
    const role = e.target.value;
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: {
              $in: role,
            },
          },
        },
      });
      setEmployees(data.result);
    } catch (error) {}
  };

  const handleContactsList = (event, val) => {
    const findAll = val.some((item) => item._id === "all");

    if (findAll) {
      if (contactsAutoSelect.length === students.length) {
        setContactsAutoSelect([]);
        setContacts([]);
        setSelectedStudentCount(0);
        setSelectContacts("");
      } else {
        const allStudentContacts = students.map((student) => student._id);
        setContactsAutoSelect([...students]);
        setContacts(allStudentContacts);
        setSelectedStudentCount(students.length);
        setSelectContacts("All");
      }
    } else {
      const studentNames = val.map((schclass) => schclass.basicInfo.name);
      const contacts = val.map((ele) => ele._id);
      setContacts(contacts);
      setSelectedStudentCount(val.length);
      setSelectContacts(studentNames.join(", "));
      setContactsAutoSelect(val);
    }
  };

  const handleClassSelect = async (e, val) => {
    const classIds = val.map((schclass) => schclass._id);
    const classNames = val.map((schclass) => schclass.name);
    setClassAutoSelect(val);
    setSelectClass(classNames.join(","));
    try {
      if (val.length) {
        const { data } = await get(PRIVATE_URLS.section.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              class: {
                $in: classIds,
              },
            },
          },
        });

        const sortedSections = data.result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSections(sortedSections);
      } else {
        setSections([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSectionSelect = async (e, val) => {
    const sectionIds = val.map((section) => section._id);
    const sectionNames = val.map((section) => section.name);
    const classNames = val.map((section) => section.class.name);

    setSectionAutoSelect(val);
    setSelectSection(
      sectionNames
        .map((name, index) => `${name} (${classNames[index]})`)
        .join(", ")
    );

    try {
      if (val.length) {
        const { data } = await get(PRIVATE_URLS.student.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              "academicInfo.section": sectionIds,
            },
          },
        });

        setStudents(data.result);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotifiy = (e) => {
    setNotifyChecked(e.target.checked);
  };

  return (
    <>
      <PageHeader title="Compose" />

      <form>
        <Card sx={{ padding: "10px", mb: 1 }}>
          <Box
            sx={{
              paddingLeft: "1rem",
              display: "flex",
              gap: "5px",
            }}>
            <Box>
              Total SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                79875
              </Typography>
            </Box>
            <Box>
              Consumed SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                {79875 - balance}
              </Typography>
            </Box>
            <Box>
              Balance SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                {balance}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "1rem",
            }}>
            <BorderLinearProgress
              variant="determinate"
              value={((79875 - balance) * 100) / 79875}
            />
          </Box>
        </Card>
        <Card sx={{ padding: "10px", mb: 1 }}>
          <Box sx={{ flexFlow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-filrlccled-label">
                    Receiver Type
                  </InputLabel>
                  <Select
                    label="Receiver Type"
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="receiverType"
                    value={receiverType}
                    onChange={(e) => setReceiverType(e.target.value)}>
                    <MenuItem
                      value={"role"}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      Role
                    </MenuItem>
                    <MenuItem
                      value={"user"}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      User
                    </MenuItem>
                    <MenuItem
                      value={"students"}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      Students
                    </MenuItem>
                    <MenuItem
                      value={"All Students"}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      All Students
                    </MenuItem>
                    <MenuItem
                      value={"file"}
                      sx={{ fontSize: 12, fontWeight: 500 }}>
                      File
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {receiverType === "file" && (
                <>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                      alignSelf: "center",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}>
                    <Button size="small" variant="contained">
                      Sample File
                    </Button>

                    <FileSelect
                      name="file"
                      onChange={(e) => handleChangeFiles(e)}
                      customOnChange={true}
                      label="Select File"
                      selectedFiles={selectFile}
                    />
                  </Grid>
                </>
              )}
              {receiverType === "students" && (
                <>
                  <Grid item xs={12} md={3} lg={3}>
                    <TextField
                      value={selectClass}
                      fullWidth
                      aria-describedby={"classPopper"}
                      onFocus={(e) => {
                        setClassPopper(classPopper ? null : e.currentTarget);
                      }}
                      variant="outlined"
                      size="small"
                      label="Class"
                    />
                    <Popper
                      id={"classPopper"}
                      open={!!classPopper}
                      anchorEl={classPopper}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <Autocomplete
                          onBlur={() => setClassPopper(null)}
                          open={true}
                          value={classAutoSelect}
                          multiple
                          onChange={handleClassSelect}
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          options={classes}
                          disableCloseOnSelect
                          getOptionLabel={(option) => `${option.name}`}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                checked={selected}
                              />
                              {`${option.name}`}
                            </li>
                          )}
                          renderInput={(params) => (
                            <StyledInput
                              ref={params.InputProps.ref}
                              inputProps={params.inputProps}
                              placeholder="Class"
                              autoFocus
                            />
                          )}
                        />
                      </FormControl>
                    </Popper>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <TextField
                      value={selectSection}
                      aria-describedby={"sectionPopper"}
                      fullWidth
                      onFocus={(e) => {
                        setSectionPopper(
                          sectionPopper ? null : e.currentTarget
                        );
                      }}
                      variant="outlined"
                      size="small"
                      label="Section"
                    />
                    <Popper
                      id={"sectionPopper"}
                      open={!!sectionPopper}
                      anchorEl={sectionPopper}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        <Autocomplete
                          multiple
                          onBlur={() => setSectionPopper(null)}
                          open={true}
                          value={sectionAutoSelect}
                          onChange={handleSectionSelect}
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          id="checkboxes-tags-demo"
                          options={sections.sort((a, b) =>
                            a.class.name.localeCompare(b.class.name)
                          )}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>
                            `${option.name}(class:${option.class.name})`
                          }
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {`${option.name}(class:${option.class.name})`}
                            </li>
                          )}
                          renderInput={(params) => (
                            <StyledInput
                              ref={params.InputProps.ref}
                              inputProps={params.inputProps}
                              placeholder="Section"
                              autoFocus
                            />
                          )}
                        />
                      </FormControl>
                    </Popper>
                  </Grid>

                  <Grid item xs={12} md={3} lg={3}>
                    <TextField
                      value={selectContacts}
                      aria-describedby={"contactsPopper"}
                      fullWidth
                      onFocus={(e) => {
                        setContactsPopper(
                          contactsPopper ? null : e.currentTarget
                        );
                      }}
                      variant="outlined"
                      size="small"
                      label="Students"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            All Total-{selectedStudentCount}
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Popper
                      id={"contactsPopper"}
                      open={!!contactsPopper}
                      anchorEl={contactsPopper}>
                      <FormControl variant="outlined" size="small" fullWidth>
                        {/* <Autocomplete
                          multiple
                          onBlur={() => setContactsPopper(null)}
                          open={true}
                          value={contactsAutoSelect}
                          onChange={handleContactsList}
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          id="checkboxes-tags-demo"
                          options={[
                            {
                              _id: "all",
                              basicInfo: {
                                name: "All",
                              },
                              contactNumber: "",
                            },
                            ...students,
                          ]}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>
                            option._id === "all"
                              ? "All"
                              : `${option.basicInfo.name} (${option.contactNumber})`
                          }
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />

                              {`${option.basicInfo.name} (${option.contactNumber})`}
                            </li>
                          )}
                          renderInput={(params) => (
                            <StyledInput
                              ref={params.InputProps.ref}
                              inputProps={params.inputProps}
                              placeholder="Students"
                              autoFocus
                            />
                          )}
                        /> */}

                        <Autocomplete
                          multiple
                          onBlur={() => setContactsPopper(null)}
                          open={true}
                          value={contactsAutoSelect}
                          onChange={handleContactsList}
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          id="checkboxes-tags-demo"
                          options={[
                            {
                              _id: "all",
                              basicInfo: {
                                name: `All (${students.length})`,
                              },
                              contactNumber: "",
                            },
                            ...students,
                          ]}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>
                            option._id === "all"
                              ? `All (${students.length})`
                              : `${option.basicInfo.name} (${option.contactNumber})`
                          }
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={
                                  selected ||
                                  (option._id === "all" &&
                                    contactsAutoSelect.length ===
                                      students.length)
                                }
                              />
                              {option._id === "all"
                                ? `All (${students.length})`
                                : `${option.basicInfo.name} (${option.contactNumber})`}
                            </li>
                          )}
                          renderInput={(params) => (
                            <Box
                              sx={{
                                ml: 5,
                                width: "100%",
                              }}>
                              <StyledInput
                                ref={params.InputProps.ref}
                                inputProps={params.inputProps}
                                placeholder="Search student with name"
                                autoFocus
                              />
                            </Box>
                          )}
                        />
                      </FormControl>
                    </Popper>
                  </Grid>
                </>
              )}

              {receiverType === "role" && (
                <Grid item xs={12} md={3} lg={3}>
                  <FormControl size="small" fullWidth>
                    <InputLabel sx={{ fontSize: 12 }}>Role</InputLabel>
                    <Select
                      label="Role"
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={selectRoles}
                      onChange={handleSelectRoleChange}
                      multiple
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}>
                      {roles &&
                        roles.map((row, index) => (
                          <MenuItem
                            key={row._id}
                            value={row.name}
                            sx={{ fontSize: 12 }}>
                            <Checkbox
                              checked={selectRoles.indexOf(row.name) > -1}
                            />
                            <ListItemText primary={row.name} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {receiverType === "user" && (
                <>
                  <Grid item xs={12} md={3} lg={3}>
                    <FormControl size="small" fullWidth>
                      <InputLabel sx={{ fontSize: 12 }}>Role</InputLabel>

                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        name="role"
                        sx={{ marginBottom: "15px" }}
                        label="Role"
                        size="small"
                        onChange={handleRoleChange}
                        value={smsFrom.role}>
                        {roles &&
                          roles
                            .filter((r) => r.name?.toLowerCase() !== "student")
                            .map((row, index) => (
                              <MenuItem
                                key={row._id}
                                value={row._id}
                                sx={{ fontSize: 12, fontWeight: 500 }}>
                                {row.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* <Grid item xs={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      value={selectEmployee}
                      aria-describedby={"employeePopper"}
                      onFocus={(e) => {
                        setEmployeeListPopper(
                          employeeListPopper ? null : e.currentTarget
                        );
                      }}
                      variant="outlined"
                      size="small"
                      label="Employees"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            All Total- {selectedEmployeeCount}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Popper
                      id={"employeePopper"}
                      open={!!employeeListPopper}
                      anchorEl={employeeListPopper}>
                      <FormControl variant="outlined" fullWidth size="small">
                        <Autocomplete
                          onBlur={() => setEmployeeListPopper(null)}
                          open={true}
                          value={employeeAutoSelect}
                          multiple
                          onChange={handleEmployeeAuto}
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          options={[
                            {
                              _id: "all",
                              basicInfo: { name: "All" },
                            },
                            ...employees,
                          ]}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>
                            `${option?.basicInfo.name} (${option?.contactNumber})`
                          }
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                checked={
                                  selected ||
                                  (option._id === "all" &&
                                    employeeAutoSelect.length ===
                                      employees.length)
                                }
                              />
                              {option._id === "all"
                                ? `All (${employees.length})`
                                : `${option?.basicInfo.name} (${option?.contactNumber})`}
                            </li>
                          )}
                          renderInput={(params) => (
                            <Box
                              sx={{
                                ml: 5,
                                width: "100%",
                              }}>
                              <StyledInput
                                ref={params.InputProps.ref}
                                inputProps={params.inputProps}
                                placeholder="Employees"
                                autoFocus
                              />
                            </Box>
                          )}
                        />
                      </FormControl>
                    </Popper>
                  </Grid> */}
                </>
              )}

              {smsFrom.role && receiverType === "user" && (
                <Grid item xs={12} md={3} lg={3}>
                  <FormControl required={true} fullWidth>
                    <Autocomplete
                      multiple
                      fullWidth
                      size="small"
                      onChange={handleContactsList}
                      id="checkboxes-tags-demo"
                      options={employees}
                      disableCloseOnSelect
                      getOptionLabel={(option) =>
                        `${option.basicInfo.name} (${option.contactNumber})`
                      }
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {`${option.basicInfo.name} (${option.contactNumber})`}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          {...params}
                          label="Employees"
                          placeholder="Favorites"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
        <Card sx={{ padding: "10px", mb: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl required={true} size="small" fullWidth>
                <InputLabel sx={{ fontSize: 12 }}>SMS Type</InputLabel>
                <Select
                  label="SMS Type"
                  id="demo-simple-select-filled"
                  name="smsType"
                  value={smsFrom.smsType || ""}
                  onChange={handleFormChange}>
                  <MenuItem
                    value={"general"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    General
                  </MenuItem>
                  <MenuItem
                    value={"attendance"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Attendence
                  </MenuItem>
                  <MenuItem
                    value={"fee"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Fee
                  </MenuItem>
                  <MenuItem
                    value={"credential"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Credential
                  </MenuItem>
                  <MenuItem
                    value={"exam"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Exam
                  </MenuItem>
                  <MenuItem
                    value={"leave"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Leave
                  </MenuItem>
                  <MenuItem
                    value={"library"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Library
                  </MenuItem>
                  <MenuItem
                    value={"transport"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Transport
                  </MenuItem>
                  <MenuItem
                    value={"hostel"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Hostel
                  </MenuItem>
                  <MenuItem
                    value={"preaddmission"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Preaddmission
                  </MenuItem>
                  <MenuItem
                    value={"parentMeeting"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Parent Meeting
                  </MenuItem>
                  <MenuItem
                    value={"schoolTiming"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    School Timing
                  </MenuItem>
                  <MenuItem
                    value={"notice"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Notice
                  </MenuItem>
                  <MenuItem
                    value={"schoolOpen"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    School Open
                  </MenuItem>
                  <MenuItem
                    value={"education"}
                    style={{ fontSize: 12, fontWeight: 500 }}>
                    Education
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                required={true}
                size="small"
                label="Subject"
                fullWidth
                name="subject"
                value={smsFrom.subject || ""}
                onChange={handleFormChange}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Box style={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography component={"span"}>Dynamic Tag: </Typography>

                <Box>
                  [name],[school_name] - wil get autoreplaced,
                  <Typography component={"span"} color="error">
                    replace - {"{{var}}"} with your content, variable fields may
                    vary in length. Space consumed for 1 variable is 30 char and
                    avoid double space.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Text Message"
                style={{
                  width: "100%",
                  height: "120px",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                name="sms"
                fullWidth
                value={smsFrom.sms}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <span>Click here to Notify Via SMS</span>
              <Switch onChange={handleNotifiy} checked={notifyChecked} />
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ padding: "10px", mb: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                style={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  loading={sendingMessage}
                  size="small"
                  variant="contained"
                  type="submit">
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default Compose;
