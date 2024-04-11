import { Paper } from "@mui/material";
import React, { useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingContext from "../context/SettingsContext";

const Wrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  padding: "10px",
  marginBottom: "20px",
}));

export default function PageHeader({ title = "" }) {
  const { settings, setSettings, selectedSetting, setSelectedSetting } =
    useContext(SettingContext);

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSelectedSetting({ ...settings.filter((s) => s._id == value)[0] });
  };

  return (
    <Wrapper elevation={1}>
      <Typography component="h1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth size="small" sx={{ minWidth: "200px" }}>
          <InputLabel id="demo-simple-select-label">Select School</InputLabel>
          <Select
            labelId="demo-simpless-select-filled-label"
            id="demo-simple-select-filled-l"
            value={selectedSetting._id}
            name="setting"
            onChange={handleSettingChange}
            IconComponent={(props) => (
              <KeyboardArrowDownIcon {...props} fontSize="medium" />
            )}
            label="Select school"
          >
            {settings
              .filter((s) => s.active)
              .map((set) => (
                <MenuItem key={set._id} value={set._id}>
                  {set.schoolName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
    </Wrapper>
  );
}
