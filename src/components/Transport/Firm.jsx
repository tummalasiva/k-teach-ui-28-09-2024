import React, { useState } from "react";
import { vehicleFirmTableKeys } from "../../data/tableKeys/vehcleFirmData";
import CustomTable from "../Tables/CustomTable";

export default function Firm() {
  const [data, setData] = useState([]);
  return (
    <>
      {" "}
      <CustomTable
        tableKeys={vehicleFirmTableKeys}
        bodyData={data}
        bodyDataModal="firm"
        actions={["edit"]}
      />
    </>
  );
}
