/** @format */

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomTable from "../components/Tables/CustomTable";
import { ticketTableKeys } from "../data/tableKeys/ticketData";
import AddForm from "../forms/AddForm";
import FileSelect from "../forms/FileSelect";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import FormModal from "../forms/FormModal";
import FormInput from "../forms/FormInput";

export default function HelpDesk() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportImg, setReportImg] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  const handelExamTerm = () => {
    setOpen(true);
  };

  const entryFormik = useFormik({
    initialValues: {
      title: dataToEdit?.title || "",
      examType: dataToEdit?.examType || "",
      marksAssignmentAllowed: dataToEdit?.marksAssignmentAllowed || false,
      note: dataToEdit?.note || "",
      isPublic: dataToEdit?.isPublic || false,
    },
    onSubmit: console.log("lll"),
    enableReinitialize: true,
  });

  const handleChangeFiles = (e, index) => {
    const { files } = e.target;
    let fileList = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileList.push(file);
      }
      setReportImg(fileList);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (fileName, index) => {
    setReportImg(reportImg.filter((img) => img.name != fileName));
  };

  const handleClose = () => {
    setOpen(false);
    setDataToEdit(null);
  };

  return (
    <>
      <PageHeader title="Tickets" />
      <CustomTable
        actions={[]}
        bodyDataModal="Tickets"
        bodyData={data}
        tableKeys={ticketTableKeys}
      />

      <AddForm title="Add Tickets" onAddClick={handelExamTerm} />

      <FormModal
        open={open}
        formik={entryFormik}
        formTitle={dataToEdit ? "Update Report Problem" : "Add Report Problem"}
        onClose={handleClose}
        submitButtonTitle={dataToEdit ? "Update" : "Submit"}
        adding={loading}>
        <Grid rowSpacing={0} columnSpacing={2} container>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="title"
              label="Subject"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FormInput
              formik={entryFormik}
              name="description"
              label="Description"
              required={true}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <FileSelect
              name="receipt"
              label="Select Files"
              onChange={(e) => handleChangeFiles(e)}
              customOnChange={true}
              selectedFiles={reportImg}
              onRemove={(fileName) => handleRemoveFile(fileName)}
              multi={true}
            />
          </Grid>
        </Grid>
      </FormModal>
    </>
  );
}
