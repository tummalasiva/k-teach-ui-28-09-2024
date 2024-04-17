import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { manageRouteTableKeys } from "../../data/tableKeys/manageRouteData";

export default function ManageRouteAndTrips() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Manage Route & Trips" />

      <CustomTable
        actions={["edit"]}
        tableKeys={manageRouteTableKeys}
        bodyDataModal="route"
        bodyData={data}
      />
    </>
  );
}
