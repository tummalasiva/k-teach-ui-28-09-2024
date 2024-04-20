import React from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function FormDatePicker({
  name,
  label,
  formik,
  openTo = "day",
  inputFormat = "DD-MM-YYYY",
  views = ["year", "month", "day"],
  disabled = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          "& .MuiInputBase-input": {
            // Target the input element
            height: "8px", // Adjust the height as needed
          },
          marginTop: "16px",
          width: "100%",
        }}
        // disablePast={true}
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
        value={formik.values[name]}
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
