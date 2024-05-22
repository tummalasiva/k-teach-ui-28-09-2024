/** @format */

import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { routesTableKeys } from "../../data/tableKeys/routesData";

export default function Routes() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Trips" />

      <CustomTable
        actions={["edit"]}
        tableKeys={routesTableKeys}
        bodyDataModal="trips"
        bodyData={data}
      />
    </>
  );
}
