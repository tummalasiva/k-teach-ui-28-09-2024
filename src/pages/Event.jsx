import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { eventTableKeys } from "../data/tableKeys/eventData";

export default function Event() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Events" />
      <CustomTable
        actions={["edit", "delete"]}
        bodyDataModal="events"
        bodyData={data}
        tableKeys={eventTableKeys}
      />
    </>
  );
}
