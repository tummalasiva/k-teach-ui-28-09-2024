import React, { useContext } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const FormSelect = ({
  label,
  name,
  options,
  formik,
  disabled = false,
  multiple,
  disableLabel,
  required,
  ...rest
}) => {
  const { setFieldValue, touched, errors } = formik;

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const selectedOption = options.find(
    (option) => option.value === formik.values[name]
  );
  const { isDarkMode } = useContext(ThemeModeContext);
  const labelColor =
    disabled && !isDarkMode
      ? "gray"
      : !disabled && isDarkMode
      ? "white"
      : !disabled && !isDarkMode
      ? "black"
      : disabled && isDarkMode
      ? "gray"
      : "inherit";

  return (
    <FormControl
      margin="normal"
      required={required}
      variant="outlined"
      size="small"
      fullWidth
    >
      <InputLabel required={required} shrink={true} id={name}>
        {label}
      </InputLabel>

      <Select
        notched
        // displayEmpty
        // renderValue={() => (selectedOption ? selectedOption.label : "Select")}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        label={label}
        labelId={name}
        error={touched[name] && errors[name]}
        multiple={multiple}
        value={formik.values[name]}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touched[name] && errors[name] ? (
        <div style={{ color: "red" }}>{errors[name]}</div>
      ) : null}
    </FormControl>
  );
};

export default FormSelect;
