/** @format */

import { Box, Card, Fab, Grid, Paper, Typography, styled } from "@mui/material";
import React from "react";

import {
  CardMembership,
  FindInPage,
  Groups,
  Message,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import CheckPermission from "../Authentication/CheckPermission";

const DataContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  textAlign: "center",
  justifyContent: "space-evenly",
  padding: "25px 0px",
  flexDirection: "column",
}));
const StyledFab = styled(Fab)(({ theme }) => ({
  background: "#1b3779",
  color: "#fff",
  "&:hover": {
    color: "#1b3779",
  },
}));
export default function QuickLinks() {
  return (
    <>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.5)"
              : "whitesmoke",
        }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="center">
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
              }}>
              Quick Links
            </Typography>
          </Grid>
          <CheckPermission module="Admit Student" permission="add">
            {" "}
            <Grid item xs={12} sm={12} md={4}>
              <Link
                to="/sch/student/add-student"
                style={{ textDecoration: "none" }}>
                <DataContainer>
                  <Box>
                    <StyledFab size="small">
                      <Groups />
                    </StyledFab>
                  </Box>
                  <Box>Admit Students</Box>
                </DataContainer>
              </Link>
            </Grid>
          </CheckPermission>
          <CheckPermission module="Employee" permission="add">
            <Grid item xs={12} sm={12} md={4}>
              <Link
                to="/sch/human-resource/add-employee"
                style={{ textDecoration: "none" }}>
                <DataContainer>
                  <Box>
                    <StyledFab size="small">
                      <Groups />
                    </StyledFab>
                  </Box>
                  <Box>Admit Employee</Box>
                </DataContainer>
              </Link>
            </Grid>
          </CheckPermission>

          <CheckPermission module="Compose" permission="add">
            <Grid item xs={12} sm={12} md={4}>
              <Link
                to="/sch/communication_compose"
                style={{ textDecoration: "none" }}>
                <DataContainer>
                  <Box>
                    <StyledFab size="small">
                      <Message />
                    </StyledFab>
                  </Box>
                  <Typography>Communication</Typography>
                </DataContainer>
              </Link>
            </Grid>
          </CheckPermission>
        </Grid>
      </Paper>
    </>
  );
}
