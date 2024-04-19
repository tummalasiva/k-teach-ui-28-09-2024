import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { receiptBookTableKeys } from "../../data/tableKeys/receiptBookData";
import { Button, Grid } from "@mui/material";
import TabList from "../../components/Tabs/Tablist";
import TabPanel from "../../components/Tabs/TabPanel";
import { useFormik } from "formik";
import { Add } from "@mui/icons-material";
import { feeMapTableKeys } from "../../data/tableKeys/feeMapData";
import FormSelect from "../../forms/FormSelect";

export default function ReceiptBook() {
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      receipt: "",
    },
    onSubmit: console.log("nnnn"),
  });

  return (
    <>
      <PageHeader title="Receipt Book" />

      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Receipt Book", "Fee Map"]}
      />
      <TabPanel index={0} value={value}>
        <Button variant="contained" startIcon={<Add />} sx={{ mt: 1, mb: 2 }}>
          Add Receipt
        </Button>
        <CustomTable
          actions={["edit"]}
          bodyDataModal="Receipt Book"
          bodyData={data}
          tableKeys={receiptBookTableKeys}
          feeMapTableKeys
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="receipt"
              formik={entryFormik}
              label="Select Receipt"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <Button variant="contained" startIcon={<Add />}>
              Add Fee Map
            </Button>
          </Grid>
        </Grid>

        <CustomTable
          actions={["edit"]}
          bodyDataModal="Fee Map"
          bodyData={data}
          tableKeys={feeMapTableKeys}
          feeMapTableKeys
        />
      </TabPanel>
    </>
  );
}
