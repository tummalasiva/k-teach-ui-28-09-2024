/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import FormDatePicker from "../../forms/FormDatePicker";
import dayjs from "dayjs";

// const DEPENDENCIES = [
//   { label: "Class - (Academic department)", value: "class" },
//   { label: "Route - (Transport department)", value: "route" },
//   { label: "Room - (Hostel department)", value: "room" },
//   { label: "Academic Year - (Student academic year)", value: "academicYear" },
//   { label: "Hostel - (Hostel department)", value: "hostel" },
//   { label: "Stop - (Transport department)", value: "stop" },
//   { label: "Added Before - (Student admission date)", value: "addedBefore" },
//   { label: "Added After - (Student admission date)", value: "addedAfter" },
//   { label: "Pick-Type - (Transport department)", value: "pickType" },
//   { label: "Room Type - (Hostel department)", value: "roomType" },
//   {
//     label: "Library Member - (Human Resource department)",
//     value: "libraryMember",
//   },
// ];

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

const Installments = [
  { label: "Monthly", value: 1 },
  { label: "Quaterly", value: 2 },
  { label: "Half-Yearly", value: 3 },
  { label: "Yearly", value: 4 },
  { label: "Others", value: 5 },
];

const PickTypeSelect = [
  { label: "Both", value: "Both" },
  { label: "Pick", value: "Pick" },
  { label: "Drop", value: "Drop" },
];

