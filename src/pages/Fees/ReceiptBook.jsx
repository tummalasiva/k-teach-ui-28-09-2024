/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { receiptBookTableKeys } from "../../data/tableKeys/receiptBookData";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Switch,
  styled,
} from "@mui/material";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import { Add, Edit, Search } from "@mui/icons-material";
import { feeMapTableKeys } from "../../data/tableKeys/feeMapData";
import FormSelect from "../../forms/FormSelect";
import FormInput from "../../forms/FormInput";
import FormModal from "../../forms/FormModal";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import { LoadingButton } from "@mui/lab";
import AddUpdateFeeMap from "./AddUpdateFeeMap";
import ViewInstallments from "./ViewInstallments";

const CustomSwitch = styled(Switch)(({}) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "green",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "green",
  },
  "& .MuiSwitch-switchBase": {
    color: "red",
  },
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: "red",
  },
}));

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
    } else if (["hostel"].includes(dep)) {
      let newItem = `[${data.hostel?.name}]-Hostel`;
      result.push(newItem);
    } else if (["transport"].includes(dep)) {
      let newItem = `[${data?.route?.vehicle?.number}]+[${data?.route?.title}]-Transport-[${data?.stop?.name}]-Stop-[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    } else if (["pickType"].includes(dep)) {
      let newItem = `[${data.pickType}]-Pick_Type`;
      result.push(newItem);
    }
  }

  return result.join(" | ");
};

const CustomActionFee = ({
  onUpdate = () => {},
  data = {},
  onEditClick = () => {},
  onNavigateFeeMap = () => {},
}) => {
  const [loading, setLoading] = useState(false);
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
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          size="small"
          variant="contained"
          onClick={() => onNavigateFeeMap(data._id)}>
          Fee Map
        </Button>

        <Tooltip title="Edit">
          <IconButton onClick={() => onEditClick(data)} size="small">
            <Edit color="primary" fontSize="12px" />
          </IconButton>
        </Tooltip>
        <Tooltip title={data.active ? "Deactive" : "Activate"}>
          <CustomSwitch
            size="small"
            checked={data.active}
            onChange={updateStatus}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Tooltip>
      </Stack>
    </>
  );
};

export default function ReceiptBook() {
  const { selectedSetting } = useContext(SettingContext);
  const [feeMaps, setFeeMaps] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openFeeMap, setOpenFeeMap] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState("");
  const [modalData, setModalData] = useState({
    open: false,
    tableData: [],
    action: () => {},
  });

  // get fee map list
  const getFeeMaps = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.feeMap.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { receiptTitle: selectedReceiptId },
        },
      });
      setFeeMaps(data?.result?.map((f) => ({ ...f, detail: showInfo(f) })));
    } catch (error) {
      console.error(error);
    }
  };

  // get Receipt list
  const getReceipts = async () => {
    try {
      const { data, status } = await get(PRIVATE_URLS.receiptTitle.list, {
        params: { schoolId: selectedSetting._id },
      });
      setReceipts(data.result);
      if (data.result.length > 0) {
        setSelectedReceiptId(
          selectedReceiptId ? selectedReceiptId : data.result[0]._id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedReceiptId) {
      getFeeMaps();
    }
  }, [selectedReceiptId, selectedSetting._id]);

  useEffect(() => {
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
    getReceipts();
  };

  const handleCreateOrUpdate = async (values) => {
    try {
      const payload = {
        ...values,
        schoolId: selectedSetting?._id,
      };
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.receiptTitle.update + "/" + dataToEdit._id,
          payload
        );
      } else {
        const { data } = await post(PRIVATE_URLS.receiptTitle.create, payload);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // active/inactive fee Map
  const handleToggleButton = async (d) => {
    try {
      const { data } = await put(
        PRIVATE_URLS.feeMap.toggleActiveStatus + "/" + d._id
      );
      // console.log(data, "data");
      getFeeMaps();
    } catch (error) {
      console.error(error);
    }
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

  const handleOpenFeeMap = () => {
    setOpenFeeMap(true);
    setDataToEdit(null);
    setSelectedReceiptId("");
  };

  const handleFeeMapEdit = (data) => {
    // console.log(data, "newss");
    setDataToEdit(data);
    setOpenFeeMap(true);
  };

  const handleFeeMapNavigate = (id) => {
    setSelectedReceiptId(id);
    setSelectValue(1);
  };

  const handleClickOpenView = (data) => {
    setModalData({
      ...modalData,
      open: true,
      tableData: data?.installments,
    });
  };

  const onCloseViewModel = (e) => {
    setModalData({ ...modalData, open: false });
  };

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
          size="small"
          onClick={handleClickOpen}
          startIcon={<Add />}
          sx={{ mt: 1, mb: 2 }}>
          Add Receipt
        </Button>

        <CustomTable
          actions={["custom"]}
          bodyDataModal="Receipt Book"
          bodyData={receipts}
          tableKeys={receiptBookTableKeys}
          feeMapTableKeys
          onEditClick={handleEditClick}
          onNavigateFeeMap={handleFeeMapNavigate}
          CustomAction={CustomActionFee}
          onUpdate={getReceipts}
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
          sx={{ display: "flex", alignItems: "center", my: 1.5 }}>
          <Grid xs={12} md={6} lg={3} item>
            <FormControl fullWidth size="small">
              <InputLabel>Select Receipt</InputLabel>
              <Select
                required={true}
                fullWidth
                value={selectedReceiptId || ""}
                onChange={(e) => setSelectedReceiptId(e.target.value)}
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
              onClick={handleOpenFeeMap}>
              Add Fee Map
            </Button>
          </Grid>
        </Grid>

        <CustomTable
          actions={["edit", "switch", "view"]}
          bodyDataModal="Fee Map"
          bodyData={feeMaps}
          tableKeys={feeMapTableKeys}
          toggleStatus="active"
          onToggleSwitch={handleToggleButton}
          onViewClick={handleClickOpenView}
          onEditClick={handleFeeMapEdit}
        />

        {/* Add/Update Fee Map ========= */}
        <AddUpdateFeeMap
          open={openFeeMap}
          dataToEdit={dataToEdit}
          getFeeMaps={getFeeMaps}
          setOpen={setOpenFeeMap}
          loading={loading}
          selectedReceipt={selectedReceiptId}
        />

        {/* view installments */}
        <ViewInstallments
          title="Installment Details"
          open={modalData?.open}
          tableData={modalData?.tableData}
          onClose={onCloseViewModel}
        />
      </TabPanel>
    </>
  );
}
