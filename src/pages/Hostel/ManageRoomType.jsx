/** @format */

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelRoomTableKeys } from "../../data/tableKeys/manageHostelRoom";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function ManageRoomType() {
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRoomTypes = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.roomType.list);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.roomType.update + "/" + dataToEdit._id,
          values
        );

        setDataToEdit(null);
      } else {
        const { data } = await post(PRIVATE_URLS.roomType.create, values);
      }
      setLoading(false);

      getRoomTypes();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      specification: dataToEdit?.specification || "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const deleteRoomType = async (id) => {
    try {
      const { data } = await put(PRIVATE_URLS.roomType.delete + "/" + id);
      getRoomTypes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    setDataToEdit(data);
  };

  return (
    <>
      <PageHeader title="Hostel Room Type" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageHostelRoomTableKeys}
        bodyDataModal="room"
        bodyData={data}
        onDeleteClick={deleteRoomType}
        onEditClick={handleEdit}
      />
    </>
  );
}