export default function AddUpdateFeeMap({ open = true }) {
  const { selectedSetting } = useContext(SettingContext);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [nstallments, setInstallments] = useState([]);
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
      //   entryFormik.setFieldValue("class", data.result[0]._id);
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
      //   entryFormik.setFieldValue("class", data.result[0]._id);
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
      //   entryFormik.setFieldValue("class", data.result[0]._id);
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
      //   console.log(data.result, "hhhh");
      setHostels(
        data.result.map((h) => ({
          ...h,
          label: h?.name,
          value: h?._id,
        }))
      );
      //   entryFormik.setFieldValue("class", data.result[0]._id);
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
      //   entryFormik.setFieldValue("class", data.result[0]._id);
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

      setRooms(
        data.result.map((h) => ({
          ...h,
          label: `${h?.hostel?.name} - ${h?.type.name} (${h?.totalBeds} - Beds)`,
          value: h?._id,
        }))
      );
      //   entryFormik.setFieldValue("class", data.result[0]._id);
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

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.feeMap.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.feeMap.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setDataToEdit(null);
  };

  const entryFormik = useFormik({
    initialValues: {
      dependencies: dataToEdit?.dependencies || "",
      academicYear: dataToEdit?.academicYear || "",
      class: dataToEdit?.class || "",
      route: dataToEdit?.route || "",
      stop: dataToEdit?.stop || "",
      pickType: dataToEdit?.pickType || "",
      hostel: dataToEdit?.hostel || "",
      roomType: dataToEdit?.roomType || "",
      room: dataToEdit?.room || "",
      addedAfter: dataToEdit?.addedAfter || "",
      addedBefore: dataToEdit?.addedBefore || "",
      fee: dataToEdit?.fee || "",
      installments: dataToEdit?.installments || "",
      others: dataToEdit?.others || "",
      amount: dataToEdit?.amount || "",
      dueDate: dataToEdit?.dueDate || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value, "value=========");
    setDependencies(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddInstallments = () => {
    if (!entryFormik.values.installments || !entryFormik.values.fee) return;
    let installmentsCal = [];

    if (entryFormik.values.installments === "Monthly") {
      const monthlyAmount = Math.floor(entryFormik.values.fee / 12);
      const missing = entryFormik.values.fee - monthlyAmount * 12;

      // console.log(missing, "missing");
      installmentsCal = Array.from({ length: 12 }).map((v, i) => ({
        id: i + 1,
        amount: monthlyAmount,
        missing: missing,
        dueDate: dayjs(),
      }));
      if (installmentsCal.length > 0) {
        installmentsCal[0].amount += missing;
      }
    } else if (entryFormik.values.installments === "Quaterly") {
      const quarterlyAmount = Math.floor(entryFormik.values.fee / 4);
      const missing = entryFormik.values.fee - quarterlyAmount * 4;

      installmentsCal = Array.from({ length: 4 }).map((v, i) => ({
        id: i + 1,
        amount: quarterlyAmount,
        dueDate: dayjs(),
      }));
      if (installmentsCal.length > 0) {
        installmentsCal[0].amount += missing;
      }
    } else if (entryFormik.values.installments === "Half-Yearly") {
      const halfYearlyAmount = Math.floor(entryFormik.values.fee / 2);
      const missing = entryFormik.values.fee - halfYearlyAmount * 2;

      installmentsCal = Array.from({ length: 2 }).map((v, i) => ({
        id: i + 1,
        amount: halfYearlyAmount,
        dueDate: dayjs(),
      }));
      if (installmentsCal.length > 0) {
        installmentsCal[0].amount += missing;
      }
    } else if (entryFormik.values.installments === "Yearly") {
      installmentsCal = Array.from({ length: 1 }).map((v, i) => ({
        id: i,
        amount: entryFormik.values.fee,
        dueDate: dayjs(),
      }));
    } else if (entryFormik.values.installments === "Others") {
      const othersAmount = Math.floor(
        entryFormik.values.fee / entryFormik.values.others
      );
      const missing =
        entryFormik.values.fee - othersAmount * entryFormik.values.others;

      installmentsCal = Array.from({ length: entryFormik.values.others }).map(
        (v, i) => ({
          id: i + 1,
          amount: othersAmount,
          dueDate: dayjs(),
        })
      );
      if (installmentsCal.length > 0) {
        installmentsCal[0].amount += missing;
      }
    } else {
      setInstallments([]);
      return;
    }
    setInstallments(installmentsCal);
  };

  useEffect(() => {
    handleAddInstallments();
  }, [
    entryFormik.values.installments,
    entryFormik.values.others,
    entryFormik.values.fee,
  ]);

  console.log(entryFormik.values, "ddddd");

  return (
    <>
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Fee Map" : "Add Fee Map"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
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
                    //   onDelete={() => handleDelete(value)}
                    onDelete={true}
                  />
                ))}
              </Box>
            )}
          </Grid>

          {dependencies.includes("academicYear") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="academicYear"
                label="Select Academic Year"
                options={academicYears}
              />
            </Grid>
          )}

          {dependencies.includes("class") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="class"
                label="Select class"
                required={true}
                options={classes}
              />
            </Grid>
          )}
          {dependencies.includes("route") ||
            (dependencies.includes("stop") && (
              <>
                <Grid xs={12} sm={6} md={6} item>
                  <FormSelect
                    formik={entryFormik}
                    name="route"
                    label="Select Route"
                    required={true}
                    options={routes}
                  />
                </Grid>
                <Grid xs={12} sm={6} md={6} item>
                  <FormSelect
                    formik={entryFormik}
                    name="stop"
                    label="Select Stop"
                    options={stops}
                    required={true}
                  />
                </Grid>
              </>
            ))}
          {dependencies.includes("pickType") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="pickType"
                label="Select Pick Type"
                options={PickTypeSelect}
              />
            </Grid>
          )}
          {dependencies.includes("hostel") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="hostel"
                label="Select Hostel"
                required={true}
                options={hostels}
              />
            </Grid>
          )}
          {dependencies.includes("roomType") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="roomType"
                label="Select Room Type"
                required={true}
                options={roomTypes}
              />
            </Grid>
          )}
          {dependencies.includes("room") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormSelect
                formik={entryFormik}
                name="room"
                label="Select Room"
                required={true}
                options={rooms}
              />
            </Grid>
          )}
          {dependencies.includes("addedAfter") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormDatePicker
                formik={entryFormik}
                name="addedAfter"
                label="Added After"
                required={true}
              />
            </Grid>
          )}
          {dependencies.includes("addedBefore") && (
            <Grid xs={12} sm={6} md={6} item>
              <FormDatePicker
                formik={entryFormik}
                name="addedBefore"
                label="Added Before"
                required={true}
              />
            </Grid>
          )}
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="fee"
              label="Fee"
              type="number"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="installments"
              label="Select Installment Type"
              required={true}
              options={Installments}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="others"
              label="Number of installments"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="amount"
              label="Installments (1)"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormDatePicker
              formik={entryFormik}
              name="dueDate"
              label="Due Date"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
