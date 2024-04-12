import { Box, Card, Grid, Paper, Typography, styled } from "@mui/material";
import React from "react";
import { Groups } from "@mui/icons-material";
import ChartBar from "./ChartBar";
import { Link } from "react-router-dom";

const OuterCard = styled(Card)(({ theme }) => ({
  marginBottom: "15px",
  padding: "10px",
  height: "auto",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  justifyContent: "center",
}));

const Content = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 500,
}));
const Data = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
}));
const Count = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  paddingTop: "5px",
}));

export default function Attendance() {
  return (
    <>
      <Paper sx={{ padding: 2, margin: "20px 0px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <OuterCard>
              <InnerBox>
                <Groups
                  sx={{
                    width: "80px",
                    height: "80px",
                    color: "#1b3779",
                  }}
                />
              </InnerBox>

              <Content>
                <Data>
                  <Typography>Students Attendance </Typography>
                  <Typography>2</Typography>
                  <Count>
                    <Typography>
                      <span style={{ color: "green", fontWeight: 600 }}>
                        P:
                      </span>
                      4
                    </Typography>
                    <Typography>
                      <span style={{ color: "red", fontWeight: 600 }}>A:</span>5
                    </Typography>
                  </Count>
                </Data>
              </Content>
            </OuterCard>
            <OuterCard>
              <InnerBox>
                <Groups
                  sx={{
                    width: "80px",
                    height: "80px",
                    color: "#1b3779",
                  }}
                />
              </InnerBox>

              <Content>
                <Data>
                  <Typography>Employee Attendance</Typography>
                  <Typography>7</Typography>
                  <Count>
                    <Typography>
                      <span style={{ color: "green", fontWeight: 600 }}>
                        P:
                      </span>
                      6
                    </Typography>
                    <Typography>
                      <span style={{ color: "red", fontWeight: 600 }}>A:</span>4
                    </Typography>
                  </Count>
                </Data>
              </Content>
            </OuterCard>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ChartBar />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
