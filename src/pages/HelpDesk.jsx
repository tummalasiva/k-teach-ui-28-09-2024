import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { ticketTableKeys } from "../data/tableKeys/ticketData";

export default function HelpDesk() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Tickets" />
      <CustomTable
        actions={[]}
        bodyDataModal="Tickets"
        bodyData={data}
        tableKeys={ticketTableKeys}
      />
    </>
  );
}
