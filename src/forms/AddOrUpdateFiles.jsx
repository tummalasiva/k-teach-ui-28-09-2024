/** @format */

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { put } from "../services/apiMethods";
import { PRIVATE_URLS } from "../services/urlConstants";

export default function AddOrUpdateFiles({
  dataToEdit,
  title,
  onUpdate = () => {},
  styles = {},
}) {
  const [open, setOpen] = useState(false);
  const [updatingFiles, setUpdatingFiles] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const theme = useTheme();
  let fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);

  const handleSelectFile = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      let fileList = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        fileList.push(file);
      }
      setSelectedFiles([...fileList]);
    } else {
      console.log("No files selected");
    }
  };
  const handleRemoveFile = (i) => {
    setSelectedFiles(selectedFiles.filter((f, index) => index !== i));
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    try {
      setUpdatingFiles(true);
      const formData = new FormData();
      selectedFiles.forEach((f) => formData.append("bannerImages", f));
      console.log(selectedFiles, "imageeeee");
      const { data } = await put(
        PRIVATE_URLS.school.addFiles + "/" + dataToEdit._id,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onUpdate(data.result);
      handleClose();

      setSelectedFiles([]);
      setUpdatingFiles(false);
    } catch (error) {
      setUpdatingFiles(false);

      console.log(error);
    }
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleOpenDialog}
        size="small"
        variant="contained"
        sx={{ mt: 2 }}>
        {title}
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 650,
            ...styles,
          },
        }}>
        <DialogTitle>Add/Update Banner images</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "10px",
          }}>
          <Box sx={{ margin: "20px 0" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography sx={{ fontWeight: "bold" }}>Add Files</Typography>
              <TextField
                name="images"
                label="Select files"
                fullWidth
                onChange={handleSelectFile}
                sx={{
                  borderWidth: 1,
                  borderRadius: theme.shape.borderRadius,
                  maxWidth: "300px",
                }}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ type: "file", multiple: true }}
                InputProps={{
                  style: {
                    borderWidth: 1,
                    height: "40px",
                    borderRadius: theme.shape.borderRadius,
                  },
                }}
              />
            </Box>
            {selectedFiles.map((f, i) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",

                  background: "#5fa5f661",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                key={f.name + i.toString()}>
                <Typography>{f.name}</Typography>
                <IconButton onClick={(e) => handleRemoveFile(i)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            disabled={!selectedFiles.length}
            size="small"
            loading={updatingFiles}
            variant="contained"
            onClick={handleUpdateItem}>
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
