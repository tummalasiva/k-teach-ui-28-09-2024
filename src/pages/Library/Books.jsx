import React, { useState } from "react";
import { libraryBookTableKeys } from "../../data/tableKeys/libraryBooksData";
import CustomTable from "../../components/Tables/CustomTable";
import PageHeader from "../../components/PageHeader";
import { Button, Paper, Stack } from "@mui/material";

export default function Books() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Student Library" />

      <Paper sx={{ padding: 2, mb: 1 }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          <Button size="small" variant="contained">
            Download
          </Button>

          <Button size="small" variant="contained">
            Count By title
          </Button>

          <Button size="small" variant="contained">
            Stock Verification
          </Button>

          <Button size="small" variant="contained">
            Bulk Upload
          </Button>
        </Stack>
      </Paper>

      <CustomTable
        actions={["edit"]}
        tableKeys={libraryBookTableKeys}
        bodyDataModal="book"
        bodyData={data}
      />
    </>
  );
}
