/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  linearProgressClasses,
  ListItemText,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import FileSelect from "../../forms/FileSelect";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormInput from "../../forms/FormInput";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: "black",
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

const Receiver_Type = [
  {
    label: "Role",
    value: "role",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Students",
    value: "students",
  },
  {
    label: "All Students",
    value: "allStudents",
  },
  {
    label: "File",
    value: "file",
  },
];

const SMS_Type = [
  {
    label: "General",
    value: "general",
  },
  {
    label: "Attendence",
    value: "attendence",
  },
  {
    label: "Fee",
    value: "fee",
  },
  {
    label: "Credential",
    value: "credential",
  },
  {
    label: "Exam",
    value: "exam",
  },

  {
    label: "Leave",
    value: "leave",
  },
  {
    label: "Library",
    value: "library",
  },
  {
    label: "Transport",
    value: "transport",
  },

  {
    label: "Hostel",
    value: "hostel",
  },
  {
    label: "Preaddmission",
    value: "preaddmission",
  },
  {
    label: "Parent Meeting",
    value: "parentMeeting",
  },

  {
    label: "School Timing",
    value: "schoolTiming ",
  },
  {
    label: "Notice",
    value: "notice",
  },
  {
    label: "School Open",
    value: "schoolOpen",
  },
  {
    label: "Education",
    value: "education",
  },
];

export default function Compose() {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectRoles, setSelectRoles] = useState([]);
  const [selectClasses, setSelectClasses] = useState([]);
  const [employees, setEmployee] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      receiverType: "",
      role: "",
      employee: "",
      class: "",
      section: "",
      student: "",
      smsType: "",
    },
    enableReinitialize: true,
  });

  const handleSelectRoleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectRoles(typeof value === "string" ? value.split(",") : value);
  };

  const handleSelectClassChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectClasses(typeof value === "string" ? value.split(",") : value);
  };

  const [selectFile, setSelectFile] = useState([]);

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
      entryFormik.setFieldValue("class", data.result[0]._id);
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
      entryFormik.setFieldValue("section", data.result[0]?._id);
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
      entryFormik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);

      setRoles(
        data.result.map((r) => ({
          ...r,
          label: r.name,
          value: r._id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: entryFormik.values.role,
          },
        },
      });

      setEmployee(
        data.result.map((emp) => ({
          ...emp,
          label: emp.basicInfo.name,
          value: emp._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    getClasses();
    getRoles();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.section) {
      getStudents();
    }
  }, [entryFormik.values.class, entryFormik.values.section, selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.role) {
      getEmployees();
    }
  }, [entryFormik.values.role]);

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

  const handleRemoveFile = (fileName, index) => {
    setSelectFile(selectFile.filter((file) => file.name != fileName));
  };

  const handleChangeUser = (event, value) => {
    entryFormik.setFieldValue("employee", value);
  };

  return (
    <>
      <PageHeader title="Compose" />
      <Card sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
            padding: "10px",
          }}>
          <Box>
            {" "}
            <Typography>
              Total SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                79875
              </Typography>
            </Typography>
          </Box>

          <Box>
            {" "}
            <Typography>
              Consumed SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                {79875}
              </Typography>
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography>
              Balance SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                00099999
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "10px",
          }}>
          <BorderLinearProgress
            variant="determinate"
            value={((79875 - 887) * 100) / 79875}
          />
        </Box>
      </Card>
      <Card sx={{ mt: 3 }}>
        <Grid container spacing={2} padding={1}>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="receiverType"
              formik={entryFormik}
              label="Receiver Type"
              options={Receiver_Type}
            />
          </Grid>

          {entryFormik.values.receiverType === "role" && (
            <>
              <Grid xs={12} md={6} lg={3} item>
                <FormControl
                  margin="normal"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 20 }}
                  fullWidth>
                  <InputLabel sx={{ fontSize: 12 }}>Role</InputLabel>
                  <Select
                    label="Role"
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectRoles}
                    onChange={handleSelectRoleChange}
                    multiple
                    InputLabelProps={{
                      shrink: true,
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}>
                    {roles &&
                      roles.map((row, index) => (
                        <MenuItem
                          key={row._id}
                          value={row.name}
                          sx={{ fontSize: 12, fontWeight: 500 }}>
                          <Checkbox
                            checked={selectRoles.indexOf(row.name) > -1}
                          />
                          <ListItemText primary={row.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {entryFormik.values.receiverType === "students" && (
            <>
              <Grid xs={12} md={6} lg={3} item>
                <FormControl
                  margin="normal"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 20 }}
                  fullWidth>
                  <InputLabel sx={{ fontSize: 12 }}>Class</InputLabel>
                  <Select
                    label="Class"
                    labelId="demo-multiple-class-label"
                    id="demo-multiple-class"
                    value={selectClasses}
                    onChange={handleSelectClassChange}
                    multiple
                    InputLabelProps={{
                      shrink: true,
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}>
                    {classes &&
                      classes.map((cls, index) => (
                        <MenuItem
                          key={cls._id}
                          value={cls.name}
                          sx={{ fontSize: 12, fontWeight: 500 }}>
                          <Checkbox
                            checked={selectClasses.indexOf(cls.name) > -1}
                          />
                          <ListItemText primary={cls.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="section"
                  formik={entryFormik}
                  label="Select Section"
                  options={sections}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="student"
                  formik={entryFormik}
                  label="Select Student"
                  options={students}
                />
              </Grid>
            </>
          )}

          {entryFormik.values.receiverType === "user" && (
            <>
              <Grid xs={12} md={6} lg={3} item>
                <FormSelect
                  required={true}
                  name="role"
                  formik={entryFormik}
                  label="Select Role"
                  options={roles.filter(
                    (r) => r.name.toLowerCase() !== "student"
                  )}
                />
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                <FormControl
                  required={true}
                  margin="normal"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 20 }}
                  fullWidth>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="small"
                    onChange={handleChangeUser}
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
            </>
          )}

          {entryFormik.values.receiverType === "file" && (
            <>
              <Grid item xs={12} sm={12} md={6} sx={{ display: "flex" }}>
                {" "}
                <Button size="small" variant="contained">
                  Sample File
                </Button>
                <FileSelect
                  name="file"
                  onChange={(e) => handleChangeFiles(e)}
                  customOnChange={true}
                  selectedFiles={selectFile}
                  onRemove={(fileName) => handleRemoveFile(fileName)}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Card>
      <Card sx={{ mt: 3 }}>
        <Grid container spacing={2} padding={1}>
          <Grid item xs={12} md={3}>
            <FormSelect
              name="smsType"
              formik={entryFormik}
              label="SMS Type"
              options={SMS_Type}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormInput name="subject" formik={entryFormik} label="Subject" />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
