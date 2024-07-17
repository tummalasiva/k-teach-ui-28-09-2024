/** @format */

import React, { useContext } from "react";
import {
  Grid,
  Card,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Popper,
  Checkbox,
  styled,
  InputBase,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import PageHeader from "../../components/PageHeader";
import { LoadingButton } from "@mui/lab";

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",

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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Credentails = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectEmployee, setSelectEmployee] = useState("");
  const [selectRoles, setSelectRoles] = useState([]);
  const [employeeListPopper, setEmployeeListPopper] = useState(false);
  const [employeeAutoSelect, setEmployeeAutoSelect] = useState([]);
  const [classPopper, setClassPopper] = useState(false);
  const [sectionPopper, setSectionPopper] = useState(false);
  const [selectClass, setSelectClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [contactsPopper, setContactsPopper] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectSection, setSelectSection] = useState("");
  const [selectContacts, setSelectContacts] = useState("");
  const [classAutoSelect, setClassAutoSelect] = useState([]);
  const [sectionAutoSelect, setSectionAutoSelect] = useState([]);
  const [students, setStudents] = useState([]);
  const [contactsAutoSelect, setContactsAutoSelect] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedStudentCount, setSelectedStudentCount] = useState(0);
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleRoleChange = async (e) => {
    try {
      const {
        target: { value },
      } = e;
      setSelectRoles(typeof value === "string" ? value.split(",") : value);
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: {
              $in: value,
            },
          },
        },
      });
      setEmployees(data.result);
    } catch (error) {}
  };

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

  const isStudentRoleSelected = selectRoles.some((roleId) => {
    const role = roles.find((r) => r._id === roleId);
    return role && role.name.includes("STUDENT");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.success("Credential sent successfully");
      setSelectRoles([]);
      setSelectClass("");
      setSelectSection("");
      setSelectContacts([]);
      setSelectEmployee([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Credentials" />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card
          sx={{
            padding: "15px",
            width: { xs: "100%", sm: "100%", md: "70%", lg: "50%" },
          }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    sx={{ fontSize: 12 }}>
                    User Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="role"
                    sx={{ marginBottom: "15px" }}
                    multiple
                    label="User Type"
                    size="small"
                    onChange={handleRoleChange}
                    value={selectRoles}>
                    {roles &&
                      roles.map((row, index) => (
                        <MenuItem
                          key={row._id}
                          value={row._id}
                          sx={{ fontSize: 12, fontWeight: 500 }}>
                          {row.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {selectRoles.some((roleId) => {
                  const role = roles.find((r) => r._id === roleId);
                  return role && role.name.includes("STUDENT");
                }) && selectRoles.length == 1 ? (
                  <>
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={selectClass}
                        fullWidth
                        sx={{ marginBottom: "15px" }}
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
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        value={selectSection}
                        aria-describedby={"sectionPopper"}
                        sx={{ marginBottom: "15px" }}
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

                    <Grid item xs={12} md={12} lg={12}>
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
                ) : null}
              </Grid>
              {!isStudentRoleSelected ? (
                <Grid item xs={12} md={12} lg={12}>
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
                </Grid>
              ) : null}

              {selectRoles.length >= 2 &&
              selectRoles.some((roleId) => {
                const role = roles.find((r) => r._id === roleId);
                return role && role.name.includes("STUDENT");
              }) ? (
                <>
                  <Grid item xs={12} md={12} lg={12}>
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
                  <Grid item xs={12} md={12} lg={12}>
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

                  <Grid item xs={12} md={12} lg={12}>
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
                  <Grid item xs={12} md={12} lg={12}>
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
                  </Grid>
                </>
              ) : (
                ""
              )}

              <Grid item xs={12} md={12} lg={6} container>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  size="small"
                  type="submit">
                  Send Credentials
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default Credentails;
