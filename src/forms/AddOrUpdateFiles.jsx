import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { LoadingButton } from "@mui/lab";
import { Close, Delete } from "@mui/icons-material";

export default function AddOrUpdateFiles({
  onUpdate = () => {},
  styles = {},
  title = "",
}) {
  const [open, setOpen] = useState(false);
  const [updatingFiles, setUpdatingFiles] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(false);
  const [files, setFiles] = useState([]);
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
      selectedFiles.forEach((f) => formData.append("files", f));

      setSelectedFiles([]);
      setUpdatingFiles(false);
    } catch (error) {
      setUpdatingFiles(false);

      console.log(error);
    }
  };

  const handleDeleteFile = async (e, file) => {
    e.preventDefault();
    setDeletingFiles(true);
    try {
    } catch (error) {
      console.log(error);
      setDeletingFiles(false);
    }
  };
  return (
    <>
      <Button
        fullWidth
        // startIcon={<RemoveRedEyeRoundedIcon fontSize="small" />}
        onClick={handleOpenDialog}
        size="small"
        variant="contained"
        sx={{ mt: 2 }}
      >
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
        }}
      >
        <DialogTitle>Add/Update Banner images</DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "10px",
          }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <Typography sx={{ fontWeight: "bold" }} mb={2}>
              Uploaded Imgaes
            </Typography>
            {files.length ? (
              files.map((f, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    // border: "1px solid lightgray",
                    borderRadius: "5px",
                    background: "#5fa5f661",
                    marginTop: "5px",
                  }}
                >
                  <Typography>{`File ${i + 1}`}</Typography>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      disabled={deletingFiles}
                      onClick={(e) => handleDeleteFile(e, f)}
                    >
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => window.open(f, "_blank")}>
                      <RemoveRedEyeRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              ))
            ) : (
              <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
                No images were uploaded for this institute
              </Typography>
            )}
          </Box>
          <Divider />

          <Box sx={{ margin: "20px 0" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
                  // border: "1px solid lightgray",
                  background: "#5fa5f661",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                key={f.name + i.toString()}
              >
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            disabled={!selectedFiles.length}
            size="small"
            loading={updatingFiles}
            variant="contained"
            onClick={handleUpdateItem}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
