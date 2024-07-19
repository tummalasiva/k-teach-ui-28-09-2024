/** @format */

import React from "react";
import { TextField, Grid } from "@mui/material";

export default function FormInput({
  name,
  multiline = false,
  rows = 4,
  label = "default label",
  formik,
  required = false,
  disabled = false,
  containerStyle = {},
  ...rest
}) {
  const handleInputChange = (e) => {
    const { value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    formik.setFieldValue(name, value);
  };

  return (
    <TextField
      required={required}
      id={name}
      name={name}
      label={label}
      multiline={multiline}
      rows={multiline ? rows : 1}
      disabled={disabled}
      placeholder={`Enter ${label}`}
      fullWidth
      value={formik.values[name] || ""}
      onChange={handleInputChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={{
        mt: 2,
        borderWidth: 1,
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        multiple: true,
        style: {
          borderWidth: 1,
          height: multiline ? "auto" : "42px",
          borderRadius: (theme) => theme.shape.borderRadius,
        },
      }}
      {...rest}
    />
  );
}
