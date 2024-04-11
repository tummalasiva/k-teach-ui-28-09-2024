import React, { PureComponent, useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Paper } from "@mui/material";

import useResizeObserver from "use-resize-observer";

const sectionNames = ["Section A", "Section B", "Section C"];
const studentDetails = [
  { name: " 1", "Section A": 50, "Section B": 60, "Section C": 70 },
  { name: " 2", "Section A": 70, "Section B": 80, "Section C": 90 },
  { name: " 3", "Section A": 70, "Section B": 80, "Section C": 90 },
];

const ChartBar = ({}) => {
  const { ref, width, height } = useResizeObserver();

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }} ref={ref}>
      <ResponsiveContainer width="100%" height="100%">
        <Paper
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <BarChart
            width={width ? width - 10 : 700}
            height={350}
            data={studentDetails}
            margin={{
              top: 20,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {sectionNames.map((sectionName) => (
              <Bar
                key={sectionName}
                dataKey={`${sectionName}`}
                fill={`${getRandomColor()}`}
                stackId="a"
              />
            ))}
          </BarChart>
        </Paper>
      </ResponsiveContainer>
    </Box>
  );
};
export default ChartBar;
