import React, { useState } from "react";
import { periodicalTableKeys } from "../../data/tableKeys/periodicalData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { Button, Paper, Stack } from "@mui/material";

export default function Periodical() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Periodical List" />
      <Paper sx={{ padding: 2, mb: 1 }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          <Button size="small" variant="contained">
            Download
          </Button>

          <Button size="small" variant="contained">
            Count By title
          </Button>

          <Button size="small" variant="contained">
            Bulk Upload
          </Button>
        </Stack>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={periodicalTableKeys}
        bodyDataModal="periodical list"
        bodyData={data}
      />
    </>
  );
}
