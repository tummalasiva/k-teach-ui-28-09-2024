import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import ThemeModeContext from "../context/ThemeModeContext";
import SearchIcon from "@mui/icons-material/Search";

const containsText = (text, searchText) =>
  text?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1;

const FormSelect = ({
  label,
  name,
  options = [],
  formik,
  disabled = false,
  multiple,
  inputProps,
  disableLabel,
  required,
  showSearch = false,
  ...rest
}) => {
  const { setFieldValue, touched, errors } = formik;

  const [blurred, setBlurred] = useState(false);

  var inputRef = useRef(undefined);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText("");
  }, [blurred]);

  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.label, searchText)),
    [searchText, options, blurred]
  );

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
        inputProps={inputProps}
        onAnimationEnd={() => inputRef?.current?.focus()}
        MenuProps={{ autoFocus: false }}
        onBlur={() => setBlurred(!blurred)}
        {...rest}
      >
        {showSearch && (
          <ListSubheader>
            <TextField
              onBlur={() => setBlurred(!blurred)}
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
        )}
        {displayedOptions.map((s, i) => (
          <MenuItem key={i} value={s.value}>
            {s.label}
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
