/** @format */

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, {
  memo,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import SearchIcon from "@mui/icons-material/Search";
import ThemeModeContext from "../context/ThemeModeContext";

const containsText = (text, searchText) =>
  text?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1;

function CustomSelect({
  value,
  name = "",
  label = "",
  options = [],
  onChange = () => {},
  disabled = false,
  required = false,
  multiple = false,
  isSearch = true,
}) {
  const [blurred, setBlurred] = useState(false);

  var inputRef = useRef(undefined);
  const { isDarkMode } = useContext(ThemeModeContext);

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.label, searchText)),
    [searchText, options, blurred]
  );

  useEffect(() => {
    setSearchText("");
  }, [blurred]);

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
      sx={{ top: "4px" }}>
      <InputLabel sx={{ color: labelColor }} shrink={true} id={label}>
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        notched
        name={name}
        multiple={multiple}
        labelId={label}
        value={value || ""}
        label={label}
        onChange={onChange}
        onAnimationEnd={() => inputRef?.current?.focus()}
        MenuProps={{ autoFocus: false }}
        onBlur={() => setBlurred(!blurred)}>
        {isSearch && (
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
    </FormControl>
  );
}

export default memo(CustomSelect);
