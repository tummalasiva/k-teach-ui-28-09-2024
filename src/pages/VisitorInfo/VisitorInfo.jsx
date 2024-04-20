import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { visitorInfoTableKeys } from "../../data/tableKeys/visitorInfoData";
import { Button, Grid } from "@mui/material";

export default function VisitorInfo() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Visitor Info" />
      <Grid container mb={1}>
        <Grid
          xs={12}
          md={12}
          lg={12}
          item
          display="flex"
          justifyContent="flex-start"
          gap={1}
        >
          <Button size="small" variant="contained">
            Excel
          </Button>
          <Button size="small" variant="contained">
            Print
          </Button>
        </Grid>
      </Grid>

      <CustomTable
        actions={["edit"]}
        tableKeys={visitorInfoTableKeys}
        bodyDataModal="visitor info"
        bodyData={data}
      />
    </>
  );
}
