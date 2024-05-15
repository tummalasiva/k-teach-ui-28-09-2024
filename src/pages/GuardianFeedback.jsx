import React, { useContext, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Stack, styled } from "@mui/material";
import { guardianFeedbackTableKeys } from "../data/tableKeys/guardianFeedbackData";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { get, put } from "../services/apiMethods";
import { PRIVATE_URLS } from "../services/urlConstants";
import SettingContext from "../context/SettingsContext";
import { LoadingButton } from "@mui/lab";

const MuiBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "20px",
});

const CustomActionComponent = ({ onUpdate = () => {}, data = {} }) => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status) => {
    try {
      setLoading(true);
      await put(PRIVATE_URLS.guardianFeedback.update + "/" + data._id, {
        status,
      });
      setLoading(false);
      onUpdate();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        {["pending", "approved"].includes(data.status) && (
          <LoadingButton
            loading={loading}
            onClick={() => updateStatus("rejected")}
            disableElevation
            size="small"
            color="error"
            variant="contained"
          >
            Reject
          </LoadingButton>
        )}
        {["pending", "rejected"].includes(data.status) && (
          <LoadingButton
            loading={loading}
            onClick={() => updateStatus("approved")}
            disableElevation
            size="small"
            color="success"
            variant="contained"
          >
            Approve
          </LoadingButton>
        )}
      </Stack>
    </>
  );
};

export default function GuardianFeedback() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("pending");

  const getFeebacks = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.guardianFeedback.list, {
        params: { schoolId: selectedSetting._id },
      });
      setData(data.result);
      setFilteredData(data.result.filter((f) => f.status === selectedStatus));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeebacks();
  }, [selectedSetting._id]);

  useEffect(() => {
    setFilteredData(data.filter((f) => f.status === selectedStatus));
  }, [selectedStatus]);

  const handleDelete = async (_id) => {
    try {
      const { data } = await get(
        PRIVATE_URLS.guardianFeedback.delete + "/" + _id
      );
      getFeebacks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Guardian Feedback" />
      <MuiBox>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedStatus("pending");
            }}
          >
            Pending:{data.filter((f) => f.status === "pending").length}
          </Button>
          <Button
            onClick={() => {
              setSelectedStatus("approved");
            }}
          >
            Approved: {data.filter((f) => f.status === "approved").length}
          </Button>
          <Button
            onClick={() => {
              setSelectedStatus("rejected");
            }}
          >
            Rejected:{data.filter((f) => f.status === "rejected").length}
          </Button>
        </ButtonGroup>
      </MuiBox>
      <CustomTable
        actions={["custom", "delete", "view"]}
        bodyDataModal="feedback"
        bodyData={filteredData}
        tableKeys={guardianFeedbackTableKeys}
        onDeleteClick={handleDelete}
        CustomAction={CustomActionComponent}
        onUpdate={getFeebacks}
      />
    </>
  );
}
