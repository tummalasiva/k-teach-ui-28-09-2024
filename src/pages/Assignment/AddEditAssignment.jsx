/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Grid, Paper } from "@mui/material";
import { get, post, put } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import FormDatePicker from "../../forms/FormDatePicker";
import FileSelect from "../../forms/FileSelect";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import SettingContext from "../../context/SettingsContext";

export default function AddEditAssignment({
  dataToEdit = "",
  handleClose = () => {},
  onUpdateFormik = () => {},
}) {
  const { selectedSetting } = useContext(SettingContext);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subject, setSubject] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  const [loading, setLoading] = useState(false);

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

      const section = data.result.map((s) => ({
        label: s.name,
        value: s._id,
      }));

      const sectionAllOption = [{ label: "All", value: "all" }, ...section];
      setSections(sectionAllOption);

      // entryFormik.setFieldValue("section", "all");
    } catch (error) {
      console.log(error);
    }
  };

  // get subject
  const getSubject = async () => {
    try {
      if (entryFormik.values.section === "all") {
        const { data } = await get(PRIVATE_URLS.subject.list, {
          params: {
            schoolId: selectedSetting._id,
            class: entryFormik.values.class,
          },
        });
        setSubject(data.result.map((d) => ({ label: d.name, value: d._id })));
        entryFormik.setFieldValue("subject", data.result[0]._id);
      } else {
        const { data } = await get(PRIVATE_URLS.subject.list, {
          params: {
            schoolId: selectedSetting._id,
            search: {
              class: entryFormik.values.class,
              section: entryFormik.values.section,
            },
          },
        });
        setSubject(data.result.map((d) => ({ label: d.name, value: d._id })));
        entryFormik.setFieldValue("subject", data.result[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // create || update actions
  const handleCreateOrUpdate = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("class", values.class);
    formData.append("section", values.section);
    formData.append("subject", values.subject);
    formData.append("assignmentType", values.assignmentType);

    formData.append("deadline", dayjs(values.deadline).format("YYYY-MM-DD"));
    formData.append("attachmentType", values.attachmentType);
    formData.append("isPublic", values.isPublic ? true : false);
    formData.append("note", values.note);
    formData.append("link", values.link);
    selectFile.forEach((file) => formData.append("file", file));
    formData.append("schoolId", selectedSetting._id);

    try {
      setLoading(true);
      if (dataToEdit) {
        const { data } = await put(
          PRIVATE_URLS.assignment.update + "/" + dataToEdit.id,
          formData,
          { headerd: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        const { data } = await post(PRIVATE_URLS.assignment.create, formData, {
          headers: { "Content-type": "multipart/form-data" },
        });
      }
      onUpdateFormik.handleSubmit();
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // file upload
  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setSelectFile(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      class: dataToEdit?.class || "",
      section: dataToEdit?.section || "",
      subject: dataToEdit?.subject || "",
      assignmentType: dataToEdit?.assignmentType || "",

      deadline: dataToEdit?.deadline
        ? dayjs(dataToEdit.deadline).format("YYYY/MM/DD")
        : null,

      attachmentType: dataToEdit?.attachmentType || "",
      isPublish: dataToEdit?.isPublish || false,
      note: dataToEdit?.note || "",
      link: dataToEdit?.link || "",
    },
    onSubmit: handleCreateOrUpdate,
    enableReinitialize: true,
  });

  useEffect(() => {
    getClasses();
  }, [selectedSetting._id]);

  useEffect(() => {
    if (entryFormik.values.class) {
      getSections();
      getSubject();
    }
  }, [entryFormik.values.class, selectedSetting._id]);

  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid
          rowSpacing={1}
          columnSpacing={2}
          container
          component="form"
          onSubmit={entryFormik.handleSubmit}>
          <Grid xs={12} md={6} lg={3} item>
            <FormInput
              required={true}
              name="title"
              formik={entryFormik}
              label="Assignment Title"
            />
          </Grid>
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
              options={sections}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="subject"
              formik={entryFormik}
              label="Select Subject"
              options={subject}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              required={true}
              name="assignmentType"
              formik={entryFormik}
              label="Select Assignment Type"
              options={[
                { label: "Class", value: "class" },
                { label: "Assignment", value: "assignment" },
              ]}
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormDatePicker
              required={true}
              formik={entryFormik}
              name="deadline"
              label="Deadline"
            />
          </Grid>
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              // required={true}
              name="attachmentType"
              formik={entryFormik}
              label="Select Attachment Type"
              options={[
                { label: "File", value: "File" },
                { label: "Link", value: "Link" },
              ]}
            />
          </Grid>
          {entryFormik.values?.attachmentType === "File" && (
            <Grid xs={12} md={6} lg={3} item>
              <FileSelect
                name={`file`}
                label="Select File"
                onChange={(e) => handleChangeFiles(e)}
                previousFile={dataToEdit?.file}
                customOnChange={true}
                selectedFiles={selectFile}
              />
            </Grid>
          )}
          {entryFormik.values?.attachmentType === "Link" && (
            <Grid xs={12} md={6} lg={3} item>
              <FormInput
                name="link"
                label="Link"
                required={true}
                formik={entryFormik}
              />
            </Grid>
          )}
          <Grid xs={12} md={6} lg={3} item>
            <FormSelect
              name="isPublish"
              formik={entryFormik}
              label="Publish To Web"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12} item>
            <FormInput
              name="note"
              formik={entryFormik}
              label="Note"
              multiline
              rows={3}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={3}
            style={{ alignSelf: "center", marginTop: "10px" }}
            item>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              sx={{ ml: 2 }}
              loading={loading}>
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
