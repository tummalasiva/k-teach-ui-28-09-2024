/** @format */

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

// custom components
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { academicYearTableKeys } from "../../data/tableKeys/academicYearData";
import FormInput from "../../forms/FormInput";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";

import SettingContext from "../../context/SettingsContext";
import { useContext } from "react";

export default function AcademicYear() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(
        data.result.map((d) => ({ ...d, academicYear: `${d.from}-${d.to}` }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const AddDepartmentHandel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.academicYear.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.academicYear.create, payload);
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
      from: dataToEdit?.from || "",
      to: dataToEdit?.to || "",
      note: dataToEdit?.note || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  console.log(selectedSetting, "0000000");
  // get data on page load
  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleToggleActiveStatus = async (academicYear) => {
    try {
      const { data } = await put(
        PRIVATE_URLS.academicYear.toggleActiveStatus + "/" + academicYear._id
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Academic Year" />
      <CustomTable
        actions={["edit", "switch"]}
        bodyDataModal="academic year"
        bodyData={data}
        tableKeys={academicYearTableKeys}
        onEditClick={handleEditClick}
        toggleStatus="active"
        onToggleSwitch={handleToggleActiveStatus}
      />

      {/* ====== Fab button component =======*/}
      <AddForm title="Add Academic Year" onAddClick={AddDepartmentHandel} />
      {/* ================================== */}

      {/* ==== add/edit academicYear ======== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle="Add Academic Year"
        onClose={handleClose}
        submitButtonTitle="Submit"
        adding={loading}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="from"
              label="From Year"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="to"
              label="To Year"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              type="text"
              formik={entryFormik}
              name="note"
              label="Drop a note"
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
