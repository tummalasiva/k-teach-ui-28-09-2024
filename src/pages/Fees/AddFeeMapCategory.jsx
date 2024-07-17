/** @format */

import React from "react";
import FormModal from "../../forms/FormModal";
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import CustomInput from "../../forms/CustomInput";
import { LoadingButton } from "@mui/lab";
// icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function AddFeeMapCategory({
  open = false,
  categories = [],
  adding = false,
  setCategories = () => {},
  addCategory = () => {},
  removeCategory = () => {},
  onClose = () => {},
  onSubmit = () => {},
}) {
  const theme = useTheme();
  let fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCustomInputChange = (e, id) => {
    setCategories([
      ...categories.map((d) =>
        d.id === id ? { ...d, [e.target.name]: e.target.value } : d
      ),
    ]);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 650,
          },
        }}>
        <DialogTitle sx={{ fontWeight: 600 }}>Add Fee Map Category</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "10px",
          }}>
          {categories.map((c, i) => (
            <Grid
              key={c.id}
              rowSpacing={0}
              columnSpacing={1}
              container
              alignItems="center">
              <Grid xs={12} sm={4} md={4} item>
                <CustomInput
                  required={true}
                  type="text"
                  name="name"
                  value={c.name || ""}
                  label="Name"
                  onChange={(e) => handleCustomInputChange(e, c.id)}
                />
              </Grid>
              <Grid xs={12} sm={4} md={4} item>
                <CustomInput
                  type="text"
                  name="description"
                  value={c.description || ""}
                  label="Description"
                  onChange={(e) => handleCustomInputChange(e, c.id)}
                />
              </Grid>
              <Grid xs={12} sm={3} md={3} item>
                <CustomInput
                  required={true}
                  type="number"
                  name="amount"
                  value={c.amount || ""}
                  label="Amount"
                  onChange={(e) => handleCustomInputChange(e, c.id)}
                />
              </Grid>
              <Grid xs={12} sm={1} md={1} item>
                <Tooltip title="Remove Category">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => removeCategory(c.id)}
                    sx={{ mt: 1 }}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ))}
          <Tooltip title="Add Category" sx={{ mt: 1 }}>
            <IconButton color="primary" size="small">
              <AddIcon onClick={() => addCategory()} />
            </IconButton>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={onClose}>
            Close
          </Button>
          <LoadingButton
            size="small"
            loading={adding}
            variant="contained"
            onClick={onSubmit}>
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
