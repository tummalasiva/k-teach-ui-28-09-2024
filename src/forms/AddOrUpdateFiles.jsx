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
import { LoadingButton } from "@mui/lab";
import { Close, Delete } from "@mui/icons-material";

export default function AddOrUpdateFiles({
  styles = {},
  title = "",
  accept = "",
  setFiles = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [updatingFiles, setUpdatingFiles] = useState(false);

  const [image, setImage] = useState([]);
  const theme = useTheme();
  let fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);

  const handleSelectFile = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      let imageList = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const previewUrl = URL.createObjectURL(file);
        imageList.push(previewUrl);
      }

      setImage([...imageList]);
    } else {
      console.log("No files selected");
    }
  };

  const handleRemoveFile = (i) => {
    setImage(image.filter((f, index) => index !== i));
  };

  return (
    <>
      <Button
        fullWidth
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
          <Box sx={{ margin: "15px 0" }}>
            <Typography sx={{ fontWeight: "bold" }}>Add Files</Typography>

            <TextField
              name="images"
              label="Select files"
              fullWidth
              onChange={handleSelectFile}
              sx={{
                mt: 2,
                borderWidth: 1,
                borderRadius: theme.shape.borderRadius,
                maxWidth: "300px",
              }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                type: "file",
                multiple: true,
                accept: accept,
              }}
              InputProps={{
                style: {
                  borderWidth: 1,
                  height: "40px",
                  borderRadius: theme.shape.borderRadius,
                },
              }}
            />

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {image.map((preview, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFile(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                  >
                    <Delete fontSize="small" color="error" />
                  </IconButton>
                  <img src={preview} width={120} height={100} />
                </Box>
              ))}
            </Stack>
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
            disabled={!image.length}
            size="small"
            loading={updatingFiles}
            variant="contained"
            // onClick={onAddClick}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
