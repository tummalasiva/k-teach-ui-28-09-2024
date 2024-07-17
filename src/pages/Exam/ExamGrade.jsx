/** @format */

import React, { useContext, useEffect, useState } from "react";
import { examGradeTableKeys } from "../../data/tableKeys/examGradeData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";

const Grade_Options = [
  {
    label: "Scholastic",
    value: "scholastic",
  },
  { label: "Co-scholastic", value: "co-scholastic" },
];

export default function ExamGrade() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [loading, setloading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examGrade.list, {
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

  const AddExamGrade = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    entryFormik.resetForm();
  };

  const handleCreateOrUpdate = async (values) => {
    const payload = {
      ...values,
      schoolId: selectedSetting._id,
    };

    setloading(true);

    try {
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.examGrade.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.examGrade.create, payload);

        getData();
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      grade: dataToEdit?.grade || "",
      group: dataToEdit?.group || "",
      gradePoint: dataToEdit?.gradePoint || "",
      markFrom: dataToEdit?.markFrom || "",
      markTo: dataToEdit?.markTo || "",
      note: dataToEdit?.note || "",
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
      const res = await del(PRIVATE_URLS.examGrade.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <PageHeader title="Exam Grade" />
      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={examGradeTableKeys}
        bodyDataModal="exam grades"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      <AddForm title="Add Exam Grade" onAddClick={AddExamGrade} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Exam Grade" : "Add Exam Grade"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="grade"
              label="Exam Grade"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormSelect
              formik={entryFormik}
              name="group"
              label="Group"
              required={true}
              options={Grade_Options}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="gradePoint"
              label="Grade Point"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              required={true}
              name="markFrom"
              label="Mark From"
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              required={true}
              name="markTo"
              label="Mark To"
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
