/** @format */

import React, { useContext, useState } from "react";
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
import { useFormik } from "formik";
import { Grid } from "@mui/material";

const LeaveType_Option = [
  { label: "Student", value: "Student" },
  { label: "Employee", value: "Employee" },
];

export default function LeaveType() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const AddLeaveType = () => {
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
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      leaveDays: dataToEdit?.leaveDays || "",
      leaveType: dataToEdit?.leaveType || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });
  return (
    <>
      <PageHeader title="Leave Type" />

      <CustomTable
        actions={["edit"]}
        tableKeys={leaveTypeTableKeys}
        bodyDataModal="leave type"
        bodyData={data}
      />

      <AddForm title="Add Leave Type" onAddClick={AddLeaveType} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update  Leave Type" : "Add  Leave Type"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="leaveType"
              label="Leave Type"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="leaveDays"
              label="Leave Days"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
