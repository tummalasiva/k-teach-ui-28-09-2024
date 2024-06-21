/** @format */

// /** @format */

// import React, { PureComponent, useEffect, useState, useContext } from "react";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Box, Paper } from "@mui/material";

// import useResizeObserver from "use-resize-observer";
// import { get } from "../../services/apiMethods";
// import { PRIVATE_URLS } from "../../services/urlConstants";
// import SettingContext from "../../context/SettingsContext";

// const ChartBar = ({}) => {
//   const { selectedSetting } = useContext(SettingContext);
//   const [classes, setClasses] = useState([]);
//   const [section, setSection] = useState([]);
//   const { ref, width, height } = useResizeObserver();

//   const getRandomColor = () => {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
//   };

//   const getStudent = async () => {
//     try {
//       const { data } = await get(
//         PRIVATE_URLS.student.getDashboardStudentDetails,
//         {
//           params: {
//             schoolId: selectedSetting._id,
//           },
//         }
//       );

//       console.log(data.result, "==========12345567899999999");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getStudent();
//   }, [selectedSetting._id]);

//   return (
//     <Box sx={{ display: "flex", flex: 1 }} ref={ref}>
//       <ResponsiveContainer width="100%" height="100%">
//         <Paper
//           sx={{
//             width: "100%",
//             height: "100%",
//           }}>
//           <BarChart
//             width={width ? width - 10 : 700}
//             height={350}
//             data={classes}
//             margin={{
//               top: 20,
//               right: 5,
//               left: 5,
//               bottom: 5,
//             }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {section.map((section) => (
//               <Bar
//                 key={section}
//                 dataKey={`${section}`}
//                 fill={`${getRandomColor()}`}
//                 stackId="a"
//               />
//             ))}
//           </BarChart>
//         </Paper>
//       </ResponsiveContainer>
//     </Box>
//   );
// };
// export default ChartBar;

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

  const fetchData = async () => {
    try {
      const { data } = await get(
        PRIVATE_URLS.student.getDashboardStudentDetails,
        {
          params: {
            schoolId: selectedSetting._id,
          },
        }
      );

      console.log(data.result, "---------");
      setClasses(data.result);

      // Extract unique section names
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
    if (selectedSetting._id) {
      fetchData();
    }
  }, [selectedSetting._id]);

  return (
    <Box sx={{ display: "flex", flex: 1 }} ref={ref}>
      <ResponsiveContainer width="100%" height={400}>
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
                dataKey={`sections.${sectionName}`}
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
