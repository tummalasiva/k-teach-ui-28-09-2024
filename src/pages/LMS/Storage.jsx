/** @format */

import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import SettingContext from "../../context/SettingsContext";
import { del, get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

const StorageText = styled(Typography)(() => ({
  border: "1px solid lightGrey",
  fontWeight: "600",
  padding: 10,
  borderRadius: 5,
  textAlign: "center",
}));
const StorageContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Storage = () => {
  const { selectedSetting } = useContext(SettingContext);

  const [storageDetails, setStorageDetails] = useState({
    totalStorage: 0,
    usedStorage: 0,
  });

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.storage.details);

      console.log(data, "firm");
      setStorageDetails(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting._id]);

  return (
    <>
      <PageHeader title="Storage" />
      <StorageContainer>
        <Paper
          sx={{
            padding: 4,
            width: { xs: "100%", sm: "70%", md: "50%", lg: "40%" },
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <StorageText>
                Total Storage:{" "}
                <Typography component="span" fontWeight="bold" color="#607d8b">
                  {storageDetails.totalStorage}
                </Typography>
              </StorageText>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <StorageText>
                Used Storage:{" "}
                <Typography component="span" fontWeight="bold" color="#607d8b">
                  {storageDetails.usedStorage}
                </Typography>
              </StorageText>
            </Grid>
          </Grid>
        </Paper>
      </StorageContainer>
    </>
  );
};

export default Storage;
