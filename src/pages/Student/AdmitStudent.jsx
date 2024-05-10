import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import { PrintSharp } from "@mui/icons-material";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";

import FormSelect from "../../forms/FormSelect";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { admitStudentTableKeys } from "../../data/tableKeys/admitStudentData";
import { Link, useNavigate } from "react-router-dom";
import AddForm from "../../forms/AddForm";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function AdmitStudent() {
  const { selectedSetting } = useContext(SettingContext);
  const navigation = useNavigate();
  const [data, setData] = useState([]);

  const handelAddStudent = (e) => {
    navigation("/sch/student/add-student");
  };

  const getData = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.student.list, {
        params: {
          schoolId: selectedSetting._id,
        },
      });
      setData(data.result);

      console.log(data.result, "hhhhhhhhhhhhh");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const entryFormik = useFormik({
    initialValues: {
      academicYear: "",
      class: "",
      section: "",
      status: "",
    },
    onSubmit: console.log("nnnn"),
  });
  return (
    <>
      <PageHeader title="Students" />
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid rowSpacing={1} columnSpacing={2} container>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="academicYear"
              formik={entryFormik}
              label="Select Academic Year"
              // options={""}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="class"
              formik={entryFormik}
              label="Select Class"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="section"
              formik={entryFormik}
              label="Select Section"
              // options={""}
            />
          </Grid>

          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="status"
              formik={entryFormik}
              label="Select Status"
              // options={""}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-start"
          >
            <Button size="small" variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Stack direction="row">
            <Tooltip title="Download">
              <IconButton>
                <DownloadForOfflineSharpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton>
                <PrintSharp />
              </IconButton>
            </Tooltip>
            <Link to={"/student/student-bulk-photo"}>
              <Button size="small" sx={{ p: 1, ml: 1 }} variant="contained">
                Bulk Photo
              </Button>
            </Link>
          </Stack>
        </Box>
      </Paper>
      <CustomTable
        actions={["edit"]}
        tableKeys={admitStudentTableKeys}
        bodyDataModal="students"
        bodyData={data}
      />
      {/* add student */}
      <AddForm title="Add Students" onAddClick={handelAddStudent} />
    </>
  );
}
