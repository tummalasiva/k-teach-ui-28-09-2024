/** @format */

import React from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function FormDatePicker({
  name,
  label,
  formik,
  required,
  openTo = "day",
  views = ["year", "month", "day"],
  inputFormat = "DD/MM/YYYY",
  disabled = false,
  disableFutureDates = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture={disableFutureDates}
        sx={{
          "& .MuiInputBase-input": {
            height: "8px",
          },
          marginTop: "16px",
          width: "100%",
        }}
        // disablePast={true}
        required={required}
        name={name}
        variant="outlined"
        size="small"
        label={label}
        disabled={disabled}
        slotProps={{ textField: { InputLabelProps: { fontSize: "90px" } } }}
        openTo={openTo}
        closeOnSelect
        views={views}
        format={inputFormat}
        value={dayjs(formik.values[name]) || null}
        onChange={(value) => formik.setFieldValue(name, dayjs(value))}
      />
    </LocalizationProvider>
  );
}

export default FormDatePicker;
