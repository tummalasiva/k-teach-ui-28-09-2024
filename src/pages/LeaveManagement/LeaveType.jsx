/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { leaveTypeTableKeys } from "../../data/tableKeys/leaveTypeData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import SettingContext from "../../context/SettingsContext";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

// icons
import { CloseRounded } from "@mui/icons-material";
import CustomInput from "../../forms/CustomInput";
import CustomSelect from "../../forms/CustomSelect";
import { LoadingButton } from "@mui/lab";

const ListContainer = styled(Box)(() => ({
  flexWrap: "nowrap",
  overflowY: "hidden",
  overflowX: "auto",
  flexDirection: "column",
  display: "flex",
  margin: "10px 10px",
}));

const ListItem = styled(Typography)(() => ({
  fontSize: "14px",
  paddingRight: "5px",
  paddingLeft: "5px",
}));

const ListItemContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#f9f9f9",
  marginRight: "10px",
  alignItems: "center",
  borderRadius: "10@s",
  minWidth: "150px",
}));

const LeaveType_Option = [
  { label: "Student", value: "Student" },
  { label: "Employee", value: "Employee" },
];

export default function LeaveType({}) {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [selectDepartments, setSelectDepartments] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [multipleDepartments, setMultipleDepartments] = useState([]);
  const [state, setState] = useState({
    name: "",
    leaveTypeFor: "",
    departments: "",
    autoEarned: false,
    total: 0,
    isSpecial: false,
    canResetCarryForward: false,
    carryForwardCount: 0,
    autoEarnCount: 0,
  });

  let {
    name,
    leaveTypeFor,
    departments,
    autoEarned,
    total,
    isSpecial,
    canResetCarryForward,
    carryForwardCount,
    autoEarnCount,
  } = state;

  console.log(multipleDepartments, "multipleDepartments");

  const getDepartments = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.department.list);
      setSelectDepartments(
        data.result.map((d) => ({ label: d.name, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const AddLeaveType = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = {
      name,
      leaveTypeFor,
      departments: multipleDepartments,
      autoEarned,
      total,
      isSpecial,
      canResetCarryForward,
      carryForwardCount,
      autoEarnCount,
      schoolId: selectedSetting._id,
    };
    console.log(payload, "payload");

    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.leaveType.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.leaveType.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setState({
      name: "",
      leaveTypeFor: "",
      departments: "",
      autoEarned: false,
      total: 0,
      isSpecial: false,
      canResetCarryForward: false,
      carryForwardCount: 0,
      autoEarnCount: 0,
    });
    setMultipleDepartments([]);

    setOpen(false);
    setLoading(false);
  };

  let handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "departments") {
      setMultipleDepartments(value);
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleRemoveDepartments = (data) => {
    let newList = multipleDepartments.filter((t) => t != data);
    setMultipleDepartments(newList);
  };

  return (
    <>
      <PageHeader title="Leave Type" />

      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={leaveTypeTableKeys}
        bodyDataModal="leave type"
        bodyData={data}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Leave Type" onAddClick={AddLeaveType} />

      {/* ==== add/edit leave type ======== */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 650,
          },
          component: "form",
          onSubmit: { handleSubmit },
        }}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {dataToEdit ? "Update  Leave Type" : "Add  Leave Type"}
        </DialogTitle>
        <Divider />
        <DialogContent p={2}>
          <Grid rowSpacing={0} columnSpacing={2} container>
            <Grid xs={12} sm={6} md={6} item>
              <FormControl fullWidth>
                <TextField
                  required
                  id="basic-standard"
                  name="name"
                  size="small"
                  value={name}
                  onChange={handleChange}
                  label="Name"
                  sx={{ label: { fontSize: 12 } }}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6} md={6} item>
              <FormControl fullWidth size="small">
                <InputLabel size="small" required>
                  Select Leave Type
                </InputLabel>
                <Select
                  required={true}
                  label="Select Leave Types"
                  labelId="demo-simpless-select-filled-label"
                  id="demo-simple-select-filled-l"
                  name="leaveTypeFor"
                  value={leaveTypeFor}
                  onChange={handleChange}>
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Employee"}>Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {state?.leaveTypeFor === "Employee" && (
              <>
                <Grid item xs={12} md={12} mt={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel size="small" required>
                      Select Department
                    </InputLabel>
                    <Select
                      label="Select Departments"
                      labelId="demo-simpless-select-filled-label"
                      id="demo-simple-select-filled-l"
                      name="departments"
                      value={multipleDepartments || ""}
                      onChange={handleChange}
                      multiple>
                      {selectDepartments.map((d) => (
                        <MenuItem key={d.value} value={d.value}>
                          {d.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <ListContainer>
                    {multipleDepartments.map((m) => (
                      <ListItemContainer key={m}>
                        <ListItem component="span">
                          {
                            selectDepartments.filter((d) => d.value == m)[0]
                              ?.label
                          }
                        </ListItem>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveDepartments(m)}>
                          <CloseRounded fontSize="small" />
                        </IconButton>
                      </ListItemContainer>
                    ))}
                  </ListContainer>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormControl required fullWidth size="small">
                    <RadioGroup
                      size="small"
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="isSpecial"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      value={isSpecial}
                      onChange={handleChange}>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ fontSize: "15px", fontWeight: 600 }}>
                        Is Special Type:
                      </FormLabel>
                      <Stack direction="row" marginLeft={2}>
                        <FormControlLabel
                          value={true}
                          control={<Radio size="small" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio size="small" />}
                          label="No"
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                  <FormControl fullWidth size="small">
                    <TextField
                      required
                      id="basic-standard"
                      size="small"
                      name="total"
                      value={total}
                      onChange={handleChange}
                      label="Total"
                      sx={{ label: { fontSize: 12 } }}
                      type="number"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} mt={2}>
                  <FormControl fullWidth size="small">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="autoEarned"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      // value={autoEarned}
                      onChange={handleChange}>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ fontSize: "15px", fontWeight: 600 }}>
                        Is Leave Auto Earned:
                      </FormLabel>
                      <Stack direction="row" marginLeft={2}>
                        <FormControlLabel
                          value={true}
                          control={<Radio size="small" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          size="small"
                          value={false}
                          control={<Radio size="small" />}
                          label="No"
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                  <FormControl fullWidth size="small">
                    <TextField
                      required
                      id="basic-standard"
                      size="small"
                      name="autoEarnCount"
                      value={autoEarnCount}
                      onChange={handleChange}
                      label="Enter Auto Earn Count"
                      sx={{ label: { fontSize: 12 } }}
                      type="number"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} mt={2}>
                  <FormControl fullWidth>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="canResetCarryForward"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      value={canResetCarryForward}
                      onChange={handleChange}>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ fontSize: "15px", fontWeight: 600 }}>
                        Is Carryforward Reset:
                      </FormLabel>
                      <Stack direction="row" marginLeft={2}>
                        <FormControlLabel
                          size="small"
                          value={true}
                          sx={{ fontSize: 15 }}
                          control={<Radio size="small" />}
                          label="Yes"
                        />
                        <FormControlLabel
                          size="small"
                          value={false}
                          sx={{ fontSize: 15 }}
                          control={<Radio size="small" />}
                          label="No"
                        />
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                  <FormControl fullWidth size="small">
                    <TextField
                      required
                      id="basic-standard"
                      size="small"
                      name="carryForwardCount"
                      value={carryForwardCount}
                      onChange={handleChange}
                      label="Enter Carryforward Count"
                      sx={{ label: { fontSize: 12 } }}
                      type="number"
                    />
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleClose}>
            Close
          </Button>
          <LoadingButton
            size="small"
            loading={loading}
            variant="contained"
            type="submit">
            {dataToEdit ? "Update" : "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
