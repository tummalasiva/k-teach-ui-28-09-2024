/** @format */

import React, { useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Paper } from "@mui/material";
import useResizeObserver from "use-resize-observer";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";

const ChartBar = () => {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [uniqueSections, setUniqueSections] = useState([]);
  const { ref, width } = useResizeObserver();

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const getData = async () => {
    try {
      const { data } = await get(
        PRIVATE_URLS.student.getDashboardStudentDetails,
        {
          params: {
            schoolId: selectedSetting._id,
          },
        }
      );

      const transformedData = data.result.map((classItem) => {
        const transformedItem = { className: classItem.className };
        Object.keys(classItem.sections).forEach((section) => {
          transformedItem[section] = classItem.sections[section];
        });
        return transformedItem;
      });

      setClasses(transformedData);

      const sections = new Set();
      data.result.forEach((classItem) => {
        Object.keys(classItem.sections).forEach((section) => {
          sections.add(section);
        });
      });

      setUniqueSections([...sections]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedSetting]);

  return (
    <Box sx={{ display: "flex", flex: 1 }} ref={ref}>
      <ResponsiveContainer width="100%" height="100%">
        <Paper sx={{ width: "100%", height: "100%" }}>
          <BarChart
            width={width ? width - 10 : 700}
            height={350}
            data={classes}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="className" />
            <YAxis />
            <Tooltip />
            <Legend />
            {uniqueSections.map((sectionName) => (
              <Bar
                key={sectionName}
                dataKey={sectionName}
                fill={getRandomColor()}
                stackId="stack"
              />
            ))}
          </BarChart>
        </Paper>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartBar;
