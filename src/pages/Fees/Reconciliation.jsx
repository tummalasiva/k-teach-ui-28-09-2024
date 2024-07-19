/** @format */

import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { reconciliationTableKeys } from "../../data/tableKeys/reconciliationData";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

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
        actions={[]}
        bodyDataModal="Fee Reconciliation"
        bodyData={data}
        tableKeys={reconciliationTableKeys}
      />
    </>
  );
}
