/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import FormSelect from "../../forms/FormSelect";
import { feeMapCategoryTableKeys } from "../../data/tableKeys/feeMapCategoryData";
import { Add } from "@mui/icons-material";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";
import { toast } from "react-toastify";
import AddFeeMapCategory from "./AddFeeMapCategory";

const showInfo = (data) => {
  let result = [];

  for (let dep of data.dependencies) {
    if (["class"].includes(dep)) {
      let newItem = `[${data.class?.name}]-Class`;
      result.push(newItem);
    } else if (["classOld"].includes(dep)) {
      let newItem = `[${data.class?.name}]-Class-Old`;
      result.push(newItem);
    } else if (["classNew"].includes(dep)) {
      let newItem = `[${data.class?.name}]-Class-New`;
      result.push(newItem);
    } else if (dep === "hostel") {
      let newItem = `[${data.hostel?.name}]-Hostel`;
      result.push(newItem);
    } else if (dep == "transport") {
      let newItem = `[${data.route.vehicle.number}]+[${data.route.title}]-Transport-[${data.stop.name}]-Stop-[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    } else if (dep == "pickType") {
      let newItem = `[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    }
  }

  return result.join(" | ");
};

export default function FeeMapCategory() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [receipts, setReceips] = useState([]);
  const [feeMaps, setFeeMaps] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Category 1",
      amount: 1,
      description: "",
    },
  ]);

  const addCategory = () => {
    let newCategories = [
      ...categories,
      { id: categories.length + 1, name: "New", amount: 1, description: "" },
    ];
    setCategories(newCategories);
  };

  const removeCategory = (id) => {
    let newCategories = categories.filter((c) => c.id !== id);
    setCategories(newCategories);
  };

  // get Receipt list
  const getReceipts = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: { schoolId: selectedSetting._id },
      });

      setReceips(data.result.map((r) => ({ label: r.name, value: r._id })));
      Formik.setFieldValue("name", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get fee map list
  const getFeeMaps = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.feeMap.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { receiptTitle: Formik.values.name },
        },
      });
      setFeeMaps(
        data?.result?.map((f) => ({ ...f, label: showInfo(f), value: f._id }))
      );
      Formik.setFieldValue("feeMap", data.result[0]?._id);
    } catch (error) {
      console.error(error);
    }
  };

  // get fee map category list
  const handleGetFeeCategories = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.feeMapCategory.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            feeMap: values?.feeMap,
          },
        },
      });

      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      feeMap: "",
    },
    onSubmit: handleGetFeeCategories,
  });

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.feeMapCategory.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        if (
          categories.find(
            (c) => !c.name || !parseFloat(c.amount) || parseFloat(c.amount) < 0
          )
        ) {
          setLoading(false);
          return toast.error(
            "Please mention name and amount for each category"
          );
        }

        const { data } = await post(
          PRIVATE_URLS.feeMapCategory.createMultiple,
          {
            schoolId: selectedSetting._id,
            feeMapId: Formik.values.feeMap,
            categories: categories.map((c) => ({
              ...c,
              amount: parseFloat(c.amount),
            })),
          }
        );
      }
      handleClose();
      handleCloseAddModel();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const entryFormik = useFormik({
    initialValues: {
      name: dataToEdit?.name || "",
      description: dataToEdit?.description || "",
      amount: dataToEdit?.amount || "",
      feeMapId: "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (Formik.values.name) {
      getFeeMaps();
    }
  }, [selectedSetting, Formik.values.name]);

  useEffect(() => {
    getReceipts();
  }, [selectedSetting._id]);

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
    handleGetFeeCategories();
    Formik.resetForm();
  };

  const handleCloseAddModel = () => {
    setOpenAddModal(false);
    setCategories([
      {
        id: 1,
        name: "Category 1",
        amount: 1,
        description: "",
      },
    ]);
  };

  useEffect(() => {
    if (Formik.values.feeMap) {
      Formik.handleSubmit();
    }
  }, [Formik.values.feeMap, selectedSetting._id]);

  const handleFeeMapCategoryEdit = (data) => {
    // console.log(data, "editcat");
    setOpen(true);
    setDataToEdit(data);
  };

  const handleDelete = async (id) => {
    try {
      const res = await del(PRIVATE_URLS.feeMapCategory.delete + "/" + id);
      handleGetFeeCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title="Fee Map Category" />
      <Grid
        rowSpacing={1}
        columnSpacing={2}
        container
        sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="name"
            formik={Formik}
            label="Select Receipt Name"
            options={receipts}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <FormSelect
            required={true}
            name="feeMap"
            formik={Formik}
            label="Select Fee Maps"
            options={feeMaps}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3} item>
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={() => setOpenAddModal(true)}>
            Add Fee Category
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="Fee Map Category"
        bodyData={data}
        tableKeys={feeMapCategoryTableKeys}
        feeMapTableKeys
        onEditClick={handleFeeMapCategoryEdit}
        onDeleteClick={handleDelete}
      />

      {/* Update Fee map Category ========= */}
      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={
          dataToEdit ? "Update Fee Map Category" : "Add Fee Map Category"
        }
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={4} item>
            <FormInput
              formik={entryFormik}
              name="name"
              label="Name"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <FormInput
              formik={entryFormik}
              name="amount"
              label="Amount"
              type="number"
              required={true}
            />
          </Grid>
        </Grid>
      </FormModal>

      {/* Add Fee Map category modal */}
      <AddFeeMapCategory
        open={openAddModal}
        adding={loading}
        categories={categories}
        setCategories={setCategories}
        addCategory={addCategory}
        removeCategory={removeCategory}
        onClose={handleCloseAddModel}
        onSubmit={() => entryFormik.handleSubmit()}
      />
    </>
  );
}
