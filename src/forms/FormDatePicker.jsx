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
  inputFormat = "DD-MM-YYYY",
  views = ["year", "month", "day"],
  disabled = false,
  disableFutureDates = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture={disableFutureDates}
        sx={{
          "& .MuiInputBase-input": {
            // Target the input element
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
        inputFormat={inputFormat}
        value={dayjs(formik.values[name]) || null}
        onChange={(value) => formik.setFieldValue(name, dayjs(value))}
        // renderInput={(params) => (
        //   <TextField
        //     InputLabelProps={{ sx: { fontSize: "80px" } }}
        //     size="small"
        //     margin="normal"
        //     required
        //     {...params}
        //   />
        // )}
      />
    </LocalizationProvider>
  );
}

export default FormDatePicker;
