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
      const roles = data.result
        .filter((r) => r.name?.toLowerCase() !== "student")
        .map((r) => ({
          label: r.name,
          value: r._id,
        }));
      setRoles(roles);
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
            role: entryFormik.values.userType,
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

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
        employeeId: values.employeeId,
        password: values.password,
      };

      console.log(payload, "jjjjjjjjjjjj");

      const { data } = await post(
        PRIVATE_URLS.account.changePasswordForUser,
        payload
      );
      console.log(data, "ooooooo");
    } catch (error) {
      console.log(error);
    }
  };
  const entryFormik = useFormik({
    initialValues: {
      userType: "",
      employeeId: "",
      password: "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    getRoles();
  }, [selectedSetting]);

  useEffect(() => {
    if (entryFormik.values.userType) {
      getEmployees();
    }
  }, [entryFormik.values.userType, selectedSetting._id]);

  return (
    <>
      <PageHeader title="User Password Reset" />
      <Paper sx={{ padding: 2 }}>
        <form onSubmit={entryFormik.handleSubmit}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="userType"
                formik={entryFormik}
                label="User Type"
                options={roles}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="employeeId"
                formik={entryFormik}
                label="Employees"
                options={employees}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6} lg={4} item>
              <FormInput
                formik={entryFormik}
                label="Password"
                name="password"
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} style={{ alignSelf: "center" }} item>
              <Button size="small" type="submit" variant="contained">
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
