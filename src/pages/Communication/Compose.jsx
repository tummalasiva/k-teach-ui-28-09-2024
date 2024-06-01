/** @format */

import React, { useContext, useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  Box,
  Card,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import FormSelect from "../../forms/FormSelect";
import { PRIVATE_URLS } from "../../services/urlConstants";
import { del, get, post, put } from "../../services/apiMethods";
import SettingContext from "../../context/SettingsContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 800 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: theme.palette.mode === "light" ? "#f42323" : "#308fe8",
  },
}));

const Recevier_Type = [
  {
    label: "Role",
    value: "role",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Students",
    value: "students",
  },
  {
    label: "All Students",
    value: "allStudents",
  },
  {
    label: "File",
    value: "file",
  },
];

export default function Compose() {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const entryFormik = useFormik({
    initialValues: {
      receiverType: "",
      role: "",
      employee: "",
      class: "",
      section: "",
      student: "",
    },
    // onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  //get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setClasses(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get sections
  const getSections = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.section.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            class: entryFormik.values.class,
          },
        },
      });
      entryFormik.setFieldValue("section", data.result[0]?._id);
      setSections(
        data.result.map((c) => ({ ...c, label: c.name, value: c._id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //get students
  const getStudents = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
          search: {
            academicYear: entryFormik.values.academicYear,
            "academicInfo.class": entryFormik.values.class,
            "academicInfo.section": entryFormik.values.section,
          },
        },
      });
      setStudents(
        data.result.map((d) => ({
          ...d,
          label: d.basicInfo.name,
          value: d._id,
        }))
      );
      entryFormik.setFieldValue("student", data.result[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title="Compose" />
      <Card sx={{ mt: 3 }}>
        <Box
          style={{
            display: "flex",
            gap: "5px",
          }}>
          <Box>
            {" "}
            <Typography>
              Total SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                79875
              </Typography>
            </Typography>
          </Box>

          <Box>
            {" "}
            <Typography>
              Consumed SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                {79875}
              </Typography>
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography>
              Balance SMS :{" "}
              <Typography component={"span"} fontWeight={"bold"}>
                00099999
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "1rem",
          }}>
          <BorderLinearProgress
            variant="determinate"
            value={((79875 - 887) * 100) / 79875}
          />
        </Box>
      </Card>
      <Card sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="receiverType"
              formik={entryFormik}
              label="Receiver Type"
              options={Recevier_Type}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
