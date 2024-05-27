/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { receiptBookTableKeys } from "../../data/tableKeys/receiptBookData";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import { Add } from "@mui/icons-material";
import { feeMapTableKeys } from "../../data/tableKeys/feeMapData";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import AddUpdateFeeMap from "./AddUpdateFeeMap";

const CustomActionFee = ({
  onUpdate = () => {},
  data = {},
  onEditClick = () => {},
  onNavigateFeeMap = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  console.log(data, "kuahsa");

  const updateStatus = async () => {
    try {
      setLoading(true);
      await put(`${PRIVATE_URLS.receiptTitle.toggleActiveStatus}/${data._id}`);
      onUpdate();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="contained"
          onClick={() => onEditClick(data)}>
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => onNavigateFeeMap(data._id)}>
          Fee Map
        </Button>
        <LoadingButton
          loading={loading}
          size="small"
          onClick={updateStatus}
          color={data.active ? "success" : "error"}
          variant="contained">
          {data.active ? "Activate" : "DeActivate"}
        </LoadingButton>
      </Stack>
    </>
  );
};

export default function ReceiptBook() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openFeeMap, setOpenFeeMap] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState("");
  const [selectReceipt, setSelectReceipt] = useState(selectedReceiptId || "");
  console.log(selectReceipt, "dyan");

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // get Receipt list
  const getReceipts = async () => {
    try {
      const { data, status } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: { schoolId: selectedSetting._id },
      });
      // console.log(data, status, "usha");
      // setReceipts(data.result.map((r) => ({ label: r.name, value: r._id })));

      if (status > 199 && status < 299) {
        setReceipts(data.result);
        if (data.result.length > 0) {
          setSelectReceipt(selectReceipt ? selectReceipt : data.result[0]._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getReceipts();
  }, [selectedSetting]);

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const handleClickOpen = () => {
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
          PRIVATE_URLS.receiptTitle.update + "/" + dataToEdit._id,
          payload
        );

        getData();
      } else {
        const { data } = await post(PRIVATE_URLS.receiptTitle.create, payload);
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
      name: dataToEdit?.name || "",
      active: dataToEdit?.active || true,
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  const handleEditClick = (data) => {
    setDataToEdit(data);
    setOpen(true);
  };

  const handleFeeMapEdit = (id, data) => {
    console.log(data, "hgafs");
    setDataToEdit({ ...data });
    // setAddForm({
    //   ...data,
    //   schoolClass: data.class?._id,
    //   route: data.route?._id,
    //   room: data.room?._id,
    //   others: data.installments.length,
    //   installmentType: calculateInstallmentType(data.installments.length),
    // });
  };

  const handleFeeMap = (id) => {
    setSelectedReceiptId(id);
    setSelectValue(1);
  };

  console.log(entryFormik.values.receipt, "bababa");
  console.log(selectedReceiptId, "selectedReceiptId");

  return (
    <>
      <PageHeader title="Receipt Book" />

      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Receipt Book", "Fee Map"]}
      />
      <TabPanel index={0} value={value}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<Add />}
          sx={{ mt: 1, mb: 2 }}>
          Add Receipt
        </Button>

        <CustomTable
          actions={["custom"]}
          bodyDataModal="Receipt Book"
          bodyData={data}
          tableKeys={receiptBookTableKeys}
          feeMapTableKeys
          onEditClick={handleEditClick}
          onNavigateFeeMap={handleFeeMap}
          CustomAction={CustomActionFee}
          onUpdate={getData}
        />
        {/* Add/Update Receipt book ========= */}
        <FormModal
          open={open}
          formik={entryFormik}
          formTitle={dataToEdit ? "Update Receipt Book" : "Add Receipt Book"}
          onClose={handleClose}
          submitButtonTitle={dataToEdit ? "Update" : "Submit"}
          adding={loading}>
          <Grid rowSpacing={0} columnSpacing={2} container>
            <Grid xs={12} sm={6} md={12} item>
              <FormInput
                formik={entryFormik}
                name="name"
                label="Receipt Name"
                required={true}
              />
            </Grid>
          </Grid>
        </FormModal>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Grid xs={12} md={6} lg={3} item>
            <FormControl fullWidth size="small">
              <InputLabel>Select Receipt</InputLabel>
              <Select
                required={true}
                fullWidth
                value={selectReceipt || ""}
                onChange={(e) => setSelectReceipt(e.target.value)}
                label="Select Receipt">
                {receipts.map((receipt) => (
                  <MenuItem value={receipt._id} key={receipt._id || ""}>
                    {receipt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenFeeMap(true)}>
              Add Fee Map
            </Button>
          </Grid>
        </Grid>

        <CustomTable
          actions={["edit"]}
          bodyDataModal="Fee Map"
          bodyData={data}
          tableKeys={feeMapTableKeys}
          onEditClick={handleFeeMapEdit}
        />

        {/* Add/Update Fee Map ========= */}
        <AddUpdateFeeMap
          open={openFeeMap}
          entryFormik={entryFormik}
          dataToEdit={dataToEdit}
          setOpen={setOpenFeeMap}
          loading={loading}
          selectedReceipt={selectReceipt}
        />
      </TabPanel>
    </>
  );
}
