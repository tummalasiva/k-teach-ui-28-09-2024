/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Divider,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormModal from "../../forms/FormModal";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LoadingButton } from "@mui/lab";

const LABEL = {
  class: "Class - (Academic department)",
  route: "Route - (Transport department)",
  pickType: "Pick-Type - (Transport department)",
  stop: "Stop - (Transport department)",
  room: "Room - (Hostel department)",
  roomType: "Room Type - (Hostel department)",
  hostel: "Hostel - (Hostel department)",
  addedAfter: "Added After - (Student admission date)",
  addedBefore: "Added Before - (Student admission date)",
  academicYear: "Academic Year - (Student academic year)",
  libraryMember: "Library Member - (Human Resource department)",
};

const installmentsType = [
  { label: "Monthly", id: 1 },
  { label: "Quaterly", id: 2 },
  { label: "Half-Yearly", id: 3 },
  { label: "Yearly", id: 4 },
  { label: "Others", id: 5 },
];

function removeElementFromArray(array, elementToRemove) {
  const index = array.indexOf(elementToRemove);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

export default function AddUpdateFeeMap({
  selectedReceipt = "",
  open = true,
  setOpen = () => {},
}) {
  const { selectedSetting } = useContext(SettingContext);
  const [dataToEdit, setDataToEdit] = useState("");
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [addForm, setAddForm] = useState({});
  const [installments, setInstallments] = useState([]);
  const [addedAfter, setAddedAfter] = useState(null);
  const [addedBefore, setAddedBefore] = useState(null);
  // get academic year
  const getAcademicYears = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list, {
        params: { schoolId: selectedSetting._id },
      });
      setAcademicYears(
        data.result.map((academicData) => ({
          ...academicData,
          label: `${academicData.from} - ${academicData.to}`,
          value: academicData._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(
        data.result.map((d) => ({ ...d, label: d.name, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get route and stops
  const getRoutes = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.route.list, {
        params: { schoolId: selectedSetting._id },
      });

      setRoutes(
        data.result.map((r) => ({
          ...r,
          label: `${r.vehicle?.number} ${r.title} (${r.routeStart} To ${r.routeEnd})`,
          value: r._id,
        }))
      );

      setStops(
        data.result.map((route) => ({
          label: route.stops[0]?.name,
          value: route.stops[0]?._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get Hostels
  const getHostels = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.hostel.list, {
        params: { schoolId: selectedSetting._id },
      });
      setHostels(
        data.result.map((h) => ({
          ...h,
          label: h?.name,
          value: h?._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get Room type
  const getRoomTypes = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.roomType.list, {
        params: { schoolId: selectedSetting._id },
      });
      setRoomTypes(
        data.result.map((h) => ({
          ...h,
          label: h?.name,
          value: h?._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get Rooms
  const getRoom = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.room.list, {
        params: { schoolId: selectedSetting._id },
      });

      setRooms(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAcademicYears();
    getClasses();
    getRoutes();
    getHostels();
    getRoomTypes();
    getRoom();
  }, []);

  const handleAddSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!addForm.pickType) {
      removeElementFromArray(dependencies, "pickType");
    }

    try {
      let payload = {
        receiptTitleId: selectedReceipt,
        collectedFrom: "student",
        dependencies: dependencies,
        classId: addForm.class,
        routeId: addForm.route,
        pickType: addForm.pickType,
        roomId: addForm.room,
        roomTypeId: addForm.roomType,
        hostelId: addForm.hostel,
        addedAfter: new Date(addedAfter),
        addedBefore: new Date(addedBefore),
        stopId: addForm.stop,
        academicYearId: addForm.academicYear,
        fee: addForm.fee,
        installments: installments,
        schoolId: selectedSetting._id,
        libraryMember: "",
      };
      // console.log(payload, "payload");

      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.feeMap.update + "/" + dataToEdit?._id,
          payload
        );

        // // setSearch({});
        // if (data > 199 && data < 299) {
        //   await getFeeMaps();
        //   resetForm();
        //   // handleCloseAddDialog();
        // }
      } else {
        const { data } = await post(PRIVATE_URLS.feeMap.create, payload);
        // console.log(data, "ippp");
        // setSearch({});
        // if (status > 199 && status < 299) {
        //   await getFeeMaps();
        //   resetForm();
        //   handleCloseAddDialog();
        // }
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setDataToEdit(null);
    setOpen(false);
  };

  const resetForm = () => {
    setAddForm({});
    setDataToEdit(null);
    setInstallments([]);
    setDependencies([]);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDependencies(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddForm = (e) => {
    const { name, value } = e.target;
    if (name == "fee") {
      setAddForm((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else if (name == "others") {
      setAddForm((prev) => ({
        ...prev,
        [name]: Math.ceil(value),
      }));
    } else {
      setAddForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDelete = (chipToDelete) => {
    setDependencies((chips) => chips.filter((chip) => chip !== chipToDelete));
    if (chipToDelete == "class") {
      setAddForm((prev) => ({ ...prev, class: "" }));
    }
    if (chipToDelete === "hostel") {
      setAddForm((prev) => ({ ...prev, hostel: "", room: "" }));
    }
    if (chipToDelete === "route") {
      setAddForm((prev) => ({ ...prev, stop: "", route: "" }));
    }
    if (chipToDelete === "room") {
      setAddForm((prev) => ({ ...prev, room: "" }));
    }
    if (chipToDelete === "pickType") {
      setAddForm((prev) => ({ ...prev, pickType: "" }));
    }
    if (chipToDelete === "roomType") {
      setAddForm((prev) => ({ ...prev, roomType: "" }));
    }
    if (chipToDelete === "academicYear") {
      setAddForm((prev) => ({ ...prev, academicYearId: "" }));
    }
    if (chipToDelete === "addedAfter") {
      setAddedAfter(null);
    }
    if (chipToDelete === "addedBefore") {
      setAddedBefore(null);
    }
    if (chipToDelete === "stop") {
      setAddForm((prev) => ({ ...prev, stop: "" }));
    }
  };

  // useEffect(() => {
  //   if (filteredFeeMaps.length) {
  //     let deps = [];
  //     for (let feeMap of filteredFeeMaps) {
  //       deps = [...deps, ...feeMap.extendedDependencies];
  //     }

  //     let uniqueDeps = new Set(deps);
  //     setAllDependencies([...uniqueDeps]);
  //   }
  // }, [filteredFeeMaps]);

  const handleAddInstallments = () => {
    if (!addForm.installmentsType || !addForm.fee) return;
    let installmentsData = [];

    if (addForm.installmentsType === "Monthly") {
      const monthlyAmount = Math.floor(addForm.fee / 12);
      const missing = addForm.fee - monthlyAmount * 12;

      // console.log(missing, "missing");
      installmentsData = Array.from({ length: 12 }).map((v, i) => ({
        id: i + 1,
        amount: monthlyAmount,
        missing: missing,
        dueDate: dayjs(),
      }));
      if (installmentsData.length > 0) {
        installmentsData[0].amount += missing;
      }
    } else if (addForm.installmentsType === "Quaterly") {
      const quarterlyAmount = Math.floor(addForm.fee / 4);
      const missing = addForm.fee - quarterlyAmount * 4;

      installmentsData = Array.from({ length: 4 }).map((v, i) => ({
        id: i + 1,
        amount: quarterlyAmount,
        dueDate: dayjs(),
      }));
      if (installmentsData.length > 0) {
        installmentsData[0].amount += missing;
      }
    } else if (addForm.installmentsType === "Half-Yearly") {
      const halfYearlyAmount = Math.floor(addForm.fee / 2);
      const missing = addForm.fee - halfYearlyAmount * 2;

      installmentsData = Array.from({ length: 2 }).map((v, i) => ({
        id: i + 1,
        amount: halfYearlyAmount,
        dueDate: dayjs(),
      }));
      if (installmentsData.length > 0) {
        installmentsData[0].amount += missing;
      }
    } else if (addForm.installmentsType === "Yearly") {
      installmentsData = Array.from({ length: 1 }).map((v, i) => ({
        id: i,
        amount: addForm.fee,
        dueDate: dayjs(),
      }));
    } else if (addForm.installmentsType === "Others") {
      const othersAmount = Math.floor(addForm.fee / addForm.others);
      const missing = addForm.fee - othersAmount * addForm.others;

      installmentsData = Array.from({ length: addForm.others }).map((v, i) => ({
        id: i + 1,
        amount: othersAmount,
        dueDate: dayjs(),
      }));
      if (installmentsData.length > 0) {
        installmentsData[0].amount += missing;
      }
    } else {
      setInstallments([]);
      return;
    }
    setInstallments(installmentsData);
  };

  useEffect(() => {
    handleAddInstallments();
  }, [addForm.installmentsType, addForm.others, addForm.fee]);

  const handleInstallmentChange = (val, key, changeIndex) => {
    setInstallments((prev) =>
      prev.map((installment, index) => {
        if (index === changeIndex) {
          return key === "amount"
            ? { ...installment, [key]: parseInt(val) }
            : key === "dueDate"
            ? { ...installment, [key]: val }
            : installment;
        } else if (index > changeIndex) {
          let diffInMonths = index - changeIndex;
          if (addForm.installmentsType === "Quaterly") {
            diffInMonths = diffInMonths * 3;
          } else if (addForm.installmentsType === "Half-Yearly") {
            diffInMonths = diffInMonths * 6;
          } else if (addForm.installmentsType === "Others") {
            diffInMonths = diffInMonths * 1;
          }
          const updatedDueDate = dayjs(val)
            .add(diffInMonths, "month")
            .format("YYYY-MM-DD");
          return { ...installment, dueDate: updatedDueDate };
        } else {
          return installment;
        }
      })
    );
  };

  // console.log(addForm);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        onSubmit={handleAddSubmit}
        component="form">
        <DialogTitle sx={{ fontWeight: 600 }}>
          {dataToEdit ? "Update Fee Map" : "Add Fee Map"}
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "10px",
          }}>
          <Grid rowSpacing={0} columnSpacing={2} container>
            <Grid xs={12} sm={12} md={12} item>
              <Typography variant="body">
                Choose the dependencies that will serve as the basis for the fee
                calculation.
              </Typography>
              <Grid xs={12} sm={6} md={8} item>
                <FormControl size="small" sx={{ mt: 2, width: 400 }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Choose the dependencies
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    size="small"
                    multiple
                    label="Choose the dependencies"
                    value={dependencies}
                    onChange={handleChange}>
                    {Object.keys(LABEL).map((name) => (
                      <MenuItem key={name} value={name}>
                        {LABEL[name]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {dependencies && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    marginLeft: "20px",
                  }}>
                  {dependencies.map((value, i) => (
                    <Chip
                      sx={{ mt: 2 }}
                      key={value}
                      label={LABEL[value]}
                      onDelete={() => handleDelete(value)}
                    />
                  ))}
                </Box>
              )}
            </Grid>

            {dependencies.includes("academicYear") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Academic Year</InputLabel>
                  <Select
                    size="small"
                    name="academicYear"
                    required
                    value={addForm.academicYear || ""}
                    onChange={handleAddForm}
                    label="Select Academic Year">
                    {academicYears.map((a) => (
                      <MenuItem key={a._id} value={a._id}>
                        {a.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {dependencies.includes("class") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Class</InputLabel>
                  <Select
                    size="small"
                    name="class"
                    required
                    value={addForm.class || ""}
                    onChange={handleAddForm}
                    label="Select Class">
                    {classes.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {dependencies.includes("route") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Route</InputLabel>
                  <Select
                    size="small"
                    name="route"
                    required
                    value={addForm.route || ""}
                    onChange={handleAddForm}
                    label="Select Route">
                    {routes.map((route) => (
                      <MenuItem key={route._id} value={route._id}>
                        {route?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {dependencies.includes("stop") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Stop</InputLabel>
                  <Select
                    size="small"
                    name="stop"
                    required
                    value={addForm.stop || ""}
                    onChange={handleAddForm}
                    label="Select stop">
                    {stops
                      ?.filter((s) =>
                        addForm.route ? s.route?._id == addForm.route : s._id
                      )
                      .map((stop) => (
                        <MenuItem key={stop._id} value={stop._id}>
                          {stop?.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {(dependencies.includes("route") ||
              dependencies.includes("pickType")) && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Pick Type</InputLabel>
                  <Select
                    size="small"
                    name="pickType"
                    value={addForm.pickType || ""}
                    onChange={handleAddForm}
                    label="Pick Type">
                    {["Drop", "Pick", "Both"].map((picktype) => (
                      <MenuItem key={picktype} value={picktype}>
                        {picktype}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {dependencies.includes("hostel") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Hostel</InputLabel>
                  <Select
                    size="small"
                    name="hostel"
                    required
                    value={addForm.hostel || ""}
                    onChange={handleAddForm}
                    label="Select Hostel">
                    {hostels.map((hostel) => (
                      <MenuItem key={hostel._id} value={hostel._id}>
                        {hostel?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {dependencies.includes("roomType") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Room Type</InputLabel>
                  <Select
                    size="small"
                    name="roomType"
                    required
                    value={addForm.roomType || ""}
                    onChange={handleAddForm}
                    label="Select Room Type">
                    {roomTypes.map((roomType) => (
                      <MenuItem key={roomType._id} value={roomType._id}>
                        {roomType?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {dependencies.includes("room") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Room</InputLabel>
                  <Select
                    size="small"
                    name="room"
                    required
                    value={addForm.room || ""}
                    onChange={handleAddForm}
                    label="Select Room">
                    {rooms
                      .filter((r) => {
                        if (addForm.hostel && addForm.roomType) {
                          return (
                            r.hostel?._id == addForm.hostel &&
                            r.type?._id == addForm.roomType
                          );
                        } else if (addForm.hostel && !addForm.roomType) {
                          return r.hostel?._id == addForm.hostel;
                        } else if (!addForm.hostel && addForm.roomType) {
                          return r.type?._id == addForm.roomType;
                        } else {
                          return r._id;
                        }
                      })
                      .map((room) => (
                        <MenuItem key={room._id} value={room._id}>
                          {room.hostel?.name} - {room.type?.name}{" "}
                          {`(${room.totalBeds}-Beds)`}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {dependencies.includes("addedAfter") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Added After"
                    inputFormat="DD-MM-YYYY"
                    value={addedAfter}
                    onChange={(newValue) => setAddedAfter(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {dependencies.includes("addedBefore") && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Added Before"
                    inputFormat="DD-MM-YYYY"
                    value={addedBefore}
                    onChange={(newValue) => setAddedBefore(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} size="small" fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            <Grid xs={12} sm={6} md={6} item mt={2}>
              <TextField
                fullWidth
                size="small"
                label="Fee"
                type="number"
                required
                name="fee"
                value={addForm.fee || ""}
                onChange={handleAddForm}
              />
            </Grid>
            <Grid xs={12} sm={6} md={6} item mt={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Installment Type</InputLabel>
                <Select
                  size="small"
                  name="installmentsType"
                  value={addForm.installmentsType || ""}
                  onChange={handleAddForm}
                  label="Select Installment Type">
                  {installmentsType.map((installments) => (
                    <MenuItem key={installments.id} value={installments.label}>
                      {installments.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {addForm.installmentsType == "Others" && (
              <Grid xs={12} sm={6} md={6} item mt={2}>
                <TextField
                  // sx={{ marginTop: 1 }}
                  fullWidth
                  label="Number of installments"
                  size="small"
                  name="others"
                  type="number"
                  value={addForm.others || ""}
                  onChange={handleAddForm}
                />
              </Grid>
            )}

            {installments.map((installment, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6} md={6} mt={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label={`installment ${index + 1}`}
                    value={installment.amount}
                    size="small"
                    // enabled={dataToEdit}
                    onChange={(e) =>
                      handleInstallmentChange(e.target.value, "amount", index)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat="DD-MM-YYYY"
                      enabled={dataToEdit}
                      label="Due Date"
                      form
                      value={installment.dueDate}
                      onChange={(newValue) =>
                        handleInstallmentChange(newValue, "dueDate", index)
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          enabled={dataToEdit}
                          {...params}
                          size="small"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </React.Fragment>
            ))}
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
