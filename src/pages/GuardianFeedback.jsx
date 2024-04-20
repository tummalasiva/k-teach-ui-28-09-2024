import React, { useState } from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import { guardianFeedbackTableKeys } from "../data/tableKeys/guardianFeedbackData";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";

const MuiBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "20px",
});

export default function GuardianFeedback() {
  const [data, setData] = useState([]);
  return (
    <>
      <PageHeader title="Guardian Feedback" />
      <MuiBox>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            variant="outlined"
            // onClick={() => {
            //   handleButtonClick(1);
            // }}
          >
            All:0
          </Button>
          <Button
          // onClick={() => {
          //   handleButtonClick(2);
          // }}
          >
            Approved: 0
          </Button>
          <Button
          // onClick={() => {
          //   handleButtonClick(3);
          // }}
          >
            Pending:0
          </Button>
        </ButtonGroup>
      </MuiBox>
      <CustomTable
        actions={["delete", "switch"]}
        bodyDataModal="feedback"
        bodyData={data}
        tableKeys={guardianFeedbackTableKeys}
      />
    </>
  );
}
