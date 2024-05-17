/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Grid, Paper } from "@mui/material";
import { examListTableKeys } from "../../data/tableKeys/examListData";
import { scheduleListTableKeys } from "../../data/tableKeys/ScheduleListData";
import PageHeader from "../../components/PageHeader";
import CustomTable from "../../components/Tables/CustomTable";
import TabPanel from "../../components/Tabs/TabPanel";
import TabList from "../../components/Tabs/Tablist";
import FormSelect from "../../forms/FormSelect";
import SettingContext from "../../context/SettingsContext";
import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";

export default function ExamSchedule() {
  const { selectedSetting } = useContext(SettingContext);
  const [data, setData] = useState([]);
  const [value, setSelectValue] = useState(0);
  const [examtitle, setExamTitle] = useState([]);
  const getExamTerm = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.examTerm.list, {
        params: { schoolId: selectedSetting._id },
      });

      setExamTitle(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (e, newValue) => {
    setSelectValue(newValue);
  };

  const entryFormik = useFormik({
    initialValues: {
      class: "",
      exam: "",
    },
    onSubmit: console.log("nnnn"),
  });

  useEffect(() => {
    getExamTerm();
  }, [selectedSetting]);

  return (
    <>
      <PageHeader title="Exam Schedule" />
      <TabList
        onChange={handleTabChange}
        value={value}
        labels={["Exam List", "Schedule List"]}
      />
      <TabPanel index={0} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={[]}
          bodyDataModal="exam list"
          bodyData={examtitle}
          tableKeys={examListTableKeys}
        />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Grid rowSpacing={1} columnSpacing={2} container>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="class"
                formik={entryFormik}
                label="Select Class"
                // options={""}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4} item>
              <FormSelect
                required={true}
                name="exam"
                formik={entryFormik}
                label="Select Exam"
                // options={""}
              />
            </Grid>
          </Grid>
        </Paper>
        <CustomTable
          actions={["edit", "delete"]}
          bodyDataModal="schedule list"
          bodyData={data}
          tableKeys={scheduleListTableKeys}
        />
      </TabPanel>
    </>
  );
}
