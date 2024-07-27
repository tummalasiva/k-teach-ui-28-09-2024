/** @format */

import React, { useContext, useEffect, useState } from "react";
import { examTermTableKeys } from "../../data/tableKeys/examTermData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { useFormik } from "formik";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { Grid } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";

const IS_PUBLIC = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const Is_Assignment_Allowed = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const Exam_Types = [
  {
    label: "General",
    value: "general",
  },
  { label: "Competitive", value: "competitive" },
];

export default function ExamTerm() {
  const [data, setData] = useState([]);
  const { selectedSetting } = useContext(SettingContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  const handelExamTerm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.examTerm.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.examTerm.create, payload);
        getData();
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      examType: dataToEdit?.examType || "",
      marksAssignmentAllowed: dataToEdit?.marksAssignmentAllowed || false,
      note: dataToEdit?.note || "",
      isPublic: dataToEdit?.isPublic || false,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.examTerm.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Exam Term" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="exam terms"
        module="Exam Term"
        bodyData={data}
        tableKeys={examTermTableKeys}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {/* == add exam term Form ==== */}
      <AddForm
        title="Add Exam Term"
        module="Exam Term"
        onAddClick={handelExamTerm}
      />

      {/* == Add/Update exam term Form ==== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Exam Term" : "Add Exam Term"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Title"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="examType"
              label="Exam Type"
              required={true}
              options={Exam_Types}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="marksAssignmentAllowed"
              label="Marks Assignment Allowed"
              options={Is_Assignment_Allowed}
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="isPublic"
              label="View On Web"
              options={IS_PUBLIC}
            />
          </Grid>

          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
