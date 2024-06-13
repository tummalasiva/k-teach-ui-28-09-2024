/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Paper, Grid, Button } from "@mui/material";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import { useFormik } from "formik";
import PageHeader from "../../components/PageHeader";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
export default function ResetPassword() {
  const { selectedSetting } = useContext(SettingContext);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployee] = useState([]);

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
  const getEmployees = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.employee.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            role: entryFormik.values.usertType,
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
  const entryFormik = useFormik({
    initialValues: {
      usertType: "",
      employee: "",
      password: "",
    },
    onSubmit: console.log("data"),
  });

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (entryFormik.values.usertType) {
      getEmployees();
    }
  }, [entryFormik.values.usertType, selectedSetting._id]);

  return (
    <>
      <PageHeader title="User Password Reset" />
      <Paper sx={{ padding: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="usertType"
              formik={entryFormik}
              label="User Type"
              options={roles}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4} item>
            <FormSelect
              required={true}
              name="employee"
              formik={entryFormik}
              label="Employees"
              options={employees}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={4} item>
            <FormInput formik={entryFormik} label="Password" name="password" />
          </Grid>
          <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
            <Button size="small" variant="contained">
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
