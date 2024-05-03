import React, { useContext, useEffect, useState } from "react";
// custome components
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { rolePermissionTableKeys } from "../../data/tableKeys/rolePermissionData";
import { ROLE_PERMISSIONS } from "../../data/roleData";

import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import FormInput from "../../forms/FormInput";
import TabList from "../../components/Tabs/Tablist";
import FormModal from "../../forms/FormModal";
import AddForm from "../../forms/AddForm";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";

function toggleItemInArray(array, item) {
  const index = array.indexOf(item);

  if (index === -1) {
    // Item not present, add it to the array
    array.push(item);
  } else {
    // Item present, remove it from the array
    array.splice(index, 1);
  }

  return array;
}

function addIfNotPresent(arr, str) {
  if (!arr.includes(str)) {
    arr.push(str);
  }
  return arr;
}

function removeFromArray(arr, str) {
  const index = arr.indexOf(str);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),

  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  background: "whitesmoke",

  padding: theme.spacing(2),
  zIndex: 1000,
}));

const CRUD_OPERATIONS = ["view", "add", "update", "delete"];

export default function RolePermission() {
  const [value, setValue] = React.useState(0);
  const [roles, setRoles] = useState([]);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [roleKeys, setRoleKeys] = useState([]);
  const [allPermissionUpdate, setAllPermissionUpdate] = useState([
    "view",
    "add",
    "update",
    "delete",
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRoleEditClick = (data) => {
    setRoleToEdit(data);
    setValue(1);
  };
  const handleCancelClick = () => {
    setValue(0);
  };
  const openRoleAddUpdateModal = () => {
    setValue(0);
    setOpen(true);
  };

  const handleModalClose = () => setOpen(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.role.list);
      setRoles(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // const handleAddOrUpdate = async (values) => {
  //   let payload = {
  //     ...values,
  //     permissions: roleKeys,
  //   };

  //   if (!roleToEdit) {
  //     payload["permissions"] = roleKeys.map((r) => ({ ...r, permissions: [] }));
  //   }

  //   try {
  //     if (roleToEdit) {
  //       const { data } = await put(
  //         URLS.roles.update + "/" + roleToEdit._id,
  //         payload
  //       );
  //       setValue(0);
  //       getRoles();
  //     } else {
  //       const { data } = await post(URLS.roles.create, payload);
  //       setValue(0);
  //       getRoles();
  //     }

  //     formik.resetForm();
  //     setOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      role: "",
    },
    onSubmit: console.log("nnnn"),
  });

  const formikUpdate = useFormik({
    initialValues: {
      name: roleToEdit?.name || "",
    },
    onSubmit: console.log("hbhj"),
    enableReinitialize: true,
  });

  const handleChangePermission = (module, permission) => {
    setRoleKeys(
      roleKeys.map((k) =>
        k.module === module
          ? {
              ...k,
              permissions: toggleItemInArray(
                k.permissions,
                permission.toLowerCase()
              ),
            }
          : k
      )
    );
  };

  const handleUpdateAll = (permission) => {
    setRoleKeys(
      roleKeys.map((r) => ({
        ...r,
        permissions: allPermissionUpdate.includes(permission)
          ? removeFromArray(r.permissions, permission)
          : addIfNotPresent(r.permissions, permission),
      }))
    );
  };

  useEffect(() => {
    let allPermissions = [];

    for (let co of CRUD_OPERATIONS) {
      if (
        roleKeys.every((module) =>
          module.permissions.includes(co.toLowerCase())
        )
      ) {
        allPermissions.push(co.toLowerCase());
      } else {
        allPermissions.filter((p) => p !== co);
      }
    }

    setAllPermissionUpdate(allPermissions);
  }, [roleKeys]);

  return (
    <>
      <PageHeader title="Role Permission" />

      <TabList
        onChange={handleChange}
        value={value}
        labels={roleToEdit && value === 1 ? ["List", "Edit"] : ["List"]}
      />
      <TabPanel value={value} index={0}>
        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="role permission"
          bodyData={roles}
          onEditClick={handleRoleEditClick}
          tableKeys={rolePermissionTableKeys}
        />
        <AddForm title="Add Role" onAddClick={openRoleAddUpdateModal} />
      </TabPanel>

      <FormModal
        open={open}
        formik={formik}
        formTitle="Add Role"
        onClose={handleModalClose}
        submitButtonTitle="Apply"
      >
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} sm={12} md={12} item>
            <FormInput
              type="text"
              formik={formik}
              name="role"
              label="Role Name"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>

      {roleToEdit && value == 1 && (
        <TabPanel value={value} index={1}>
          <Grid container rowSpacing={1} columnSpacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <FormInput
                required={true}
                name="name"
                type="text"
                formik={formikUpdate}
                label="Role Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                sx={{
                  margin: "10px 0px",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                {" "}
                Set permission for this role
              </Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ marginBottom: "60px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell align="center">
                    View
                    <Checkbox
                      onChange={() => handleUpdateAll("view")}
                      name="view"
                      checked={allPermissionUpdate.includes("view")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    Add{" "}
                    <Checkbox
                      checked={allPermissionUpdate.includes("add")}
                      onChange={() => handleUpdateAll("add")}
                      name="add"
                    />{" "}
                  </TableCell>
                  <TableCell align="center">
                    Update{" "}
                    <Checkbox
                      checked={allPermissionUpdate.includes("update")}
                      onChange={() => handleUpdateAll("update")}
                      name="update"
                    />
                  </TableCell>
                  <TableCell align="center">
                    Delete{" "}
                    <Checkbox
                      checked={allPermissionUpdate.includes("delete")}
                      onChange={() => handleUpdateAll("delete")}
                      name="delete"
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ROLE_PERMISSIONS.map((roleModule, i) => {
                  const { module, subModule } = roleModule;

                  return (
                    <>
                      <TableRow key={i}>
                        <TableCell
                          colSpan={5}
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(32,33,32,1)"
                                : theme.palette.grey[100],
                          }}
                        >
                          <b>{module}</b>
                        </TableCell>
                      </TableRow>
                      {subModule.map((m, i) => (
                        <TableRow k={m.module + i.toString()}>
                          <TableCell align="center">{m.module}</TableCell>

                          {CRUD_OPERATIONS.map((o) => (
                            <TableCell align="center" key={o}>
                              <Checkbox
                                onChange={() =>
                                  handleChangePermission(m.module, o)
                                }
                                checked={
                                  roleKeys
                                    .find((role) => role.module === m.module)
                                    ?.permissions?.includes(o) || false
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid item xs={12} md={12}>
              <StyledBox
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(32,33,32,1)"
                      : theme.palette.grey[100],
                }}
              >
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={handleCancelClick}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={formikUpdate.handleSubmit}
                    variant="contained"
                  >
                    Update
                  </Button>
                </Stack>
              </StyledBox>
            </Grid>
          </Grid>
        </TabPanel>
      )}
    </>
  );
}
