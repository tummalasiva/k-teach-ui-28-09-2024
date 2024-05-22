/** @format */

import React from "react";
import { TextField, useTheme } from "@mui/material";

export default function CustomInput({
  name,
  label = "default label",
  required = false,
  onChange = () => {},
  value,
  ...rest
}) {
  const theme = useTheme();

  return (
    <TextField
      required={required}
      id={name}
      name={name}
      label={label}
      placeholder={`Enter ${label}`}
      fullWidth
      value={value || ""}
      onChange={onChange}
      sx={{
        mt: 2,
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
      }}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        multiple: true,
        style: {
          borderWidth: 1,
          height: "40px",
          borderRadius: theme.shape.borderRadius,
        },
      }}
      {...rest}
    />
  );
}
