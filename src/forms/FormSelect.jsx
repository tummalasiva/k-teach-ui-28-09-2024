// import React, { useContext } from "react";
// import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
// import ThemeModeContext from "../context/ThemeModeContext";

// const FormSelect = ({
//   label,
//   name,
//   options,
//   formik,
//   disabled = false,
//   multiple,
//   inputProps,
//   disableLabel,
//   borderRadius,
//   required,
//   ...rest
// }) => {
//   const { setFieldValue, touched, errors } = formik;

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setFieldValue(name, value);
//   };
//   const { isDarkMode } = useContext(ThemeModeContext);
//   const labelColor =
//     disabled && !isDarkMode
//       ? "gray"
//       : !disabled && isDarkMode
//       ? "white"
//       : !disabled && !isDarkMode
//       ? "black"
//       : disabled && isDarkMode
//       ? "gray"
//       : "inherit";

//   return (
//     <FormControl
//       margin="normal"
//       required={required}
//       variant="outlined"
//       size="small"
//       sx={{ borderRadius: 20 }}
//       fullWidth
//     >
//       <InputLabel required={required} shrink={true} id={name}>
//         {label}
//       </InputLabel>

//       <Select
//         notched
//         required={required}
//         disabled={disabled}
//         onChange={handleChange}
//         label={label}
//         labelId={name}
//         error={touched[name] && errors[name]}
//         multiple={multiple}
//         value={formik.values[name]}
//         inputProps={inputProps}
//         {...rest}
//         sx={{ borderRadius: { borderRadius } }}
//       >
//         {options?.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>

//       {touched[name] && errors[name] ? (
//         <div style={{ color: "red" }}>{errors[name]}</div>
//       ) : null}
//     </FormControl>
//   );
// };

// export default FormSelect;
import React, { useContext } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Home } from "@mui/icons-material"; // Import the Home icon
import ThemeModeContext from "../context/ThemeModeContext";
import themeData from "../data/themeData";

const FormSelect = ({
  label,
  name,
  options,
  formik,
  disabled = false,
  multiple,
  disableLabel,
  borderRadius,
  required,
  showStartAdornment,
  ...rest
}) => {
  const { setFieldValue, touched, errors } = formik;

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

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
      sx={{ borderRadius: 20 }}
      fullWidth
    >
      <InputLabel required={required} shrink={true} id={name}>
        {label}
      </InputLabel>

      <Select
        notched
        required={required}
        disabled={disabled}
        onChange={handleChange}
        label={label}
        labelId={name}
        error={touched[name] && errors[name]}
        multiple={multiple}
        value={formik.values[name]}
        {...rest}
        startAdornment={
          showStartAdornment && (
            <InputAdornment position="start">
              <IconButton edge="start">
                <Home sx={{ color: themeData.darkPalette.secondary.main }} />
              </IconButton>
            </InputAdornment>
          )
        }
      >
        {options?.map((option) => (
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
