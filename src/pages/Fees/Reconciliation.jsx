/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { reconciliationTableKeys } from "../../data/tableKeys/reconciliationData";
import { get, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
// icons
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Tooltip } from "@mui/material";

const CustomActionFee = ({
  onUpdate = () => {},
  data = {},
  // onEditClick = () => {},
  onNavigateFeeMap = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  console.log(data?.reconciliationStatus, "llloosing");

  const updateStatus = async (status, id) => {
    console.log(status, id, "pooo");

    try {
      setLoading(true);
      const payload = {
        action: status,
      };
      await put(
        `${PRIVATE_URLS.receipt.updateSingleReceiptReconciliationStatusStatus}/${id}`,
        payload
      );
      onUpdate();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Approve">
          <IconButton
            size="small"
            onClick={() => updateStatus("Approve", data?._id)}>
            <CheckIcon color="primary" fontSize="12px" />
          </IconButton>
        </Tooltip>
        {data?.reconciliationStatus === "Rejected" && (
          <Tooltip
            title="Reject"
            onClick={() => updateStatus("Reject", data?._id)}>
            <IconButton size="small">
              <CloseIcon color="error" fontSize="12px" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </>
  );
};

export default function Reconciliation() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);

  const getAllReceipts = async () => {
    try {
      const { data } = await get(
        PRIVATE_URLS.receipt.getReceiptsPaidWithCheque,
        {
          params: {
            schoolId: selectedSetting._id,
          },
        }
      );
      setData(
        data.result.map((d) => ({
          ...d,
          roleNo: d?.payeeDetails?.rollNumber,
          name: d?.payeeDetails?.name,
          bankName: d?.chequeDetails?.bankName,
          branchName: d?.chequeDetails?.branchName,
          chequeNumber: d?.chequeDetails?.chequeNumber,
          chequeDate: d?.chequeDetails?.chequeDate,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReceipts();
  }, [selectedSetting._id]);

  return (
    <>
      <PageHeader title="Fee Reconciliation" />
      <CustomTable
        actions={["custom"]}
        bodyDataModal="Fee Reconciliation"
        bodyData={data}
        tableKeys={reconciliationTableKeys}
        CustomAction={CustomActionFee}
        onUpdate={getAllReceipts}
      />
    </>
  );
}
