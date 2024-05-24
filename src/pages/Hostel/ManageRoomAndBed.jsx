/** @format */

import React, { useContext, useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelRoomBedTableKeys } from "../../data/tableKeys/manageHostelRoomBedData";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";
import FormModal from "../../forms/FormModal";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import AddForm from "../../forms/AddForm";
// iocons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomInput from "../../forms/CustomInput";
import RoomAndBedViewDialog from "./RoomAndBedViewDialog";
import SettingContext from "../../context/SettingsContext";

export default function ManageRoomAndBed() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [updatingBed, setUpdatingBed] = useState(false);
  const [deletingBed, setDeletingBed] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    action: () => {},
  });

  // get rooms
  const getRoomList = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.room.list);
      setData(
        data.result.map((h) => ({
          ...h,
          hostelName: h?.hostel?.name,
          roomType: h.type?.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get room type list
  const getRoomTypeList = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.roomType.list);
      setRoomType(data.result.map((r) => ({ label: r.name, value: r._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get hostel list
  const getHostelList = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.hostel.list);
      setHostels(data.result.map((h) => ({ label: h.name, value: h._id })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomList();
    getRoomTypeList();
    getHostelList();
  }, []);

  // Add/Update event handle
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (dataToEdit) {
        delete values.beds;
        const { data } = await put(
          PRIVATE_URLS.room.update + "/" + dataToEdit._id,
          values
        );
      } else {
        let payload = { ...values, totalBeds: values.beds.length };

        const { data } = await post(PRIVATE_URLS.room.create, payload);
      }
      handleClose();
      getRoomList();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      number: dataToEdit?.number || "",
      type: dataToEdit?.type?._id || "",
      totalBeds: dataToEdit?.totalBeds || 0,
      hostel: dataToEdit?.hostel?._id || "",
      note: dataToEdit?.note || "",
      beds: dataToEdit?.beds || [
        {
          id: 1,
          name: "",
          position: "",
          allocated: false,
        },
      ],
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const onAddBedsHandle = () => {
    let initialBedsData = [...formik.values.beds];
    let newBedData = {
      id: initialBedsData.length + 1,
      name: "",
      position: "",
      allocated: false,
    };
    formik.setFieldValue("beds", [...initialBedsData, newBedData]);
  };

  const removeBed = (index) => {
    let initialBedsData = [...formik.values.beds];
    initialBedsData.splice(index, 1);
    formik.setFieldValue("beds", initialBedsData);
  };

  const updateBed = async (bedId) => {
    let bedData = formik.values.beds.find((bed) => bed._id === bedId);
    try {
      setUpdatingBed(true);
      const { data } = await put(
        PRIVATE_URLS.room.update + "/" + bedId,
        bedData
      );
      setUpdatingBed(false);
    } catch (error) {
      console.log(error);
      setUpdatingBed(false);
    }
  };

  const deleteBed = async (bedId) => {
    try {
      setDeletingBed(true);
      const { data } = await put(PRIVATE_URLS.room.deleteBed + "/" + bedId);
      setDeletingBed(false);
    } catch (error) {
      console.log(error);
      setDeletingBed(false);
    }
  };

  const deleteRoom = async (roomId) => {
    try {
      const { data } = await del(PRIVATE_URLS.room.delete + "/" + roomId);
      getRoomList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    // console.log(data, "eee");
    setOpen(true);
    setDataToEdit(data);
  };

  const onAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    formik.resetForm();
  };

  const handleCustomInputChange = (event, bed) => {
    formik.setFieldValue(
      "beds",
      formik.values.beds.map((b) =>
        b.id === bed.id ? { ...b, [event.target.name]: event.target.value } : b
      )
    );
  };

  const handleClickOpenView = (data) => {
    // console.log(data, "vvvvvb");
    setModalData({
      ...modalData,
      open: true,
      tableData: data,
      schoolName: selectedSetting.name,
    });
    getRoomList();
  };

  const onCloseModal = () => {
    setModalData({ ...modalData, open: false });
  };
  return (
    <>
      <PageHeader title="Hostel Room & Beds" />

      <CustomTable
        actions={["edit", "delete", "view"]}
        tableKeys={manageHostelRoomBedTableKeys}
        bodyDataModal="room"
        bodyData={data}
        onDeleteClick={deleteRoom}
        onEditClick={handleEdit}
        onViewClick={handleClickOpenView}
      />

      {/* feb model open ============== */}
      <AddForm title="Add Room & Bed" onAddClick={onAddClick} />

      {/* Add/update model ============== */}
      <FormModal
        open={open}
        formik={formik}
        formTitle={dataToEdit ? "Update Room & Bed" : "Add Room & Bed"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={formik}
              name="number"
              label="Room No."
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={formik}
              name="type"
              label="Room Type"
              required={true}
              options={roomType}
            />
          </Grid>
          {/* <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={formik}
              name="totalBeds"
              label="Total Beds"
              required={true}
              disabled={true}
            />
          </Grid> */}
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={formik}
              name="hostel"
              label="Hostel Name"
              required={true}
              options={hostels}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "bold",
              }}>
              <Typography>Bed Name</Typography>
              <Typography>Bed Position</Typography>
              <Typography>Is Alloted</Typography>
            </Box>

            {/* <AddBedsTable onAddBedsHandle={onAddBedsHandle} formik={formik} /> */}
            {formik.values.beds.map((b, i) => (
              <Grid
                container
                key={i}
                gap={1}
                sx={{
                  backgroundColor: "#F0F8FF",
                  borderRadius: "5px",
                  padding: "20px 15px 30px 15px",
                  border: "1px solid lightgrey",
                  my: 2,
                }}>
                <Grid xs={12} sm={4} md={4} item>
                  <CustomInput
                    value={b?.name}
                    name="name"
                    label="Bed Name"
                    required={true}
                    onChange={(e) => handleCustomInputChange(e, b)}
                  />
                </Grid>
                <Grid xs={12} sm={4} md={4} item>
                  <CustomInput
                    value={b?.position}
                    name="position"
                    label="Bed Position"
                    required={true}
                    onChange={(e) => handleCustomInputChange(e, b)}
                  />
                </Grid>
                <Grid
                  xs={12}
                  sm={3}
                  md={3}
                  item
                  sx={{
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                  <Button onClick={() => onAddBedsHandle(b, i)}>
                    <AddIcon />
                  </Button>
                  <Button color="error" onClick={() => removeBed(i)}>
                    <RemoveIcon color="error" />
                  </Button>
                  {/* <Typography> */}
                  {/* <Typography color={allocated ? "green" : "red"}> */}
                  {/* Not Allotted */}
                  {/* {allocated ? "Allotted" : "Not Allotted"} */}
                  {/* </Typography> */}
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={formik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>

      {/* Add/update model ============== */}
      <RoomAndBedViewDialog
        title="Room Information"
        open={modalData.open}
        tableData={modalData.tableData}
        schoolName={modalData.schoolName}
        onClose={onCloseModal}
      />
    </>
  );
}
