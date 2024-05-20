/** @format */

import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageHostelTableKeys } from "../../data/tableKeys/manageHostelData";
import AddForm from "../../forms/AddForm";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { useFormik } from "formik";

export default function ManageHostel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.hostel.list);
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.hostel.update + "/" + dataToEdit._id,
          values
        );

        setDataToEdit(null);
      } else {
        const { data } = await post(PRIVATE_URLS.hostel.create, values);
      }
      setLoading(false);

      getData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      type: dataToEdit?.type || "",
      warden: dataToEdit?.warden?._id || "",
      address: dataToEdit?.address || "",
      contactNumber: dataToEdit?.contactNumber || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const handleEdit = (data) => {
    setDataToEdit(data);
  };

  const deleteHostel = async (id) => {
    try {
      const { data } = await del(PRIVATE_URLS.hostel.delete + "/" + id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Hostel" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageHostelTableKeys}
        bodyDataModal="hostel"
        bodyData={data}
        onDeleteClick={deleteHostel}
        onEditClick={handleEdit}
      />
      <AddForm />
    </>
  );
}
