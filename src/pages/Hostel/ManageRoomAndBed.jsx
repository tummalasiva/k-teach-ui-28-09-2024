/** @format */

import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelRoomBedTableKeys } from "../../data/tableKeys/manageHostelRoomBedData";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";

export default function ManageRoomAndBed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [updatingBed, setUpdatingBed] = useState(false);
  const [deletingBed, setDeletingBed] = useState(false);

  const getRoomList = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.room.list);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (dataToEdit) {
        delete values.beds;
        const { data } = await put(
          PRIVATE_URLS.room.update + "/" + dataToEdit._id,
          values
        );
        setLoading(false);
        setDataToEdit(null);
      } else {
        const { data } = await post(PRIVATE_URLS.room.create, values);
        setData(data.result);
        setLoading(false);
      }
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
      beds: dataToEdit?.beds || [],
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const addBed = () => {
    let initialBedsData = [...formik.values.beds];
    let newBedData = {
      _id: initialBedsData.length + 1,
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

  return (
    <>
      <PageHeader title="Hostel Room & Beds" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageHostelRoomBedTableKeys}
        bodyDataModal="room"
        bodyData={data}
        onDeleteClick={deleteRoom}
      />
    </>
  );
}
