/** @format */

import React, { useContext, useEffect, useState } from "react";
import SubHeader from "../../SubHeader";
import PageHeader from "../../../../components/PageHeader";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FormSelect from "../../../../forms/FormSelect";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { PRIVATE_URLS } from "../../../../services/urlConstants";
import { get } from "../../../../services/apiMethods";
import dayjs from "dayjs";
import SettingContext from "../../../../context/SettingsContext";

export default function Assignment({ show }) {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [data, setData] = useState([]);
  const Section_Options = [{ label: "All", value: "all" }, ...sections];

  const [loading, setLoading] = useState(false);

  // get assignment
  const getData = async (values) => {
    try {
      setLoading(true);
      if (values?.section === "all") {
        const { data } = await get(PRIVATE_URLS.assignment.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              class: values.class,
            },
          },
        });

        setData(data.result);
      } else {
        const { data } = await get(PRIVATE_URLS.assignment.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              class: values.class,
              section: values.section,
            },
          },
        });

        setData(data.result);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get class
  const getClasses = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.class.list, {
        params: { schoolId: selectedSetting._id },
      });
      setClasses(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("class", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get section
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
      setSections(data.result.map((d) => ({ label: d.name, value: d._id })));
      entryFormik.setFieldValue("section", data.result[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      section: "",
    },
    onSubmit: getData,
    enableReinitialize: true,
  });

  useEffect(() => {
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
      getData();
    }
  }, [entryFormik.values.class, selectedSetting._id]);

  const handleDownloadClick = (link) => {
    window.open(link, "_blank");
  };
  return (
    <>
      <SubHeader
        show={show}
        title="Assignment"
        leftSideHeader="Home"
        rightSideHeader="Assignment"
      />

      <Box sx={{ margin: "15px", px: 4 }}>
        <PageHeader title="Assignment" showTextField={false} />
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid
            rowSpacing={1}
            columnSpacing={2}
            container
            component="form"
            onSubmit={entryFormik.handleSubmit}>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                options={classes}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3} item>
              <FormSelect
                required={true}
                name="section"
                formik={entryFormik}
                label="Select Section"
                options={Section_Options}
              />
            </Grid>

            <Grid xs={12} md={3} lg={2} item alignSelf={"center"}>
              <LoadingButton
                loading={loading}
                size="small"
                type="submit"
                variant="contained">
                Find
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
              }}>
              <TableRow>
                <TableCell align="center">#SL</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Created</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((assignment, index) => (
                <TableRow key={assignment._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{assignment?.title}</TableCell>
                  <TableCell align="center">
                    {assignment?.subject.name}
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(assignment?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {assignment?.file && (
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() => handleDownloadClick(assignment?.file)}>
                        Download
                      </Button>
                    )}
                    {assignment?.link && (
                      <a
                        href={assignment?.link}
                        rel="noreferrer"
                        target="_blank">
                        <Button
                          size="small"
                          color="success"
                          variant="contained">
                          Link
                        </Button>
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!data.length && (
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                margin: "5px",
                padding: "5px",
              }}>
              Assignment not found!
            </Typography>
          )}
        </TableContainer>
      </Box>
    </>
  );
}
