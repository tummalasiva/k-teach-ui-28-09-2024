import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";

import FormSelect from "../../forms/FormSelect";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormik } from "formik";
import { studentReshuffleTableKeys } from "../../data/tableKeys/reshuffleData";
import SettingContext from "../../context/SettingsContext";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { get, post, put } from "../../services/apiMethods";
import { Checkbox } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Reshuffle() {
  const { selectedSetting } = useContext(SettingContext);
  const [academicYear, setAcademicYear] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [changedSectionData, setChangedSectionData] = useState([]);
  const [studentReshuffle, setStudentReshuffle] = useState([]);
  const [checkBox, setCheckBox] = useState([]);

  const handleMultipleChecks = (e) => {
    if (e.target.checked) {
      const ids = studentReshuffle.map((item) => item._id);
      setCheckBox([...ids]);
    } else {
      setCheckBox([]);
    }
  };

  const handleReshffleCheckBox = (_id, e) => {
    if (e.target.checked) {
      setCheckBox((prev) => [...prev, _id]);
    } else {
      setCheckBox(checkBox.filter((item) => item !== _id));
    }
  };

  const getAcademicYear = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.academicYear.list);
      setAcademicYear(
        data.result.map((d) => ({ label: `${d.from}-${d.to}`, value: d._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async (values) => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: values.academicYear,
            "academicInfo.class": values.class,
            "academicInfo.section": values.section,
          },
        },
      });
      setStudentReshuffle(data.result);

      console.log(data.result, "==========-----------");
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      newSection: "",
    },
    onSubmit: getList,
  });

  const getSection = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: { class: entryFormik.values.class },
        },
      });

      setSectionData(data.result.map((s) => ({ label: s.name, value: s._id })));
      setChangedSectionData(
        data.result.map((s) => ({ label: s.name, value: s._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getClass = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClassData(data.result.map((s) => ({ label: s.name, value: s._id })));
    } catch (error) {
      console.log(error);
    }
  };

  // get data on page load
  useEffect(() => {
    getAcademicYear();
    getClass();
  }, []);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSection();
    }
  }, [entryFormik.values.class, selectedSetting]);

  const handleReshuffle = async () => {
    try {
      const payload = {
        schoolId: selectedSetting._id,
        sectionId: entryFormik.values.newSection,
        classId: entryFormik.values.class,
        currentSectionId: entryFormik.values.section,
        studentIds: checkBox,
      };

      console.log(payload, "mmmm");

      const { data } = await put(PRIVATE_URLS.student.resuffle, payload);

      console.log(data, "kkkkkkkkk");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Reshuffle" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <form onSubmit={entryFormik.handleSubmit}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="academicYear"
                formik={entryFormik}
                label="Select Academic Year"
                options={academicYear}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                options={classData}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Current Section"
                options={sectionData}
              />
            </Grid>

            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="newSection"
                formik={entryFormik}
                label="Change To"
                options={changedSectionData.filter(
                  (section) => section.value !== entryFormik.values.section
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="flex-end"
              gap="10px"
            >
              <Button size="small" type="submit" variant="contained">
                Find
              </Button>
              <Button size="small" variant="contained">
                Bulk Reshuffle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

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
              <TableCell align="center">#SL</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Roll No</TableCell>
              <TableCell align="center">Father Name</TableCell>
              <TableCell align="center">
                <Checkbox
                  onChange={handleMultipleChecks}
                  {...label}
                  sx={{
                    padding: 0,
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentReshuffle.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.basicInfo.name}</TableCell>
                <TableCell align="center">
                  {row.academicInfo.rollNumber}
                </TableCell>
                <TableCell align="center">{row.fatherInfo.name}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={checkBox.includes(row._id)}
                    onChange={(e) => handleReshffleCheckBox(row._id, e)}
                    {...label}
                    sx={{
                      color: "#1b3779",
                      "&.Mui-checked": {
                        color: "#1b3779",
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        size="small"
        type="submit"
        onClick={handleReshuffle}
      >
        Reshuffle
      </Button>
    </>
  );
}
