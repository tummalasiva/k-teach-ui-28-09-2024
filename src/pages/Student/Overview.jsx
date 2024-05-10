import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import StudentCount from "../../components/Student/StudentCount";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get } from "../../services/apiMethods";
import CustomSelect from "../../forms/CustomSelect";
import SettingContext from "../../context/SettingsContext";

const TableHeader = styled(TableCell)(({ theme }) => ({
  borderRight: "1px solid grey",
}));
const TableDivider = styled(Divider)(({ theme }) => ({
  borderBottomColor: "grey",
  width: "100%",
}));

const DataContiner = styled(Box)(({ theme }) => ({
  marginTop: "52px",
  display: "flex",
  rowGap: "2px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "10px",
}));

export default function Overview() {
  const { selectedSetting } = useContext(SettingContext);
  const [academicYear, setAcademicYear] = useState([]);
  const [selectAcademicYear, setSelectAcademicYear] = useState("");
  const [overviewDetails, setOverviewDetails] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMaleStudents, setTotalMaleStudents] = useState(0);
  const [totalFemaleStudents, setTotalFemaleStudents] = useState(0);

  const [data, setData] = useState([
    {
      className: "4",
      maleStudents: "7",
      femaleStudents: "9",
      totalStudents: "78",

      overviewData: [
        {
          section: "A",
          maleCount: "89",
          femaleCount: "78",
          total: "70",
        },
      ],
    },
  ]);

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({ label: `${d.from}-${d.to}`, value: d._id }))
      );
      setSelectAcademicYear(data.result[0]?._id, "llllll");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAcademicYear();
  }, [selectedSetting]);

  useEffect(() => {
    const academicYearChanged = async () => {
      try {
        if (selectAcademicYear) {
          const { data } = await get(PRIVATE_URLS.student.overView, {
            params: {
              schoolId: selectedSetting._id,
              academicYear: selectAcademicYear,
            },
          });

          setOverviewDetails(data?.result);

          setTotalStudents(data.result.totalStudentsCount);
          setTotalMaleStudents(data.result.totalMaleStudentsCount);
          setTotalFemaleStudents(data.result.totalFemaleStudentsCount);
        }
      } catch (error) {
        console.log(error);
      }
    };

    academicYearChanged();
  }, [selectAcademicYear, selectedSetting]);

  console.log(overviewDetails, "bbbbbb");

  return (
    <>
      <PageHeader title="Overview" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <CustomSelect
              required={true}
              name="academicYear"
              value={selectAcademicYear}
              onChange={(e) => setSelectAcademicYear(e.target.value)}
              label="Select Academic Year"
              options={academicYear}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ fontSize: { md: "15px", sm: "12px" }, padding: "1.2rem" }}>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Box>Total Students:{totalStudents}</Box>
          <Box>Total Male Students:{totalMaleStudents}</Box>
          <Box>Total Female Students:{totalFemaleStudents}</Box>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}
          >
            <TableRow>
              <TableHeader align="center">Class</TableHeader>

              <TableHeader align="center">Students</TableHeader>

              <TableHeader align="center">Sections</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {overviewDetails?.data?.map((overview, i) => (
              <TableRow key={overview.className}>
                <TableCell
                  sx={{ borderRight: "1px solid grey" }}
                  align="center"
                >
                  {overview.name}
                </TableCell>

                <TableCell
                  sx={{ borderRight: "1px solid grey", padding: 0 }}
                  align="center"
                >
                  <DataContiner>
                    <StudentCount
                      showTitle={true}
                      title="Male"
                      count={overview.maleStudents}
                    />
                    <TableDivider />
                    <StudentCount
                      showTitle={true}
                      title="Female"
                      count={overview.femaleStudents}
                    />
                    <TableDivider />
                    <StudentCount
                      showTitle={true}
                      title="Total"
                      count={overview.totalStudents}
                    />
                  </DataContiner>
                </TableCell>

                <TableCell align="left">
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? theme.palette.primary.dark
                              : theme.palette.primary.light,
                        }}
                      >
                        <TableRow>
                          {overview.sections.map((overview, index) => (
                            <TableCell align="left">
                              {overview.section}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {overview.sections.map((overview, index) => (
                            <TableCell align="left" key={index}>
                              <Box
                                sx={{
                                  display: "flex",
                                  rowGap: "2px",
                                  flexDirection: "column",
                                }}
                              >
                                <StudentCount
                                  title="Male"
                                  count={overview.femaleCount}
                                />
                                <Divider sx={{ background: "grey" }} />
                                <StudentCount
                                  title="Female"
                                  count={overview.maleCount}
                                />
                                <Divider sx={{ background: "grey" }} />
                                <StudentCount
                                  title="Total"
                                  count={overview.totalStudents}
                                />
                              </Box>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
