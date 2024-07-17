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
import { get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";
import FormModal from "../../forms/FormModal";
import FormInput from "../../forms/FormInput";

export default function FeeMapCategory() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [receipts, setReceips] = useState([]);
  const [feeMaps, setFeeMaps] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showInfo = (data) => {
    console.log(data, "feemapppp");
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
    } catch (error) {
      console.error(error);
    }
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      feeMap: "",
    },
    onSubmit: console.log("nnnn"),
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
        const { data } = await post(
          PRIVATE_URLS.feeMapCategory.create,
          payload
        );
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
      description: dataToEdit?.description || "",
      amount: dataToEdit?.amount || "",
      feeMapId: "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    getReceipts();
    getFeeMaps();
  }, [selectedSetting]);

  useEffect(() => {
    if (Formik.values.name) {
      getFeeMaps();
    }
  }, [Formik.values.name]);

  const handleClose = () => {
    // getData();
    setOpen(false);
    setDataToEdit(null);
  };

  console.log(Formik.values.name, "jush");

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
            onClick={() => setOpen(true)}>
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
      />

      {/* Add/Update Fee map Category ========= */}
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
    </>
  );
}
