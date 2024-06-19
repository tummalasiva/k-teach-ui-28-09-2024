/** @format */

import React, { useContext, useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { salaryGradeTableKeys } from "../../data/tableKeys/salaryGradeData";
import AddForm from "../../forms/AddForm";
import FormModal from "../../forms/FormModal";
import { Button, Grid, Typography } from "@mui/material";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomInput from "../../forms/CustomInput";
import ThemeModeContext from "../../context/ThemeModeContext";

const Active = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export default function SalaryGrade() {
  const { selectedSetting } = useContext(SettingContext);
  const { isDarkMode } = useContext(ThemeModeContext);
  const [data, setData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.salaryGrade.list, {
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

  const AddSalaryGrade = () => {
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
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.salaryGrade.update + "/" + dataToEdit._id,
          payload
        );
        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.salaryGrade.create, payload);
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
      grade: dataToEdit?.grade || "",
      active: dataToEdit?.active || true,
      from: dataToEdit?.from || "",
      to: dataToEdit?.to || "",
      breakups: dataToEdit?.breakups || [
        {
          id: 1,
          name: "",
          percentage: "",
        },
      ],
      deduction: dataToEdit?.deduction || [
        {
          id: 1,
          name: "",
          percentage: "",
        },
      ],
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleInputChange = (event, item, type) => {
    entryFormik.setFieldValue(
      type,
      entryFormik.values[type].map((i) =>
        i.id === item.id ? { ...i, [event.target.name]: event.target.value } : i
      )
    );
  };

  const addItem = (type) => {
    const initialData = [...entryFormik.values[type]];
    const newItem = {
      id: initialData.length + 1,
      name: "",
      percentage: "",
    };
    entryFormik.setFieldValue(type, [...initialData, newItem]);
  };

  const removeItem = (index, type) => {
    const initialData = [...entryFormik.values[type]];
    initialData.splice(index, 1);
    entryFormik.setFieldValue(type, initialData);
  };

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.salaryGrade.delete + "/" + id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Salary Grade" />

      <CustomTable
        actions={["edit", "delete"]}
        tableKeys={salaryGradeTableKeys}
        bodyDataModal="salary grade"
        bodyData={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      <AddForm title="Add Salary grade" onAddClick={AddSalaryGrade} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Salary Grade" : "Add Salary Grade"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="grade"
              label="Grade"
              required={true}
            />
          </Grid>

          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="from" label="From" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput formik={entryFormik} name="to" label="To" />
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
            <FormSelect
              name="active"
              formik={entryFormik}
              label="Status"
              options={Active}
            />
          </Grid>
        </Grid>

        {entryFormik.values.breakups.map((b, i) => (
          <>
            <Typography fontWeight={"bold"} mt={1}>
              Breakups:
            </Typography>
            <Grid
              container
              key={i}
              gap={1}
              sx={{
                backgroundColor: isDarkMode ? "transparent" : "#F0F8FF",
                borderRadius: "5px",
                padding: "20px 15px 30px 15px",
                border: "1px solid lightgrey",
                my: 1.5,
              }}>
              <Grid xs={12} sm={4} md={4} item>
                <CustomInput
                  value={b?.name}
                  name="name"
                  label="Name"
                  required={true}
                  onChange={(e) => handleInputChange(e, b, "breakups")}
                />
              </Grid>
              <Grid xs={12} sm={4} md={4} item>
                <CustomInput
                  value={b?.percentage}
                  name="percentage"
                  label="Percentage"
                  required={true}
                  onChange={(e) => handleInputChange(e, b, "breakups")}
                />
              </Grid>
              <Grid
                xs={12}
                sm={3}
                md={3}
                item
                sx={{
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}>
                <Button onClick={() => addItem("breakups")}>
                  <AddIcon />
                </Button>
                <Button color="error" onClick={() => removeItem(i, "breakups")}>
                  <RemoveIcon color="error" />
                </Button>
              </Grid>
            </Grid>
          </>
        ))}

        {entryFormik.values.deduction.map((d, i) => (
          <>
            <Typography fontWeight={"bold"} mt={1}>
              Deduction:
            </Typography>
            <Grid
              container
              key={i}
              gap={1}
              sx={{
                backgroundColor: isDarkMode ? "transparent" : "#F0F8FF",
                borderRadius: "5px",
                padding: "20px 15px 30px 15px",
                border: "1px solid lightgrey",
                my: 1.5,
              }}>
              <Grid xs={12} sm={4} md={4} item>
                <CustomInput
                  value={d?.name}
                  name="name"
                  label="Name"
                  required={true}
                  onChange={(e) => handleInputChange(e, d, "deduction")}
                />
              </Grid>
              <Grid xs={12} sm={4} md={4} item>
                <CustomInput
                  value={d?.percentage}
                  name="percentage"
                  label="Percentage"
                  required={true}
                  onChange={(e) => handleInputChange(e, d, "deduction")}
                />
              </Grid>
              <Grid
                xs={12}
                sm={3}
                md={3}
                item
                sx={{
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}>
                <Button onClick={() => addItem("deduction")}>
                  <AddIcon />
                </Button>
                <Button
                  color="error"
                  onClick={() => removeItem(i, "deduction")}>
                  <RemoveIcon color="error" />
                </Button>
              </Grid>
            </Grid>
          </>
        ))}
      </FormModal>
    </>
  );
}
