import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { vehicleTableKeys } from "../../data/tableKeys/vehicleData";

export default function Vehicle() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Vehicle" />

      <CustomTable
        actions={["edit"]}
        tableKeys={vehicleTableKeys}
        bodyDataModal="vehicle"
        bodyData={data}
      />
    </>
  );
}
