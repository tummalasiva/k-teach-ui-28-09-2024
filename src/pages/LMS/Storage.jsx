import React from "react";
import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import PageHeader from "../../components/PageHeader";

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
  return (
    <>
      <PageHeader title="Storage" />
      <StorageContainer>
        <Paper
          sx={{
            padding: 4,
            width: { xs: "100%", sm: "70%", md: "50%", lg: "40%" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <StorageText>
                Total Storage:{" "}
                <Typography component="span" fontWeight="bold" color="#607d8b">
                  2
                </Typography>{" "}
              </StorageText>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <StorageText>
                Used Storage:{" "}
                <Typography component="span" fontWeight="bold" color="#607d8b">
                  4
                </Typography>{" "}
              </StorageText>
            </Grid>
          </Grid>
        </Paper>
      </StorageContainer>
    </>
  );
};

export default Storage;
