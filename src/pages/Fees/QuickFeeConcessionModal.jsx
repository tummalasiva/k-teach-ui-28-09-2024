/** @format */

import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
// style

const style = {
  width: "100%",
  height: "auto",
  bgcolor: "background.paper",
  p: 2,
};

const QuickFeeConcessionModal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const formRef = useRef();
  const btnClick = useRef();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.refer && !formData.format && !formData.concession)
      return setError("Please fill all fields");
    props.onSubmit(formData);
    setFormData({});
    setError("");
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.onClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: { xs: "100%", sm: 400, md: 400, lg: 400 },
            },
          },
        }}>
        <Box sx={style}>
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  textAlign="center"
                  fontSize="20px"
                  fontWeight="bold">
                  Add Concession
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  required
                  value={formData.refer || ""}
                  name="refer"
                  label="Reference/recommended"
                  onChange={handleFormChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Concession format</InputLabel>
                  <Select
                    required
                    value={formData.format || ""}
                    name="format"
                    label="Concession format"
                    size="small"
                    onChange={handleFormChange}>
                    <MenuItem value="Value">Value</MenuItem>
                    <MenuItem value="Percentage">Percentage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  type="number"
                  required
                  value={formData.concession || ""}
                  name="concession"
                  label="Concession"
                  size="small"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                display="flex"
                justifyContent="flex-end">
                <Stack direction="row" gap={2}>
                  <Button
                    onClick={props.onClose}
                    color="error"
                    variant="contained"
                    size="small">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      formRef.current.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }}
                    variant="contained"
                    size="small"
                    sx={{
                      background: "#1B3779",
                      "&:hover": {
                        background: "#1B3779",
                      },
                    }}>
                    Add
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default QuickFeeConcessionModal;
