/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
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
  
  const onAddClick = () => {
    setOpen(true);
  };

  // get Roles
  const getRoles = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);

      setRoles(
        data.result.map((r) => ({
          label: r.name,
          // value: r.name,
          value: r._id,
        }))
      );
      entryFormik.setFieldValue("roleName",)
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
          search:{
            role: entryFormik.values.toMeetUserType
          }
        },
      });

      console.log(data.result, "employyeee");
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

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      phone: dataToEdit?.phone || "",
      comingForm: dataToEdit?.comingForm || "",
      toMeetUserType: dataToEdit?.toMeetUserType || "",
      toMeetUser: dataToEdit?.toMeetUser || "",
      reasonToMeet: dataToEdit?.reasonToMeet || "",
      note: dataToEdit?.note || "",

      class: dataToEdit?.class || "",
      section: dataToEdit?.section || "",
      roleName: dataToEdit?.roleName || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleClose = () => {
    setDataToEdit(null);
    setOpen(false);
  };

  useEffect(() => {
    getRoles();
    getClasses();
  }, []);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
    }
  }, [entryFormik.values.class]);

  useEffect(() => {
    if (entryFormik.values.class && entryFormik.values.section) {
      getStudents();
    }
  }, [entryFormik.values.class, entryFormik.values.section]);

  useEffect(() => {
    if (entryFormik.values.toMeetUserType) {
      getEmployees();
    }
  }, [entryFormik.values.toMeetUserType]);


  console.log(entryFormik.values.roleName, "roleName");

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
        actions={["edit"]}
        tableKeys={visitorInfoTableKeys}
        bodyDataModal="visitor info"
        bodyData={data}
      />

      <AddForm title="Add visitor info" onAddClick={onAddClick} />

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
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormInput
              formik={entryFormik}
              name="phone"
              label="Phone"
              required={true}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FormInput
              formik={entryFormik}
              name="comingForm"
              label="Coming Form"
              required={true}
            />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              required={true}
              name="toMeetUserType"
              formik={entryFormik}
              label="Select To Meet User Type"
              options={roles}
            />
          </Grid>

          {entryFormik.values.toMeetUserType === "STUDENT" && (
            <>
              <Grid xs={12} md={6} lg={6} item>
                <FormSelect
                  name="class"
                  formik={entryFormik}
                  label="Select Class"
                  options={classes}
                />
              </Grid>
              <Grid xs={12} md={6} lg={6} item>
                <FormSelect
                  name="section"
                  formik={entryFormik}
                  label="Select Section"
                  options={sections}
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
              options={entryFormik.values.toMeetUserType==="STUDENT"? students:employees}
            />
          </Grid>

          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              name="reasonToMeet"
              formik={entryFormik}
              label="Select Reason To Meet"
              // options={Is_Public}
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
