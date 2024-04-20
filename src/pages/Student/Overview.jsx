import React, { useState } from "react";
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

  return (
    <>
      <PageHeader title="Overview" />

      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <FormControl size="small" required fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Academic Year
              </InputLabel>
              <Select
                label="Academic Year"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="academicYear"
              ></Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ fontSize: { md: "15px", sm: "12px" }, padding: "1.2rem" }}>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Box>Total Students:456</Box>
          <Box>Total Male Students:78</Box>
          <Box>Total Female Students:</Box>
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
            {data.map((overview, i) => (
              <TableRow key={overview.className}>
                <TableCell
                  sx={{ borderRight: "1px solid grey" }}
                  align="center"
                >
                  {overview.className}
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
                          {overview.overviewData.map((overview, index) => (
                            <TableCell align="left">
                              {overview.section}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {overview.overviewData.map((overview, index) => (
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
                                  count={overview.total}
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
