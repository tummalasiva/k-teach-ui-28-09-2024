/** @format */

import { Box, Paper } from "@mui/material";
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

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  marginBottom: "20px",
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.primary.light,
}));

export default function PageHeader({ title = "", showTextField = true }) {
  const { settings, setSettings, selectedSetting, setSelectedSetting } =
    useContext(SettingContext);

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSelectedSetting({ ...settings.filter((s) => s._id == value)[0] });
  };

  let user = window.localStorage.getItem("current_ecs_user");

  let extractedUser = JSON.parse(user);
  let role = extractedUser.role;

  let IsAdminOrSuper = role?.name === "SUPER ADMIN" || role?.name === "ADMIN";

  return (
    <Wrapper>
      <Typography
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#fff",
        }}>
        {title}
      </Typography>
      {IsAdminOrSuper && showTextField && (
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth size="small" sx={{ minWidth: "200px" }}>
            <InputLabel id="demo-simple-select-label">Select School</InputLabel>
            <Select
              labelId="demo-simpless-select-filled-label"
              id="demo-simple-select-filled-l"
              value={selectedSetting?._id}
              name="setting"
              onChange={handleSettingChange}
              IconComponent={(props) => (
                <KeyboardArrowDownIcon {...props} fontSize="medium" />
              )}
              label="Select school">
              {settings?.map((set) => (
                <MenuItem key={set._id} value={set._id}>
                  {set.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}
    </Wrapper>
  );
}
