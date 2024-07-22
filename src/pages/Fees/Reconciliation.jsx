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
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";

const CustomActionFee = ({
  onUpdate = () => {},
  data = {},
  // onEditClick = () => {},
  onNavigateFeeMap = () => {},
}) => {
  const [loading, setLoading] = useState("");
  console.log(data?.reconciliationStatus, "llloosing");

  const updateStatus = async (status, id) => {
    console.log(status, id, "pooo");

    try {
      setLoading(status);
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
    setLoading("");
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Approve">
          <IconButton
            disabled={loading === "Approve"}
            size="small"
            onClick={() => updateStatus("Approve", data?._id)}>
            {loading === "Approve" ? (
              <CircularProgress size={20} />
            ) : (
              <CheckIcon color="primary" fontSize="12px" />
            )}
          </IconButton>
        </Tooltip>
        {data?.reconciliationStatus != "Rejected" && (
          <Tooltip title="Reject">
            <IconButton
              disabled={loading === "Reject"}
              size="small"
              onClick={() => updateStatus("Reject", data?._id)}>
              {loading === "Reject" ? (
                <CircularProgress size={20} />
              ) : (
                <CloseIcon color="error" fontSize="12px" />
              )}
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
