/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { visitorInfoTableKeys } from "../../data/tableKeys/visitorInfoData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import FormDatePicker from "../../forms/FormDatePicker";
import VisitorInfoViewModel from "./VisitorInfoViewModel";
import moment from "moment";

const Reason_To_Meet = [
  { label: "Vendor", value: "vendor" },
  { label: "Relative", value: "relative" },
  { label: "Friend", value: "friend" },
  { label: "Guardian", value: "guardian" },
  { label: "Family", value: "family" },
  { label: "Interview", value: "interview" },
  { label: "Meeting", value: "meeting" },
  { label: "Other", value: "other" },
];

export default function VisitorInfo() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [modalData, setModalData] = useState({
    open: false,
    tableData: "",
    action: () => {},
  });

  const onAddClick = () => {
    setOpen(true);
  };

  // get Roles
  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.visitorInfo.list);
      // console.log(data, "hhaha");
      setData(
        data.result.map((r) => ({
          ...r,
          toMeetUserName: r.toMeetUser.basicInfo.name,
          checkIn: new Date(r.checkIn).toLocaleString(),
          checkOut: r.checkOut ? new Date(r.checkOut).toLocaleString() : "",
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // get Roles
  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);

      setRoles(
        data.result.map((r) => ({
          ...r,
          label: r.name,
          value: r._id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get section
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            "academicInfo.class": entryFormik.values.class,
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
      // entryFormik.setFieldValue("toMeetUser", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get Employee
  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: entryFormik.values.toMeetUserType,
          },
        },
      });

      setEmployee(
        data.result.map((emp) => ({
          ...emp,
          label: emp.basicInfo.name,
          value: emp._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Add/update
  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.visitorInfo.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.visitorInfo.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Formik
  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      phone: dataToEdit?.phone || "",
      comingForm: dataToEdit?.comingForm || "",
      toMeetUserType: dataToEdit?.toMeetUserType._id || "",
      toMeetUser: dataToEdit?.toMeetUser?._id || "",
      reasonToMeet: dataToEdit?.reasonToMeet || "",
      note: dataToEdit?.note || "",

      checkOut: dataToEdit?.checkOut
        ? moment(dataToEdit.checkOut, "DD/MM/YYYY, HH:mm:ss").format(
            "YYYY-MM-DDTHH:mm"
          )
        : "",

      class: dataToEdit?.class?._id || "",
      section: dataToEdit?.section?._id || "",
      roleName: dataToEdit?.roleName || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setDataToEdit(null);
    setOpen(false);
    // getData();
  };

  useEffect(() => {
    getRoles();
    getClasses();
    getData();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    if (entryFormik.values.toMeetUserType) {
      let roleName = roles.find(
        (r) => r._id === entryFormik.values.toMeetUserType
      )?.name;
      entryFormik.setFieldValue("roleName", roleName);
      getEmployees();
    }
  }, [entryFormik.values.toMeetUserType]);

  useEffect(() => {
    if (
      (entryFormik.values.toMeetUserType,
      entryFormik.values.class,
      entryFormik.values.section)
    ) {
      let roleName = roles.find(
        (r) => r._id === entryFormik.values.toMeetUserType
      )?.name;
      entryFormik.setFieldValue("roleName", roleName);
      getStudents();
    }
  }, [
    entryFormik.values.toMeetUserType,
    entryFormik.values.class,
    entryFormik.values.section,
  ]);

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      tableData: data,
    });
  };

  const onCloseViewModel = (e) => {
    setModalData({ ...modalData, open: false });
  };

  console.log(data, "mmmmmm");

  return (
    <>
      <PageHeader title="Visitor Info" />
      <Grid container mb={1}>
        <Grid
          xs={12}
          md={12}
          lg={12}
          item
          display="flex"
          justifyContent="flex-start"
          gap={1}>
          <Button size="small" variant="contained">
            Excel
          </Button>
          <Button size="small" variant="contained">
            Print
          </Button>
        </Grid>
      </Grid>

      <CustomTable
        actions={["view", "edit"]}
        tableKeys={visitorInfoTableKeys}
        bodyDataModal="visitor info"
        bodyData={data}
        onEditClick={handleEditClick}
        onViewClick={handleClickOpenView}
      />

      {/* view visitor info ============= */}
      <VisitorInfoViewModel
        title="Visitor Information"
        open={modalData?.open}
        tableData={modalData?.tableData}
        onClose={onCloseViewModel}
      />

      {/* Add visitor info ============== */}
      <AddForm title="Add visitor info" onAddClick={onAddClick} />

      {/* Add/update model ============== */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Visitor Info" : "Add Visitor Info"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Name"
              required={true}
              disabled={dataToEdit != null}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormInput
              formik={entryFormik}
              name="phone"
              label="Phone"
              required={true}
              disabled={dataToEdit != null}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FormInput
              formik={entryFormik}
              name="comingForm"
              label="Coming Form"
              required={true}
              disabled={dataToEdit != null}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              required={true}
              name="toMeetUserType"
              formik={entryFormik}
              label="Select To Meet User Type"
              options={roles}
              disabled={dataToEdit != null}
            />
          </Grid>

          {entryFormik.values.roleName === "STUDENT" && (
            <>
              <Grid xs={12} md={6} lg={6} item>
                <FormSelect
                  name="class"
                  formik={entryFormik}
                  label="Select Class"
                  options={classes}
                  disabled={dataToEdit != null}
                />
              </Grid>
              <Grid xs={12} md={6} lg={6} item>
                <FormSelect
                  name="section"
                  formik={entryFormik}
                  label="Select Section"
                  options={sections}
                  disabled={dataToEdit != null}
                />
              </Grid>
            </>
          )}

          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              required={true}
              name="toMeetUser"
              formik={entryFormik}
              label="Select To Meet User"
              options={
                entryFormik.values.roleName === "STUDENT" ? students : employees
              }
              disabled={dataToEdit != null}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              name="reasonToMeet"
              formik={entryFormik}
              label="Select Reason To Meet"
              options={Reason_To_Meet}
              disabled={dataToEdit != null}
            />
          </Grid>
          {dataToEdit != null && (
            <>
              <Grid xs={12} md={6} lg={6} item>
                <TextField
                  value={dataToEdit?.checkIn.toLocaleString()}
                  fullWidth
                  label="Check In"
                  name="checkIn"
                  disabled={dataToEdit != null}
                  sx={{
                    mt: 2,
                    borderWidth: 1,
                    borderRadius: (theme) => theme.shape.borderRadius,
                  }}
                  InputProps={{
                    style: {
                      borderWidth: 1,
                      height: "42px",
                      borderRadius: (theme) => theme.shape.borderRadius,
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} lg={6} item>
                <FormInput
                  formik={entryFormik}
                  label="Check Out"
                  name="checkOut"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          )}

          <Grid xs={12} sm={12} md={12} item>
            <FormInput formik={entryFormik} name="note" label="Note" />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
