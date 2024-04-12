import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabList({
  labels = [],
  onChange = () => {},
  value = 0,
}) {
  return (
    <Box
      component={Paper}
      sx={{
        marginBottom: "10px",
      }}
    >
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {labels.map((l, index) => {
          return <Tab key={l} label={l} {...a11yProps(index)} />;
        })}
      </Tabs>
    </Box>
  );
}
